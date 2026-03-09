// src/components/QuizView.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { QUIZ_DATA } from "../data/quizData";

const S = {
  pill:    { display: "inline-block", background: "#f59e0b22", color: "#fbbf24", border: "1px solid #f59e0b44", borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 700, marginBottom: 10 },
  h1:      { fontSize: 26, fontWeight: 900, color: "#f1f5f9", letterSpacing: -0.5, margin: 0, marginBottom: 24 },
  card:    { background: "#0d1526", border: "1px solid #1e293b", borderRadius: 16, padding: 28 },
  qMeta:   { display: "flex", justifyContent: "space-between", fontSize: 13, color: "#64748b", marginBottom: 6 },
  barBg:   { height: 4, background: "#1e293b", borderRadius: 99, marginBottom: 28, overflow: "hidden" },
  barFill: { height: "100%", background: "#f59e0b", borderRadius: 99, transition: "width .3s" },
  q:       { fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 24, lineHeight: 1.4 },
  opts:    { display: "flex", flexDirection: "column", gap: 12 },
  score:   { fontSize: 54, fontWeight: 900, lineHeight: 1 },
  scoreLbl:{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", margin: "6px 0 24px" },
  reviewR: { border: "1px solid", borderRadius: 10, padding: "14px 18px", marginBottom: 10 },
  fallback:{ color: "#94a3b8", marginBottom: 20 },
};

export default function QuizView({ lesson, onBack, onComplete }) {
  const [qs, setQs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers]  = useState([]);
  const [done, setDone]        = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    if (apiUrl) {
      axios.get(`${apiUrl}/quizzes/${lesson.title}`)
        .then(res => {
          if (res.data && res.data.length > 0) {
            setQs(res.data);
          } else {
            // Fallback to local quiz data
            setQs(QUIZ_DATA[lesson.title] || []);
          }
          setLoading(false);
        })
        .catch(() => {
          setQs(QUIZ_DATA[lesson.title] || []);
          setLoading(false);
        });
    } else {
      setQs(QUIZ_DATA[lesson.title] || []);
      setLoading(false);
    }
  }, [lesson.title]);

  const answer = (opt) => {
    const newAnswers = [...answers, opt];
    if (current + 1 >= qs.length) {
      setAnswers(newAnswers);
      setDone(true);
      onComplete(); // mark as done in parent
    } else {
      setAnswers(newAnswers);
      setCurrent(c => c + 1);
    }
  };

  const score = done ? answers.reduce((s, a, i) => s + (a === qs[i]?.answer ? 1 : 0), 0) : 0;

  return (
    <div className="panel-quiz">
      <button className="btn-back" onClick={onBack}>← Back to Module</button>
      <span style={S.pill}>🧠 Quiz</span>
      <h1 style={S.h1}>{lesson.title}</h1>

      <div style={S.card}>
        {loading ? (
          <div style={{ color: "#94a3b8", padding: 20 }}>Loading Quiz...</div>
        ) : done ? (
          // Results screen
          <>
            <div style={{ ...S.score, color: score === qs.length ? "#22c55e" : score >= qs.length / 2 ? "#f59e0b" : "#ef4444" }}>
              {score}/{qs.length}
            </div>
            <div style={S.scoreLbl}>
              {score === qs.length ? "🎉 Perfect Score!" : score >= qs.length / 2 ? "👍 Good Work!" : "📚 Keep Practicing!"}
            </div>
            {qs.map((q, i) => (
              <div key={i} style={{ ...S.reviewR, borderColor: answers[i] === q.answer ? "#22c55e55" : "#ef444455" }}>
                <div style={{ fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>{q.q}</div>
                <div style={{ color: answers[i] === q.answer ? "#22c55e" : "#ef4444", fontSize: 14 }}>
                  {answers[i] === q.answer ? "✓ " : "✗ "}{q.options[answers[i]]}
                </div>
                {answers[i] !== q.answer && (
                  <div style={{ color: "#64748b", fontSize: 13 }}>Correct: {q.options[q.answer]}</div>
                )}
              </div>
            ))}
            <button className="btn-primary" style={{ marginTop: 20 }} onClick={onBack}>← Back to Module</button>
          </>
        ) : qs.length > 0 ? (
          // Question screen
          <>
            <div style={S.qMeta}>
              <span>Question {current + 1} of {qs.length}</span>
              <span>{Math.round((current / qs.length) * 100)}%</span>
            </div>
            <div style={S.barBg}>
              <div style={{ ...S.barFill, width: `${(current / qs.length) * 100}%` }} />
            </div>
            <div style={S.q}>{qs[current].q}</div>
            <div style={S.opts}>
              {qs[current].options.map((opt, i) => (
                <button key={i} className="quiz-option" onClick={() => answer(i)}>{opt}</button>
              ))}
            </div>
          </>
        ) : (
          // No questions fallback
          <>
            <p style={S.fallback}>No questions for this quiz yet.</p>
            <button className="btn-primary" onClick={() => { onComplete(); onBack(); }}>Mark Complete</button>
          </>
        )}
      </div>
    </div>
  );
}
