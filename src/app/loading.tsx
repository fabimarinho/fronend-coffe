import styles from "./status-page.module.scss";

export default function Loading() {
  return (
    <main className={styles.statePage} aria-live="polite">
      <section className={styles.stateCard}>
        <div className={styles.loadingDot} aria-hidden="true" />
        <p>Carregando...</p>
      </section>
    </main>
  );
}
