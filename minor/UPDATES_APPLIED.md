# Website Updates Applied

## Main changes
- Redesigned the Home page with a modern placement-focused hero, dashboard preview and feature sections.
- Removed repeated question-count displays from landing/selection screens.
- Aptitude Basic: 60 randomly selected questions, 30 minutes.
- Aptitude Advanced: 30 randomly selected questions, 30 minutes.
- Verbal: two sequential rounds, 30 questions each, 30 minutes each. Round 2 unlocks only after Round 1 submission.
- Removed Aptitude Practice Tips section.
- Technical: C, Java, Python and DSA sections use a focused set of 25 random questions per section and a 20-minute timer.
- Technical submission now opens an AI feedback result page instead of a browser alert.
- Coding: 15 Easy + 15 Medium + 15 Hard placement/DSA/pattern problems.
- Coding now displays test cases and has a local C/Java/Python compiler/test runner endpoint.
- HR: 3 sequential rounds, 5 random questions per round. A new random set is loaded per session; later rounds stay locked until the previous round is submitted.
- HR supports text and browser voice input.
- Added AI feedback/suggestions result page for completed rounds.
- Results page now includes Verbal results and Areas to Improve.
- User name/email is shown in top profile areas where the page has a profile header.
- Navigation legend label changed from "Current" to "Correct" as requested.
- Existing Admin panel files/routes were preserved.

## Required after extracting

### 1. Client
Open `client`:
```bash
npm install
npm run dev
```

### 2. Server
Open `server`:
```bash
npm install
npm run dev
```

Use the same working `.env` values from your existing project. Do not put database credentials in a public repository.

### 3. Reseed coding problems
The coding bank was changed to 45 problems and test cases were added. Run:
```bash
cd server
node seed/seedCodingPoblems.js
```

This replaces the old coding bank with:
- Easy: 15
- Medium: 15
- Hard: 15

### 4. Compiler requirements
The new local compiler endpoint uses the computer's installed tools:
- C: `gcc`
- Java: `javac` + `java`
- Python: `python`

If one of these is not installed or is not on PATH, that language will report a compiler error instead of silently pretending the code passed.

The compiler endpoint is intended for a local student/demo environment. Do not expose arbitrary code execution to the public internet without adding a proper sandbox/container isolation layer.
