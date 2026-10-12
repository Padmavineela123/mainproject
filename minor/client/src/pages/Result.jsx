import { useEffect, useMemo, useState } from "react";

import {
  Trophy,
  Target,
  Brain,
  Code2,
  UserRound,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Lightbulb,
  BriefcaseBusiness,
  Bot,
} from "lucide-react";

import "./Result.css";


/* =========================================================
   API
   ========================================================= */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


/* =========================================================
   GET LEVEL
   ========================================================= */

function getLevel(score) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good Progress";
  if (score >= 50) return "Needs Practice";

  return "Needs Strong Preparation";
}


/* =========================================================
   ROUND FEEDBACK
   ========================================================= */

function getFeedback(round, score) {

  if (round === "Aptitude") {

    if (score >= 85) {
      return {
        strengths: [
          "Strong aptitude problem-solving ability",
          "Good accuracy in test questions",
          "Good performance under time pressure",
        ],
        improve: [
          "Continue practicing advanced aptitude",
          "Maintain accuracy in difficult questions",
        ],
        topics: [
          "Advanced Quantitative Aptitude",
          "Logical Reasoning",
          "Data Interpretation",
          "Probability",
          "Permutation and Combination",
        ],
      };
    }

    if (score >= 70) {
      return {
        strengths: [
          "Good understanding of aptitude fundamentals",
          "Can solve standard placement questions",
          "Good basic problem-solving approach",
        ],
        improve: [
          "Improve calculation speed",
          "Reduce mistakes in time-bound questions",
          "Practice advanced reasoning questions",
        ],
        topics: [
          "Percentages",
          "Profit and Loss",
          "Time, Speed and Distance",
          "Probability",
          "Logical Reasoning",
          "Data Interpretation",
        ],
      };
    }

    if (score >= 50) {
      return {
        strengths: [
          "Basic aptitude concepts are developing",
          "Shows potential to improve through practice",
        ],
        improve: [
          "Strengthen fundamental aptitude concepts",
          "Improve calculation speed",
          "Practice more questions with a timer",
          "Work on reasoning accuracy",
        ],
        topics: [
          "Number Systems",
          "Percentages",
          "Ratio and Proportion",
          "Averages",
          "Time and Work",
          "Logical Reasoning",
        ],
      };
    }

    return {
      strengths: [
        "Beginning to build aptitude fundamentals",
      ],
      improve: [
        "Strengthen basic mathematical concepts",
        "Practice aptitude questions regularly",
        "Improve calculation accuracy",
        "Practice with a time limit",
      ],
      topics: [
        "Number Systems",
        "Basic Arithmetic",
        "Percentages",
        "Ratio and Proportion",
        "Averages",
        "Basic Reasoning",
      ],
    };
  }


  if (round === "Verbal") {
    if (score >= 80) {
      return {
        strengths: ["Strong vocabulary and verbal reasoning", "Good accuracy under time pressure"],
        improve: ["Continue advanced grammar practice", "Review unfamiliar vocabulary"],
        topics: ["Vocabulary", "Grammar", "Sentence Completion", "Verbal Reasoning"],
      };
    }
    if (score >= 60) {
      return {
        strengths: ["Good verbal fundamentals", "Can handle common placement verbal questions"],
        improve: ["Improve vocabulary range", "Practice grammar and sentence completion"],
        topics: ["Vocabulary", "Grammar", "Sentence Completion"],
      };
    }
    return {
      strengths: ["Building a foundation in verbal skills"],
      improve: ["Strengthen vocabulary", "Practice grammar regularly", "Improve reading and comprehension speed"],
      topics: ["Vocabulary", "Grammar", "Comprehension", "Verbal Reasoning"],
    };
  }


  if (round === "Technical") {

    if (score >= 85) {
      return {
        strengths: [
          "Strong programming fundamentals",
          "Good technical concept understanding",
          "Good technical interview preparation",
        ],
        improve: [
          "Practice more complex interview problems",
          "Improve explanation of technical solutions",
        ],
        topics: [
          "Advanced Programming",
          "Complexity Analysis",
          "Object-Oriented Programming",
          "Technical Interview Problems",
        ],
      };
    }

    if (score >= 70) {
      return {
        strengths: [
          "Good programming fundamentals",
          "Understands common technical concepts",
          "Can approach standard interview questions",
        ],
        improve: [
          "Strengthen programming problem-solving",
          "Improve programming fundamentals",
          "Practice explaining solutions clearly",
          "Improve time-complexity knowledge",
        ],
        topics: [
          "Arrays and Strings",
          "Linked Lists",
          "Stacks and Queues",
          "Trees and Graphs",
          "Sorting and Searching",
          "OOP Concepts",
          "Time and Space Complexity",
        ],
      };
    }

    if (score >= 50) {
      return {
        strengths: [
          "Basic programming knowledge is present",
          "Has a foundation for further technical practice",
        ],
        improve: [
          "Strengthen C, Java and Python concepts",
          "Improve coding problem-solving",
          "Strengthen OOP concepts",
          "Practice technical questions regularly",
        ],
        topics: [
          "Programming Fundamentals",
          "Arrays",
          "Strings",
          "Functions",
          "OOP",
          "Searching and Sorting",
        ],
      };
    }

    return {
      strengths: [
        "Beginning to build programming fundamentals",
      ],
      improve: [
        "Start with programming fundamentals",
        "Practice basic programming questions",
        "Strengthen C, Java and Python basics",
        "Improve technical concept understanding",
      ],
      topics: [
        "Variables and Data Types",
        "Conditions and Loops",
        "Functions",
        "Arrays",
        "Strings",
        "Basic OOP",
      ],
    };
  }


  if (round === "Coding") {

    if (score >= 85) {
      return {
        strengths: [
          "Strong coding problem-solving ability",
          "Good programming logic",
          "Good coding accuracy",
        ],
        improve: [
          "Practice more advanced coding problems",
          "Improve solution efficiency",
        ],
        topics: [
          "Advanced Algorithms",
          "Optimization",
          "Complexity Analysis",
          "Problem Solving",
        ],
      };
    }

    if (score >= 70) {
      return {
        strengths: [
          "Good coding fundamentals",
          "Can solve standard coding problems",
          "Good programming logic",
        ],
        improve: [
          "Improve coding speed",
          "Practice more difficult problems",
          "Review inefficient solutions",
        ],
        topics: [
          "Arrays",
          "Strings",
          "Searching",
          "Sorting",
          "Recursion",
          "Algorithms",
        ],
      };
    }

    if (score >= 50) {
      return {
        strengths: [
          "Basic coding foundation is developing",
          "Shows potential through practice",
        ],
        improve: [
          "Practice coding problems regularly",
          "Strengthen programming logic",
          "Improve problem-solving approach",
        ],
        topics: [
          "Programming Basics",
          "Arrays",
          "Strings",
          "Loops",
          "Functions",
          "Basic Algorithms",
        ],
      };
    }

    return {
      strengths: [
        "Beginning to develop coding skills",
      ],
      improve: [
        "Start with basic coding problems",
        "Practice programming fundamentals",
        "Improve logical thinking",
        "Practice coding with a time limit",
      ],
      topics: [
        "Variables",
        "Conditions",
        "Loops",
        "Functions",
        "Arrays",
        "Basic Programming",
      ],
    };
  }


  if (round === "HR Interview") {

    if (score >= 85) {
      return {
        strengths: [
          "Strong communication",
          "Good answer structure",
          "Professional interview approach",
        ],
        improve: [
          "Practice company-specific HR questions",
          "Prepare concise behavioral examples",
        ],
        topics: [
          "Leadership Examples",
          "Teamwork",
          "Conflict Resolution",
          "Company-Specific Questions",
        ],
      };
    }

    if (score >= 70) {
      return {
        strengths: [
          "Good communication skills",
          "Can handle common HR questions",
          "Shows professional attitude",
        ],
        improve: [
          "Make answers more structured",
          "Use examples from projects",
          "Improve confidence while answering",
          "Avoid generic answers",
        ],
        topics: [
          "Self Introduction",
          "Strengths and Weaknesses",
          "Project Explanation",
          "Teamwork",
          "Conflict Management",
          "Situational Questions",
        ],
      };
    }

    if (score >= 50) {
      return {
        strengths: [
          "Basic communication foundation",
          "Willingness to practice interview questions",
        ],
        improve: [
          "Improve communication confidence",
          "Prepare a stronger self-introduction",
          "Practice behavioral questions",
          "Use real project examples",
        ],
        topics: [
          "Self Introduction",
          "Strengths and Weaknesses",
          "Project Explanation",
          "Teamwork",
          "Leadership",
          "Situational Questions",
        ],
      };
    }

    return {
      strengths: [
        "Beginning to develop interview communication",
      ],
      improve: [
        "Practice speaking confidently",
        "Prepare self-introduction",
        "Practice common HR questions",
        "Use structured answers",
      ],
      topics: [
        "Self Introduction",
        "Strengths and Weaknesses",
        "Academic Projects",
        "Teamwork",
        "Career Goals",
        "Common HR Questions",
      ],
    };
  }

  return {
    strengths: [],
    improve: [],
    topics: [],
  };
}


/* =========================================================
   RESULT COMPONENT
   ========================================================= */

function Result() {

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =======================================================
     FETCH RESULTS FROM BACKEND
     ======================================================= */

  useEffect(() => {

    const fetchResults = async () => {

      try {

        const token =
          localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }


        const response = await fetch(
          `${API_URL}/api/tests/history`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const data = await response.json();


        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to fetch test results"
          );
        }


        setResults(
          Array.isArray(data.results)
            ? data.results
            : []
        );

      } catch (err) {

        console.error(
          "Result fetch error:",
          err
        );

        setError(
          err.message ||
            "Unable to load results"
        );

      } finally {

        setLoading(false);

      }
    };


    fetchResults();

  }, []);


  /* =======================================================
     FIND LATEST RESULT FOR EACH ROUND
     ======================================================= */

  const latestResults = useMemo(() => {

    const latest = {
      aptitude: null,
      verbal: null,
      technical: null,
      coding: null,
      hr: null,
    };


    /*
      Results are returned newest first
      from the backend.
    */

    for (const result of results) {

      const category =
        String(
          result.category || ""
        ).toLowerCase();

      const section =
        String(
          result.section || ""
        ).toLowerCase();


      // -------------------------------
      // APTITUDE
      // -------------------------------

      if (
        category === "aptitude" &&
        !latest.aptitude
      ) {
        latest.aptitude = result;
      }


      // -------------------------------
      // VERBAL
      // -------------------------------

      if (
        category === "verbal" &&
        !latest.verbal
      ) {
        latest.verbal = result;
      }


      // -------------------------------
      // TECHNICAL
      // -------------------------------

      /*
        DSA is intentionally NOT shown
        as a separate Result section.

        Therefore, if an old/new DSA
        result exists, it is not used
        as the Technical score.
      */

      if (
        category === "technical" &&
        section !== "dsa" &&
        !latest.technical
      ) {
        latest.technical = result;
      }


      // -------------------------------
      // CODING
      // -------------------------------

      if (
        category === "coding" &&
        !latest.coding
      ) {
        latest.coding = result;
      }


      // -------------------------------
      // HR
      // -------------------------------

      if (
        category === "hr" &&
        !latest.hr
      ) {
        latest.hr = result;
      }

    }


    return latest;

  }, [results]);


  /* =======================================================
     ROUND DATA
     ======================================================= */

  const rounds = useMemo(() => {

    return [
      {
        name: "Aptitude",
        result: latestResults.aptitude,
        score:
          latestResults.aptitude
            ? Number(
                latestResults.aptitude.percentage
              )
            : 0,
        icon: Brain,
        colorClass: "aptitude",
      },

      {
        name: "Verbal",
        result: latestResults.verbal,
        score:
          latestResults.verbal
            ? Number(latestResults.verbal.percentage)
            : 0,
        icon: MessageSquare,
        colorClass: "verbal",
      },

      {
        name: "Technical",
        result: latestResults.technical,
        score:
          latestResults.technical
            ? Number(
                latestResults.technical.percentage
              )
            : 0,
        icon: Code2,
        colorClass: "technical",
      },

      {
        name: "Coding",
        result: latestResults.coding,
        score:
          latestResults.coding
            ? Number(
                latestResults.coding.percentage
              )
            : 0,
        icon: Code2,
        colorClass: "coding",
      },

      {
        name: "HR Interview",
        result: latestResults.hr,
        score:
          latestResults.hr
            ? Number(
                latestResults.hr.percentage
              )
            : 0,
        icon: UserRound,
        colorClass: "hr",
      },
    ];

  }, [latestResults]);


  /* =======================================================
     COMPLETED ROUNDS
     ======================================================= */

  const completedRounds =
    rounds.filter(
      (round) =>
        round.result !== null
    );


  /* =======================================================
     OVERALL SCORE
     ======================================================= */

  const overallScore = useMemo(() => {

    if (
      completedRounds.length === 0
    ) {
      return 0;
    }


    const total =
      completedRounds.reduce(
        (sum, round) =>
          sum + round.score,
        0
      );


    return Math.round(
      total /
        completedRounds.length
    );

  }, [results]);


  /* =======================================================
     FEEDBACK
     ======================================================= */

  const allFeedback =
    completedRounds.map(
      (round) => ({
        ...round,

        feedback:
          getFeedback(
            round.name,
            round.score
          ),
      })
    );


  const strengths = [
    ...new Set(
      allFeedback.flatMap(
        (round) =>
          round.feedback.strengths
      )
    ),
  ];


  const improvements = [
    ...new Set(
      allFeedback.flatMap(
        (round) =>
          round.feedback.improve
      )
    ),
  ];


  const topics = [
    ...new Set(
      allFeedback.flatMap(
        (round) =>
          round.feedback.topics
      )
    ),
  ];


  /* =======================================================
     PREPARATION STAGE
     ======================================================= */

  let preparationStage =
    "Not Started";

  let stageMessage =
    "Complete at least one interview round to receive your personalized preparation stage.";


  if (
    completedRounds.length > 0
  ) {

    if (overallScore >= 85) {

      preparationStage =
        "Interview Ready";

      stageMessage =
        "Your current performance shows strong preparation. Continue practicing advanced interview problems.";

    } else if (
      overallScore >= 70
    ) {

      preparationStage =
        "Placement Preparation";

      stageMessage =
        "You have a good foundation. Focus on your weak areas and continue regular practice.";

    } else if (
      overallScore >= 50
    ) {

      preparationStage =
        "Skill Building";

      stageMessage =
        "Your fundamentals are developing. Strengthen your weak topics through consistent practice.";

    } else {

      preparationStage =
        "Foundation Building";

      stageMessage =
        "Start by strengthening your fundamentals and gradually increase the difficulty of your practice.";

    }

  }


  /* =======================================================
     LOADING
     ======================================================= */

  if (loading) {

    return (
      <div className="result-page">

        <header className="result-header">

          <div className="result-header-left">

            <button
              className="result-back-btn"
              onClick={() => {
                window.location.href =
                  "/dashboard";
              }}
            >
              <ArrowLeft size={20} />
            </button>

            <div>

              <div className="result-brand">
                AI Interview Prep
              </div>

              <div className="result-header-title">
                Performance Result
              </div>

            </div>

          </div>

          <div className="result-header-user">{(() => { try { return JSON.parse(localStorage.getItem("user") || "null")?.email || "Student"; } catch { return "Student"; } })()}</div>
          <div className="result-header-icon">
            <Trophy size={26} />
          </div>

        </header>


        <main className="result-container">

          <section className="result-hero">

            <div className="result-hero-content">

              <span className="result-small-title">
                LOADING RESULTS
              </span>

              <h1>
                Loading your performance...
              </h1>

              <p>
                Fetching your latest results from the server.
              </p>

            </div>

          </section>

        </main>

      </div>
    );

  }


  /* =======================================================
     ERROR
     ======================================================= */

  if (error) {

    return (
      <div className="result-page">

        <header className="result-header">

          <div className="result-header-left">

            <button
              className="result-back-btn"
              onClick={() => {
                window.location.href =
                  "/dashboard";
              }}
            >
              <ArrowLeft size={20} />
            </button>

            <div>

              <div className="result-brand">
                AI Interview Prep
              </div>

              <div className="result-header-title">
                Performance Result
              </div>

            </div>

          </div>

          <div className="result-header-user">{(() => { try { return JSON.parse(localStorage.getItem("user") || "null")?.email || "Student"; } catch { return "Student"; } })()}</div>
          <div className="result-header-icon">
            <Trophy size={26} />
          </div>

        </header>


        <main className="result-container">

          <section className="result-hero">

            <div className="result-hero-content">

              <span className="result-small-title">
                RESULT ERROR
              </span>

              <h1>
                Unable to load results
              </h1>

              <p>
                {error}
              </p>

            </div>

          </section>

        </main>

      </div>
    );

  }


  /* =======================================================
     MAIN RESULT PAGE
     ======================================================= */

  return (
    <div className="result-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="result-header">

        <div className="result-header-left">

          <button
            className="result-back-btn"
            onClick={() => {
              window.location.href =
                "/dashboard";
            }}
          >
            <ArrowLeft size={20} />
          </button>


          <div>

            <div className="result-brand">
              AI Interview Prep
            </div>

            <div className="result-header-title">
              Performance Result
            </div>

          </div>

        </div>


        <div className="result-header-icon">
          <Trophy size={26} />
        </div>

      </header>


      <main className="result-container">


        {/* =================================================
            HERO
        ================================================= */}

        <section className="result-hero">

          <div className="result-trophy">
            <Trophy size={42} />
          </div>


          <div className="result-hero-content">

            <span className="result-small-title">
              PERSONALIZED INTERVIEW REPORT
            </span>

            <h1>
              Your Performance Result
            </h1>

            <p>
              Your result is calculated from the interview
              tests you have completed.
            </p>

          </div>


          <div className="overall-score">

            <div
              className="score-circle"
              style={{
                "--score":
                  `${overallScore}%`,
              }}
            >

              <div className="score-circle-inner">

                <strong>
                  {overallScore}%
                </strong>

                <span>
                  Overall
                </span>

              </div>

            </div>


            <div className="overall-level">
              {preparationStage}
            </div>

          </div>

        </section>


        {/* =================================================
            ROUND ANALYSIS
        ================================================= */}

        <section className="result-section">

          <div className="section-heading">

            <div>

              <span>
                ROUND PERFORMANCE
              </span>

              <h2>
                Your Test Results
              </h2>

            </div>


            <div className="section-heading-icon">
              <TrendingUp size={22} />
            </div>

          </div>


          <div className="round-result-grid">

            {rounds.map((round) => {

              const Icon =
                round.icon;

              const completed =
                round.result !== null;


              return (

                <div
                  className={`round-result-card ${round.colorClass}`}
                  key={round.name}
                >

                  <div className="round-result-top">

                    <div className="round-result-icon">
                      <Icon size={25} />
                    </div>

                    <div>

                      <h3>
                        {round.name}
                      </h3>

                      <span>
                        {completed
                          ? getLevel(
                              round.score
                            )
                          : "Not Completed"}
                      </span>

                    </div>

                  </div>


                  <div className="round-score-row">

                    <strong>
                      {completed
                        ? `${round.score}%`
                        : "--"}
                    </strong>

                    <span>
                      {completed
                        ? `${round.result.correct} / ${round.result.totalQuestions}`
                        : "Test not completed"}
                    </span>

                  </div>


                  <div className="round-progress">

                    <div
                      className="round-progress-fill"
                      style={{
                        width:
                          `${round.score}%`,
                      }}
                    />

                  </div>


                  <div className="round-card-bottom">

                    <span>
                      Performance
                    </span>

                    <span>
                      {completed
                        ? getLevel(
                            round.score
                          )
                        : "Pending"}
                    </span>

                  </div>

                </div>

              );

            })}

          </div>

        </section>


        {/* =================================================
            SUMMARY
        ================================================= */}

        <section className="summary-grid">

          <div className="summary-card">

            <div className="summary-icon success">
              <CheckCircle2 size={24} />
            </div>

            <div>

              <span>
                Strong Areas
              </span>

              <strong>
                {strengths.length}
              </strong>

              <p>
                Skills showing good progress
              </p>

            </div>

          </div>


          <div className="summary-card">

            <div className="summary-icon warning">
              <AlertTriangle size={24} />
            </div>

            <div>

              <span>
                Improvement Areas
              </span>

              <strong>
                {improvements.length}
              </strong>

              <p>
                Skills requiring more practice
              </p>

            </div>

          </div>


          <div className="summary-card">

            <div className="summary-icon topic">
              <BookOpen size={24} />
            </div>

            <div>

              <span>
                Topics to Cover
              </span>

              <strong>
                {topics.length}
              </strong>

              <p>
                Recommended preparation topics
              </p>

            </div>

          </div>

        </section>


        {/* =================================================
            AI FEEDBACK
        ================================================= */}

        <section className="ai-feedback-section">

          <div className="ai-feedback-header">

            <div className="ai-icon">
              <Sparkles size={25} />
            </div>

            <div>

              <span>
                AI PERFORMANCE ANALYSIS
              </span>

              <h2>
                Personalized AI Feedback
              </h2>

            </div>

          </div>


          <div className="ai-feedback-intro">

            <Bot size={21} />

            <p>
              {completedRounds.length === 0
                ? "Complete an interview test to receive personalized feedback."
                : stageMessage}
            </p>

          </div>

          <div className="ai-analyzer-strip">
            <Sparkles size={20} />
            <div><strong>AI Feedback Analyzer</strong>
              The analyzer compares your completed round scores, identifies lower-scoring skills, and turns them into focused improvement actions. Your Areas to Improve below are updated from the completed tests shown on this page.
            </div>
          </div>


          <div className="feedback-columns">


            {/* STRENGTHS */}

            <div className="feedback-box strengths-box">

              <div className="feedback-box-title">

                <CheckCircle2 size={21} />

                <h3>
                  Your Strengths
                </h3>

              </div>


              <ul>

                {strengths.length > 0 ? (

                  strengths
                    .slice(0, 8)
                    .map(
                      (item, index) => (

                        <li key={index}>

                          <span className="bullet success-bullet">
                            ✓
                          </span>

                          {item}

                        </li>

                      )
                    )

                ) : (

                  <li>
                    Complete a test to identify your strengths.
                  </li>

                )}

              </ul>

            </div>


            {/* IMPROVEMENTS */}

            <div className="feedback-box improvement-box">

              <div className="feedback-box-title">

                <AlertTriangle size={21} />

                <h3>
                  Areas to Improve
                </h3>

              </div>


              <ul>

                {improvements.length > 0 ? (

                  improvements
                    .slice(0, 10)
                    .map(
                      (item, index) => (

                        <li key={index}>

                          <span className="bullet warning-bullet">
                            !
                          </span>

                          {item}

                        </li>

                      )
                    )

                ) : (

                  <li>
                    Complete a test to identify areas for improvement.
                  </li>

                )}

              </ul>

            </div>

          </div>

        </section>


        {/* =================================================
            TOPICS
        ================================================= */}

        <section className="topics-section">

          <div className="topics-header">

            <div className="topics-icon">
              <BookOpen size={24} />
            </div>

            <div>

              <span>
                RECOMMENDED PREPARATION
              </span>

              <h2>
                Topics You Should Cover
              </h2>

            </div>

          </div>


          <p className="topics-description">
            These recommendations are generated according
            to the areas that need more preparation.
          </p>


          <div className="topic-list">

            {topics.length > 0 ? (

              topics.map(
                (topic, index) => (

                  <div
                    className="topic-item"
                    key={index}
                  >

                    <div className="topic-number">
                      {index + 1}
                    </div>


                    <div className="topic-content">

                      <strong>
                        {topic}
                      </strong>

                      <span>
                        Recommended based on your test performance
                      </span>

                    </div>


                    <Target size={19} />

                  </div>

                )
              )

            ) : (

              <div className="topic-item">

                <div className="topic-content">

                  <strong>
                    Complete a test first
                  </strong>

                  <span>
                    Your personalized topics will appear here.
                  </span>

                </div>

              </div>

            )}

          </div>

        </section>


        {/* =================================================
            PREPARATION STAGE
        ================================================= */}

        <section className="placement-section">

          <div className="placement-icon">
            <BriefcaseBusiness size={28} />
          </div>


          <div className="placement-content">

            <span>
              CURRENT PREPARATION STAGE
            </span>

            <h2>
              {preparationStage}
            </h2>

            <p>
              {stageMessage}
            </p>


            <div className="placement-tips">

              <div>
                <Lightbulb size={19} />
                <span>
                  Practice weak areas
                </span>
              </div>

              <div>
                <Code2 size={19} />
                <span>
                  Improve coding skills
                </span>
              </div>

              <div>
                <UserRound size={19} />
                <span>
                  Practice HR answers
                </span>
              </div>

              <div>
                <TrendingUp size={19} />
                <span>
                  Retake tests regularly
                </span>
              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            BUTTONS
        ================================================= */}

        <section className="result-actions">

          <button
            className="result-action secondary"
            onClick={() => {
              window.location.href =
                "/dashboard";
            }}
          >
            <ArrowLeft size={18} />

            Back to Dashboard
          </button>


          <button
            className="result-action primary"
            onClick={() => {
              window.location.href =
                "/aptitude";
            }}
          >
            <RotateCcw size={18} />

            Practice Again
          </button>

        </section>

      </main>

    </div>
  );
}

export default Result;