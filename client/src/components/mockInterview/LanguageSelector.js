
export default function LanguageSelector({ setTheme }) {
    return (
      <select
        onChange={(e) => setTheme(e.target.value)}
        className="p-2 rounded border"
      >
        <option value="vs-dark">Dark</option>
        <option value="light">Light</option>
      </select>
    );
  }
  