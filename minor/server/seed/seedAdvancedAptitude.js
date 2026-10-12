import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Question from "../models/Question.js";

// ==========================================
// 100 ADVANCED APTITUDE QUESTIONS
// ==========================================

const advancedQuestions = [
  {
    id: 1,
    type: "mcq",
    topic: "Number System",
    question: "Find the remainder when 7^103 is divided by 13.",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },

  {
    id: 2,
    type: "mcq",
    topic: "Number System",
    question:
      "What is the smallest number that must be added to 9999 to make it divisible by 17?",
    options: ["1", "2", "3", "4"],
    answer: "1",
  },

  {
    id: 3,
    type: "mcq",
    topic: "Number System",
    question:
      "If N leaves remainder 5 when divided by 8, what remainder will 3N + 2 leave when divided by 8?",
    options: ["1", "5", "7", "0"],
    answer: "1",
  },

  {
    id: 4,
    type: "mcq",
    topic: "Number System",
    question:
      "The HCF of two numbers is 12 and their LCM is 420. If one number is 60, what is the other number?",
    options: ["72", "84", "96", "108"],
    answer: "84",
  },

  {
    id: 5,
    type: "mcq",
    topic: "Number System",
    question:
      "How many positive divisors does 360 have?",
    options: ["18", "20", "24", "30"],
    answer: "24",
  },

  {
    id: 6,
    type: "mcq",
    topic: "Number System",
    question:
      "What is the unit digit of 3^47 × 7^32?",
    options: ["1", "3", "7", "9"],
    answer: "1",
  },

  {
    id: 7,
    type: "mcq",
    topic: "Number System",
    question:
      "A number is divisible by 12 and 15. What is the smallest possible positive value of the number?",
    options: ["30", "45", "60", "90"],
    answer: "60",
  },

  {
    id: 8,
    type: "mcq",
    topic: "Number System",
    question:
      "If the product of two consecutive integers is 156, what is the larger integer?",
    options: ["12", "13", "14", "15"],
    answer: "13",
  },

  {
    id: 9,
    type: "mcq",
    topic: "Algebra",
    question:
      "If x + 1/x = 5, find x² + 1/x².",
    options: ["21", "23", "25", "27"],
    answer: "23",
  },

  {
    id: 10,
    type: "mcq",
    topic: "Algebra",
    question:
      "If x - 1/x = 3, find x² + 1/x².",
    options: ["7", "9", "11", "13"],
    answer: "11",
  },

  {
    id: 11,
    type: "mcq",
    topic: "Algebra",
    question:
      "If a + b = 12 and ab = 35, find a² + b².",
    options: ["64", "70", "74", "84"],
    answer: "74",
  },

  {
    id: 12,
    type: "mcq",
    topic: "Algebra",
    question:
      "If x + y = 10 and xy = 21, find x³ + y³.",
    options: ["610", "640", "670", "700"],
    answer: "670",
  },

  {
    id: 13,
    type: "mcq",
    topic: "Algebra",
    question:
      "If x² - 7x + 10 = 0, what is the sum of the reciprocals of its roots?",
    options: ["7/10", "5/7", "10/7", "7/5"],
    answer: "7/10",
  },

  {
    id: 14,
    type: "mcq",
    topic: "Algebra",
    question:
      "If 2x + 3y = 17 and x - y = 1, find x.",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },

  {
    id: 15,
    type: "mcq",
    topic: "Algebra",
    question:
      "If x² + y² = 50 and xy = 7, find (x + y)².",
    options: ["57", "64", "72", "78"],
    answer: "64",
  },

  {
    id: 16,
    type: "mcq",
    topic: "Algebra",
    question:
      "If a:b = 3:5 and b:c = 10:7, find a:c.",
    options: ["3:7", "6:7", "7:6", "5:7"],
    answer: "6:7",
  },

  {
    id: 17,
    type: "mcq",
    topic: "Percentages",
    question:
      "A number is increased by 20% and then decreased by 20%. What is the net percentage change?",
    options: [
      "0%",
      "2% decrease",
      "4% decrease",
      "4% increase",
    ],
    answer: "4% decrease",
  },

  {
    id: 18,
    type: "mcq",
    topic: "Percentages",
    question:
      "A salary is increased by 25%. By what percentage must the new salary be reduced to return to the original salary?",
    options: ["15%", "20%", "25%", "30%"],
    answer: "20%",
  },

  {
    id: 19,
    type: "mcq",
    topic: "Profit and Loss",
    question:
      "An article is marked 40% above cost price and sold after a 15% discount. What is the profit percentage?",
    options: ["15%", "19%", "21%", "25%"],
    answer: "19%",
  },

  {
    id: 20,
    type: "mcq",
    topic: "Profit and Loss",
    question:
      "A shopkeeper sells an article for ₹1,080 at a loss of 10%. What was its cost price?",
    options: ["₹1,100", "₹1,150", "₹1,200", "₹1,250"],
    answer: "₹1,200",
  },

  {
    id: 21,
    type: "mcq",
    topic: "Ratio",
    question:
      "Three numbers are in the ratio 2:3:5 and their sum is 160. What is the largest number?",
    options: ["60", "70", "80", "90"],
    answer: "80",
  },

  {
    id: 22,
    type: "mcq",
    topic: "Ratio",
    question:
      "A:B = 4:7 and B:C = 14:15. Find A:C.",
    options: ["4:15", "8:15", "14:15", "8:21"],
    answer: "8:15",
  },

  {
    id: 23,
    type: "mcq",
    topic: "Average",
    question:
      "The average of 8 numbers is 24. If one number 36 is replaced by 20, what is the new average?",
    options: ["20", "21", "22", "23"],
    answer: "22",
  },

  {
    id: 24,
    type: "mcq",
    topic: "Average",
    question:
      "The average age of 5 people is 28 years. If a new person joins them, the average becomes 30 years. What is the new person's age?",
    options: ["36", "38", "40", "42"],
    answer: "40",
  },

  {
    id: 25,
    type: "mcq",
    topic: "Simple Interest",
    question:
      "A sum becomes ₹6,600 in 2 years at 10% simple interest. Find the principal.",
    options: ["₹5,000", "₹5,200", "₹5,500", "₹6,000"],
    answer: "₹5,500",
  },

  {
    id: 26,
    type: "mcq",
    topic: "Compound Interest",
    question:
      "Find the compound interest on ₹10,000 at 10% per annum for 2 years.",
    options: ["₹2,000", "₹2,100", "₹2,200", "₹2,500"],
    answer: "₹2,100",
  },

  {
    id: 27,
    type: "mcq",
    topic: "Time and Work",
    question:
      "A can complete a job in 12 days and B in 18 days. How many days will they take together?",
    options: ["6.2 days", "7.2 days", "8 days", "9 days"],
    answer: "7.2 days",
  },

  {
    id: 28,
    type: "mcq",
    topic: "Time and Work",
    question:
      "A, B and C can complete a job in 10, 15 and 30 days respectively. How long will they take together?",
    options: ["4 days", "5 days", "6 days", "7 days"],
    answer: "5 days",
  },

  {
    id: 29,
    type: "mcq",
    topic: "Pipes and Cisterns",
    question:
      "Pipe A fills a tank in 12 hours and pipe B fills it in 18 hours. How long will they take together?",
    options: ["6.5 hours", "7.2 hours", "8 hours", "9 hours"],
    answer: "7.2 hours",
  },

  {
    id: 30,
    type: "mcq",
    topic: "Pipes and Cisterns",
    question:
      "A pipe fills a tank in 8 hours and a leak empties it in 24 hours. How long will the tank take to fill when both operate?",
    options: ["10 hours", "12 hours", "14 hours", "16 hours"],
    answer: "12 hours",
  },

  {
    id: 31,
    type: "mcq",
    topic: "Time Speed Distance",
    question:
      "A train travels 360 km in 4.5 hours. What is its average speed?",
    options: [
      "70 km/h",
      "75 km/h",
      "80 km/h",
      "85 km/h",
    ],
    answer: "80 km/h",
  },

  {
    id: 32,
    type: "mcq",
    topic: "Time Speed Distance",
    question:
      "A car travels half the distance at 40 km/h and the other half at 60 km/h. What is its average speed?",
    options: [
      "45 km/h",
      "48 km/h",
      "50 km/h",
      "52 km/h",
    ],
    answer: "48 km/h",
  },

  {
    id: 33,
    type: "mcq",
    topic: "Trains",
    question:
      "A train 180 m long crosses a pole in 12 seconds. What is its speed?",
    options: [
      "45 km/h",
      "54 km/h",
      "60 km/h",
      "72 km/h",
    ],
    answer: "54 km/h",
  },

  {
    id: 34,
    type: "mcq",
    topic: "Trains",
    question:
      "A 150 m train crosses a 250 m platform in 20 seconds. What is the speed of the train?",
    options: [
      "60 km/h",
      "72 km/h",
      "80 km/h",
      "90 km/h",
    ],
    answer: "72 km/h",
  },

  {
    id: 35,
    type: "mcq",
    topic: "Mixtures",
    question:
      "A 40-liter mixture contains milk and water in the ratio 3:1. How much water must be added to make the ratio 3:2?",
    options: ["10 L", "12 L", "15 L", "20 L"],
    answer: "10 L",
  },

  {
    id: 36,
    type: "mcq",
    topic: "Mixtures",
    question:
      "A 60-liter mixture contains 40% water. How much water must be removed and replaced with milk to make water 25%?",
    options: ["15 L", "20 L", "22.5 L", "25 L"],
    answer: "22.5 L",
  },

  {
    id: 37,
    type: "mcq",
    topic: "Permutation and Combination",
    question:
      "How many different arrangements can be made using all letters of the word LEVEL?",
    options: ["20", "30", "40", "60"],
    answer: "30",
  },

  {
    id: 38,
    type: "mcq",
    topic: "Permutation and Combination",
    question:
      "In how many ways can 5 people be arranged in a row?",
    options: ["60", "100", "120", "150"],
    answer: "120",
  },

  {
    id: 39,
    type: "mcq",
    topic: "Permutation and Combination",
    question:
      "How many 3-digit numbers can be formed using 1,2,3,4,5 without repetition?",
    options: ["40", "50", "60", "75"],
    answer: "60",
  },

  {
    id: 40,
    type: "mcq",
    topic: "Probability",
    question:
      "Two fair dice are thrown. What is the probability that the sum is 9?",
    options: ["1/12", "1/9", "1/6", "1/8"],
    answer: "1/9",
  },

  {
    id: 41,
    type: "mcq",
    topic: "Probability",
    question:
      "A bag contains 5 red and 3 blue balls. One ball is selected at random. What is the probability of selecting a blue ball?",
    options: ["3/5", "3/8", "5/8", "1/2"],
    answer: "3/8",
  },

  {
    id: 42,
    type: "mcq",
    topic: "Probability",
    question:
      "Three coins are tossed. What is the probability of getting exactly two heads?",
    options: ["1/8", "3/8", "1/2", "5/8"],
    answer: "3/8",
  },

  {
    id: 43,
    type: "mcq",
    topic: "Geometry",
    question:
      "The angles of a triangle are in the ratio 2:3:4. What is the largest angle?",
    options: ["60°", "70°", "80°", "90°"],
    answer: "80°",
  },

  {
    id: 44,
    type: "mcq",
    topic: "Geometry",
    question:
      "A circle has radius 14 cm. What is its area using π = 22/7?",
    options: [
      "616 cm²",
      "628 cm²",
      "644 cm²",
      "672 cm²",
    ],
    answer: "616 cm²",
  },

  {
    id: 45,
    type: "mcq",
    topic: "Mensuration",
    question:
      "A rectangular box has dimensions 12 cm × 8 cm × 5 cm. What is its volume?",
    options: [
      "420 cm³",
      "480 cm³",
      "520 cm³",
      "560 cm³",
    ],
    answer: "480 cm³",
  },

  {
    id: 46,
    type: "mcq",
    topic: "Data Interpretation",
    question:
      "A company's sales increase from ₹8 lakh to ₹10 lakh. What is the percentage increase?",
    options: ["20%", "25%", "30%", "35%"],
    answer: "25%",
  },

  {
    id: 47,
    type: "mcq",
    topic: "Data Interpretation",
    question:
      "A population increases from 80,000 to 92,000. What is the percentage increase?",
    options: ["12%", "15%", "18%", "20%"],
    answer: "15%",
  },

  {
    id: 48,
    type: "mcq",
    topic: "Data Interpretation",
    question:
      "A company has 1,200 employees. If 35% are women, how many men are there?",
    options: ["720", "780", "820", "850"],
    answer: "780",
  },

  {
    id: 49,
    type: "mcq",
    topic: "Advanced Arithmetic",
    question:
      "The difference between compound interest and simple interest on ₹20,000 at 10% per annum for 2 years is:",
    options: ["₹100", "₹150", "₹200", "₹250"],
    answer: "₹200",
  },

  {
    id: 50,
    type: "mcq",
    topic: "Advanced Arithmetic",
    question:
      "A number is first divided by 2, then multiplied by 3, and finally increased by 8 to get 35. What was the number?",
    options: ["16", "18", "20", "22"],
    answer: "18",
  },

  {
    id: 51,
    type: "mcq",
    topic: "Reasoning",
    question:
      "Find the next number: 4, 9, 19, 39, 79, ?",
    options: ["149", "159", "169", "179"],
    answer: "159",
  },

  {
    id: 52,
    type: "mcq",
    topic: "Reasoning",
    question:
      "Find the next number: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    answer: "42",
  },

  {
    id: 53,
    type: "mcq",
    topic: "Reasoning",
    question:
      "Find the missing number: 3, 8, 18, 38, 78, ?",
    options: ["148", "158", "168", "178"],
    answer: "158",
  },

  {
    id: 54,
    type: "mcq",
    topic: "Coding-Decoding",
    question:
      "If CAT is coded as DBU, how is TIGER coded using the same pattern?",
    options: ["UJHFS", "UJHFR", "TJHFS", "VJHFS"],
    answer: "UJHFS",
  },

  {
    id: 55,
    type: "mcq",
    topic: "Coding-Decoding",
    question:
      "If each letter is replaced by the next letter in the alphabet, how is LOGIC coded?",
    options: ["MPHJD", "MPHIC", "NPHJD", "LOHJD"],
    answer: "MPHJD",
  },

  {
    id: 56,
    type: "mcq",
    topic: "Blood Relations",
    question:
      "Pointing to a man, Ravi said, 'He is the son of my mother's only daughter.' How is the man related to Ravi?",
    options: ["Brother", "Son", "Nephew", "Cousin"],
    answer: "Nephew",
  },

  {
    id: 57,
    type: "mcq",
    topic: "Blood Relations",
    question:
      "A woman says, 'The man in the photograph is the only son of my father's only son.' Who is the man to the woman?",
    options: ["Brother", "Son", "Nephew", "Father"],
    answer: "Nephew",
  },

  {
    id: 58,
    type: "mcq",
    topic: "Direction Sense",
    question:
      "A person walks 8 km north, then 6 km east, then 8 km south. How far is the person from the starting point?",
    options: ["4 km", "6 km", "8 km", "10 km"],
    answer: "6 km",
  },

  {
    id: 59,
    type: "mcq",
    topic: "Ranking",
    question:
      "In a class, Priya ranks 12th from the top and 18th from the bottom. How many students are in the class?",
    options: ["28", "29", "30", "31"],
    answer: "29",
  },

  {
    id: 60,
    type: "mcq",
    topic: "Odd One Out",
    question:
      "Which number does not belong to the group?",
    options: ["121", "144", "169", "250"],
    answer: "250",
  },

  {
    id: 61,
    type: "mcq",
    topic: "Syllogism",
    question:
      "Statements: All engineers are graduates. Some graduates are researchers. Which conclusion definitely follows?",
    options: [
      "All engineers are researchers",
      "Some researchers are engineers",
      "All engineers are graduates",
      "No graduate is an engineer",
    ],
    answer: "All engineers are graduates",
  },

  {
    id: 62,
    type: "mcq",
    topic: "Syllogism",
    question:
      "Statements: All roses are flowers. No flower is a stone. Which conclusion follows?",
    options: [
      "No rose is a stone",
      "Some roses are stones",
      "All stones are roses",
      "Some flowers are stones",
    ],
    answer: "No rose is a stone",
  },

  {
    id: 63,
    type: "mcq",
    topic: "Statement and Conclusion",
    question:
      "Statement: Regular exercise improves physical fitness. Which conclusion is logically valid?",
    options: [
      "Only athletes should exercise",
      "Regular exercise can improve fitness",
      "Exercise guarantees perfect health",
      "Fitness is impossible without exercise",
    ],
    answer: "Regular exercise can improve fitness",
  },

  {
    id: 64,
    type: "mcq",
    topic: "Alphabet Reasoning",
    question:
      "If the letters of the word COMPUTER are arranged alphabetically, which letter will be fourth?",
    options: ["E", "M", "O", "P"],
    answer: "O",
  },

  {
    id: 65,
    type: "mcq",
    topic: "Alphabet Reasoning",
    question:
      "How many pairs of letters are there in the word EDUCATION that have the same number of letters between them as in the English alphabet?",
    options: ["1", "2", "3", "4"],
    answer: "2",
  },

  {
    id: 66,
    type: "mcq",
    topic: "Logical Reasoning",
    question:
      "If A is taller than B, B is taller than C, and D is taller than A, who is the tallest?",
    options: ["A", "B", "C", "D"],
    answer: "D",
  },

  {
    id: 67,
    type: "mcq",
    topic: "Logical Reasoning",
    question:
      "Five people P, Q, R, S and T stand in a line. P is before Q, R is after Q, S is before P, and T is after R. Who is first?",
    options: ["P", "Q", "S", "T"],
    answer: "S",
  },

  {
    id: 68,
    type: "mcq",
    topic: "Logical Reasoning",
    question:
      "Five students A, B, C, D and E sit in a row. A sits immediately left of B. C sits immediately right of D. E sits at the extreme left. Which arrangement is possible?",
    options: [
      "E A B D C",
      "A B E D C",
      "E B A D C",
      "E A D C B",
    ],
    answer: "E A B D C",
  },

  {
    id: 69,
    type: "mcq",
    topic: "Logical Reasoning",
    question:
      "A clock gains 5 minutes every hour. If it is set correctly at 8:00 AM, what time will it show at 2:00 PM?",
    options: ["2:20 PM", "2:25 PM", "2:30 PM", "2:35 PM"],
    answer: "2:30 PM",
  },

  {
    id: 70,
    type: "mcq",
    topic: "Calendar Reasoning",
    question:
      "If January 1 is a Monday in a non-leap year, what day will March 1 be?",
    options: ["Wednesday", "Thursday", "Friday", "Saturday"],
    answer: "Thursday",
  },

  {
    id: 71,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "Four people A, B, C and D sit around a square table. A sits opposite C. B sits opposite D. If A is facing north, which direction is C facing?",
    options: ["North", "South", "East", "West"],
    answer: "South",
  },

  {
    id: 72,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "Four friends P, Q, R and S have different heights. P is taller than Q. R is shorter than Q. S is taller than P. Who is the shortest?",
    options: ["P", "Q", "R", "S"],
    answer: "R",
  },

  {
    id: 73,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "Five boxes A, B, C, D and E are stacked vertically. A is above B, C is below D, E is above A, and D is above E. Which box is at the top?",
    options: ["A", "B", "D", "E"],
    answer: "D",
  },

  {
    id: 74,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "Five meetings P, Q, R, S and T are scheduled from Monday to Friday, one per day. P is before R. Q is on Wednesday. S is immediately after P. If T is Friday, on which day is P?",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    answer: "Monday",
  },

  {
    id: 75,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "Three people A, B and C make statements. A says B is lying. B says C is lying. C says both A and B are lying. If exactly one person tells the truth, who is truthful?",
    options: ["A", "B", "C", "Cannot determine"],
    answer: "B",
  },

  {
    id: 76,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "There are three switches outside a room and three bulbs inside. Each switch controls one bulb. You may enter the room only once. Which method identifies all switches?",
    options: [
      "Turn all switches on and enter",
      "Turn one on, wait, turn it off, turn another on, then enter",
      "Turn all switches off and enter",
      "Turn two switches on and enter immediately",
    ],
    answer:
      "Turn one on, wait, turn it off, turn another on, then enter",
  },

  {
    id: 77,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "There are 8 identical-looking balls, one of which is heavier. Using a balance scale, what is the minimum number of weighings required to guarantee finding the heavier ball?",
    options: ["1", "2", "3", "4"],
    answer: "2",
  },

  {
    id: 78,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "You have 10 coins, exactly one is lighter than the others. Using a balance scale, what is the minimum number of weighings needed to guarantee finding it?",
    options: ["2", "3", "4", "5"],
    answer: "3",
  },

  {
    id: 79,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "A farmer must take a fox, chicken and bag of grain across a river. The boat carries the farmer and only one item. What should he take first?",
    options: ["Fox", "Chicken", "Grain", "Any item"],
    answer: "Chicken",
  },

  {
    id: 80,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "A man has two ropes. Each rope takes exactly one hour to burn, but burns unevenly. How can he measure exactly 45 minutes?",
    options: [
      "Burn one rope from one end",
      "Burn both ropes from one end",
      "Burn one rope from both ends and the other from one end",
      "Burn both ropes from both ends",
    ],
    answer:
      "Burn one rope from both ends and the other from one end",
  },

  {
    id: 81,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "A room contains 100 lockers numbered 1 to 100. Every locker is toggled by students whose numbers divide the locker number. Which lockers remain open?",
    options: [
      "Prime-numbered lockers",
      "Even-numbered lockers",
      "Perfect-square-numbered lockers",
      "All odd-numbered lockers",
    ],
    answer: "Perfect-square-numbered lockers",
  },

  {
    id: 82,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "A tournament has 8 teams. Each team plays every other team exactly once. How many matches are played?",
    options: ["24", "28", "32", "56"],
    answer: "28",
  },

  {
    id: 83,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "Six people A, B, C, D, E and F sit in a row. A is left of B, C is right of B, D is left of A, E is right of C, and F is between A and C. Who is third?",
    options: ["A", "B", "C", "F"],
    answer: "B",
  },

  {
    id: 84,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "A person faces north. He turns 90° clockwise, then 180° anticlockwise, then 90° clockwise. Which direction is he facing?",
    options: ["North", "South", "East", "West"],
    answer: "North",
  },

  {
    id: 85,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "Four books P, Q, R and S are arranged on a shelf. P is not first. Q is to the left of R. S is to the right of P. Which arrangement is possible?",
    options: [
      "Q R P S",
      "P Q R S",
      "Q S R P",
      "R Q P S",
    ],
    answer: "Q R P S",
  },

  {
    id: 86,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "A family has three children. Each child is either a boy or girl. What is the probability that exactly two are girls, assuming all outcomes are equally likely?",
    options: ["1/8", "3/8", "1/2", "5/8"],
    answer: "3/8",
  },

  {
    id: 87,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "A number is missing from the sequence: 1, 4, 10, 22, 46, ?",
    options: ["82", "90", "94", "96"],
    answer: "94",
  },

  {
    id: 88,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "If all laptops are machines and some machines are expensive, which statement is definitely true?",
    options: [
      "All laptops are machines",
      "All machines are laptops",
      "All laptops are expensive",
      "Some laptops are expensive",
    ],
    answer: "All laptops are machines",
  },

  {
    id: 89,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "A train leaves station A at 9:00 AM at 60 km/h. Another train leaves station B at 10:00 AM toward A at 80 km/h. If the stations are 300 km apart, at what time do they meet?",
    options: [
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
    ],
    answer: "12:00 PM",
  },

  {
    id: 90,
    type: "mcq",
    topic: "Logical Puzzle",
    question:
      "A person has ₹1, ₹2 and ₹5 coins. In how many ways can ₹10 be formed using exactly four coins?",
    options: ["2", "3", "4", "5"],
    answer: "2",
  },

  {
    id: 91,
    type: "mcq",
    topic: "Reasoning",
    question:
      "Find the missing term: AZ, BY, CX, DW, ?",
    options: ["EV", "EU", "FV", "EW"],
    answer: "EV",
  },

  {
    id: 92,
    type: "mcq",
    topic: "Reasoning",
    question:
      "Find the next pair: AB, DE, HI, MN, ?",
    options: ["RS", "ST", "QR", "TU"],
    answer: "ST",
  },

  {
    id: 93,
    type: "mcq",
    topic: "Reasoning",
    question:
      "If 1 = 3, 2 = 6, 3 = 11, 4 = 18, then 5 = ?",
    options: ["23", "25", "27", "29"],
    answer: "27",
  },

  {
    id: 94,
    type: "mcq",
    topic: "Reasoning",
    question:
      "A is older than B. C is younger than B. D is older than A. E is younger than C. Who is second oldest?",
    options: ["A", "B", "C", "D"],
    answer: "A",
  },

  {
    id: 95,
    type: "mcq",
    topic: "Reasoning",
    question:
      "If MONDAY is coded as 123456, then what is the code for DAY?",
    options: ["456", "345", "156", "246"],
    answer: "456",
  },

  {
    id: 96,
    type: "mcq",
    topic: "Reasoning",
    question:
      "Which number should replace the question mark? 5, 11, 23, 47, ?",
    options: ["91", "93", "95", "97"],
    answer: "95",
  },

  {
    id: 97,
    type: "mcq",
    topic: "Reasoning",
    question:
      "If SOUTH is written as TPVUI, how is NORTH written?",
    options: ["OPSUI", "OPSTI", "OPRUI", "NPSUI"],
    answer: "OPSUI",
  },

  {
    id: 98,
    type: "mcq",
    topic: "Logical Reasoning",
    question:
      "A, B, C and D each have a different favorite color: red, blue, green and yellow. A does not like red or blue. B likes green. C does not like yellow. Which color can A like?",
    options: ["Red", "Blue", "Green", "Yellow"],
    answer: "Yellow",
  },

  {
    id: 99,
    type: "mcq",
    topic: "Logical Reasoning",
    question:
      "Four people have ages 18, 21, 24 and 27. A is older than B but younger than C. D is younger than B. Who is 24 years old?",
    options: ["A", "B", "C", "D"],
    answer: "A",
  },

  {
    id: 100,
    type: "mcq",
    topic: "Logical Reasoning",
    question:
      "A box contains 4 red, 5 blue and 6 green balls. What is the minimum number of balls that must be drawn without looking to guarantee getting two balls of the same color?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
];

// ==========================================
// SEED ADVANCED APTITUDE QUESTIONS
// ==========================================

const seedAdvancedQuestions = async () => {
  try {
    await connectDB();

    console.log(
      "Connected to MongoDB."
    );

    // Remove previous Advanced Aptitude
    // questions so duplicates are avoided.
    await Question.deleteMany({
      category: "aptitude",
      section: "advanced",
    });

    console.log(
      "Old Advanced Aptitude questions removed."
    );

    // Convert frontend format
    // into MongoDB format.
   const questionsToInsert =
  advancedQuestions.map((item) => ({
    category: "aptitude",

    section: "advanced",

    topic: item.topic || "",

    language: null,

    difficulty: "advanced",

    type: item.type,

    question: item.question,

    options: item.options,

    answer: item.answer,

    explanation: "",

    testCases: [],
  }));

    // Insert all 100 questions.
    await Question.insertMany(
      questionsToInsert
    );

    console.log(
      `${questionsToInsert.length} Advanced Aptitude questions inserted successfully.`
    );

    // Verify count
    const count =
      await Question.countDocuments({
        category: "aptitude",
        section: "advanced",
      });

    console.log(
      `Advanced Aptitude questions in database: ${count}`
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Advanced Aptitude seed error:",
      error
    );

    process.exit(1);
  }
};

seedAdvancedQuestions();