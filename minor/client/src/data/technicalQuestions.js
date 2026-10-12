export const technicalQuestions = [

  // =====================================================
  // C LANGUAGE — 1 TO 50
  // =====================================================

  {
    id: 1,
    section: "C",
    topic: "Basics",
    type: "mcq",
    question: "Which of the following is the correct entry point of a C program?",
    options: ["start()", "main()", "execute()", "run()"],
    answer: "main()"
  },

  {
    id: 2,
    section: "C",
    topic: "Basics",
    type: "mcq",
    question: "Which symbol is used to terminate a statement in C?",
    options: [".", ":", ";", ","],
    answer: ";"
  },

  {
    id: 3,
    section: "C",
    topic: "Data Types",
    type: "mcq",
    question: "Which data type is used to store a single character in C?",
    options: ["string", "char", "character", "text"],
    answer: "char"
  },

  {
    id: 4,
    section: "C",
    topic: "Data Types",
    type: "mcq",
    question: "Which format specifier is used to print an integer in C?",
    options: ["%f", "%c", "%d", "%s"],
    answer: "%d"
  },

  {
    id: 5,
    section: "C",
    topic: "Variables",
    type: "mcq",
    question: "Which of the following is a valid variable name in C?",
    options: ["2value", "my-value", "my_value", "float"],
    answer: "my_value"
  },

  {
    id: 6,
    section: "C",
    topic: "Operators",
    type: "mcq",
    question: "What is the result of 10 % 3 in C?",
    options: ["1", "2", "3", "0"],
    answer: "1"
  },

  {
    id: 7,
    section: "C",
    topic: "Operators",
    type: "mcq",
    question: "Which operator is used for logical AND in C?",
    options: ["&", "&&", "||", "!"],
    answer: "&&"
  },

  {
    id: 8,
    section: "C",
    topic: "Operators",
    type: "mcq",
    question: "Which operator is used to obtain the address of a variable?",
    options: ["*", "&", "#", "@"],
    answer: "&"
  },

  {
    id: 9,
    section: "C",
    topic: "Control Statements",
    type: "mcq",
    question: "Which statement is used to make a decision in C?",
    options: ["if", "for", "continue", "goto"],
    answer: "if"
  },

  {
    id: 10,
    section: "C",
    topic: "Loops",
    type: "mcq",
    question: "Which loop is guaranteed to execute at least once?",
    options: ["for", "while", "do-while", "nested for"],
    answer: "do-while"
  },

  {
    id: 11,
    section: "C",
    topic: "Loops",
    type: "mcq",
    question: "Which statement immediately terminates a loop?",
    options: ["skip", "continue", "break", "exitloop"],
    answer: "break"
  },

  {
    id: 12,
    section: "C",
    topic: "Loops",
    type: "mcq",
    question: "Which keyword skips the current iteration of a loop?",
    options: ["skip", "continue", "break", "pass"],
    answer: "continue"
  },

  {
    id: 13,
    section: "C",
    topic: "Functions",
    type: "mcq",
    question: "Which keyword is used to return a value from a function?",
    options: ["send", "return", "output", "result"],
    answer: "return"
  },

  {
    id: 14,
    section: "C",
    topic: "Functions",
    type: "mcq",
    question: "A function that calls itself is known as:",
    options: ["Iteration", "Recursion", "Inheritance", "Overloading"],
    answer: "Recursion"
  },

  {
    id: 15,
    section: "C",
    topic: "Arrays",
    type: "mcq",
    question: "Array indexing in C starts from:",
    options: ["0", "1", "-1", "2"],
    answer: "0"
  },

  {
    id: 16,
    section: "C",
    topic: "Arrays",
    type: "mcq",
    question: "Which is the correct declaration of an integer array containing 10 elements?",
    options: [
      "int arr(10);",
      "int arr[10];",
      "array int arr[10];",
      "int[10] arr;"
    ],
    answer: "int arr[10];"
  },

  {
    id: 17,
    section: "C",
    topic: "Strings",
    type: "mcq",
    question: "Which character marks the end of a string in C?",
    options: ["\\n", "\\0", "\\t", "\\b"],
    answer: "\\0"
  },

  {
    id: 18,
    section: "C",
    topic: "Strings",
    type: "mcq",
    question: "Which header file contains strlen()?",
    options: ["stdio.h", "stdlib.h", "string.h", "math.h"],
    answer: "string.h"
  },

  {
    id: 19,
    section: "C",
    topic: "Pointers",
    type: "mcq",
    question: "Which symbol is used to declare a pointer?",
    options: ["&", "*", "#", "%"],
    answer: "*"
  },

  {
    id: 20,
    section: "C",
    topic: "Pointers",
    type: "mcq",
    question: "What does a pointer store?",
    options: [
      "A character",
      "An address",
      "Only integers",
      "A keyword"
    ],
    answer: "An address"
  },

  {
    id: 21,
    section: "C",
    topic: "Pointers",
    type: "mcq",
    question: "What is a NULL pointer?",
    options: [
      "A pointer pointing to address 0 or null",
      "A pointer to an integer",
      "A pointer to a function only",
      "An uninitialized integer"
    ],
    answer: "A pointer pointing to address 0 or null"
  },

  {
    id: 22,
    section: "C",
    topic: "Memory",
    type: "mcq",
    question: "Which function is used to dynamically allocate memory in C?",
    options: ["alloc()", "malloc()", "memory()", "new()"],
    answer: "malloc()"
  },

  {
    id: 23,
    section: "C",
    topic: "Memory",
    type: "mcq",
    question: "Which function releases dynamically allocated memory?",
    options: ["delete()", "remove()", "free()", "release()"],
    answer: "free()"
  },

  {
    id: 24,
    section: "C",
    topic: "Memory",
    type: "mcq",
    question: "Which function allocates memory and initializes it to zero?",
    options: ["malloc()", "calloc()", "realloc()", "alloc()"],
    answer: "calloc()"
  },

  {
    id: 25,
    section: "C",
    topic: "Memory",
    type: "mcq",
    question: "Which function changes the size of previously allocated memory?",
    options: ["resize()", "realloc()", "change()", "malloc()"],
    answer: "realloc()"
  },

  {
    id: 26,
    section: "C",
    topic: "Structures",
    type: "mcq",
    question: "Which keyword is used to define a structure in C?",
    options: ["class", "struct", "record", "object"],
    answer: "struct"
  },

  {
    id: 27,
    section: "C",
    topic: "Structures",
    type: "mcq",
    question: "Which operator is used to access a structure member using a structure variable?",
    options: [".", "->", "::", "#"],
    answer: "."
  },

  {
    id: 28,
    section: "C",
    topic: "Structures",
    type: "mcq",
    question: "Which operator is used to access a structure member through a pointer?",
    options: [".", "->", "::", "&"],
    answer: "->"
  },

  {
    id: 29,
    section: "C",
    topic: "Union",
    type: "mcq",
    question: "What is the main difference between a structure and a union?",
    options: [
      "Union members share the same memory",
      "Structure members share the same memory",
      "Union cannot contain integers",
      "Structure cannot contain characters"
    ],
    answer: "Union members share the same memory"
  },

  {
    id: 30,
    section: "C",
    topic: "Storage Classes",
    type: "mcq",
    question: "Which storage class preserves a local variable's value between function calls?",
    options: ["auto", "register", "static", "extern"],
    answer: "static"
  },

  {
    id: 31,
    section: "C",
    topic: "Preprocessor",
    type: "mcq",
    question: "Which symbol is used for preprocessor directives?",
    options: ["@", "#", "$", "&"],
    answer: "#"
  },

  {
    id: 32,
    section: "C",
    topic: "Preprocessor",
    type: "mcq",
    question: "Which directive is commonly used to include a header file?",
    options: ["#include", "#import", "#header", "#using"],
    answer: "#include"
  },

  {
    id: 33,
    section: "C",
    topic: "Preprocessor",
    type: "mcq",
    question: "Which directive is used to define a macro?",
    options: ["#macro", "#define", "#constant", "#set"],
    answer: "#define"
  },

  {
    id: 34,
    section: "C",
    topic: "File Handling",
    type: "mcq",
    question: "Which function is used to open a file in C?",
    options: ["open()", "fopen()", "fileopen()", "openfile()"],
    answer: "fopen()"
  },

  {
    id: 35,
    section: "C",
    topic: "File Handling",
    type: "mcq",
    question: "Which function is used to close a file?",
    options: ["close()", "fclose()", "fileclose()", "endfile()"],
    answer: "fclose()"
  },

  {
    id: 36,
    section: "C",
    topic: "File Handling",
    type: "mcq",
    question: "Which mode opens a file for reading?",
    options: ["w", "a", "r", "rw"],
    answer: "r"
  },

  {
    id: 37,
    section: "C",
    topic: "Type Casting",
    type: "mcq",
    question: "Converting one data type into another is called:",
    options: [
      "Type casting",
      "Encapsulation",
      "Compilation",
      "Iteration"
    ],
    answer: "Type casting"
  },

  {
    id: 38,
    section: "C",
    topic: "Keywords",
    type: "mcq",
    question: "Which keyword makes a variable read-only after initialization?",
    options: ["static", "constant", "const", "readonly"],
    answer: "const"
  },

  {
    id: 39,
    section: "C",
    topic: "Keywords",
    type: "mcq",
    question: "Which keyword is used to indicate that a variable may be changed unexpectedly by external factors?",
    options: ["volatile", "external", "change", "dynamic"],
    answer: "volatile"
  },

  {
    id: 40,
    section: "C",
    topic: "Compilation",
    type: "mcq",
    question: "Which stage converts C source code into machine-level object code?",
    options: ["Linking", "Compilation", "Execution", "Debugging"],
    answer: "Compilation"
  },

  {
    id: 41,
    section: "C",
    topic: "Compilation",
    type: "mcq",
    question: "What is the purpose of a linker?",
    options: [
      "Execute the program",
      "Combine object files and libraries",
      "Write source code",
      "Allocate variables"
    ],
    answer: "Combine object files and libraries"
  },

  {
    id: 42,
    section: "C",
    topic: "Functions",
    type: "mcq",
    question: "What is a function prototype?",
    options: [
      "Function execution",
      "Declaration of a function",
      "Definition of a variable",
      "A loop"
    ],
    answer: "Declaration of a function"
  },

  {
    id: 43,
    section: "C",
    topic: "Pointers",
    type: "mcq",
    question: "What is a dangling pointer?",
    options: [
      "A pointer pointing to freed or invalid memory",
      "A pointer containing NULL",
      "A pointer to a function",
      "A pointer to an array"
    ],
    answer: "A pointer pointing to freed or invalid memory"
  },

  {
    id: 44,
    section: "C",
    topic: "Pointers",
    type: "mcq",
    question: "What is a wild pointer?",
    options: [
      "An uninitialized pointer",
      "A NULL pointer",
      "A pointer to a string",
      "A pointer to an array"
    ],
    answer: "An uninitialized pointer"
  },

  {
    id: 45,
    section: "C",
    topic: "Bitwise Operators",
    type: "mcq",
    question: "Which operator performs bitwise AND?",
    options: ["&&", "&", "||", "|"],
    answer: "&"
  },

  {
    id: 46,
    section: "C",
    topic: "Bitwise Operators",
    type: "mcq",
    question: "Which operator performs bitwise OR?",
    options: ["||", "&", "|", "^"],
    answer: "|"
  },

  {
    id: 47,
    section: "C",
    topic: "Bitwise Operators",
    type: "mcq",
    question: "Which operator performs bitwise XOR?",
    options: ["^", "&&", "||", "!"],
    answer: "^"
  },

  {
    id: 48,
    section: "C",
    topic: "Enums",
    type: "mcq",
    question: "Which keyword is used to define an enumeration in C?",
    options: ["enum", "enumeration", "list", "set"],
    answer: "enum"
  },

  {
    id: 49,
    section: "C",
    topic: "Command Line Arguments",
    type: "mcq",
    question: "Which parameters are commonly used to receive command-line arguments in main()?",
    options: [
      "argc and argv",
      "arg1 and arg2",
      "count and values",
      "input and output"
    ],
    answer: "argc and argv"
  },

  {
    id: 50,
    section: "C",
    topic: "C Concepts",
    type: "mcq",
    question: "Which of the following is NOT a feature of the C language?",
    options: [
      "Pointers",
      "Structures",
      "Direct support for classes",
      "Functions"
    ],
    answer: "Direct support for classes"
  },

    // =====================================================
  // JAVA — 51 TO 100
  // =====================================================

  {
    id: 51,
    section: "Java",
    topic: "Basics",
    type: "mcq",
    question: "Which keyword is used to define a class in Java?",
    options: ["class", "Class", "define", "struct"],
    answer: "class"
  },

  {
    id: 52,
    section: "Java",
    topic: "Basics",
    type: "mcq",
    question: "Which method is the entry point of a Java application?",
    options: ["start()", "main()", "run()", "execute()"],
    answer: "main()"
  },

  {
    id: 53,
    section: "Java",
    topic: "Basics",
    type: "mcq",
    question: "Which keyword is used to create an object in Java?",
    options: ["create", "object", "new", "instance"],
    answer: "new"
  },

  {
    id: 54,
    section: "Java",
    topic: "Data Types",
    type: "mcq",
    question: "Which of the following is NOT a primitive data type in Java?",
    options: ["int", "float", "String", "boolean"],
    answer: "String"
  },

  {
    id: 55,
    section: "Java",
    topic: "Data Types",
    type: "mcq",
    question: "What is the size of an int in Java?",
    options: ["8 bits", "16 bits", "32 bits", "64 bits"],
    answer: "32 bits"
  },

  {
    id: 56,
    section: "Java",
    topic: "Data Types",
    type: "mcq",
    question: "Which primitive data type stores true or false values?",
    options: ["bool", "boolean", "Boolean", "bit"],
    answer: "boolean"
  },

  {
    id: 57,
    section: "Java",
    topic: "OOP",
    type: "mcq",
    question: "Which OOP concept represents hiding implementation details?",
    options: [
      "Inheritance",
      "Abstraction",
      "Polymorphism",
      "Overloading"
    ],
    answer: "Abstraction"
  },

  {
    id: 58,
    section: "Java",
    topic: "OOP",
    type: "mcq",
    question: "Which OOP concept allows one class to acquire properties of another class?",
    options: [
      "Inheritance",
      "Encapsulation",
      "Abstraction",
      "Compilation"
    ],
    answer: "Inheritance"
  },

  {
    id: 59,
    section: "Java",
    topic: "OOP",
    type: "mcq",
    question: "Which concept refers to wrapping data and methods together?",
    options: [
      "Inheritance",
      "Encapsulation",
      "Abstraction",
      "Recursion"
    ],
    answer: "Encapsulation"
  },

  {
    id: 60,
    section: "Java",
    topic: "Polymorphism",
    type: "mcq",
    question: "Method overloading is an example of:",
    options: [
      "Runtime polymorphism",
      "Compile-time polymorphism",
      "Inheritance",
      "Encapsulation"
    ],
    answer: "Compile-time polymorphism"
  },

  {
    id: 61,
    section: "Java",
    topic: "Polymorphism",
    type: "mcq",
    question: "Method overriding is generally associated with:",
    options: [
      "Compile-time polymorphism",
      "Runtime polymorphism",
      "Encapsulation",
      "Constructor chaining"
    ],
    answer: "Runtime polymorphism"
  },

  {
    id: 62,
    section: "Java",
    topic: "Inheritance",
    type: "mcq",
    question: "Which keyword is used to inherit a class in Java?",
    options: ["inherits", "extends", "implements", "super"],
    answer: "extends"
  },

  {
    id: 63,
    section: "Java",
    topic: "Interfaces",
    type: "mcq",
    question: "Which keyword is used when a class implements an interface?",
    options: ["extends", "implements", "interface", "inherits"],
    answer: "implements"
  },

  {
    id: 64,
    section: "Java",
    topic: "Constructors",
    type: "mcq",
    question: "What is a constructor used for?",
    options: [
      "Destroying an object",
      "Initializing an object",
      "Printing an object",
      "Copying a package"
    ],
    answer: "Initializing an object"
  },

  {
    id: 65,
    section: "Java",
    topic: "Constructors",
    type: "mcq",
    question: "Which statement about constructors is correct?",
    options: [
      "They must have a return type",
      "They have the same name as the class",
      "They must be static",
      "They cannot have parameters"
    ],
    answer: "They have the same name as the class"
  },

  {
    id: 66,
    section: "Java",
    topic: "Keywords",
    type: "mcq",
    question: "Which keyword refers to the current object?",
    options: ["self", "current", "this", "object"],
    answer: "this"
  },

  {
    id: 67,
    section: "Java",
    topic: "Keywords",
    type: "mcq",
    question: "Which keyword refers to the immediate parent class object?",
    options: ["parent", "base", "super", "this"],
    answer: "super"
  },

  {
    id: 68,
    section: "Java",
    topic: "Keywords",
    type: "mcq",
    question: "Which keyword prevents a class from being inherited?",
    options: ["static", "final", "private", "sealed"],
    answer: "final"
  },

  {
    id: 69,
    section: "Java",
    topic: "Keywords",
    type: "mcq",
    question: "Which keyword is used to define a constant variable?",
    options: ["constant", "const", "final", "static"],
    answer: "final"
  },

  {
    id: 70,
    section: "Java",
    topic: "Strings",
    type: "mcq",
    question: "Are Java String objects mutable?",
    options: [
      "Yes",
      "No",
      "Only inside methods",
      "Only when declared final"
    ],
    answer: "No"
  },

  {
    id: 71,
    section: "Java",
    topic: "Strings",
    type: "mcq",
    question: "Which method is used to find the length of a String?",
    options: ["size()", "length()", "count()", "getLength()"],
    answer: "length()"
  },

  {
    id: 72,
    section: "Java",
    topic: "Strings",
    type: "mcq",
    question: "Which method compares the contents of two String objects?",
    options: ["==", "compare()", "equals()", "match()"],
    answer: "equals()"
  },

  {
    id: 73,
    section: "Java",
    topic: "Arrays",
    type: "mcq",
    question: "What is the index of the first element in a Java array?",
    options: ["0", "1", "-1", "Depends on the array"],
    answer: "0"
  },

  {
    id: 74,
    section: "Java",
    topic: "Arrays",
    type: "mcq",
    question: "Which property gives the number of elements in a Java array?",
    options: ["size", "length", "count", "length()"],
    answer: "length"
  },

  {
    id: 75,
    section: "Java",
    topic: "Exception Handling",
    type: "mcq",
    question: "Which block is used to handle an exception?",
    options: ["try", "catch", "throw", "finally"],
    answer: "catch"
  },

  {
    id: 76,
    section: "Java",
    topic: "Exception Handling",
    type: "mcq",
    question: "Which block is normally executed whether an exception occurs or not?",
    options: ["try", "catch", "finally", "throw"],
    answer: "finally"
  },

  {
    id: 77,
    section: "Java",
    topic: "Exception Handling",
    type: "mcq",
    question: "Which keyword is used to explicitly throw an exception?",
    options: ["throws", "throw", "exception", "raise"],
    answer: "throw"
  },

  {
    id: 78,
    section: "Java",
    topic: "Exception Handling",
    type: "mcq",
    question: "Which keyword declares exceptions that a method may throw?",
    options: ["throw", "throws", "exception", "catch"],
    answer: "throws"
  },

  {
    id: 79,
    section: "Java",
    topic: "Collections",
    type: "mcq",
    question: "Which interface represents an ordered collection that allows duplicate elements?",
    options: ["Set", "List", "Map", "Queue"],
    answer: "List"
  },

  {
    id: 80,
    section: "Java",
    topic: "Collections",
    type: "mcq",
    question: "Which collection does NOT allow duplicate elements?",
    options: ["List", "Set", "ArrayList", "LinkedList"],
    answer: "Set"
  },

  {
    id: 81,
    section: "Java",
    topic: "Collections",
    type: "mcq",
    question: "Which collection stores key-value pairs?",
    options: ["List", "Set", "Map", "Queue"],
    answer: "Map"
  },

  {
    id: 82,
    section: "Java",
    topic: "Collections",
    type: "mcq",
    question: "Which class provides a resizable array implementation?",
    options: ["Array", "ArrayList", "VectorList", "DynamicArray"],
    answer: "ArrayList"
  },

  {
    id: 83,
    section: "Java",
    topic: "Collections",
    type: "mcq",
    question: "Which collection is commonly used to implement a LIFO stack?",
    options: ["Queue", "Stack", "Set", "Map"],
    answer: "Stack"
  },

  {
    id: 84,
    section: "Java",
    topic: "Collections",
    type: "mcq",
    question: "Which interface is commonly used to represent a FIFO queue?",
    options: ["Queue", "Stack", "Set", "Map"],
    answer: "Queue"
  },

  {
    id: 85,
    section: "Java",
    topic: "Threads",
    type: "mcq",
    question: "Which method starts a new thread of execution?",
    options: ["run()", "start()", "execute()", "begin()"],
    answer: "start()"
  },

  {
    id: 86,
    section: "Java",
    topic: "Threads",
    type: "mcq",
    question: "Which method contains the code executed by a thread?",
    options: ["start()", "run()", "execute()", "main()"],
    answer: "run()"
  },

  {
    id: 87,
    section: "Java",
    topic: "Threads",
    type: "mcq",
    question: "Which keyword is used for thread synchronization?",
    options: ["sync", "synchronized", "threadsafe", "lock"],
    answer: "synchronized"
  },

  {
    id: 88,
    section: "Java",
    topic: "JVM",
    type: "mcq",
    question: "What does JVM stand for?",
    options: [
      "Java Variable Machine",
      "Java Virtual Machine",
      "Java Verified Machine",
      "Java Visual Machine"
    ],
    answer: "Java Virtual Machine"
  },

  {
    id: 89,
    section: "Java",
    topic: "JDK JRE JVM",
    type: "mcq",
    question: "What does JDK stand for?",
    options: [
      "Java Development Kit",
      "Java Deployment Kit",
      "Java Design Kernel",
      "Java Developer Kernel"
    ],
    answer: "Java Development Kit"
  },

  {
    id: 90,
    section: "Java",
    topic: "JDK JRE JVM",
    type: "mcq",
    question: "What does JRE stand for?",
    options: [
      "Java Runtime Environment",
      "Java Resource Environment",
      "Java Runtime Engine",
      "Java Resource Engine"
    ],
    answer: "Java Runtime Environment"
  },

  {
    id: 91,
    section: "Java",
    topic: "JVM",
    type: "mcq",
    question: "Java source code is commonly compiled into:",
    options : [
      "Machine code",
      "Bytecode",
      "Assembly code",
      "Binary source"
    ],
    answer: "Bytecode"
  },

  {
    id: 92,
    section: "Java",
    topic: "Access Modifiers",
    type: "mcq",
    question: "Which access modifier provides the widest access?",
    options: ["private", "protected", "public", "default"],
    answer: "public"
  },

  {
    id: 93,
    section: "Java",
    topic: "Access Modifiers",
    type: "mcq",
    question: "Which access modifier restricts access to the same class?",
    options: ["public", "protected", "private", "default"],
    answer: "private"
  },

  {
    id: 94,
    section: "Java",
    topic: "Static",
    type: "mcq",
    question: "A static member belongs to:",
    options: [
      "Each object separately",
      "The class",
      "Only the constructor",
      "The JVM only"
    ],
    answer: "The class"
  },

  {
    id: 95,
    section: "Java",
    topic: "Garbage Collection",
    type: "mcq",
    question: "What is garbage collection used for?",
    options: [
      "Compiling Java code",
      "Automatically reclaiming unused memory",
      "Creating threads",
      "Handling syntax errors"
    ],
    answer: "Automatically reclaiming unused memory"
  },

  {
    id: 96,
    section: "Java",
    topic: "Wrapper Classes",
    type: "mcq",
    question: "Which wrapper class corresponds to the primitive int type?",
    options: ["Int", "Integer", "Number", "Long"],
    answer: "Integer"
  },

  {
    id: 97,
    section: "Java",
    topic: "Autoboxing",
    type: "mcq",
    question: "Converting a primitive value into its corresponding wrapper object is called:",
    options: [
      "Unboxing",
      "Autoboxing",
      "Casting",
      "Wrapping"
    ],
    answer: "Autoboxing"
  },

  {
    id: 98,
    section: "Java",
    topic: "Packages",
    type: "mcq",
    question: "Which keyword is used to declare a package?",
    options: ["package", "import", "namespace", "module"],
    answer: "package"
  },

  {
    id: 99,
    section: "Java",
    topic: "Packages",
    type: "mcq",
    question: "Which keyword is used to use classes from another package?",
    options: ["include", "using", "import", "require"],
    answer: "import"
  },

  {
    id: 100,
    section: "Java",
    topic: "Java Concepts",
    type: "mcq",
    question: "Which feature allows Java programs to run on different platforms through the JVM?",
    options: [
      "Platform independence",
      "Multiple inheritance",
      "Operator overloading",
      "Pointer arithmetic"
    ],
    answer: "Platform independence"
  },
  // =========================
// PYTHON QUESTIONS 101–150
// =========================

{
  id: 101,
  section: "Python",
  topic: "Python Basics",
  type: "mcq",
  question: "Which keyword is used to define a function in Python?",
  options: ["function", "def", "fun", "define"],
  answer: "def"
},

{
  id: 102,
  section: "Python",
  topic: "Python Basics",
  type: "mcq",
  question: "Which symbol is used for a single-line comment in Python?",
  options: ["//", "#", "/*", "--"],
  answer: "#"
},

{
  id: 103,
  section: "Python",
  topic: "Data Types",
  type: "mcq",
  question: "Which of the following is an immutable data type?",
  options: ["List", "Dictionary", "Set", "Tuple"],
  answer: "Tuple"
},

{
  id: 104,
  section: "Python",
  topic: "Data Types",
  type: "mcq",
  question: "What is the data type of the value 10.5?",
  options: ["int", "float", "double", "decimal"],
  answer: "float"
},

{
  id: 105,
  section: "Python",
  topic: "Data Types",
  type: "mcq",
  question: "Which function is used to determine the type of an object?",
  options: ["typeof()", "type()", "datatype()", "checktype()"],
  answer: "type()"
},

{
  id: 106,
  section: "Python",
  topic: "Strings",
  type: "mcq",
  question: "Which method converts a string to lowercase?",
  options: ["lower()", "tolower()", "small()", "lowercase()"],
  answer: "lower()"
},

{
  id: 107,
  section: "Python",
  topic: "Strings",
  type: "mcq",
  question: "Which method removes whitespace from both ends of a string?",
  options: ["remove()", "strip()", "trim()", "clean()"],
  answer: "strip()"
},

{
  id: 108,
  section: "Python",
  topic: "Strings",
  type: "mcq",
  question: "What is the output of len('Python')?",
  options: ["5", "6", "7", "8"],
  answer: "6"
},

{
  id: 109,
  section: "Python",
  topic: "Strings",
  type: "mcq",
  question: "Which operator is used for string concatenation?",
  options: ["*", "+", "&", "."],
  answer: "+"
},

{
  id: 110,
  section: "Python",
  topic: "Strings",
  type: "mcq",
  question: "What is the output of 'Python'[0]?",
  options: ["P", "y", "Python", "0"],
  answer: "P"
},

{
  id: 111,
  section: "Python",
  topic: "Lists",
  type: "mcq",
  question: "Which method adds an element to the end of a list?",
  options: ["add()", "append()", "insertEnd()", "push()"],
  answer: "append()"
},

{
  id: 112,
  section: "Python",
  topic: "Lists",
  type: "mcq",
  question: "Which method removes and returns the last element of a list by default?",
  options: ["delete()", "remove()", "pop()", "discard()"],
  answer: "pop()"
},

{
  id: 113,
  section: "Python",
  topic: "Lists",
  type: "mcq",
  question: "Which method inserts an element at a specified position?",
  options: ["insert()", "add()", "place()", "appendAt()"],
  answer: "insert()"
},

{
  id: 114,
  section: "Python",
  topic: "Lists",
  type: "mcq",
  question: "Which method sorts a list in place?",
  options: ["sort()", "sortedList()", "order()", "arrange()"],
  answer: "sort()"
},

{
  id: 115,
  section: "Python",
  topic: "Lists",
  type: "mcq",
  question: "Which function returns a new sorted list?",
  options: ["sort()", "sorted()", "order()", "arrange()"],
  answer: "sorted()"
},

{
  id: 116,
  section: "Python",
  topic: "Tuples",
  type: "mcq",
  question: "Which brackets are commonly used to create a tuple?",
  options: ["[]", "{}", "()", "<>"],
  answer: "()"
},

{
  id: 117,
  section: "Python",
  topic: "Sets",
  type: "mcq",
  question: "Which collection does not allow duplicate elements?",
  options: ["List", "Tuple", "Set", "String"],
  answer: "Set"
},

{
  id: 118,
  section: "Python",
  topic: "Sets",
  type: "mcq",
  question: "Which method adds one element to a set?",
  options: ["append()", "add()", "insert()", "push()"],
  answer: "add()"
},

{
  id: 119,
  section: "Python",
  topic: "Dictionaries",
  type: "mcq",
  question: "A Python dictionary stores data in which form?",
  options: ["Index-value", "Key-value", "Row-column", "Element-position"],
  answer: "Key-value"
},

{
  id: 120,
  section: "Python",
  topic: "Dictionaries",
  type: "mcq",
  question: "Which method returns all keys of a dictionary?",
  options: ["keys()", "getKeys()", "keyList()", "allKeys()"],
  answer: "keys()"
},

{
  id: 121,
  section: "Python",
  topic: "Dictionaries",
  type: "mcq",
  question: "Which method returns all values of a dictionary?",
  options: ["values()", "getValues()", "valueList()", "allValues()"],
  answer: "values()"
},

{
  id: 122,
  section: "Python",
  topic: "Dictionaries",
  type: "mcq",
  question: "Which method safely retrieves a value from a dictionary?",
  options: ["fetch()", "get()", "find()", "retrieve()"],
  answer: "get()"
},

{
  id: 123,
  section: "Python",
  topic: "Operators",
  type: "mcq",
  question: "Which operator performs exponentiation in Python?",
  options: ["^", "**", "//", "^^"],
  answer: "**"
},

{
  id: 124,
  section: "Python",
  topic: "Operators",
  type: "mcq",
  question: "Which operator performs floor division?",
  options: ["/", "//", "%", "**"],
  answer: "//"
},

{
  id: 125,
  section: "Python",
  topic: "Operators",
  type: "mcq",
  question: "What is the result of 10 % 3?",
  options: ["0", "1", "2", "3"],
  answer: "1"
},

{
  id: 126,
  section: "Python",
  topic: "Conditional Statements",
  type: "mcq",
  question: "Which keyword is used when checking another condition after if?",
  options: ["elseif", "elif", "else if", "elseif()"],
  answer: "elif"
},

{
  id: 127,
  section: "Python",
  topic: "Loops",
  type: "mcq",
  question: "Which loop is commonly used to iterate over a sequence?",
  options: ["for", "repeat", "foreach", "iterate"],
  answer: "for"
},

{
  id: 128,
  section: "Python",
  topic: "Loops",
  type: "mcq",
  question: "Which keyword immediately terminates a loop?",
  options: ["stop", "exit", "break", "terminate"],
  answer: "break"
},

{
  id: 129,
  section: "Python",
  topic: "Loops",
  type: "mcq",
  question: "Which keyword skips the current iteration and continues with the next iteration?",
  options: ["skip", "continue", "next", "pass"],
  answer: "continue"
},

{
  id: 130,
  section: "Python",
  topic: "Loops",
  type: "mcq",
  question: "Which keyword does nothing and is often used as a placeholder?",
  options: ["empty", "skip", "pass", "null"],
  answer: "pass"
},

{
  id: 131,
  section: "Python",
  topic: "Functions",
  type: "mcq",
  question: "Which keyword returns a value from a function?",
  options: ["send", "return", "output", "yield"],
  answer: "return"
},

{
  id: 132,
  section: "Python",
  topic: "Functions",
  type: "mcq",
  question: "What does *args allow a function to accept?",
  options: [
    "Multiple positional arguments",
    "Only keyword arguments",
    "Only one argument",
    "No arguments"
  ],
  answer: "Multiple positional arguments"
},

{
  id: 133,
  section: "Python",
  topic: "Functions",
  type: "mcq",
  question: "What does **kwargs allow a function to accept?",
  options: [
    "Multiple keyword arguments",
    "Multiple positional arguments",
    "Only integer arguments",
    "Only one keyword"
  ],
  answer: "Multiple keyword arguments"
},

{
  id: 134,
  section: "Python",
  topic: "Lambda",
  type: "mcq",
  question: "Which keyword is used to create an anonymous function?",
  options: ["anonymous", "lambda", "function", "def"],
  answer: "lambda"
},

{
  id: 135,
  section: "Python",
  topic: "Lambda",
  type: "mcq",
  question: "What does the following expression return: lambda x: x * 2 applied to 5?",
  options: ["5", "7", "10", "25"],
  answer: "10"
},

{
  id: 136,
  section: "Python",
  topic: "Comprehensions",
  type: "mcq",
  question: "Which syntax is used for a list comprehension?",
  options: ["{}", "[]", "()", "<>"],
  answer: "[]"
},

{
  id: 137,
  section: "Python",
  topic: "Comprehensions",
  type: "mcq",
  question: "What does a list comprehension primarily provide?",
  options: [
    "A concise way to create lists",
    "A way to define classes",
    "A way to create threads",
    "A way to handle exceptions"
  ],
  answer: "A concise way to create lists"
},

{
  id: 138,
  section: "Python",
  topic: "Scope",
  type: "mcq",
  question: "Which keyword allows a function to modify a global variable?",
  options: ["global", "public", "extern", "globalize"],
  answer: "global"
},

{
  id: 139,
  section: "Python",
  topic: "Scope",
  type: "mcq",
  question: "Which keyword is used to refer to a variable in an enclosing non-global scope?",
  options: ["outer", "nonlocal", "parent", "enclosing"],
  answer: "nonlocal"
},

{
  id: 140,
  section: "Python",
  topic: "OOP",
  type: "mcq",
  question: "Which keyword is used to define a class?",
  options: ["class", "struct", "object", "define"],
  answer: "class"
},

{
  id: 141,
  section: "Python",
  topic: "OOP",
  type: "mcq",
  question: "What is the first parameter of a typical instance method?",
  options: ["this", "self", "object", "instance"],
  answer: "self"
},

{
  id: 142,
  section: "Python",
  topic: "OOP",
  type: "mcq",
  question: "Which special method is commonly used to initialize an object?",
  options: ["__start__()", "__init__()", "__create__()", "__newobject__()"],
  answer: "__init__()"
},

{
  id: 143,
  section: "Python",
  topic: "OOP",
  type: "mcq",
  question: "What is inheritance in Python?",
  options: [
    "Creating a class based on another class",
    "Creating multiple variables",
    "Copying a function",
    "Deleting a class"
  ],
  answer: "Creating a class based on another class"
},

{
  id: 144,
  section: "Python",
  topic: "OOP",
  type: "mcq",
  question: "Can Python support multiple inheritance?",
  options: ["Yes", "No", "Only with interfaces", "Only with abstract classes"],
  answer: "Yes"
},

{
  id: 145,
  section: "Python",
  topic: "Exceptions",
  type: "mcq",
  question: "Which block is used to handle exceptions?",
  options: ["try-except", "if-else", "check-catch", "error-handle"],
  answer: "try-except"
},

{
  id: 146,
  section: "Python",
  topic: "Exceptions",
  type: "mcq",
  question: "Which keyword is used to explicitly raise an exception?",
  options: ["throw", "raise", "error", "exception"],
  answer: "raise"
},

{
  id: 147,
  section: "Python",
  topic: "File Handling",
  type: "mcq",
  question: "Which function is used to open a file?",
  options: ["file()", "open()", "openFile()", "readFile()"],
  answer: "open()"
},

{
  id: 148,
  section: "Python",
  topic: "File Handling",
  type: "mcq",
  question: "Which file mode is used to open a file for writing?",
  options: ["r", "w", "x", "read"],
  answer: "w"
},

{
  id: 149,
  section: "Python",
  topic: "Iterators",
  type: "mcq",
  question: "Which function obtains an iterator from an iterable object?",
  options: ["iterator()", "iter()", "iterate()", "next()"],
  answer: "iter()"
},

{
  id: 150,
  section: "Python",
  topic: "Generators",
  type: "mcq",
  question: "Which keyword is used to produce values from a generator?",
  options: ["return", "yield", "generate", "produce"],
  answer: "yield"
},
// =========================
// DSA QUESTIONS 151–200
// =========================

{
  id: 151,
  section: "DSA",
  topic: "Time Complexity",
  type: "mcq",
  question: "What is the time complexity of accessing an element by index in an array?",
  options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
  answer: "O(1)"
},

{
  id: 152,
  section: "DSA",
  topic: "Time Complexity",
  type: "mcq",
  question: "What is the time complexity of linear search in the worst case?",
  options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
  answer: "O(n)"
},

{
  id: 153,
  section: "DSA",
  topic: "Time Complexity",
  type: "mcq",
  question: "What is the worst-case time complexity of binary search?",
  options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
  answer: "O(log n)"
},

{
  id: 154,
  section: "DSA",
  topic: "Arrays",
  type: "mcq",
  question: "Which data structure stores elements in contiguous memory locations?",
  options: ["Linked List", "Array", "Graph", "Tree"],
  answer: "Array"
},

{
  id: 155,
  section: "DSA",
  topic: "Arrays",
  type: "mcq",
  question: "What is the index of the first element in a typical zero-indexed array?",
  options: ["0", "1", "-1", "Depends on the array"],
  answer: "0"
},

{
  id: 156,
  section: "DSA",
  topic: "Arrays",
  type: "mcq",
  question: "Which operation generally requires shifting elements in an array?",
  options: [
    "Accessing an element",
    "Insertion in the middle",
    "Reading the first element",
    "Checking the length"
  ],
  answer: "Insertion in the middle"
},

{
  id: 157,
  section: "DSA",
  topic: "Strings",
  type: "mcq",
  question: "Which technique is commonly used to check whether a string is a palindrome?",
  options: [
    "Compare characters from both ends",
    "Sort the string only",
    "Delete the first character",
    "Convert it to an integer"
  ],
  answer: "Compare characters from both ends"
},

{
  id: 158,
  section: "DSA",
  topic: "Strings",
  type: "mcq",
  question: "Which data structure is commonly useful for counting character frequencies?",
  options: ["Hash Map", "Stack", "Queue", "Heap"],
  answer: "Hash Map"
},

{
  id: 159,
  section: "DSA",
  topic: "Linked List",
  type: "mcq",
  question: "What does a node in a singly linked list typically contain?",
  options: [
    "Only data",
    "Data and a pointer to the next node",
    "Only a pointer",
    "Two arrays"
  ],
  answer: "Data and a pointer to the next node"
},

{
  id: 160,
  section: "DSA",
  topic: "Linked List",
  type: "mcq",
  question: "What does the next pointer of the last node in a singly linked list usually contain?",
  options: ["0", "NULL", "First node", "Previous node"],
  answer: "NULL"
},

{
  id: 161,
  section: "DSA",
  topic: "Linked List",
  type: "mcq",
  question: "Which linked list has pointers in both directions?",
  options: [
    "Singly linked list",
    "Doubly linked list",
    "Circular singly linked list",
    "Linear list"
  ],
  answer: "Doubly linked list"
},

{
  id: 162,
  section: "DSA",
  topic: "Linked List",
  type: "mcq",
  question: "Which technique can be used to detect a cycle in a linked list?",
  options: [
    "Floyd's cycle detection algorithm",
    "Binary search",
    "Merge sort",
    "Dijkstra's algorithm"
  ],
  answer: "Floyd's cycle detection algorithm"
},

{
  id: 163,
  section: "DSA",
  topic: "Stack",
  type: "mcq",
  question: "Which principle does a stack follow?",
  options: ["FIFO", "LIFO", "Random access", "Priority based"],
  answer: "LIFO"
},

{
  id: 164,
  section: "DSA",
  topic: "Stack",
  type: "mcq",
  question: "Which operation adds an element to a stack?",
  options: ["Pop", "Push", "Peek", "Delete"],
  answer: "Push"
},

{
  id: 165,
  section: "DSA",
  topic: "Stack",
  type: "mcq",
  question: "Which operation removes the top element from a stack?",
  options: ["Push", "Pop", "Insert", "Peek"],
  answer: "Pop"
},

{
  id: 166,
  section: "DSA",
  topic: "Stack",
  type: "mcq",
  question: "Which data structure is commonly used to implement function call management?",
  options: ["Queue", "Stack", "Heap", "Graph"],
  answer: "Stack"
},

{
  id: 167,
  section: "DSA",
  topic: "Queue",
  type: "mcq",
  question: "Which principle does a queue follow?",
  options: ["LIFO", "FIFO", "Random", "Priority only"],
  answer: "FIFO"
},

{
  id: 168,
  section: "DSA",
  topic: "Queue",
  type: "mcq",
  question: "Which operation inserts an element into a queue?",
  options: ["Dequeue", "Enqueue", "Pop", "Peek"],
  answer: "Enqueue"
},

{
  id: 169,
  section: "DSA",
  topic: "Queue",
  type: "mcq",
  question: "Which operation removes an element from a queue?",
  options: ["Push", "Enqueue", "Dequeue", "Insert"],
  answer: "Dequeue"
},

{
  id: 170,
  section: "DSA",
  topic: "Queue",
  type: "mcq",
  question: "Which queue connects the last position back to the first position?",
  options: [
    "Simple Queue",
    "Circular Queue",
    "Priority Queue",
    "Linear Queue"
  ],
  answer: "Circular Queue"
},

{
  id: 171,
  section: "DSA",
  topic: "Searching",
  type: "mcq",
  question: "Binary search requires the data to be arranged in what manner?",
  options: [
    "Random order",
    "Sorted order",
    "Reverse memory order",
    "Hash order"
  ],
  answer: "Sorted order"
},

{
  id: 172,
  section: "DSA",
  topic: "Searching",
  type: "mcq",
  question: "Which search algorithm checks elements one by one?",
  options: [
    "Binary Search",
    "Linear Search",
    "Jump Search",
    "Hash Search"
  ],
  answer: "Linear Search"
},

{
  id: 173,
  section: "DSA",
  topic: "Sorting",
  type: "mcq",
  question: "Which sorting algorithm repeatedly compares adjacent elements?",
  options: [
    "Merge Sort",
    "Bubble Sort",
    "Heap Sort",
    "Quick Sort"
  ],
  answer: "Bubble Sort"
},

{
  id: 174,
  section: "DSA",
  topic: "Sorting",
  type: "mcq",
  question: "What is the average-case time complexity of Merge Sort?",
  options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
  answer: "O(n log n)"
},

{
  id: 175,
  section: "DSA",
  topic: "Sorting",
  type: "mcq",
  question: "Which sorting algorithm uses a divide-and-conquer approach?",
  options: [
    "Bubble Sort",
    "Merge Sort",
    "Selection Sort",
    "Counting only"
  ],
  answer: "Merge Sort"
},

{
  id: 176,
  section: "DSA",
  topic: "Sorting",
  type: "mcq",
  question: "Which sorting algorithm selects a pivot element?",
  options: [
    "Bubble Sort",
    "Quick Sort",
    "Selection Sort",
    "Insertion Sort"
  ],
  answer: "Quick Sort"
},

{
  id: 177,
  section: "DSA",
  topic: "Sorting",
  type: "mcq",
  question: "What is the worst-case time complexity of Quick Sort?",
  options: ["O(log n)", "O(n)", "O(n log n)", "O(n²)"],
  answer: "O(n²)"
},

{
  id: 178,
  section: "DSA",
  topic: "Recursion",
  type: "mcq",
  question: "What is required to stop a recursive function from calling itself indefinitely?",
  options: [
    "Loop",
    "Base case",
    "Array",
    "Pointer"
  ],
  answer: "Base case"
},

{
  id: 179,
  section: "DSA",
  topic: "Recursion",
  type: "mcq",
  question: "Which data structure is primarily used internally to manage recursive function calls?",
  options: ["Queue", "Stack", "Heap", "Graph"],
  answer: "Stack"
},

{
  id: 180,
  section: "DSA",
  topic: "Trees",
  type: "mcq",
  question: "What is the topmost node of a tree called?",
  options: ["Leaf", "Root", "Parent", "Child"],
  answer: "Root"
},

{
  id: 181,
  section: "DSA",
  topic: "Trees",
  type: "mcq",
  question: "A node with no children is called what?",
  options: ["Root", "Parent", "Leaf", "Branch"],
  answer: "Leaf"
},

{
  id: 182,
  section: "DSA",
  topic: "Binary Tree",
  type: "mcq",
  question: "What is the maximum number of children a node can have in a binary tree?",
  options: ["1", "2", "3", "Unlimited"],
  answer: "2"
},

{
  id: 183,
  section: "DSA",
  topic: "Tree Traversal",
  type: "mcq",
  question: "Which traversal follows Root, Left, Right?",
  options: [
    "Inorder",
    "Preorder",
    "Postorder",
    "Level order"
  ],
  answer: "Preorder"
},

{
  id: 184,
  section: "DSA",
  topic: "Tree Traversal",
  type: "mcq",
  question: "Which traversal follows Left, Root, Right?",
  options: [
    "Preorder",
    "Inorder",
    "Postorder",
    "Level order"
  ],
  answer: "Inorder"
},

{
  id: 185,
  section: "DSA",
  topic: "Tree Traversal",
  type: "mcq",
  question: "Which traversal follows Left, Right, Root?",
  options: [
    "Preorder",
    "Inorder",
    "Postorder",
    "Level order"
  ],
  answer: "Postorder"
},

{
  id: 186,
  section: "DSA",
  topic: "Binary Search Tree",
  type: "mcq",
  question: "In a Binary Search Tree, values in the left subtree are generally what relative to the node?",
  options: [
    "Greater",
    "Smaller",
    "Equal only",
    "Unrelated"
  ],
  answer: "Smaller"
},

{
  id: 187,
  section: "DSA",
  topic: "Binary Search Tree",
  type: "mcq",
  question: "What does an inorder traversal of a Binary Search Tree produce?",
  options: [
    "Reverse order only",
    "Sorted order",
    "Random order",
    "Level order"
  ],
  answer: "Sorted order"
},

{
  id: 188,
  section: "DSA",
  topic: "Heap",
  type: "mcq",
  question: "Which data structure is commonly used to implement a priority queue?",
  options: ["Stack", "Heap", "Linked List only", "Graph"],
  answer: "Heap"
},

{
  id: 189,
  section: "DSA",
  topic: "Heap",
  type: "mcq",
  question: "In a max heap, where is the largest element located?",
  options: [
    "At the root",
    "At the last leaf",
    "At any random node",
    "In the left subtree"
  ],
  answer: "At the root"
},

{
  id: 190,
  section: "DSA",
  topic: "Hashing",
  type: "mcq",
  question: "What is the main purpose of a hash function?",
  options: [
    "Sort data",
    "Map a key to a hash value",
    "Create a tree",
    "Reverse an array"
  ],
  answer: "Map a key to a hash value"
},

{
  id: 191,
  section: "DSA",
  topic: "Hashing",
  type: "mcq",
  question: "What is a collision in hashing?",
  options: [
    "Two keys producing the same hash location",
    "Deleting a key",
    "Sorting two keys",
    "Searching an empty table"
  ],
  answer: "Two keys producing the same hash location"
},

{
  id: 192,
  section: "DSA",
  topic: "Graphs",
  type: "mcq",
  question: "What is a graph made up of?",
  options: [
    "Only arrays",
    "Vertices and edges",
    "Only nodes",
    "Stacks and queues"
  ],
  answer: "Vertices and edges"
},

{
  id: 193,
  section: "DSA",
  topic: "Graphs",
  type: "mcq",
  question: "Which traversal explores a graph level by level?",
  options: ["DFS", "BFS", "Binary Search", "Merge Sort"],
  answer: "BFS"
},

{
  id: 194,
  section: "DSA",
  topic: "Graphs",
  type: "mcq",
  question: "Which data structure is commonly used by BFS?",
  options: ["Stack", "Queue", "Heap", "Array only"],
  answer: "Queue"
},

{
  id: 195,
  section: "DSA",
  topic: "Graphs",
  type: "mcq",
  question: "Which traversal explores as far as possible along a branch before backtracking?",
  options: ["BFS", "DFS", "Binary Search", "Heap Sort"],
  answer: "DFS"
},

{
  id: 196,
  section: "DSA",
  topic: "Dynamic Programming",
  type: "mcq",
  question: "Dynamic Programming is mainly useful when a problem has what properties?",
  options: [
    "Overlapping subproblems and optimal substructure",
    "Only sorted input",
    "Only one possible solution",
    "No repeated calculations"
  ],
  answer: "Overlapping subproblems and optimal substructure"
},

{
  id: 197,
  section: "DSA",
  topic: "Greedy Algorithm",
  type: "mcq",
  question: "What does a greedy algorithm generally do?",
  options: [
    "Always explores every possible solution",
    "Makes the best local choice at each step",
    "Uses recursion only",
    "Always uses dynamic programming"
  ],
  answer: "Makes the best local choice at each step"
},

{
  id: 198,
  section: "DSA",
  topic: "Backtracking",
  type: "mcq",
  question: "What is the main idea of backtracking?",
  options: [
    "Try choices and undo them when they lead to an invalid solution",
    "Always choose the largest value",
    "Sort all elements first",
    "Use only arrays"
  ],
  answer: "Try choices and undo them when they lead to an invalid solution"
},

{
  id: 199,
  section: "DSA",
  topic: "Shortest Path",
  type: "mcq",
  question: "Which algorithm is commonly used to find shortest paths from a source in a graph with non-negative edge weights?",
  options: [
    "Dijkstra's algorithm",
    "Bubble Sort",
    "Binary Search",
    "Kruskal's algorithm"
  ],
  answer: "Dijkstra's algorithm"
},

{
  id: 200,
  section: "DSA",
  topic: "Minimum Spanning Tree",
  type: "mcq",
  question: "Which algorithms are commonly used to find a Minimum Spanning Tree?",
  options: [
    "Kruskal's and Prim's",
    "Binary Search and BFS",
    "Merge Sort and Quick Sort",
    "DFS and Binary Search"
  ],
  answer: "Kruskal's and Prim's"
}
]