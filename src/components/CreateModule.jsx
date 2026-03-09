// src/components/CreateModule.jsx
import { useState } from "react";
import { ICON_OPTIONS } from "../data/modules";

const S = {
  h1:      { fontSize: 28, fontWeight: 900, color: "#f1f5f9", letterSpacing: -0.5, margin: 0, marginBottom: 4 },
  sub:     { fontSize: 14, color: "#64748b", marginTop: 4, marginBottom: 28 },
  card:    { background: "#0d1526", border: "1px solid #1e293b", borderRadius: 16, padding: 32, maxWidth: 620 },
  lbl:     { fontSize: 11, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 },
  inp:     { background: "#060c17", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box", minHeight: 44 },
  iconBtn: { background: "#060c17", border: "1px solid #1e293b", borderRadius: 8, padding: "8px", fontSize: 24, cursor: "pointer", width: 56, textAlign: "center", minHeight: 44 },
  picker:  { position: "absolute", top: "105%", left: 0, background: "#0d1526", border: "1px solid #1e293b", borderRadius: 12, padding: 10, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4, zIndex: 50, width: 220 },
  pickerB: { background: "none", border: "none", fontSize: 22, cursor: "pointer", padding: 6, borderRadius: 6, minWidth: 40, minHeight: 40 },
  chip:    { display: "flex", alignItems: "center", gap: 10, background: "#060c17", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 14px" },
  chipNum: { width: 22, height: 22, borderRadius: "50%", background: "#22d3ee22", color: "#22d3ee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 },
  chipDel: { background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 18, marginLeft: "auto", lineHeight: 1, minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" },
  addRow:  { display: "flex", gap: 10 },
  addBtn:  { background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#94a3b8", padding: "10px 18px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, minHeight: 44 },
};

export default function CreateModule({ onBack, onSave, onToast }) {
  const [form, setForm]       = useState({ title: "", level: "Beginner", duration: "", icon: "💡" });
  const [lessons, setLessons] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const addLesson = () => {
    if (!newTitle.trim()) return;
    setLessons(l => [...l, newTitle.trim()]);
    setNewTitle("");
  };

  const removeLesson = (i) => setLessons(l => l.filter((_, j) => j !== i));

  const save = () => {
    if (!form.title.trim()) { onToast("⚠️ Please add a module title."); return; }
    if (lessons.length === 0) { onToast("⚠️ Add at least one lesson."); return; }
    const mod = {
      id: "my_" + Date.now(),
      title:    form.title,
      level:    form.level,
      duration: form.duration || "—",
      icon:     form.icon,
      color:    "#10b981",
      lessons:  lessons.map((t, i) => ({
        id: i + 1, title: t, type: "lesson", duration: "20 min",
        content: `Complete this lesson: ${t}`,
      })),
    };
    onSave(mod);
  };

  return (
    <div className="panel">
      <button className="btn-back" onClick={onBack}>← Back</button>
      <h1 style={S.h1}>Create a Module</h1>
      <p style={S.sub}>Build your own step-by-step coding path</p>

      <div style={S.card}>
        {/* Title + Icon */}
        <div className="form-row">
          <div className="form-group">
            <label style={S.lbl}>Module Title</label>
            <input style={S.inp} placeholder="e.g. TypeScript Deep Dive"
              value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={S.lbl}>Icon</label>
            <div style={{ position: "relative" }}>
              <button style={S.iconBtn} onClick={() => setShowPicker(p => !p)}>{form.icon}</button>
              {showPicker && (
                <div style={S.picker}>
                  {ICON_OPTIONS.map(ic => (
                    <button key={ic} style={S.pickerB}
                      onClick={() => { setForm({ ...form, icon: ic }); setShowPicker(false); }}>
                      {ic}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Level + Duration */}
        <div className="form-row">
          <div className="form-group">
            <label style={S.lbl}>Level</label>
            <select style={S.inp} value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div className="form-group">
            <label style={S.lbl}>Estimated Duration</label>
            <input style={S.inp} placeholder="e.g. 3 hrs"
              value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
          </div>
        </div>

        {/* Lessons */}
        <label style={S.lbl}>Lessons (unlock one by one in order)</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10, marginBottom: 12 }}>
          {lessons.map((l, i) => (
            <div key={i} style={S.chip}>
              <span style={S.chipNum}>{i + 1}</span>
              <span style={{ flex: 1, color: "#cbd5e1", fontSize: 14 }}>{l}</span>
              <button style={S.chipDel} onClick={() => removeLesson(i)}>×</button>
            </div>
          ))}
        </div>
        <div style={{ ...S.addRow, marginBottom: 24 }}>
          <input style={{ ...S.inp, flex: 1 }} placeholder="Add a lesson title and press Enter…"
            value={newTitle} onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") addLesson(); }} />
          <button style={S.addBtn} onClick={addLesson}>+ Add</button>
        </div>

        <button className="btn-primary" onClick={save}>🚀 Create Module</button>
      </div>
    </div>
  );
}
