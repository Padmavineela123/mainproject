# Admin panel

The project now includes a separate admin dashboard.

## Start

1. Keep the existing MongoDB configuration in `server/.env`.
2. Set these values in `server/.env`:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
3. Start the backend:
   `npm run dev`
4. Start the frontend:
   `npm run dev`
5. Open:
   `http://localhost:5173/admin`

The admin dashboard reads live data from MongoDB:
- total registered users
- active users (successful login within the last 30 days)
- total recorded test attempts
- average/highest scores
- round-wise performance
- recent test activity
- recent users

Student routes are unchanged.

Note: the current Coding and Verbal pages in the supplied project do not submit completed scores to `/api/tests`; therefore the admin dashboard cannot invent those results. They will show recorded data only after those pages are connected to the existing TestResult model.
