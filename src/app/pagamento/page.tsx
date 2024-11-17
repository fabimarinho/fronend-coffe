"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.scss";
import pixIcon from "../../../public/ic_round-pix.svg";
import cardIcon from "../../../public/ion_card-outline.svg";
import eloIcon from "../../../public/logos_elo.svg";
import masterIcon from "../../../public/logos_mastercard.svg";
import visaIcon from "../../../public/logos_visaelectron.svg";
import amexIcon from "../../../public/simple-icons_americanexpress.svg";

export default function Pagamento() {
  const [cupom, setCupom] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const isFirstPurchase = true; // Simula que é a primeira compra do cliente
  const subtotal = 5 + 10; // Total dos produtos
  const desconto = isFirstPurchase ? subtotal * 0.1 : 0;
  const totalSemJuros = subtotal - desconto;
  const juros = parcelas > 3 ? totalSemJuros * 0.03 : 0;
  const totalFinal = totalSemJuros + juros;

  const router = useRouter();

  // Exemplo de endereço cadastrado (pode ser carregado de um estado global ou API)
  const userAddress =
    "Rua Exemplo, 123 - Bairro, Cidade - Estado, CEP 12345-678";

  const handleCupomChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCupom(e.target.value);

  const handleChangeAddress = () => {
    router.push("/newlogin"); // Redireciona para a página de login/alteração de endereço
  };

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
        <div className={styles.totals}>
          <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
          <p>Desconto: R$ {desconto.toFixed(2)}</p>
          <p>Juros (se aplicável): R$ {juros.toFixed(2)}</p>
          <h3>Total: R$ {totalFinal.toFixed(2)}</h3>
        </div>
      </div>
      {/* Endereço do Usuário */}
      <div className={styles.addressCard}>
        <h2 className={styles.addressTitle}>Endereço de Entrega</h2>
        <p className={styles.addressText}>{userAddress}</p>
        <button
          className={styles.changeAddressButton}
          onClick={handleChangeAddress}
        >
          Mudar Endereço
        </button>
      </div>

      {/* Campo de Cupom */}
      <div className={styles.cupom}>
        <label htmlFor="cupom">Usar cupom:</label>
        <input
          type="text"
          id="cupom"
          placeholder="Insira o código do cupom"
          value={cupom}
          onChange={handleCupomChange}
          className={styles.input}
        />
      </div>

      {/* Opções de Pagamento */}
      <div className={styles.payment}>
        <h2 className={styles.paymentTitle}>Método de pagamento</h2>
        <div className={styles.paymentOption}>
          <Image src={pixIcon} alt="Pix" className={styles.icon} />
          <span>Pix</span>
        </div>
        <div className={styles.paymentOption}>
          <Image
            src={cardIcon}
            alt="Cartão de crédito"
            className={styles.icon}
          />
          <span>Cartão de crédito</span>
        </div>
        <div className={styles.parcelamento}>
          <label htmlFor="parcelas">Parcelamento:</label>
          <select
            id="parcelas"
            value={parcelas}
            onChange={(e) => setParcelas(parseInt(e.target.value, 10))}
            className={styles.select}
          >
            <option value={1}>1x sem juros</option>
            <option value={2}>2x sem juros</option>
            <option value={3}>3x sem juros</option>
            <option value={4}>4x com juros (3%)</option>
            <option value={5}>5x com juros (3%)</option>
          </select>
        </div>
      </div>

      {/* Mensagens e botões */}
      <p className={styles.obs}>Entrega grátis para qualquer região!</p>
      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={() => alert("Adicionar mais produtos!")}
        >
          Adicionar Produtos
        </button>
        <button
          className={styles.button}
          onClick={() => alert("Pedido confirmado!")}
        >
          Confirmar Pedido
        </button>
      </div>

      {/* Bandeiras Aceitas */}
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
