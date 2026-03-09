// src/components/LessonView.jsx

const S = {
  pill:    { display: "inline-block", background: "#3b82f622", color: "#60a5fa", border: "1px solid #3b82f644", borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 700, marginBottom: 10 },
  h1:      { fontSize: 26, fontWeight: 900, color: "#f1f5f9", letterSpacing: -0.5, margin: 0, marginBottom: 4 },
  dur:     { fontSize: 14, color: "#64748b", marginBottom: 24 },
  card:    { background: "#0d1526", border: "1px solid #1e293b", borderRadius: 16, padding: 28, marginBottom: 8 },
  body:    { fontSize: 15, color: "#cbd5e1", lineHeight: 1.8, marginBottom: 24, marginTop: 0 },
  dots:    { display: "flex", gap: 6, padding: "10px 14px", borderBottom: "1px solid #1e293b" },
  dot:     { width: 10, height: 10, borderRadius: "50%", background: "#334155", display: "inline-block" },
  done:    { color: "#22c55e", fontWeight: 700, fontSize: 15, marginTop: 20 },
};

export default function LessonView({ lesson, alreadyDone, onBack, onComplete }) {
  const isProject = lesson.type === "project";
  const pillColor = isProject
    ? { background: "#10b98122", color: "#34d399", borderColor: "#10b98144" }
    : { background: "#3b82f622", color: "#60a5fa",  borderColor: "#3b82f644" };

  return (
    <div className="panel-lesson">
      <button className="btn-back" onClick={onBack}>← Back to Module</button>

      <span style={{ ...S.pill, ...pillColor }}>
        {isProject ? "🔨 Project" : "📖 Lesson"}
      </span>
      <h1 style={S.h1}>{lesson.title}</h1>
      <p style={S.dur}>🕐 {lesson.duration}</p>

      <div style={S.card}>
        <p style={S.body}>{lesson.content}</p>
        <div className="code-box">
          <div style={S.dots}><span style={S.dot}/><span style={S.dot}/><span style={S.dot}/></div>
          <pre>{`# ${lesson.title}\n\n# Write your solution here...\nprint("Let's code! 🚀")`}</pre>
        </div>
      </div>

      {alreadyDone
        ? <div style={S.done}>✓ Already completed — great work!</div>
        : (
          <button className="btn-primary" onClick={onComplete} style={{ marginTop: 20 }}>
            ✅ Mark Complete &amp; Unlock Next
          </button>
        )}
    </div>
  );
}
