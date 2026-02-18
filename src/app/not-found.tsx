import Link from "next/link";
import styles from "./status-page.module.scss";

export default function NotFound() {
  return (
    <main className={styles.statePage}>
      <section className={styles.stateCard}>
        <h1>Pagina nao encontrada</h1>
        <p>O conteudo que voce procura nao existe ou foi movido.</p>
        <Link href="/" className={styles.linkButton}>
          Voltar para inicio
        </Link>
      </section>
    </main>
  );
}
