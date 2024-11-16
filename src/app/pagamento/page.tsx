import styles from "./styles.module.scss";
import pixIcon from "../../../public/ic_round-pix.svg";
import cardIcon from "../../../public/ion_card-outline.svg";
import eloIcon from "../../../public/logos_elo.svg";
import masterIcon from "../../../public/logos_mastercard.svg";
import visaIcon from "../../../public/logos_visaelectron.svg";
import amexIcon from "../../../public/simple-icons_americanexpress.svg";

export default function Pagamento() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Finalize sua compra</h1>

      <div className={styles.resumo}>
        <h2 className={styles.resumoTitle}>RESUMO DO PEDIDO</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Qtd</th>
              <th>Total a pagar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Café com leite</td>
              <td>1</td>
              <td>R$ 5,00</td>
            </tr>
            <tr>
              <td>Bolo de Morango</td>
              <td>1</td>
              <td>R$ 10,00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.cupom}>
        <label htmlFor="cupom">Usar cupom:</label>
        <input
          type="text"
          id="cupom"
          placeholder="Insira o código do cupom"
          className={styles.input}
        />
      </div>

      <div className={styles.payment}>
        <h2 className={styles.paymentTitle}>Método de pagamento</h2>
        <div className={styles.paymentOption}>
          <img src={pixIcon} alt="Pix" className={styles.icon} />
          <span>Pix</span>
        </div>
        <div className={styles.paymentOption}>
          <img src={cardIcon} alt="Cartão de crédito" className={styles.icon} />
          <span>Cartão de crédito</span>
        </div>
      </div>

      <p className={styles.obs}>*OBS: aceitamos todas as bandeiras.</p>
      <div className={styles.bandeiras}>
        <img src={amexIcon.src} alt="Amex" className={styles.bandeira} />
        <img src={visaIcon.src} alt="Visa" className={styles.bandeira} />
        <img src={eloIcon.src} alt="Elo" className={styles.bandeira} />
        <img
          src={masterIcon.src}
          alt="Mastercard"
          className={styles.bandeira}
        />
      </div>
    </div>
  );
}
