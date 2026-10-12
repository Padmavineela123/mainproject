/*
=========================================================
CODING PROBLEM BANK
=========================================================

Total Problems:
Easy       = 20
Medium     = 20
Difficult  = 20
Advanced   = 20

Total      = 80

Languages:
C
Java
Python
=========================================================
*/

const makeStarterCode = (language, title) => {
  if (language === "C") {
    return `#include <stdio.h>

int main() {
    // ${title}
    // Write your solution here

    return 0;
}`;
  }

  if (language === "Java") {
    return `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // ${title}
        // Write your solution here
    }
}`;
  }

  return `# ${title}

# Write your solution here
`;
};


/* =====================================================
   TEST CASES
===================================================== */

const cases = {

  /* =====================================================
     EASY
  ===================================================== */

  "Reverse a Number": [
    ["12345", "54321"],
    ["100", "1"]
  ],

  "Check Palindrome Number": [
    ["121", "Palindrome"],
    ["123", "Not Palindrome"]
  ],

  "Check Prime Number": [
    ["17", "Prime"],
    ["10", "Not Prime"]
  ],

  "Fibonacci Series": [
    ["7", "0 1 1 2 3 5 8"],
    ["5", "0 1 1 2 3"]
  ],

  "Factorial of a Number": [
    ["5", "120"],
    ["0", "1"]
  ],

  "Sum of Digits": [
    ["12345", "15"],
    ["908", "17"]
  ],

  "Armstrong Number": [
    ["153", "Armstrong"],
    ["123", "Not Armstrong"]
  ],

  "GCD of Two Numbers": [
    ["48 18", "6"],
    ["20 8", "4"]
  ],

  "Largest Element in Array": [
    ["5\n4 8 1 9 2", "9"],
    ["4\n7 3 6 2", "7"]
  ],

  "Linear Search": [
    ["5\n10 20 30 40 50\n40", "3"],
    ["4\n5 8 2 9\n7", "-1"]
  ],

  "Reverse a String": [
    ["hello", "olleh"],
    ["Interview", "weivretnI"]
  ],

  "Count Vowels and Consonants": [
    ["hello", "2 3"],
    ["education", "5 4"]
  ],

  "Decimal to Binary": [
    ["10", "1010"],
    ["7", "111"]
  ],

  "Count Set Bits": [
    ["15", "4"],
    ["8", "1"]
  ],

  "Right Triangle Star Pattern": [
    ["4", "*\n**\n***\n****"],
    ["3", "*\n**\n***"]
  ],

  "Sum of Array Elements": [
    ["5\n1 2 3 4 5", "15"],
    ["4\n10 20 30 40", "100"]
  ],

  "Count Even and Odd Numbers": [
    ["5\n1 2 3 4 5", "2 3"],
    ["6\n2 4 6 1 3 5", "3 3"]
  ],

  "Find Minimum Element in Array": [
    ["5\n8 3 9 1 6", "1"],
    ["4\n7 4 2 5", "2"]
  ],

  "Swap Two Numbers": [
    ["10 20", "20 10"],
    ["5 8", "8 5"]
  ],

  "Multiplication Table": [
    ["5", "5 10 15 20 25 30 35 40 45 50"],
    ["3", "3 6 9 12 15 18 21 24 27 30"]
  ],


  /* =====================================================
     MEDIUM
  ===================================================== */

  "Two Sum": [
    ["4\n2 7 11 15\n9", "0 1"],
    ["4\n3 2 4 8\n6", "1 2"]
  ],

  "Move Zeroes": [
    ["5\n0 1 0 3 12", "1 3 12 0 0"],
    ["4\n0 0 1 2", "1 2 0 0"]
  ],

  "Rotate Array by K": [
    ["5\n1 2 3 4 5\n2", "4 5 1 2 3"],
    ["6\n1 2 3 4 5 6\n3", "4 5 6 1 2 3"]
  ],

  "Maximum Subarray Sum": [
    ["8\n-2 -3 4 -1 -2 1 5 -3", "7"],
    ["5\n-2 1 -3 4 5", "9"]
  ],

  "Merge Two Sorted Arrays": [
    ["3\n1 3 5\n3\n2 4 6", "1 2 3 4 5 6"],
    ["2\n1 4\n3\n2 3 5", "1 2 3 4 5"]
  ],

  "Majority Element": [
    ["7\n2 2 1 1 1 2 2", "2"],
    ["5\n3 3 4 3 2", "3"]
  ],

  "Missing Number": [
    ["5\n0 1 3 4 5", "2"],
    ["4\n0 1 2 4", "3"]
  ],

  "Sort 0s 1s and 2s": [
    ["6\n2 0 2 1 1 0", "0 0 1 1 2 2"],
    ["5\n2 1 0 2 1", "0 1 1 2 2"]
  ],

  "Best Time to Buy and Sell Stock": [
    ["6\n7 1 5 3 6 4", "5"],
    ["5\n7 6 4 3 1", "0"]
  ],

  "Valid Parentheses": [
    ["()[]{}", "true"],
    ["([)]", "false"]
  ],

  "Binary Search": [
    ["5\n1 2 3 4 5\n4", "3"],
    ["6\n2 4 6 8 10 12\n7", "-1"]
  ],

  "Climbing Stairs": [
    ["5", "8"],
    ["3", "3"]
  ],

  "Floyd Triangle Pattern": [
    ["4", "1\n2 3\n4 5 6\n7 8 9 10"],
    ["3", "1\n2 3\n4 5 6"]
  ],

  "Pascal Triangle Pattern": [
    ["4", "1\n1 1\n1 2 1\n1 3 3 1"],
    ["3", "1\n1 1\n1 2 1"]
  ],

  "Number Triangle Pattern": [
    ["4", "1\n12\n123\n1234"],
    ["3", "1\n12\n123"]
  ],

  "Second Largest Element": [
    ["5\n10 5 8 20 15", "15"],
    ["4\n7 3 9 5", "7"]
  ],

  "Frequency of Array Elements": [
    ["5\n1 2 2 3 1", "1:2 2:2 3:1"],
    ["6\n4 4 4 2 2 5", "2:2 4:3 5:1"]
  ],

  "Intersection of Two Arrays": [
    ["4\n1 2 2 1\n4\n2 2 3 1", "1 2"],
    ["3\n4 9 5\n3\n9 4 9", "4 9"]
  ],

  "Remove Duplicates from Sorted Array": [
    ["5\n1 1 2 2 3", "1 2 3"],
    ["6\n0 0 1 1 2 2", "0 1 2"]
  ],


  /* =====================================================
     DIFFICULT
  ===================================================== */

  "Longest Substring Without Repeating Characters": [
    ["abcabcbb", "3"],
    ["bbbbb", "1"]
  ],

  "Longest Palindromic Substring": [
    ["babad", "bab"],
    ["cbbd", "bb"]
  ],

  "Minimum Window Substring": [
    ["ADOBECODEBANC\nABC", "BANC"],
    ["a\na", "a"]
  ],

  "Edit Distance": [
    ["horse\nros", "3"],
    ["intention\nexecution", "5"]
  ],

  "Longest Increasing Subsequence": [
    ["8\n10 9 2 5 3 7 101 18", "4"],
    ["6\n0 1 0 3 2 3", "4"]
  ],

  "Maximum Product Subarray": [
    ["4\n2 3 -2 4", "6"],
    ["3\n-2 0 -1", "0"]
  ],

  "Trapping Rain Water": [
    ["6\n4 2 0 3 2 5", "9"],
    ["6\n0 1 0 2 1 0", "2"]
  ],

  "Container With Most Water": [
    ["9\n1 8 6 2 5 4 8 3 7", "49"],
    ["4\n1 2 1 3", "3"]
  ],

  "Sliding Window Maximum": [
    ["8\n1 3 -1 -3 5 3 6 7\n3", "3 3 5 5 6 7"],
    ["5\n1 3 -1 -3 5\n2", "3 3 -1 5"]
  ],

  "Kth Largest Element": [
    ["6\n3 2 1 5 6 4\n2", "5"],
    ["5\n3 2 3 1 2\n3", "2"]
  ],

  "N Queens": [
    ["4", "2"],
    ["1", "1"]
  ],

  "Generate All Permutations": [
    ["abc", "abc\nacb\nbac\nbca\ncab\ncba"],
    ["ab", "ab\nba"]
  ],

  "Hollow Diamond Pattern": [
    ["5", "  *\n * *\n*   *\n * *\n  *"],
    ["3", " *\n* *\n *"]
  ],

  "Butterfly Pattern": [
    ["3", "*    *\n**  **\n******\n**  **\n*    *"],
    ["2", "*  *\n****\n*  *"]
  ],

  "3Sum": [
    ["6\n-1 0 1 2 -1 -4", "-1 -1 2\n-1 0 1"],
    ["5\n0 0 0 0 0", "0 0 0"]
  ],

  "Merge Intervals": [
    ["4\n1 3\n2 6\n8 10\n15 18", "1 6\n8 10\n15 18"],
    ["2\n1 4\n4 5", "1 5"]
  ],

  "Top K Frequent Elements": [
    ["6\n1 1 1 2 2 3\n2", "1 2"],
    ["7\n4 4 4 2 2 3 3\n2", "4 2"]
  ],

  "Product of Array Except Self": [
    ["4\n1 2 3 4", "24 12 8 6"],
    ["5\n-1 1 0 -3 3", "0 0 9 0 0"]
  ],

  "Combination Sum": [
    ["4\n2 3 6 7\n7", "2 2 3\n7"],
    ["3\n2 3 5\n8", "2 2 2 2\n2 3 3\n3 5"]
  ],

  "Word Search": [
    ["3 4\nABCE\nSFCS\nADEE\nABCCED", "true"],
    ["3 4\nABCE\nSFCS\nADEE\nABCB", "false"]
  ],


  /* =====================================================
     ADVANCED
  ===================================================== */

  "Dijkstra Shortest Path": [
    ["4 5\n0 1 4\n0 2 1\n2 1 2\n1 3 1\n2 3 5\n0", "0 3 1 4"],
    ["3 3\n0 1 2\n1 2 3\n0 2 10\n0", "0 2 5"]
  ],

  "Bellman Ford Algorithm": [
    ["5 8\n0 1 -1\n0 2 4\n1 2 3\n1 3 2\n1 4 2\n3 2 5\n3 1 1\n4 3 -3\n0", "0 -1 2 -2 1"],
    ["3 3\n0 1 5\n1 2 3\n0 2 10\n0", "0 5 8"]
  ],

  "Floyd Warshall Algorithm": [
    ["3\n0 5 100\n100 0 3\n2 100 0", "0 5 8\n5 0 3\n2 7 0"],
    ["4\n0 3 100 7\n8 0 2 100\n5 100 0 1\n2 100 100 0", "0 3 5 6\n5 0 2 3\n3 6 0 1\n2 5 7 0"]
  ],

  "Kruskal Minimum Spanning Tree": [
    ["4 5\n0 1 10\n0 2 6\n0 3 5\n1 3 15\n2 3 4", "19"],
    ["3 3\n0 1 1\n1 2 2\n0 2 3", "3"]
  ],

  "Prim Minimum Spanning Tree": [
    ["4 5\n0 1 10\n0 2 6\n0 3 5\n1 3 15\n2 3 4", "19"],
    ["3 3\n0 1 1\n1 2 2\n0 2 3", "3"]
  ],

  "Longest Common Subsequence": [
    ["abcde\nace", "3"],
    ["abc\nabc", "3"]
  ],

  "0/1 Knapsack": [
    ["3\n10 20 30\n60 100 120\n50", "220"],
    ["3\n1 2 3\n6 10 12\n5", "22"]
  ],

  "Coin Change": [
    ["3\n1 2 5\n11", "3"],
    ["3\n2 4 6\n7", "-1"]
  ],

  "Matrix Chain Multiplication": [
    ["5\n40 20 30 10 30", "26000"],
    ["4\n10 20 30 40", "18000"]
  ],

  "Word Ladder": [
    ["hit\ncog\n6\nhot dot dog lot log cog", "5"],
    ["a\nc\n2\na c", "2"]
  ],

  "Serialize Binary Tree": [
    ["1 2 3 null null 4 5", "1 2 3 null null 4 5"],
    ["1 null 2", "1 null 2"]
  ],

  "Validate Binary Search Tree": [
    ["5 3 7 2 4 6 8", "true"],
    ["5 3 7 6 4 8 2", "false"]
  ],

  "Diameter of Binary Tree": [
    ["1 2 3 4 5", "3"],
    ["1 2 3 4 5 6 7", "4"]
  ],

  "Median of Two Sorted Arrays": [
    ["2\n1 3\n1\n2", "2"],
    ["2\n1 2\n2\n3 4", "2.5"]
  ],

  "Sudoku Solver": [
    ["5 3 . . 7 . . . .\n6 . . 1 9 5 . . .\n. 9 8 . . . . 6 .\n8 . . . 6 . . . 3\n4 . . 8 . 3 . . 1\n7 . . . 2 . . . 6\n. 6 . . . . 2 8 .\n. . . 4 1 9 . . 5\n. . . . 8 . . 7 9", "Solved"],
    ["1 . . . . 7 . 9 .\n. 3 . . 2 . . . 8\n. . 9 6 . . 5 . .\n. . 5 3 . . 9 . .\n. 1 . . 8 . . . 2\n6 . . . . 4 . . .\n3 . . . . . . 1 .\n. 4 . . . . . . 7\n. . 7 . . . 3 . .", "Solved"]
  ],

  "KMP String Matching": [
    ["ABABDABACDABABCABAB\nABABCABAB", "10"],
    ["AAAAA\nAAA", "0 1 2"]
  ],

  "Rabin Karp String Matching": [
    ["GEEKS FOR GEEKS\nGEEK", "0 10"],
    ["ABABABA\nABA", "0 2 4"]
  ],

  "LRU Cache": [
    ["2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2", "1 -1"],
    ["2\nput 1 10\nput 2 20\nget 1\nget 2", "10 20"]
  ],

  "Trie Prefix Search": [
    ["3\napple\napp\napplication\napp", "apple app application"],
    ["4\ncat\ncar\ncard\ndog\nca", "cat car card"]
  ],

  "Segment Tree Range Sum": [
    ["5\n1 3 5 7 9\n2\n0 2\n1 4", "9 24"],
    ["4\n2 4 6 8\n2\n0 3\n1 2", "20 10"]
  ],

  "Maximum Flow": [
    ["4 5\n0 1 3\n0 2 2\n1 2 1\n1 3 2\n2 3 3\n0 3", "5"],
    ["3 3\n0 1 5\n1 2 4\n0 2 3\n0 2", "7"]
  ]

};


/* =====================================================
   BUILD FUNCTION
===================================================== */

const build = (titles, difficulty, startId) => {
  return titles.map((title, index) => {

    const isPattern =
      /Pattern|Triangle|Diamond|Butterfly/i.test(title);

    const isGraph =
      /Dijkstra|Bellman|Floyd|Kruskal|Prim|Flow/i.test(title);

    let category = "DSA & Placement";

    if (isPattern) {
      category = "Patterns";
    }

    if (isGraph) {
      category = "Graphs";
    }

    return {
      id: startId + index,

      difficulty,

      category,

      title,

      description:
        `Solve ${title} using an efficient approach suitable for placement interviews.`,

      exampleInput:
        cases[title]?.[0]?.[0] ||
        "Use the input format described in the problem.",

      exampleOutput:
        cases[title]?.[0]?.[1] ||
        "Print the required output.",

      constraints: [
        "Handle valid input and edge cases.",
        "Prefer an efficient solution.",
        "Consider time and space complexity."
      ],

      hint:
        `Identify the core technique for ${title} before coding.`,

      starterCode: {
        C: makeStarterCode("C", title),
        Java: makeStarterCode("Java", title),
        Python: makeStarterCode("Python", title)
      },

      testCases:
        (cases[title] || []).map(
          ([input, output]) => ({
            input,
            output
          })
        ),

      explanation:
        `Review the approach, edge cases and complexity after solving ${title}.`
    };
  });
};


/* =====================================================
   20 EASY
===================================================== */

const easy = [

  "Reverse a Number",
  "Check Palindrome Number",
  "Check Prime Number",
  "Fibonacci Series",
  "Factorial of a Number",

  "Sum of Digits",
  "Armstrong Number",
  "GCD of Two Numbers",
  "Largest Element in Array",
  "Linear Search",

  "Reverse a String",
  "Count Vowels and Consonants",
  "Decimal to Binary",
  "Count Set Bits",
  "Right Triangle Star Pattern",

  "Sum of Array Elements",
  "Count Even and Odd Numbers",
  "Find Minimum Element in Array",
  "Swap Two Numbers",
  "Multiplication Table"
];


/* =====================================================
   20 MEDIUM
===================================================== */

const medium = [

  "Two Sum",
  "Move Zeroes",
  "Rotate Array by K",
  "Maximum Subarray Sum",
  "Merge Two Sorted Arrays",

  "Majority Element",
  "Missing Number",
  "Sort 0s 1s and 2s",
  "Best Time to Buy and Sell Stock",
  "Valid Parentheses",

  "Binary Search",
  "Climbing Stairs",
  "Floyd Triangle Pattern",
  "Pascal Triangle Pattern",
  "Number Triangle Pattern",

  "Second Largest Element",
  "Frequency of Array Elements",
  "Intersection of Two Arrays",
  "Remove Duplicates from Sorted Array",
  "Rat in a Maze"
];


/* =====================================================
   20 DIFFICULT
===================================================== */

const difficult = [

  "Longest Substring Without Repeating Characters",
  "Longest Palindromic Substring",
  "Minimum Window Substring",
  "Edit Distance",
  "Longest Increasing Subsequence",

  "Maximum Product Subarray",
  "Trapping Rain Water",
  "Container With Most Water",
  "Sliding Window Maximum",
  "Kth Largest Element",

  "N Queens",
  "Generate All Permutations",
  "Hollow Diamond Pattern",
  "Butterfly Pattern",
  "3Sum",

  "Merge Intervals",
  "Top K Frequent Elements",
  "Product of Array Except Self",
  "Combination Sum",
  "Word Search"
];


/* =====================================================
   20 ADVANCED
===================================================== */

const advanced = [

  "Dijkstra Shortest Path",
  "Bellman Ford Algorithm",
  "Floyd Warshall Algorithm",
  "Kruskal Minimum Spanning Tree",
  "Prim Minimum Spanning Tree",

  "Longest Common Subsequence",
  "0/1 Knapsack",
  "Coin Change",
  "Matrix Chain Multiplication",
  "Word Ladder",

  "Serialize Binary Tree",
  "Validate Binary Search Tree",
  "Diameter of Binary Tree",
  "Median of Two Sorted Arrays",
  "Sudoku Solver",

  "KMP String Matching",
  "Rabin Karp String Matching",
  "LRU Cache",
  "Trie Prefix Search",
  "Segment Tree Range Sum"
];


/* =====================================================
   FINAL 80 PROBLEMS
===================================================== */

const codingProblems = [

  ...build(easy, "Easy", 1),

  ...build(medium, "Medium", 21),

  ...build(difficult, "Difficult", 41),

  ...build(advanced, "Advanced", 61)

];


export default codingProblems;