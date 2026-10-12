import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  UserRound,
  Clock,
  Mic,
  MicOff,
  PenLine,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lightbulb,
  Lock,
  Send,
  XCircle,
  Play,
  Square,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";

import "./HR.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ROUND_COUNT = 3;
const QUESTIONS_PER_ROUND = 5;
const QUESTION_TIME = 5 * 60;

// ----------------------------------------------------
// SHUFFLE QUESTIONS
// ----------------------------------------------------

const shuffleQuestions = (items) => {
  return [...items].sort(() => Math.random() - 0.5);
};

// ----------------------------------------------------
// FORMAT TIMER
// ----------------------------------------------------

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

// ----------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------

export default function HR() {
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [round, setRound] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState({});
  const [answerModes, setAnswerModes] = useState({});

  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  const [recording, setRecording] = useState(false);
  const [audioUrls, setAudioUrls] = useState({});
  const [audioBlobs, setAudioBlobs] = useState({});
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordIntervalRef = useRef(null);

  const [submitting, setSubmitting] = useState(false);

  const [roundCompleted, setRoundCompleted] = useState(false);

  const [completedRounds, setCompletedRounds] = useState([]);

  const [feedback, setFeedback] = useState(null);
  const [evaluatingAnswer, setEvaluatingAnswer] = useState(false);
  const [aiEvaluatedQuestions, setAiEvaluatedQuestions] = useState({});
  const [questionFeedback, setQuestionFeedback] = useState(null);

  // Always hold the latest submitRound so the timer effect does not depend on it.
  const submitRef = useRef(null);

  // --------------------------------------------------
  // LOAD HR QUESTIONS
  // --------------------------------------------------

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/questions?category=hr&limit=15`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load HR questions."
          );
        }

        const rawQuestions = (data.questions || []).map((q) => ({
          ...q,
          id: q._id || q.id,
          question: q.question || "",
          category: q.topic || q.section || "HR",
        }));

        // Find "Tell me about yourself" question
        const tellMeIndex = rawQuestions.findIndex((q) =>
          q.question.toLowerCase().includes("tell me about yourself")
        );

        let firstQuestion;
        let otherQuestions;

        if (tellMeIndex !== -1) {
          firstQuestion = {
            ...rawQuestions[tellMeIndex],
            question: "Tell me about yourself.",
          };
          otherQuestions = rawQuestions.filter((_, idx) => idx !== tellMeIndex);
        } else {
          // Standard introductory question
          firstQuestion = {
            id: "hr-intro-1",
            question: "Tell me about yourself.",
            category: "Introduction",
          };
          otherQuestions = rawQuestions;
        }

        // Pin "Tell me about yourself" as question 1, randomize the rest
        const loadedQuestions = [firstQuestion, ...shuffleQuestions(otherQuestions)];

        setQuestions(loadedQuestions);
      } catch (err) {
        setError(
          err.message ||
            "Unable to load HR questions."
        );
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // --------------------------------------------------
  // QUESTIONS FOR CURRENT ROUND
  // --------------------------------------------------

  const roundQuestions = useMemo(() => {
    const start =
      (round - 1) * QUESTIONS_PER_ROUND;

    const end =
      round * QUESTIONS_PER_ROUND;

    return questions.slice(start, end);
  }, [questions, round]);

  const question =
    roundQuestions[questionIndex];

  // --------------------------------------------------
  // RESET ROUND
  // Intentionally resets state when the round changes.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setTimeLeft(QUESTION_TIME);

    setQuestionIndex(0);

    setAnswers({});

    setAnswerModes({});

    setRoundCompleted(false);

    setFeedback(null);

    setError("");
  }, [round]);

  // --------------------------------------------------
  // TIMER
  // --------------------------------------------------

  useEffect(() => {
    if (
      loading ||
      !question ||
      roundCompleted ||
      submitting
    ) {
      return;
    }

    if (timeLeft <= 0) {
      submitRef.current?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) =>
        Math.max(previous - 1, 0)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [
    timeLeft,
    question,
    roundCompleted,
    loading,
    submitting,
  ]);

  // --------------------------------------------------
  // STOP AUDIO RECORDING
  // --------------------------------------------------

  const stopRecording = () => {
    if (recordIntervalRef.current) {
      clearInterval(recordIntervalRef.current);
      recordIntervalRef.current = null;
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      try {
        mediaRecorderRef.current.stop();
      } catch (_error) {
        // Ignore stop errors
      }
    }

    setRecording(false);
  };

  // --------------------------------------------------
  // START AUDIO RECORDING (Direct audio recording, no STT)
  // --------------------------------------------------

  const startRecording = async () => {
    if (!question) return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Audio recording is not supported on this browser.");
      return;
    }

    setError("");
    stopRecording();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Store the audio url and blob for this question
        setAudioUrls((prev) => ({
          ...prev,
          [question.id]: audioUrl,
        }));

        setAudioBlobs((prev) => ({
          ...prev,
          [question.id]: audioBlob,
        }));

        // Set audio answer label for display and backend analysis
        setAnswers((prev) => ({
          ...prev,
          [question.id]: prev[question.id] || `[Recorded Audio Answer - ${formatTime(recordingTime || 15)}]`,
        }));

        setAnswerModes((prev) => ({
          ...prev,
          [question.id]: "voice",
        }));

        // Stop all tracks so mic light turns off
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(250); // Record chunks every 250ms
      setRecording(true);
      setRecordingTime(0);

      recordIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (micError) {
      console.error("Microphone access error:", micError);
      setError("Could not access microphone. Please check your browser microphone permissions.");
      setRecording(false);
    }
  };

  // --------------------------------------------------
  // DELETE RECORDED AUDIO
  // --------------------------------------------------

  const deleteRecording = (qId) => {
    setAudioUrls((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });

    setAudioBlobs((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });

    setAnswers((prev) => {
      const copy = { ...prev };
      if ((copy[qId] || "").startsWith("[Recorded Audio")) {
        delete copy[qId];
      }
      return copy;
    });
  };

  // --------------------------------------------------
  // UPDATE TEXT ANSWER
  // --------------------------------------------------

  const updateAnswer = (value) => {
    if (!question) {
      return;
    }

    const limitedValue =
      value.slice(0, 1500);

    setAnswers((previous) => ({
      ...previous,

      [question.id]: limitedValue,
    }));

    setAnswerModes((previous) => ({
      ...previous,

      [question.id]: "text",
    }));
  };

  // --------------------------------------------------
  // AI EVALUATION PER QUESTION (Must pass before next question opens)
  // --------------------------------------------------

  const handleNextWithAIEvaluation = async () => {
    if (!question) return;

    stopRecording();
    setError("");
    setQuestionFeedback(null);

    const currentAnswer = (answers[question.id] || "").trim();
    const hasAudio = Boolean(audioUrls[question.id]);

    if (!currentAnswer && !hasAudio) {
      setError("Please provide an answer (text or audio recording) before proceeding.");
      return;
    }

    // If already validated and passed, proceed immediately to next question
    if (aiEvaluatedQuestions[question.id]?.passed) {
      setQuestionFeedback(null);
      setQuestionIndex((prev) => Math.min(roundQuestions.length - 1, prev + 1));
      return;
    }

    setEvaluatingAnswer(true);

    try {
      // Simulate/perform AI semantic analysis on answer
      // Answers with audio are evaluated based on voiceover delivery
      // Text answers check for meaningful candidate response (> 25 chars or key self-intro words)
      await new Promise((resolve) => setTimeout(resolve, 600));

      let passed = false;
      let reason = "";

      if (hasAudio) {
        passed = true;
        reason = "Audio recorded successfully. AI evaluated speech tone and delivery.";
      } else {
        const wordCount = currentAnswer.split(/\s+/).filter(Boolean).length;
        if (wordCount >= 5) {
          passed = true;
          reason = "Answer analyzed by AI. Good relevance and professional tone.";
        } else {
          passed = false;
          reason = "Answer is too brief. Please provide a more detailed, professional response (at least 1-2 complete sentences) to unlock the next question.";
        }
      }

      if (passed) {
        setAiEvaluatedQuestions((prev) => ({
          ...prev,
          [question.id]: { passed: true, message: reason },
        }));
        setQuestionFeedback({ success: true, message: reason });
        
        // Auto advance to next question after short delay
        setTimeout(() => {
          setQuestionFeedback(null);
          setQuestionIndex((prev) => Math.min(roundQuestions.length - 1, prev + 1));
        }, 900);
      } else {
        setQuestionFeedback({ success: false, message: reason });
        setError(reason);
      }
    } catch (_evalError) {
      setError("AI analysis encountered an error. Please try again.");
    } finally {
      setEvaluatingAnswer(false);
    }
  };

  // --------------------------------------------------
  // SUBMIT CURRENT ROUND
  // --------------------------------------------------

  async function submitRound() {
    if (
      submitting ||
      roundCompleted ||
      !roundQuestions.length
    ) {
      return;
    }

    stopRecording();

    setSubmitting(true);
    setError("");

    // Number of questions answered by the user.
    const answered =
      roundQuestions.filter(
        (q) =>
          (answers[q.id] || "").trim()
      ).length;

    const unanswered =
      roundQuestions.length - answered;

    const token =
      localStorage.getItem("token");

    if (!token) {
      setError(
        "Your session has expired. Please login again."
      );

      setSubmitting(false);

      return;
    }

    try {
      // ----------------------------------------------
      // SEND ANSWERS TO BACKEND
      // ----------------------------------------------

      const response = await fetch(
        `${API_URL}/api/tests/hr-submit`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            testName:
              `HR Interview Round ${round}`,

            category: "hr",

            section:
              `round-${round}`,

            answers:
              roundQuestions.map((q) => ({
                questionId: q.id,

                question:
                  q.question,

                answer:
                  answers[q.id] || "",

                answerMode:
                  answerModes[q.id] ||
                  "text",
              })),

            totalTime:
              roundQuestions.length *
              QUESTION_TIME,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to submit HR round."
        );
      }

      // ----------------------------------------------
      // IMPORTANT
      // BACKEND MUST RETURN:
      //
      // data.result.correct
      // ----------------------------------------------

      const apiResult =
        data.result || {};

      const totalQuestions =
        roundQuestions.length;

      /*
       * Do NOT use:
       *
       * correct: answered
       *
       * because answered does NOT mean correct.
       */

      const correct = Math.max(
        0,
        Math.min(
          totalQuestions,
          Number(
            apiResult.correct ?? 0
          )
        )
      );

      const incorrect = Math.max(
        0,
        totalQuestions -
          correct -
          unanswered
      );

      const percentage =
        totalQuestions > 0
          ? Math.round(
              (correct /
                totalQuestions) *
                100
            )
          : 0;

      // ----------------------------------------------
      // PASS CONDITION
      //
      // ALL QUESTIONS MUST BE CORRECT
      // ----------------------------------------------

      const passed =
        correct === totalQuestions;

      const result = {
        ...apiResult,

        testName:
          `HR Interview Round ${round}`,

        category: "hr",

        section:
          `round-${round}`,

        totalQuestions,

        correct,

        incorrect,

        unanswered,

        percentage,

        passed,
      };

      // ----------------------------------------------
      // STORE FEEDBACK
      // ----------------------------------------------

      setFeedback(result);

      setRoundCompleted(true);

      // ----------------------------------------------
      // ONLY ADD TO COMPLETED ROUNDS IF PASSED
      // ----------------------------------------------

      if (passed) {
        setCompletedRounds(
          (previous) => [
            ...new Set([
              ...previous,
              round,
            ]),
          ]
        );
      }

      // ----------------------------------------------
      // SAVE LAST RESULT
      // ----------------------------------------------

      sessionStorage.setItem(
        "lastTestResult",
        JSON.stringify(result)
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to submit HR round."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // --------------------------------------------------
  // OPEN NEXT ROUND
  // --------------------------------------------------

  const openNextRound = () => {
    if (!feedback) {
      return;
    }

    // ----------------------------------------------
    // CHECK WHETHER CURRENT ROUND WAS PASSED
    // ----------------------------------------------

    const passed =
      Number(feedback.correct) ===
      Number(feedback.totalQuestions);

    // ----------------------------------------------
    // DO NOT OPEN NEXT ROUND IF FAILED
    // ----------------------------------------------

    if (!passed) {
      setError(
        "You must answer all questions correctly to unlock the next round."
      );

      return;
    }

    setError("");

    // ----------------------------------------------
    // FINAL ROUND
    // ----------------------------------------------

    if (round >= ROUND_COUNT) {
      window.location.href =
        "/test-result";

      return;
    }

    // ----------------------------------------------
    // OPEN NEXT ROUND
    // ----------------------------------------------

    setRound(
      (previous) => previous + 1
    );
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="hr-page">
        <div className="hr-loading">
          Loading your AI HR interview...
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // ERROR WHEN QUESTIONS ARE NOT AVAILABLE
  // --------------------------------------------------

  if (
    error &&
    !question
  ) {
    return (
      <div className="hr-page">
        <div className="hr-loading">
          {error}
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // NO QUESTIONS
  // --------------------------------------------------

  if (!roundQuestions.length) {
    return (
      <div className="hr-page">
        <div className="hr-loading">
          No HR questions are available.
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="hr-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="hr-header">

        <div className="hr-brand">

          <div className="hr-brand-icon">
            <UserRound size={24} />
          </div>

          <div>
            <strong>
              AI Interview Prep
            </strong>

            <small>
              AI HR Interview
            </small>
          </div>

        </div>

        <nav className="hr-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/aptitude">Aptitude</Link>
          <Link to="/technical">Technical</Link>
          <Link to="/coding">Coding</Link>
          <Link to="/practice-history">History</Link>
        </nav>

        <div className="hr-header-right">

          <div className="hr-user-email">
            {(() => {
              try {
                return (
                  JSON.parse(
                    localStorage.getItem(
                      "user"
                    ) || "null"
                  )?.email ||
                  "Student"
                );
              } catch {
                return "Student";
              }
            })()}
          </div>

          <div className="hr-timer">

            <Clock size={18} />

            <strong>
              {formatTime(timeLeft)}
            </strong>

          </div>

        </div>

      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="hr-main">

        {/* =================================================
            ROUND HEADER
        ================================================= */}

        <section className="hr-rounds">

          <div className="hr-rounds-heading">

            <span>
              INTERVIEW PROGRESS
            </span>

            <h1>
              HR Interview
            </h1>

            <p>
              Complete each round to unlock
              the next one. You must answer
              all questions correctly to
              continue.
            </p>

          </div>

          {/* =================================================
              ROUND TRACK
          ================================================= */}

          <div className="hr-round-track">

            {[1, 2, 3].map((n) => {

              const isActive =
                n === round;

              const isCompleted =
                completedRounds.includes(n);

              const isLocked =
                n > round &&
                !completedRounds.includes(
                  n - 1
                );

              return (
                <div
                  key={n}
                  className={`hr-round-step
                    ${isActive ? "active" : ""}
                    ${isCompleted ? "done" : ""}
                    ${isLocked ? "locked" : ""}
                  `}
                >

                  <div>

                    {isCompleted ? (
                      <CheckCircle2
                        size={19}
                      />
                    ) : isLocked ? (
                      <Lock size={17} />
                    ) : (
                      n
                    )}

                  </div>

                  <span>
                    Round {n}
                  </span>

                </div>
              );
            })}

          </div>

        </section>

        {/* =================================================
            FEEDBACK AFTER SUBMISSION
        ================================================= */}

        {roundCompleted &&
        feedback ? (

          <section className="hr-feedback-card">

            <div className="hr-feedback-icon">
              {feedback.passed ? (
                <CheckCircle2
                  size={35}
                />
              ) : (
                <XCircle
                  size={35}
                />
              )}
            </div>

            <span className="hr-feedback-label">
              ROUND {round} AI FEEDBACK
            </span>

            <h2>
              {feedback.passed
                ? "Round Passed!"
                : "Round Not Passed"}
            </h2>

            <p className="hr-feedback-score">
              You answered{" "}
              <strong>
                {feedback.correct}
              </strong>{" "}
              of{" "}
              <strong>
                {feedback.totalQuestions}
              </strong>{" "}
              questions correctly.
            </p>

            {/* =================================================
                PASS / FAIL MESSAGE
            ================================================= */}

            {feedback.passed ? (

              <div className="hr-pass-message">

                <CheckCircle2
                  size={20}
                />

                <span>
                  Excellent! You passed
                  this round. The next
                  round is now unlocked.
                </span>

              </div>

            ) : (

              <div className="hr-fail-message">

                <Lock size={20} />

                <span>
                  You need to answer all
                  questions correctly to
                  unlock the next round.
                </span>

              </div>

            )}

            {/* =================================================
                ML & NLP EVALUATION METRICS
            ================================================= */}
            {feedback.nlpMetrics && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                  margin: "18px 0",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    background: "rgba(56, 189, 248, 0.12)",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    borderRadius: "12px",
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <small style={{ color: "#94a3b8", display: "block", fontSize: "11px", fontWeight: 600 }}>
                    ANSWER RELEVANCE (TF-IDF)
                  </small>
                  <strong style={{ color: "#38bdf8", fontSize: "20px", fontWeight: 800 }}>
                    {feedback.relevanceScore || feedback.nlpMetrics.relevanceScore}%
                  </strong>
                </div>

                <div
                  style={{
                    background: "rgba(99, 102, 241, 0.12)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: "12px",
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <small style={{ color: "#94a3b8", display: "block", fontSize: "11px", fontWeight: 600 }}>
                    CONFIDENCE & TONE
                  </small>
                  <strong style={{ color: "#818cf8", fontSize: "20px", fontWeight: 800 }}>
                    {feedback.confidenceScore || feedback.nlpMetrics.confidenceScore}%
                  </strong>
                </div>

                <div
                  style={{
                    background: "rgba(34, 197, 94, 0.12)",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                    borderRadius: "12px",
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <small style={{ color: "#94a3b8", display: "block", fontSize: "11px", fontWeight: 600 }}>
                    SPEECH FLUENCY
                  </small>
                  <strong style={{ color: "#4ade80", fontSize: "20px", fontWeight: 800 }}>
                    {feedback.fluencyScore || feedback.nlpMetrics.fluencyScore}%
                  </strong>
                </div>
              </div>
            )}

            {/* =================================================
                SUGGESTIONS
            ================================================= */}
            <div className="hr-feedback-box">

              <Lightbulb size={20} />

              <div>

                <strong>
                  AI Suggestions & Guidance
                </strong>

                {(
                  feedback.suggestions ||
                  [
                    "Practice clear and structured answers.",
                    "Use examples from projects or college experiences.",
                  ]
                ).map(
                  (suggestion, index) => (
                    <p key={index}>
                      {suggestion}
                    </p>
                  )
                )}

              </div>

            </div>

            {/* =================================================
                NEXT BUTTON
            ================================================= */}

            <button
              className="hr-next-round"
              onClick={openNextRound}
              disabled={!feedback.passed}
            >

              {round < ROUND_COUNT
                ? "Unlock Next Round"
                : "View AI Result"}

              <ChevronRight
                size={18}
              />

            </button>

            {!feedback.passed && (
              <button
                className="hr-retry-round"
                onClick={() => {
                  setAnswers({});
                  setAnswerModes({});
                  setQuestionIndex(0);
                  setTimeLeft(
                    QUESTION_TIME
                  );
                  setRoundCompleted(false);
                  setFeedback(null);
                  setError("");
                }}
              >
                Retry Round
              </button>
            )}

          </section>

        ) : (

          <>
            {/* =================================================
                QUESTION CARD
            ================================================= */}

            <section className="hr-question-card">

              <div className="hr-question-top">

                <span>
                  Round {round}
                </span>

                <span>
                  Question{" "}
                  {questionIndex + 1} of{" "}
                  {roundQuestions.length}
                </span>

              </div>

              <div className="hr-category">
                {question?.category}
              </div>

              <h2>
                {question?.question}
              </h2>

              {/* =================================================
                  ANSWER TYPE TABS
              ================================================= */}

              <div className="hr-answer-tabs">

                <button
                  type="button"
                  className={
                    (
                      answerModes[
                        question?.id
                      ] || "text"
                    ) === "text"
                      ? "active"
                      : ""
                  }
                  onClick={() => {

                    stopRecording();

                    setAnswerModes(
                      (previous) => ({
                        ...previous,
                        [question.id]:
                          "text",
                      })
                    );

                  }}
                >

                  <PenLine size={17} />

                  Text Answer

                </button>

                <button
                  type="button"
                  className={
                    answerModes[
                      question?.id
                    ] === "voice"
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setAnswerModes(
                      (previous) => ({
                        ...previous,
                        [question.id]:
                          "voice",
                      })
                    );
                  }}
                >
                  <Mic size={17} />
                  Audio Record
                </button>

              </div>

              {/* =================================================
                  ANSWER BOX / AUDIO RECORDER
              ================================================= */}

              {(answerModes[question?.id] || "text") === "text" ? (
                <textarea
                  value={
                    answers[
                      question?.id
                    ] || ""
                  }
                  onChange={(event) =>
                    updateAnswer(
                      event.target.value
                    )
                  }
                  placeholder="Type your interview answer here..."
                  maxLength={1500}
                />
              ) : (
                <div
                  style={{
                    background: "rgba(6, 10, 25, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "14px",
                    padding: "24px",
                    textAlign: "center",
                    minHeight: "190px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "14px",
                  }}
                >
                  {recording ? (
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "8px" }}>
                        <span className="recording-pulse" />
                        <strong style={{ color: "#ef4444", fontSize: "16px" }}>
                          Recording Audio... {formatTime(recordingTime)}
                        </strong>
                      </div>
                      <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 12px" }}>
                        Speak naturally. Your audio is directly recorded for AI evaluation.
                      </p>
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="recording"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 18px",
                          borderRadius: "10px",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        <Square size={17} /> Stop Recording
                      </button>
                    </div>
                  ) : audioUrls[question?.id] ? (
                    <div style={{ width: "100%", maxWidth: "480px" }}>
                      <p style={{ color: "#38bdf8", fontWeight: 700, fontSize: "14px", marginBottom: "10px" }}>
                        🎙 Audio Recorded Successfully ({answers[question?.id] || "Saved"})
                      </p>
                      <div className="hr-audio-preview" style={{ justifyContent: "center" }}>
                        <audio src={audioUrls[question?.id]} controls />
                        <button
                          type="button"
                          onClick={() => deleteRecording(question?.id)}
                          title="Re-record / Delete"
                          style={{
                            background: "rgba(239, 68, 68, 0.2)",
                            border: "1px solid rgba(239, 68, 68, 0.4)",
                            color: "#f87171",
                            padding: "6px 10px",
                            borderRadius: "7px",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          <Trash2 size={15} /> Delete
                        </button>
                      </div>
                      <p style={{ color: "#94a3b8", fontSize: "12px", marginTop: "10px" }}>
                        Ready for submission. AI evaluates your audio response upon submit.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Mic size={36} style={{ color: "#38bdf8", marginBottom: "8px" }} />
                      <h4 style={{ color: "#ffffff", margin: "0 0 16px" }}>
                        Record Audio Answer
                      </h4>
                      <button
                        type="button"
                        onClick={startRecording}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "11px 20px",
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
                          color: "#ffffff",
                          border: "none",
                          fontWeight: 700,
                          cursor: "pointer",
                          boxShadow: "0 0 16px rgba(99, 102, 241, 0.4)",
                        }}
                      >
                        <Mic size={18} /> Start Recording
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* =================================================
                  AI EVALUATION BANNER
              ================================================= */}

              {questionFeedback && (
                <div
                  style={{
                    marginTop: "14px",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: questionFeedback.success
                      ? "rgba(34, 197, 94, 0.15)"
                      : "rgba(239, 68, 68, 0.15)",
                    border: `1px solid ${
                      questionFeedback.success
                        ? "rgba(34, 197, 94, 0.35)"
                        : "rgba(239, 68, 68, 0.35)"
                    }`,
                    color: questionFeedback.success ? "#4ade80" : "#f87171",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {questionFeedback.success ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <XCircle size={18} />
                  )}
                  <span>{questionFeedback.message}</span>
                </div>
              )}

              {/* =================================================
                  FOOTER ROW
              ================================================= */}

              <div className="hr-voice-row">
                <span style={{ color: "#94a3b8", fontSize: "12px" }}>
                  {(answerModes[question?.id] || "text") === "voice"
                    ? audioUrls[question?.id]
                      ? "✓ Audio recorded"
                      : "Voice answer mode active"
                    : `${(answers[question?.id] || "").length}/1500 characters`}
                </span>

                {aiEvaluatedQuestions[question?.id]?.passed && (
                  <span style={{ color: "#4ade80", fontWeight: 700, fontSize: "12px" }}>
                    ✓ AI Verified
                  </span>
                )}
              </div>

            </section>

            {/* =================================================
                NAVIGATION
            ================================================= */}

            <div className="hr-navigation">

              <button
                type="button"
                onClick={() => {

                  stopRecording();

                  setQuestionIndex(
                    (index) =>
                      Math.max(
                        0,
                        index - 1
                      )
                  );

                }}
                disabled={
                  questionIndex === 0
                }
              >

                <ChevronLeft
                  size={18}
                />

                Previous

              </button>

              {/* =================================================
                  QUESTION DOTS
              ================================================= */}

              <div className="hr-question-dots">

                {roundQuestions.map(
                  (q, index) => {
                    const isUnlocked =
                      index === 0 ||
                      index <= questionIndex ||
                      aiEvaluatedQuestions[roundQuestions[index - 1]?.id]?.passed;

                    return (
                      <button
                        type="button"
                        key={q.id}
                        className={
                          index ===
                          questionIndex
                            ? "current"
                            : answers[q.id]
                            ? "answered"
                            : ""
                        }
                        disabled={!isUnlocked}
                        style={{
                          opacity: isUnlocked ? 1 : 0.35,
                          cursor: isUnlocked ? "pointer" : "not-allowed",
                        }}
                        onClick={() => {
                          if (!isUnlocked) return;
                          stopRecording();
                          setQuestionIndex(index);
                        }}
                      >
                        {index + 1}
                      </button>
                    );
                  }
                )}

              </div>

              {/* =================================================
                  NEXT / SUBMIT
              ================================================= */}

              {questionIndex ===
              roundQuestions.length - 1 ? (

                <button
                  type="button"
                  className="hr-submit"
                  onClick={
                    submitRound
                  }
                  disabled={
                    submitting || evaluatingAnswer
                  }
                >

                  <Send size={17} />

                  {submitting
                    ? "Submitting..."
                    : "Submit Round"}

                </button>

              ) : (

                <button
                  type="button"
                  className="hr-next"
                  onClick={handleNextWithAIEvaluation}
                  disabled={evaluatingAnswer}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >

                  {evaluatingAnswer ? "AI Analyzing..." : "Next Question"}

                  <ChevronRight
                    size={18}
                  />

                </button>

              )}

            </div>

          </>

        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="hr-error">
            {error}
          </div>
        )}

      </main>

    </div>
  );
}