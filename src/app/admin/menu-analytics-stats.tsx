"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

type MenuMetric = "add_to_cart" | "top_seller_add" | "favorite_toggle" | "load_more";
type MenuStats = Record<MenuMetric, number>;

const MENU_STATS_KEY = "menuAnalyticsStats";
const DEFAULT_MENU_STATS: MenuStats = {
  add_to_cart: 0,
  top_seller_add: 0,
  favorite_toggle: 0,
  load_more: 0,
};

export default function MenuAnalyticsStats() {
  const [stats, setStats] = useState<MenuStats>(DEFAULT_MENU_STATS);

  const loadStats = () => {
    try {
      const raw = localStorage.getItem(MENU_STATS_KEY);
      const parsed = raw ? (JSON.parse(raw) as MenuStats) : DEFAULT_MENU_STATS;
      setStats({
        add_to_cart: Number(parsed.add_to_cart ?? 0),
        top_seller_add: Number(parsed.top_seller_add ?? 0),
        favorite_toggle: Number(parsed.favorite_toggle ?? 0),
        load_more: Number(parsed.load_more ?? 0),
      });
    } catch {
      setStats(DEFAULT_MENU_STATS);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const clearStats = () => {
    localStorage.removeItem(MENU_STATS_KEY);
    loadStats();
  };

  return (
    <section className={styles.statsCard}>
      <div className={styles.statsHeader}>
        <div>
          <h2 className={styles.statsTitle}>Analytics do Menu</h2>
          <p className={styles.statsHint}>
            Metricas locais deste navegador para validar impacto visual e interacoes.
          </p>
        </div>

        <button type="button" onClick={clearStats} className={styles.clearButton}>
          Limpar metricas locais
        </button>
      </div>

      <div className={styles.statsGrid}>
        <article className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Cards do menu</h3>
          <p className={styles.metricText}>
            Adicoes ao carrinho: <strong>{stats.add_to_cart}</strong>
          </p>
        </article>

        <article className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Mais vendidos</h3>
          <p className={styles.metricText}>
            Adicoes ao carrinho: <strong>{stats.top_seller_add}</strong>
          </p>
        </article>

        <article className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Favoritos</h3>
          <p className={styles.metricText}>
            Cliques em favorito: <strong>{stats.favorite_toggle}</strong>
          </p>
        </article>

        <article className={styles.metricCard}>
          <h3 className={styles.metricTitle}>Paginacao</h3>
          <p className={styles.metricText}>
            Cliques em carregar mais: <strong>{stats.load_more}</strong>
          </p>
        </article>
      </div>
    </section>
  );
}
