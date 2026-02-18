import styles from "../legal.module.scss";

export default function TermosPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Termos de Uso</h1>
        <p className={styles.updated}>Ultima atualizacao: 18 de fevereiro de 2026</p>

        <div className={styles.content}>
          <section>
            <h2>Aceitacao dos termos</h2>
            <p>Ao utilizar o site, voce concorda com as regras de uso e com nossas politicas operacionais.</p>
          </section>
          <section>
            <h2>Pedidos e pagamentos</h2>
            <p>Os pedidos estao sujeitos a confirmacao de pagamento e disponibilidade de itens no momento da compra.</p>
          </section>
          <section>
            <h2>Responsabilidades</h2>
            <p>O usuario se compromete a informar dados corretos para entrega e contato durante o atendimento.</p>
          </section>
        </div>
      </section>
    </main>
  );
}
