import fs from "fs/promises";
import os from "os";
import path from "path";
import { spawn } from "child_process";

import Question from "../models/Question.js";

/* =========================================================
   COMPILER PATHS
========================================================= */

const GCC_PATH =
  process.platform === "win32"
    ? (process.env.GCC_PATH || "C:\\msys64\\ucrt64\\bin\\gcc.exe")
    : (process.env.GCC_PATH || "gcc");

const JAVA_COMPILER = "javac";
const JAVA_RUNNER = "java";
const PYTHON_RUNNER =
  process.platform === "win32"
    ? "python"
    : (process.env.PYTHON_RUNNER || "python3");


/* =========================================================
   RUN A PROCESS
========================================================= */

const runProcess = (
  command,
  args = [],
  input = "",
  timeoutMs = 4000
) =>
  new Promise((resolve) => {
    const startTime = Date.now();
    let child;

    try {
      child = spawn(command, args, {
        windowsHide: true,
        shell: false,
      });
    } catch (error) {
      resolve({
        ok: false,
        code: null,
        stdout: "",
        stderr: error.message,
        timedOut: false,
        executionTimeMs: 0,
      });

      return;
    }

    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let finished = false;

    const finish = (result) => {
      if (finished) return;

      finished = true;
      clearTimeout(timer);
      const executionTimeMs = Math.max(1, Date.now() - startTime);

      resolve({
        ...result,
        executionTimeMs,
      });
    };

    const timer = setTimeout(() => {
      timedOut = true;

      try {
        child.kill();
      } catch (error) {
        // Ignore kill errors
      }
    }, timeoutMs);

    child.stdout.on("data", (data) => {
      stdout += data.toString();

      if (stdout.length > 10000) {
        try {
          child.kill();
        } catch (error) {
          // Ignore kill errors
        }
      }
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();

      if (stderr.length > 10000) {
        try {
          child.kill();
        } catch (error) {
          // Ignore kill errors
        }
      }
    });

    child.on("error", (error) => {
      finish({
        ok: false,
        code: null,
        stdout,
        stderr: error.message,
        timedOut,
      });
    });

    child.on("close", (code) => {
      finish({
        ok: code === 0 && !timedOut,
        code,
        stdout,
        stderr,
        timedOut,
      });
    });

    try {
      if (input) {
        child.stdin.write(input);
      }

      child.stdin.end();
    } catch (error) {
      finish({
        ok: false,
        code: null,
        stdout,
        stderr: error.message,
        timedOut,
      });
    }
  });


/* =========================================================
   NORMALIZE OUTPUT
========================================================= */

const normalizeOutput = (value) => {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
};

/* Strip leading label from a line e.g. "Largest Element: 9" → "9" */
const stripLabel = (line) => {
  /* Match "Any Text: value" pattern */
  const match = line.match(/^[A-Za-z][A-Za-z0-9 _-]*:\s+(.+)$/);
  return match ? match[1].trim() : line;
};

/* Smart comparison: if expected has no colon, also try stripping labels */
const outputsMatch = (actual, expected) => {
  if (actual === expected) return true;

  /* Only attempt label-stripping when expected is a plain value (no colon) */
  if (!expected.includes(":")) {
    const strippedActual = actual
      .split("\n")
      .map(stripLabel)
      .join("\n")
      .trim();
    if (strippedActual === expected) return true;
  }

  return false;
};


/* =========================================================
   RUN CODING CODE
========================================================= */

export const runCodingCode = async (req, res) => {
  let workDir = null;

  try {
    const {
      questionId,
      language,
      code,
    } = req.body;

    /* -----------------------------------------------------
       VALIDATION
    ----------------------------------------------------- */

    if (
      !questionId ||
      !code ||
      !["C", "Java", "Python"].includes(language)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Question, language and code are required.",
      });
    }


    /* -----------------------------------------------------
       CREATE TEMPORARY DIRECTORY
    ----------------------------------------------------- */

    workDir = await fs.mkdtemp(
      path.join(
        os.tmpdir(),
        "ai-interview-code-"
      )
    );


    /* -----------------------------------------------------
       FIND CODING QUESTION
    ----------------------------------------------------- */

    const question = await Question.findOne({
      _id: questionId,
      category: "coding",
    }).lean();

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Coding problem not found.",
      });
    }


    /* -----------------------------------------------------
       GET TEST CASES
    ----------------------------------------------------- */

    const tests = Array.isArray(
      question.testCases
    )
      ? question.testCases
      : [];


    if (tests.length === 0) {
      return res.status(200).json({
        success: false,
        compiled: false,
        passed: 0,
        total: 0,
        results: [],
        message:
          "No test cases are available for this coding problem.",
      });
    }


    /* =====================================================
       LANGUAGE SETUP
    ===================================================== */

    let runCommand;
    let runArgs;
    let sourcePath;


    /* =====================================================
       PYTHON
    ===================================================== */

    if (language === "Python") {
      sourcePath = path.join(
        workDir,
        "main.py"
      );

      await fs.writeFile(
        sourcePath,
        code,
        "utf8"
      );

      runCommand = PYTHON_RUNNER;
      runArgs = [sourcePath];
    }


    /* =====================================================
       C
    ===================================================== */

    else if (language === "C") {
      sourcePath = path.join(
        workDir,
        "main.c"
      );

      const exePath = path.join(
        workDir,
        process.platform === "win32" ? "main.exe" : "main.out"
      );

      await fs.writeFile(
        sourcePath,
        code,
        "utf8"
      );


      /* ---------------------------------------------------
         CHECK GCC
      --------------------------------------------------- */

      const compile = await runProcess(
        GCC_PATH,
        [
          sourcePath,
          "-O2",
          "-o",
          exePath,
        ],
        "",
        10000
      );


      /* ---------------------------------------------------
         C COMPILATION ERROR
      --------------------------------------------------- */

      if (!compile.ok) {
        return res.status(200).json({
          success: false,
          compiled: false,
          passed: 0,
          total: tests.length,

          results: [],

          output:
            compile.stderr ||
            "C compilation failed.",

          error:
            compile.stderr ||
            "C compilation failed.",
        });
      }


      /* ---------------------------------------------------
         RUN COMPILED C PROGRAM
      --------------------------------------------------- */

      runCommand = exePath;
      runArgs = [];
    }


    /* =====================================================
       JAVA
    ===================================================== */

    else if (language === "Java") {
      sourcePath = path.join(
        workDir,
        "Main.java"
      );

      await fs.writeFile(
        sourcePath,
        code,
        "utf8"
      );


      /* ---------------------------------------------------
         JAVA COMPILATION
      --------------------------------------------------- */

      const compile = await runProcess(
        JAVA_COMPILER,
        [sourcePath],
        "",
        10000
      );


      /* ---------------------------------------------------
         JAVA COMPILATION ERROR
      --------------------------------------------------- */

      if (!compile.ok) {
        return res.status(200).json({
          success: false,
          compiled: false,
          passed: 0,
          total: tests.length,

          results: [],

          output:
            compile.stderr ||
            "Java compilation failed.",

          error:
            compile.stderr ||
            "Java compilation failed.",
        });
      }


      /* ---------------------------------------------------
         RUN JAVA
      --------------------------------------------------- */

      runCommand = JAVA_RUNNER;

      runArgs = [
        "-cp",
        workDir,
        "Main",
      ];
    }


    /* =====================================================
       RUN ALL TEST CASES
    ===================================================== */

    const results = [];


    for (let index = 0; index < tests.length; index++) {
      const test = tests[index];

      const input =
        test?.input ?? "";

      const expected =
        normalizeOutput(
          test?.output ?? ""
        );


      /* ---------------------------------------------------
         EXECUTE PROGRAM
      --------------------------------------------------- */

      const result = await runProcess(
        runCommand,
        runArgs,
        `${input}\n`,
        4000
      );


      /* ---------------------------------------------------
         ACTUAL OUTPUT
      --------------------------------------------------- */

      const actual =
        normalizeOutput(
          result.stdout
        );


      /* ---------------------------------------------------
         ERROR MESSAGE
      --------------------------------------------------- */

      let error = "";

      if (result.timedOut) {
        error =
          "Time limit exceeded.";
      } else if (
        result.stderr &&
        !result.ok
      ) {
        error =
          result.stderr.trim();
      }


      /* ---------------------------------------------------
         COMPARE OUTPUT
      --------------------------------------------------- */

      const passed =
        result.ok &&
        outputsMatch(actual, expected);


      /* ---------------------------------------------------
         STORE RESULT
      --------------------------------------------------- */

      results.push({
        testCase: index + 1,

        input: String(input),

        expected,

        actual,

        passed,

        status: passed
          ? "Passed"
          : "Failed",

        executionTimeMs: result.executionTimeMs || 0,

        error,
      });
    }


    /* =====================================================
       SCORE & TIMING
    ===================================================== */

    const passed =
      results.filter(
        (item) => item.passed
      ).length;

    const total =
      results.length;

    const failed =
      total - passed;

    const totalExecutionTimeMs = results.reduce(
      (sum, item) => sum + (item.executionTimeMs || 0),
      0
    );

    /* =====================================================
       FINAL RESPONSE
    ===================================================== */

    return res.status(200).json({
      success:
        passed === total &&
        total > 0,

      compiled: true,

      passed,

      failed,

      total,

      executionTimeMs: totalExecutionTimeMs,

      results,
    });
  } catch (error) {
    console.error(
      "Compiler error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Unable to run the code on this server.",

      error:
        error.message,
    });
  } finally {
    /* -----------------------------------------------------
       DELETE TEMPORARY FILES
    ----------------------------------------------------- */

    if (workDir) {
      await fs.rm(
        workDir,
        {
          recursive: true,
          force: true,
        }
      ).catch(() => {});
    }
  }
};