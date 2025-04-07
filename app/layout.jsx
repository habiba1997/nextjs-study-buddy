import "@styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MyNavbar from "@components/MyNavBar";
import Provider from "@components/future/Provider";

export const metadata = {
  title: "StudyBuddy",
  description: "Discover & Save common study resources",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <div className="main">
        <div className="gradient" />
      </div>

      <main className="app">
        <MyNavbar />

        {children}
      </main>
    </body>
  </html>
);

export default RootLayout;
