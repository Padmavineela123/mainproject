# Admin panel setup

The supplied student website is preserved. The admin area is added separately.

## Run

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Admin login

Open:

http://localhost:5173/admin

The demo credentials are configured in `server/.env` through:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Change the password before deployment.

## Admin dashboard shows

- Total registered users
- Active users (successful login within the last 30 days)
- Total recorded test attempts
- Average and highest score
- Average completion
- Performance by recorded test category
- Recent test activity with student, test, score and date
- Recent registered users

## Important

The current supplied Coding and Verbal pages do not send a completed score to the backend TestResult collection. The admin dashboard therefore does not invent scores for those areas. It displays only results that are actually stored.

The existing student routes and pages were left in place.
