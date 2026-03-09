// src/components/LearningModules.jsx
import ModuleCard from "./ModuleCard";

const S = {
  h1:  { fontSize: 28, fontWeight: 900, color: "#f1f5f9", letterSpacing: -0.5, margin: 0, marginBottom: 4 },
  sub: { fontSize: 14, color: "#64748b", marginTop: 4, marginBottom: 28 },
  tip: { display: "inline-flex", alignItems: "center", gap: 6, background: "#22d3ee11", border: "1px solid #22d3ee22", borderRadius: 8, padding: "6px 14px", fontSize: 12, color: "#22d3ee", marginBottom: 24 },
};

export default function LearningModules({ modules, progress, favorites, onToggleFav, onOpen }) {
  return (
    <div className="panel">
      <h1 style={S.h1}>Learning Modules</h1>
      <p style={S.sub}>{modules.length} courses available · Click any module to start</p>

      <div style={S.tip}>
        ❤️ Tap the heart on any card to save it to <strong style={{ marginLeft: 4 }}>My Modules</strong>
      </div>

      <div className="module-grid">
        {modules.map(mod => (
          <ModuleCard
            key={mod.id}
            mod={mod}
            progress={progress[mod.id] || {}}
            isFav={favorites.has(mod.id)}
            onToggleFav={onToggleFav}
            onClick={() => onOpen(mod, "learn")}
          />
        ))}
      </div>
    </div>
  );
}
