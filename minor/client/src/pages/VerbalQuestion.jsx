function VerbalQuestion({
  question,
  questionNumber,
  totalQuestions,
  answer,
  onAnswer,
}) {
  if (!question) {
    return (
      <div className="question-card">
        <div className="empty-question">
          <h2>No question available</h2>
          <p>Please check the verbal question data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="question-card">

      {/* QUESTION HEADER */}
      <div className="question-top">

        <span className="question-count">
          Question {questionNumber} of {totalQuestions}
        </span>

        {question.topic && (
          <span className="topic-badge">
            {question.topic}
          </span>
        )}

      </div>

      {/* QUESTION */}
      <h2 className="question-text">
        {question.question}
      </h2>

      {/* =====================================
          FILL IN THE BLANK
      ===================================== */}
      {question.type === "fill" && (
        <div className="fill-answer-section">

          <label htmlFor={`answer-${question.id}`}>
            Your Answer
          </label>

          <input
            id={`answer-${question.id}`}
            type="text"
            value={answer}
            onChange={(event) =>
              onAnswer(event.target.value)
            }
            placeholder="Type your answer here..."
            autoComplete="off"
          />

        </div>
      )}

      {/* =====================================
          MULTIPLE CHOICE
      ===================================== */}
      {question.type === "mcq" &&
        Array.isArray(question.options) && (
          <div className="options-section">

            {question.options.map((option, index) => {

              const letter = String.fromCharCode(65 + index);

              const selected = answer === option;

              return (
                <label
                  key={`${question.id}-${index}`}
                  className={`option-card ${
                    selected ? "selected" : ""
                  }`}
                >

                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={selected}
                    onChange={() => onAnswer(option)}
                  />

                  <span className="option-letter">
                    {letter}
                  </span>

                  <span className="option-text">
                    {option}
                  </span>

                </label>
              );
            })}

          </div>
        )}

    </div>
  );
}

export default VerbalQuestion;