const hrQuestions = [
  // =====================================================
  // INTRODUCTION & PERSONAL
  // =====================================================

  {
    id: 1,
    category: "Introduction",
    question:
      "Tell me about yourself."
  },
  {
    id: 2,
    category: "Introduction",
    question:
      "You have just graduated and are attending your first interview. How would you introduce yourself confidently?"
  },
  {
    id: 3,
    category: "Introduction",
    question:
      "What are your three strongest qualities, and how have you demonstrated them during college?"
  },
  {
    id: 4,
    category: "Introduction",
    question:
      "What is one weakness you identified in yourself and what are you doing to improve it?"
  },
  {
    id: 5,
    category: "Introduction",
    question:
      "Why did you choose your degree or engineering branch?"
  },
  {
    id: 6,
    category: "Introduction",
    question:
      "Why are you interested in starting your career with our organization?"
  },
  {
    id: 7,
    category: "Introduction",
    question:
      "What are your short-term career goals as a fresher?"
  },
  {
    id: 8,
    category: "Introduction",
    question:
      "Where do you see yourself professionally after five years?"
  },
  {
    id: 9,
    category: "Introduction",
    question:
      "What motivates you when you are learning something difficult for the first time?"
  },
  {
    id: 10,
    category: "Introduction",
    question:
      "If you had to describe yourself using three words, what would they be and why?"
  },

  // =====================================================
  // COLLEGE & ACADEMIC SITUATIONS
  // =====================================================

  {
    id: 11,
    category: "College Situation",
    question:
      "Tell me about a difficult academic subject you faced and how you managed to understand it."
  },
  {
    id: 12,
    category: "College Situation",
    question:
      "Suppose you receive poor marks in an important subject. What would you do next?"
  },
  {
    id: 13,
    category: "College Situation",
    question:
      "You have an exam tomorrow but several topics are still incomplete. How would you manage the situation?"
  },
  {
    id: 14,
    category: "College Situation",
    question:
      "Tell me about a time when you had to learn a completely new topic quickly."
  },
  {
    id: 15,
    category: "College Situation",
    question:
      "Suppose your professor gives you an assignment with very little time. How would you approach it?"
  },
  {
    id: 16,
    category: "College Situation",
    question:
      "Tell me about a time when you received negative feedback from a professor."
  },
  {
    id: 17,
    category: "College Situation",
    question:
      "If you disagree with your professor's feedback on your work, how would you respond?"
  },
  {
    id: 18,
    category: "College Situation",
    question:
      "Describe a situation where you had to balance academics with another responsibility."
  },
  {
    id: 19,
    category: "College Situation",
    question:
      "Suppose you are struggling with a subject while your classmates understand it easily. What would you do?"
  },
  {
    id: 20,
    category: "College Situation",
    question:
      "What is one academic failure that taught you an important lesson?"
  },

  // =====================================================
  // PROJECT SITUATIONS
  // =====================================================

  {
    id: 21,
    category: "Project",
    question:
      "Explain your major project and describe your specific contribution to it."
  },
  {
    id: 22,
    category: "Project",
    question:
      "Suppose your project is due tomorrow and an important feature is not working. What would you do?"
  },
  {
    id: 23,
    category: "Project",
    question:
      "Tell me about a technical problem you faced while working on your project."
  },
  {
    id: 24,
    category: "Project",
    question:
      "If your project team cannot agree on the technology to use, how would you help reach a decision?"
  },
  {
    id: 25,
    category: "Project",
    question:
      "Suppose one member of your project team is not completing their assigned work. How would you handle it?"
  },
  {
    id: 26,
    category: "Project",
    question:
      "Tell me about a mistake you made during a project and how you corrected it."
  },
  {
    id: 27,
    category: "Project",
    question:
      "If your project guide rejects your initial idea, how would you respond?"
  },
  {
    id: 28,
    category: "Project",
    question:
      "Suppose you discover a major bug just before your project demonstration. What would you do?"
  },
  {
    id: 29,
    category: "Project",
    question:
      "How would you explain your technical project to a non-technical interviewer?"
  },
  {
    id: 30,
    category: "Project",
    question:
      "What would you do if you realized that your project approach was wrong halfway through development?"
  },

  // =====================================================
  // TEAMWORK
  // =====================================================

  {
    id: 31,
    category: "Teamwork",
    question:
      "Tell me about a time when you worked as part of a team."
  },
  {
    id: 32,
    category: "Teamwork",
    question:
      "Suppose two members of your team have a disagreement and the project is getting delayed. What would you do?"
  },
  {
    id: 33,
    category: "Teamwork",
    question:
      "What would you do if your team leader assigned you a task you did not know how to perform?"
  },
  {
    id: 34,
    category: "Teamwork",
    question:
      "Suppose a teammate takes credit for work you completed. How would you handle the situation?"
  },
  {
    id: 35,
    category: "Teamwork",
    question:
      "Tell me about a time when you helped a teammate who was struggling."
  },
  {
    id: 36,
    category: "Teamwork",
    question:
      "What would you do if your teammate repeatedly missed deadlines?"
  },
  {
    id: 37,
    category: "Teamwork",
    question:
      "Suppose you strongly disagree with the team's final decision. How would you respond?"
  },
  {
    id: 38,
    category: "Teamwork",
    question:
      "How would you contribute to a team if you are the newest and least experienced member?"
  },
  {
    id: 39,
    category: "Teamwork",
    question:
      "Tell me about a situation where you had to cooperate with someone whose working style was different from yours."
  },
  {
    id: 40,
    category: "Teamwork",
    question:
      "If your team fails to complete a project on time, how would you take responsibility?"
  },

  // =====================================================
  // COMMUNICATION
  // =====================================================

  {
    id: 41,
    category: "Communication",
    question:
      "Tell me about a situation where you had difficulty communicating an idea."
  },
  {
    id: 42,
    category: "Communication",
    question:
      "Suppose an interviewer asks you a question and you do not understand it. What would you do?"
  },
  {
    id: 43,
    category: "Communication",
    question:
      "How would you communicate a technical problem to a manager who does not have a technical background?"
  },
  {
    id: 44,
    category: "Communication",
    question:
      "Suppose you make a mistake in an email sent to your manager. What would you do?"
  },
  {
    id: 45,
    category: "Communication",
    question:
      "Tell me about a time when you had to give a presentation in front of a group."
  },
  {
    id: 46,
    category: "Communication",
    question:
      "What would you do if you became nervous while giving an important presentation?"
  },
  {
    id: 47,
    category: "Communication",
    question:
      "Suppose a teammate misunderstands your instructions and makes a mistake. How would you handle it?"
  },
  {
    id: 48,
    category: "Communication",
    question:
      "How would you respond if someone interrupted you repeatedly during a discussion?"
  },
  {
    id: 49,
    category: "Communication",
    question:
      "Tell me about a time when you changed your communication style to work effectively with someone."
  },
  {
    id: 50,
    category: "Communication",
    question:
      "What would you do if you were asked to explain something immediately but you were not fully prepared?"
  },

  // =====================================================
  // DEADLINES & TIME MANAGEMENT
  // =====================================================

  {
    id: 51,
    category: "Time Management",
    question:
      "Suppose you receive three important tasks with the same deadline. How would you prioritize them?"
  },
  {
    id: 52,
    category: "Time Management",
    question:
      "Tell me about a time when you had to complete something under a tight deadline."
  },
  {
    id: 53,
    category: "Time Management",
    question:
      "What would you do if you realize that you cannot complete your assigned task before the deadline?"
  },
  {
    id: 54,
    category: "Time Management",
    question:
      "Suppose your manager gives you an urgent task while you are already working on another important task. What would you do?"
  },
  {
    id: 55,
    category: "Time Management",
    question:
      "How do you decide which task should be completed first?"
  },
  {
    id: 56,
    category: "Time Management",
    question:
      "Tell me about a time when poor time management caused a problem and what you learned from it."
  },
  {
    id: 57,
    category: "Time Management",
    question:
      "Suppose you have only one day to prepare for an important presentation. How would you plan your time?"
  },
  {
    id: 58,
    category: "Time Management",
    question:
      "What would you do if a teammate's delay affects your own deadline?"
  },
  {
    id: 59,
    category: "Time Management",
    question:
      "How would you handle multiple assignments during your first month at a company?"
  },
  {
    id: 60,
    category: "Time Management",
    question:
      "Suppose you are given a task that normally takes two days but you have only one day. How would you approach it?"
  },

  // =====================================================
  // FAILURE & PROBLEM SOLVING
  // =====================================================

  {
    id: 61,
    category: "Problem Solving",
    question:
      "Tell me about a time when something you planned did not work as expected."
  },
  {
    id: 62,
    category: "Problem Solving",
    question:
      "Suppose you cannot find the solution to a technical problem after trying several approaches. What would you do?"
  },
  {
    id: 63,
    category: "Problem Solving",
    question:
      "Tell me about a failure and explain what you learned from it."
  },
  {
    id: 64,
    category: "Problem Solving",
    question:
      "What would you do if you discovered that you had misunderstood the requirements of a task?"
  },
  {
    id: 65,
    category: "Problem Solving",
    question:
      "Suppose your first solution works but is inefficient. What would you do?"
  },
  {
    id: 66,
    category: "Problem Solving",
    question:
      "Tell me about a time when you solved a problem without someone giving you the solution."
  },
  {
    id: 67,
    category: "Problem Solving",
    question:
      "Suppose an application you developed suddenly stops working before a demonstration. How would you investigate it?"
  },
  {
    id: 68,
    category: "Problem Solving",
    question:
      "What would you do if you received incomplete information about an important task?"
  },
  {
    id: 69,
    category: "Problem Solving",
    question:
      "Tell me about a difficult decision you had to make during college."
  },
  {
    id: 70,
    category: "Problem Solving",
    question:
      "Suppose your solution fails during testing even though it worked with your initial examples. What would you do?"
  },

  // =====================================================
  // WORKPLACE FRESHER SITUATIONS
  // =====================================================

  {
    id: 71,
    category: "Workplace",
    question:
      "Imagine this is your first day at the company and you do not know anyone. How would you start building professional relationships?"
  },
  {
    id: 72,
    category: "Workplace",
    question:
      "Suppose you are given a task by your manager but the instructions are unclear. What would you do?"
  },
  {
    id: 73,
    category: "Workplace",
    question:
      "If you make a mistake during your first month at work, how would you respond?"
  },
  {
    id: 74,
    category: "Workplace",
    question:
      "Suppose your manager gives you critical feedback in front of your teammates. How would you react?"
  },
  {
    id: 75,
    category: "Workplace",
    question:
      "What would you do if you received two different instructions from two senior employees?"
  },
  {
    id: 76,
    category: "Workplace",
    question:
      "Suppose your manager asks you to learn a technology you have never used. How would you approach it?"
  },
  {
    id: 77,
    category: "Workplace",
    question:
      "What would you do if you finish your assigned work earlier than expected?"
  },
  {
    id: 78,
    category: "Workplace",
    question:
      "Suppose your manager is unavailable and you face a blocker on an urgent task. What would you do?"
  },
  {
    id: 79,
    category: "Workplace",
    question:
      "How would you handle a situation where you disagree with a senior colleague's approach?"
  },
  {
    id: 80,
    category: "Workplace",
    question:
      "Suppose you are asked to work with a teammate you have never worked with before. How would you begin?"
  },

  // =====================================================
  // ADAPTABILITY & LEARNING
  // =====================================================

  {
    id: 81,
    category: "Adaptability",
    question:
      "Tell me about a situation where you had to adapt to a sudden change."
  },
  {
    id: 82,
    category: "Adaptability",
    question:
      "Suppose your company changes the technology used by your team. How would you adapt?"
  },
  {
    id: 83,
    category: "Adaptability",
    question:
      "What would you do if you were moved to a completely different project?"
  },
  {
    id: 84,
    category: "Adaptability",
    question:
      "Tell me about a time when you had to learn something outside your academic syllabus."
  },
  {
    id: 85,
    category: "Adaptability",
    question:
      "Suppose you are assigned a role that was not what you expected. How would you handle it?"
  },
  {
    id: 86,
    category: "Adaptability",
    question:
      "What would you do if your first approach to learning a new technology was not working?"
  },
  {
    id: 87,
    category: "Adaptability",
    question:
      "How would you react if your responsibilities changed suddenly?"
  },
  {
    id: 88,
    category: "Adaptability",
    question:
      "Tell me about a situation where you had to come out of your comfort zone."
  },
  {
    id: 89,
    category: "Adaptability",
    question:
      "Suppose you are asked to work with people from different backgrounds. How would you adapt?"
  },
  {
    id: 90,
    category: "Adaptability",
    question:
      "What would you do if the requirements of your assigned task changed at the last minute?"
  },

  // =====================================================
  // BEHAVIORAL & ETHICAL SITUATIONS
  // =====================================================

  {
    id: 91,
    category: "Behavioral",
    question:
      "Suppose you notice a teammate using someone else's work without giving credit. What would you do?"
  },
  {
    id: 92,
    category: "Behavioral",
    question:
      "What would you do if you noticed a mistake in a report that your team was about to submit?"
  },
  {
    id: 93,
    category: "Behavioral",
    question:
      "Suppose your friend asks you to share confidential information from your workplace. How would you respond?"
  },
  {
    id: 94,
    category: "Behavioral",
    question:
      "Tell me about a situation where you had to take responsibility for something that went wrong."
  },
  {
    id: 95,
    category: "Behavioral",
    question:
      "What would you do if you disagreed with an important decision made by your team?"
  },
  {
    id: 96,
    category: "Behavioral",
    question:
      "Suppose you are given a task that you believe is unfairly assigned to you. How would you handle it professionally?"
  },
  {
    id: 97,
    category: "Behavioral",
    question:
      "Tell me about a situation where you helped someone even though it was not your responsibility."
  },
  {
    id: 98,
    category: "Behavioral",
    question:
      "Suppose you realize that your own mistake caused your team to lose time. What would you do?"
  },
  {
    id: 99,
    category: "Behavioral",
    question:
      "What would you do if a teammate asked you to hide a mistake from the manager?"
  },
  {
    id: 100,
    category: "Behavioral",
    question:
      "Imagine you are selected for your first job. What professional habits would you build during your first six months?"
  }
];

export default hrQuestions;