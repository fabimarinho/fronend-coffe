import styles from "../legal.module.scss";

export default function PrivacidadePage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Politica de Privacidade</h1>
        <p className={styles.updated}>Ultima atualizacao: 18 de fevereiro de 2026</p>

        <div className={styles.content}>
          <section>
            <h2>Dados coletados</h2>
            <p>Coletamos apenas os dados necessarios para login, processamento de pedidos e suporte ao cliente.</p>
          </section>
          <section>
            <h2>Uso das informacoes</h2>
            <p>Os dados sao usados para finalizar pedidos, enviar atualizacoes e melhorar a experiencia do usuario.</p>
          </section>
          <section>
            <h2>Seguranca</h2>
            <p>Aplicamos boas praticas de seguranca e controle de acesso para proteger suas informacoes.</p>
          </section>
        </div>
      </section>
    </main>
  );
}
