"use client";

import { questions } from "../data/questions";

interface Participant { name: string; joinedAt: number; finished?: boolean; }

interface QuizResultsProps {
  answers: Record<string, Record<number, number>>;
  participants: Record<string, Participant>;
}

export default function QuizResults({ answers, participants }: QuizResultsProps) {
  const total = Object.keys(participants).length;

  const getStats = (qi: number) => {
    const q = questions[qi];
    const counts = new Array(q.options.length).fill(0);
    Object.values(answers).forEach((ua) => {
      const chosen = ua[qi];
      if (chosen !== undefined && chosen >= 0 && chosen < counts.length) counts[chosen]++;
    });
    return { counts, correctIdx: q.options.findIndex((o) => o.correct) };
  };

  const scores = Object.entries(participants).map(([id, p]) => {
    const ua = answers[id] || {};
    const score = questions.filter((q, qi) => ua[qi] === q.options.findIndex((o: { correct: boolean }) => o.correct)).length;
    return { name: p.name, score };
  }).sort((a, b) => b.score - a.score);

  const medals = ["🥇", "🥈", "🥉"];
  const barColors = ["#c8a84b", "#7d9fc8", "#df7d7d", "#7ddf91"];

  return (
    <div className="qr">
      <div className="qr-top-line" />
      <h2 className="qr-title">📊 RESULTADOS FINALES</h2>

      {/* Ranking */}
      <section className="qr-section">
        <div className="qr-section-label">CLASIFICACIÓN</div>
        <div className="qr-scores">
          {scores.map((s, i) => (
            <div key={s.name} className="qr-score-row">
              <span className="qr-medal">{medals[i] ?? `${i + 1}.`}</span>
              <span className="qr-sname">{s.name}</span>
              <span className="qr-spts">{s.score}/{questions.length}</span>
              <div className="qr-sbar-wrap">
                <div className="qr-sbar" style={{ width: `${(s.score / questions.length) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gráficos por pregunta */}
      <section className="qr-section">
        <div className="qr-section-label">DETALLE POR PREGUNTA</div>
        <div className="qr-charts">
          {questions.map((q, qi) => {
            const { counts, correctIdx } = getStats(qi);
            const maxCount = Math.max(...counts, 1);
            return (
              <div key={q.id} className="qr-chart">
                <div className="qr-chart-head">
                  <img
                    src={`/images/quiz/${q.image}`}
                    alt={q.bird}
                    className="qr-chart-img"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.2"; }}
                  />
                  <div>
                    <div className="qr-chart-num">PREGUNTA {q.id}</div>
                    <div className="qr-chart-bird">{q.bird}</div>
                    <div className="qr-chart-sci">{q.scientific}</div>
                  </div>
                </div>
                <div className="qr-bars">
                  {q.options.map((opt, oi) => {
                    const isCorrect = oi === correctIdx;
                    const pct = (counts[oi] / maxCount) * 100;
                    const color = isCorrect ? "#7ddf91" : barColors[oi % barColors.length];
                    return (
                      <div key={oi} className="qr-bar-row">
                        <div className="qr-bar-label">
                          {isCorrect && <span className="qr-correct-tag">✓ CORRECTA</span>}
                          <span>{opt.text}</span>
                        </div>
                        <div className="qr-bar-track">
                          <div className="qr-bar-fill" style={{ width: `${pct}%`, background: color }} />
                          <span className="qr-bar-count">{counts[oi]}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <style>{`
        .qr {
          width: 100%;
          font-family: 'Share Tech', sans-serif;
          color: #f0e6c8;
        }
        .qr-top-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, #c8a84b, transparent);
          margin-bottom: 1.5rem;
        }
        .qr-title {
          font-size: 1.6rem;
          color: #c8a84b;
          letter-spacing: 0.1em;
          margin-bottom: 2rem;
        }

        /* SECTION */
        .qr-section {
          background: linear-gradient(145deg, #1e1b0a, #141200);
          border: 1px solid #3a3015;
          border-radius: 6px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .qr-section-label {
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          color: rgba(200,168,75,0.5);
          border-bottom: 1px solid #3a3015;
          padding-bottom: 0.6rem;
          margin-bottom: 1.25rem;
        }

        /* SCORES */
        .qr-scores { display: flex; flex-direction: column; gap: 0.5rem; }
        .qr-score-row {
          display: grid;
          grid-template-columns: 2rem 1fr auto 120px;
          align-items: center;
          gap: 0.75rem;
        }
        @media (max-width: 500px) {
          .qr-score-row { grid-template-columns: 2rem 1fr auto; }
          .qr-sbar-wrap { display: none; }
        }
        .qr-medal { font-size: 1.2rem; text-align: center; }
        .qr-sname { font-size: 1rem; letter-spacing: 0.05em; }
        .qr-spts { color: #c8a84b; font-size: 0.9rem; white-space: nowrap; }
        .qr-sbar-wrap {
          height: 6px;
          background: rgba(200,168,75,0.1);
          border-radius: 3px;
          overflow: hidden;
        }
        .qr-sbar {
          height: 100%;
          background: linear-gradient(90deg, #c8a84b, #f0d080);
          border-radius: 3px;
          transition: width 0.8s ease;
        }

        /* CHARTS GRID */
        .qr-charts {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1rem;
        }
        @media (max-width: 680px) { .qr-charts { grid-template-columns: 1fr; } }

        .qr-chart {
          background: rgba(200,168,75,0.04);
          border: 1px solid #2a2510;
          border-radius: 4px;
          padding: 1rem;
        }
        .qr-chart-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.9rem;
        }
        .qr-chart-img {
          width: 70px;
          height: 52px;
          object-fit: contain;
          border-radius: 3px;
          background: rgba(200,168,75,0.04);
          border: 1px solid #2a2510;
          flex-shrink: 0;
        }
        .qr-chart-num {
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: rgba(200,168,75,0.45);
        }
        .qr-chart-bird {
          font-size: 0.95rem;
          color: #f0e6c8;
          letter-spacing: 0.05em;
          margin: 0.1rem 0;
        }
        .qr-chart-sci {
          font-size: 0.75rem;
          color: rgba(240,230,200,0.35);
          font-style: italic;
        }

        .qr-bars { display: flex; flex-direction: column; gap: 0.5rem; }
        .qr-bar-row {}
        .qr-bar-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: rgba(240,230,200,0.75);
          margin-bottom: 0.2rem;
          flex-wrap: wrap;
        }
        .qr-correct-tag {
          background: rgba(74,154,90,0.2);
          border: 1px solid #3a7a47;
          color: #7ddf91;
          font-size: 0.62rem;
          padding: 0.1rem 0.35rem;
          border-radius: 3px;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }
        .qr-bar-track {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .qr-bar-bg {
          flex: 1;
          height: 12px;
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }
        .qr-bar-fill {
          height: 12px;
          border-radius: 2px;
          transition: width 0.9s cubic-bezier(.4,0,.2,1);
          min-width: 2px;
          flex-shrink: 0;
        }
        .qr-bar-track {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .qr-bar-fill {
          flex: 1;
          height: 10px;
          border-radius: 2px;
          position: relative;
          transition: width 0.9s ease;
          min-width: 3px;
        }
        .qr-bar-count {
          font-size: 0.78rem;
          color: rgba(200,168,75,0.5);
          min-width: 1.2rem;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
