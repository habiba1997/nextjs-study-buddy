'use client';

import { SessionProvider } from "next-auth/react";

// Future work
//  to implement session and google login and user and database use link https://www.youtube.com/watch?v=wm5gMKuwSYk
//  wrap other compenents with it to provide session
const Provider = ({ children, session }) => (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
)

export default Provider;