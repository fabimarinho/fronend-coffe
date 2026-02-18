"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";

type PromoVariant = "A" | "B";
type PromoMetric = "impressions" | "clicks";
type PromoStats = Record<PromoVariant, Record<PromoMetric, number>>;

const PROMO_VARIANT_KEY = "homePromoVariant";
const PROMO_STATS_KEY = "homePromoStats";
const PROMO_DISMISS_KEY = "homePromoDismissUntil";

const DEFAULT_STATS: PromoStats = {
  A: { impressions: 0, clicks: 0 },
  B: { impressions: 0, clicks: 0 },
};

function getConversionRate(clicks: number, impressions: number) {
  if (!impressions) return "0.00%";
  return `${((clicks / impressions) * 100).toFixed(2)}%`;
}

export default function PromoABStats() {
  const [stats, setStats] = useState<PromoStats>(DEFAULT_STATS);
  const [activeVariant, setActiveVariant] = useState<string>("-");
  const [dismissedUntil, setDismissedUntil] = useState<number>(0);

  const nextShowDate = useMemo(() => {
    if (!dismissedUntil || dismissedUntil < Date.now()) return "Disponivel agora";
    return new Date(dismissedUntil).toLocaleString("pt-BR");
  }, [dismissedUntil]);

  const loadStats = () => {
    try {
      const rawStats = localStorage.getItem(PROMO_STATS_KEY);
      const parsedStats = rawStats ? (JSON.parse(rawStats) as PromoStats) : DEFAULT_STATS;
      setStats({
        A: {
          impressions: Number(parsedStats?.A?.impressions ?? 0),
          clicks: Number(parsedStats?.A?.clicks ?? 0),
        },
        B: {
          impressions: Number(parsedStats?.B?.impressions ?? 0),
          clicks: Number(parsedStats?.B?.clicks ?? 0),
        },
      });

      setActiveVariant(localStorage.getItem(PROMO_VARIANT_KEY) ?? "-");
      setDismissedUntil(Number(localStorage.getItem(PROMO_DISMISS_KEY) ?? "0"));
    } catch {
      setStats(DEFAULT_STATS);
      setActiveVariant("-");
      setDismissedUntil(0);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const clearStats = () => {
    localStorage.removeItem(PROMO_STATS_KEY);
    localStorage.removeItem(PROMO_VARIANT_KEY);
    localStorage.removeItem(PROMO_DISMISS_KEY);
    loadStats();
  };

  return (
    <section className={styles.statsCard}>
      <div className={styles.statsHeader}>
        <div>
          <h2 className={styles.statsTitle}>Teste A/B do Pop-up</h2>
          <p className={styles.statsHint}>
            Variante ativa neste navegador: <strong>{activeVariant}</strong>
          </p>
          <p className={styles.statsSubline}>
            Proxima exibicao: <strong>{nextShowDate}</strong>
          </p>
        </div>

        <button type="button" onClick={clearStats} className={styles.clearButton}>
          Limpar metricas locais
        </button>
      </div>

      <div className={styles.statsGrid}>
        {(["A", "B"] as PromoVariant[]).map((variant) => (
          <article key={variant} className={styles.metricCard}>
            <h3 className={styles.metricTitle}>Variante {variant}</h3>
            <p className={styles.metricText}>
              Impressoes: <strong>{stats[variant].impressions}</strong>
            </p>
            <p className={styles.metricText}>
              Cliques: <strong>{stats[variant].clicks}</strong>
            </p>
            <p className={styles.metricText}>
              Conversao: <strong>{getConversionRate(stats[variant].clicks, stats[variant].impressions)}</strong>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
