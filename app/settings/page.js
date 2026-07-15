// app/settings/page.jsx

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-8">⚙️ Settings</h1>

      {/* Profile Settings */}
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <h2 className="text-xl font-semibold underline">👤 Profile Settings</h2>
        <p className="text-gray-600">Manage your profile information</p>
      </div>

      {/* Appearance */}
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <h2 className="text-xl font-semibold underline">🌞 Appearance</h2>
        <p className="text-gray-600">Light mode</p>
      </div>

      {/* Notifications */}
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <h2 className="text-xl font-semibold underline">🔔 Notifications</h2>
        <p className="text-gray-600">Manage notification preferences</p>
      </div>

      {/* About */}
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <h2 className="text-xl font-semibold underline">ℹ️ About</h2>
        <p className="text-gray-600">Learn more about the app</p>
        <p className="text-sm text-gray-500 mt-1">Version 1.0.0</p>
      </div>
    </div>
  );
}
