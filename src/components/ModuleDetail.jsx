// src/components/ModuleDetail.jsx
import { LEVEL_COLORS, TYPE_COLORS } from "../data/modules";

const S = {
  icon:    { fontSize: 52 },
  h1:      { fontSize: 26, fontWeight: 900, color: "#f1f5f9", letterSpacing: -0.5, margin: 0, marginBottom: 6 },
  badge:   { fontSize: 11, fontWeight: 700, border: "1px solid", borderRadius: 20, padding: "2px 10px", textTransform: "uppercase", letterSpacing: 0.5 },
  meta:    { fontSize: 13, color: "#64748b" },
  barBg:   { height: 6, background: "#1e293b", borderRadius: 99, marginBottom: 32, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 99, transition: "width .4s" },
  list:    { display: "flex", flexDirection: "column", gap: 10 },
  circle:  { width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 },
  info:    { flex: 1, minWidth: 0 },
  title:   { fontWeight: 700, fontSize: 15 },
  dur:     { fontSize: 12, color: "#475569", marginTop: 2 },
  typePill:{ fontSize: 11, fontWeight: 700, borderRadius: 20, padding: "2px 10px", textTransform: "uppercase", letterSpacing: 0.5 },
  openBtn: { border: "none", borderRadius: 8, padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer", color: "#0a0f1a", fontFamily: "inherit", minHeight: 36 },
};

function getFirstUnlocked(lessons, progress) {
  const idx = lessons.findIndex(l => !progress[l.id]);
  return idx === -1 ? lessons.length : idx;
}

export default function ModuleDetail({ mod, progress, onBack, onOpenLesson, onShowToast }) {
  const fi  = getFirstUnlocked(mod.lessons, progress);
  const pct = mod.lessons.length ? Math.round((Object.keys(progress).length / mod.lessons.length) * 100) : 0;
  const lc  = LEVEL_COLORS[mod.level];

  const handleClick = (lesson, idx) => {
    if (idx < fi) {
      onOpenLesson(lesson);
    } else if (idx === fi) {
      onOpenLesson(lesson);
    } else {
      onShowToast("🔒 Complete the previous task first!");
    }
  };

  return (
    <div className="panel-narrow">
      <button className="btn-back" onClick={onBack}>← Back</button>

      <div className="detail-header">
        <span style={S.icon}>{mod.icon}</span>
        <div>
          <h1 style={S.h1}>{mod.title}</h1>
          <div className="meta-row">
            <span style={{ ...S.badge, color: lc, background: lc + "18", borderColor: lc + "44" }}>{mod.level}</span>
            <span style={S.meta}>🕐 {mod.duration}</span>
            <span style={S.meta}>📖 {mod.lessons.length} tasks</span>
            <span style={{ ...S.meta, color: "#22c55e" }}>✅ {pct}% done</span>
          </div>
        </div>
      </div>

      {/* progress bar */}
      <div style={S.barBg}>
        <div style={{ ...S.barFill, width: `${pct}%`, background: mod.color }} />
      </div>

      {/* lesson list */}
      <div style={S.list}>
        {mod.lessons.map((lesson, idx) => {
          const isDone    = idx < fi;
          const isCurrent = idx === fi;
          const isLocked  = idx > fi;
          const tc = TYPE_COLORS[lesson.type] || "#3b82f6";

          return (
            <div
              key={lesson.id}
              className="lesson-row"
              style={{
                opacity: isLocked ? 0.4 : 1,
                cursor:  isLocked ? "not-allowed" : "pointer",
                borderColor: isCurrent ? tc + "55" : "#1e293b",
              }}
              onClick={() => handleClick(lesson, idx)}
            >
              {/* status circle */}
              <div style={{
                ...S.circle,
                background: isDone ? "#22c55e22" : isCurrent ? tc + "22" : "#1e293b",
                border: `2px solid ${isDone ? "#22c55e" : isCurrent ? tc : "#334155"}`,
                color:  isDone ? "#22c55e" : isCurrent ? tc : "#475569",
                fontSize: isLocked ? 16 : 14,
              }}>
                {isDone ? "✓" : isLocked ? "🔒" : idx + 1}
              </div>

              <div style={S.info}>
                <div style={{ ...S.title, color: isLocked ? "#475569" : "#f1f5f9" }}>{lesson.title}</div>
                <div style={S.dur}>{lesson.duration}</div>
              </div>

              <span style={{ ...S.typePill, color: tc, background: tc + "18" }}>{lesson.type}</span>

              {isDone    && <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 700, minWidth: 50, textAlign: "right" }}>Done</span>}
              {isCurrent && <span style={{ ...S.openBtn, background: tc }}>Open →</span>}
              {isLocked  && <span style={{ fontSize: 12, color: "#334155", minWidth: 50, textAlign: "right" }}>Locked</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
