# Final UI and Flow Updates

- Home page upper hero redesigned to match the supplied dark blue/purple reference style; lower home sections preserved.
- Removed question-count badges from selection UI; timed rounds remain enforced.
- Aptitude remains Basic (60 / 30 min) and Advanced (30 / 30 min).
- Verbal remains two sequential 30-question rounds with 30-minute timers.
- Technical remains C, Java, Python and DSA with 20-minute rounds.
- Coding keeps Easy (15), Medium (15) and Hard (10) placement-focused problems; no separate Advanced difficulty. Medium problems are shown in the visible two-column problem list so they are not hidden in the middle.
- Coding problem data includes DSA and pattern problems with test cases.
- HR now shuffles the 15 loaded prompts for each session, 5 per round, 3 sequential rounds, with feedback after every round.
- HR header now has a navigation pane and shows the logged-in email.
- Dashboard/Aptitude/Technical navigation now includes Verbal in the correct order.
- Results page round cards are constrained to the container so the HR card cannot overflow outside the page.
- Results page includes an AI Feedback Analyzer panel and Areas to Improve section.
- Coding and Results headers show the logged-in email.

## Coding database refresh
Because Coding loads problems from MongoDB, rerun the coding seed after starting MongoDB/server:

```bash
cd server
node seed/seedCodingPoblems.js
```

This replaces the existing coding question set with the current 15 Easy + 15 Medium + 10 Hard set.
