import Link from "next/link";

export default function sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">📊 Project Tracker</h2>
      <nav>
        <ul className="sidebar-list">
          <li><Link href="/" className="sidebar-link">🏠 Home</Link></li>
          <li><Link href="/projects" className="sidebar-link">📄 Projects</Link></li>
          <li><Link href="/settings" className="sidebar-link">⚙️ Settings</Link></li>
        </ul>
      </nav>
    </aside>
  );
}