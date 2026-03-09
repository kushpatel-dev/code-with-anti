// src/components/Sidebar.jsx

const S = {
  logo:     { display: "flex", alignItems: "center", gap: 10, padding: "0 20px 24px", borderBottom: "1px solid #1e293b" },
  logoIcon: { fontFamily: "monospace", fontWeight: 900, fontSize: 20, color: "#22d3ee" },
  logoText: { fontWeight: 700, fontSize: 18, color: "#f1f5f9", letterSpacing: 0.5 },
  nav:      { padding: "20px 12px", display: "flex", flexDirection: "column", gap: 4 },
  navBtn:   { background: "none", border: "none", borderLeft: "3px solid transparent", textAlign: "left", padding: "10px 14px", borderRadius: "0 8px 8px 0", cursor: "pointer", fontSize: 13, fontFamily: "inherit", transition: "all .15s", minHeight: 44 },
  footer:   { marginTop: "auto", padding: 20, borderTop: "1px solid #1e293b" },
  label:    { fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: 1 },
  bigNum:   { fontSize: 34, fontWeight: 900, color: "#22c55e", lineHeight: 1.1, margin: "4px 0" },
  bar:      { height: 4, background: "#1e293b", borderRadius: 99, overflow: "hidden", marginBottom: 8 },
  fill:     { height: "100%", background: "#22c55e", borderRadius: 99 },
  sub:      { fontSize: 12, color: "#475569" },
};

const NAV_ITEMS = [
  { key: "learn",    label: "📚 Learning Modules" },
  { key: "mine",     label: "❤️ My Modules" },
  { key: "progress", label: "📈 Progress" },
  { key: "create",   label: "➕ Create Module" },
];

export default function Sidebar({ section, onNav, overallPct, totalDone, totalLess, isOpen }) {
  return (
    <div className={`sidebar${isOpen ? " open" : ""}`}>
      {/* Logo */}
      <div style={S.logo}>
        <span style={S.logoIcon}>{"</>"}</span>
        <span style={S.logoText}>LearnCode</span>
      </div>

      {/* Nav */}
      <nav style={S.nav}>
        {NAV_ITEMS.map(n => (
          <button
            key={n.key}
            style={{
              ...S.navBtn,
              background: section === n.key ? "#22d3ee15" : "none",
              color:      section === n.key ? "#22d3ee"   : "#94a3b8",
              borderLeft: `3px solid ${section === n.key ? "#22d3ee" : "transparent"}`,
            }}
            onClick={() => onNav(n.key)}
          >
            {n.label}
          </button>
        ))}
      </nav>

      {/* Overall stats */}
      <div style={S.footer}>
        <div style={S.label}>Overall Progress</div>
        <div style={S.bigNum}>{overallPct}%</div>
        <div style={S.bar}>
          <div style={{ ...S.fill, width: `${overallPct}%` }} />
        </div>
        <div style={S.sub}>{totalDone}/{totalLess} tasks done</div>
      </div>
    </div>
  );
}
