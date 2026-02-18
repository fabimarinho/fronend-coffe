"use client";

import { useEffect } from "react";
import styles from "./status-page.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.statePage}>
      <section className={styles.stateCard}>
        <h1>Algo deu errado</h1>
        <p>Tente novamente. Se o erro persistir, entre em contato com o suporte.</p>
        <button onClick={() => reset()} className={styles.actionButton}>
          Tentar novamente
        </button>
      </section>
    </main>
  );
}
