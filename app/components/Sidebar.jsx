export default function sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">📊 Project Tracker</h2>
      <nav>
        <ul className="sidebar-list">
          <li><a href="/" className="sidebar-link">🏠 Home</a></li>
          <li><a href="/projects" className="sidebar-link">📄 Projects</a></li>
          <li><a href="/settings" className="sidebar-link">⚙️ Settings</a></li>
        </ul>
      </nav>
    </aside>
  );
}