import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

// Each Next.js API route (like this one) is a serverless function.
// Database connection and user operations are performed only when required, ensuring efficiency and scalability.
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  // After user authenticate with Google, Google redirects them back to the application with a token and cal callbacks
  callbacks: {
    // The session refers to the user's session object, which stores user-related data during their active login session.
    // we want to be able to get user to keep an exisiting running session
    // Where is the Session Used? It's accessible throughout your Next.js application via the useSession() hook or the getSession() server-side helper
    async session({ session }) {
      console.log("session created")
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      //   This allows the application to reference the MongoDB user ID in subsequent operations.
      session.user.id = sessionUser._id.toString();

      // making sure which user is currently online
      return session;
    },
    // to get session we need to sign user in
    // every nextjs route is a serverles route 
    // so here lamda function is called once and not redunctly 
    // so here we sign in menaing conenct to dtaabse sign in and get user to start session
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();
        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true  // Allow the sign-in to proceed.
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false // Prevent sign-in if an error occurs.
      }
    }
  }
})

export { handler as GET, handler as POST }

// Diagram of the Flow
// User Action:
// Clicks "Sign in with Google."
// Google OAuth:
// Redirects to Google, authenticates, and redirects back to the app.
// signIn Callback:
// Checks/creates a user record in MongoDB.
// Session Initialization:
// Customizes the session object with MongoDB _id.
// Frontend Access:
// Session is accessible via useSession() or getSession().