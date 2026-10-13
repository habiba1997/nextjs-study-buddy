# Study Buddy

A study-resource frontend for browsing and editing questions, answers, and notes. It includes Google sign-in scaffolding and connects to a local study backend.

**Technologies:** Next.js 15, React 19, JavaScript, Bootstrap, Tailwind CSS, NextAuth, and MongoDB/Mongoose.

## Run locally

1. Install Node.js 20+ and run `npm install`.
2. Configure a local `.env.local` with `GOOGLE_ID`, `GOOGLE_CLIENT_SECRET`, `MONGODB_URI`, `NEXTAUTH_URL`, and `NEXTAUTH_SECRET` if using Google sign-in.
3. Start the associated study backend and check the API URLs in the app.
4. Run `npm run dev` and open http://localhost:4000.

`npm run build` creates a production build. This is a learning prototype: the MongoDB helper in `utils/database.js` is currently commented out, so authentication needs completion before use. Docker files are experimental.
