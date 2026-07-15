import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { ProjectsProvider } from "./context/ProjectsContext";

export const metadata = {
  title: "Project Tracker",
  description: "Global header and footer example",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProjectsProvider>
        <Header />

        {/* Sidebar + wording + main content */}
        <div className="layout-container">
          <Sidebar />
          <div className="content-area">
            {/* Page content */}
            <main className="main-content" style={{ minHeight: "70vh" }}>
              {children}
            </main>
          </div>
        </div>

        <Footer />
        </ProjectsProvider>
      </body>
    </html>
  );
}
