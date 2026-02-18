import styles from "../legal.module.scss";

export default function CookiesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Politica de Cookies</h1>
        <p className={styles.updated}>Ultima atualizacao: 18 de fevereiro de 2026</p>

        <div className={styles.content}>
          <section>
            <h2>O que sao cookies</h2>
            <p>Cookies sao pequenos arquivos usados para lembrar preferencias e melhorar a navegacao no site.</p>
          </section>
          <section>
            <h2>Como utilizamos</h2>
            <p>Usamos cookies para manter sessao ativa, salvar preferencias e analisar uso das paginas.</p>
          </section>
          <section>
            <h2>Gerenciamento</h2>
            <p>Voce pode ajustar cookies no navegador, mas isso pode impactar recursos de login e carrinho.</p>
          </section>
        </div>
      </section>
    </main>
  );
}
