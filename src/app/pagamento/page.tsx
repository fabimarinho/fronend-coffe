"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useQRCode } from "next-qrcode";
import Image from "next/image";
import styles from "./styles.module.scss";
import pixIcon from "../../../public/ic_round-pix.svg";
import cardIcon from "../../../public/ion_card-outline.svg";
import eloIcon from "../../../public/logos_elo.svg";
import masterIcon from "../../../public/logos_mastercard.svg";
import visaIcon from "../../../public/logos_visaelectron.svg";
import amexIcon from "../../../public/simple-icons_americanexpress.svg";

type CartItem = {
  name: string;
  quantity: number;
  price: number;
};

export default function Pagamento() {
  const {Image: QRCodeImage} = useQRCode();
  const [cupom, setCupom] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);
  const [userAddress, setUserAddress] = useState<string>(
    "Endereço não encontrado."
  );
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [isPurchaseConfirmed, setIsPurchaseConfirmed] = useState(false);
  const router = useRouter();

  // Carregar dados do localStorage ao montar o componente
  useEffect(() => {
    const rawCart = localStorage.getItem("cart");
    const cart: Array<CartItem> = rawCart ? JSON.parse(rawCart) : [];
    const rawAddress = localStorage.getItem("userAddress");
    const address: string = rawAddress
      ? JSON.parse(rawAddress)
      : "Endereço não encontrado.";

    setCartItems(cart);
    setUserAddress(address);
  }, []);

  // Cálculo dos valores
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const desconto = subtotal * 0.1; // Desconto fixo de 10% para a primeira compra
  const totalSemJuros = subtotal - desconto;
  const juros = parcelas > 3 ? totalSemJuros * 0.03 : 0;
  const totalFinal = totalSemJuros + juros;
  const parcelaValor = totalFinal / parcelas;

  // Handlers
  const handleCupomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCupom(e.target.value);
  };

  const handleChangeAddress = () => {
    router.push("/newlogin");
  };

  const handleAddProducts = () => {
    router.push("/menu"); // Redireciona para a página de menu
  };

  const handlePixClick = () => {
    setQrValue(totalFinal.toFixed(2)); // Definir o valor total para o QR Code
    setShowQRCode(!showQRCode); // Alternar a exibição do QR Code
  };

  // Função para copiar o código do QR
  const handleCopyQRCode = () => {
    navigator.clipboard.writeText(qrValue); // Copiar o valor do QR Code para a área de transferência
    toast.success("Código copiado para a área de transferência!");
  };

  const handleConfirmOrder = () => {
    setIsPurchaseConfirmed(true); // Marca a compra como confirmada
    toast.success("Compra finalizada!");

    // Limpar os campos após 3 segundos
    setTimeout(() => {
      toast.success("O pedido está a caminho do seu endereço!");
      setCupom(""); // Limpa o campo de cupom
      setCartItems([]); // Limpa o carrinho
      setUserAddress("Endereço não encontrado."); // Limpa o endereço
      setParcelas(1); // Reseta a quantidade de parcelas
      setQrValue(""); // Limpa o valor do QR
      setShowQRCode(false); // Oculta o QR Code
      setIsPurchaseConfirmed(false); // Reseta o estado de confirmação
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Finalize sua compra</h1>

      {/* Resumo do pedido */}
      <div className={styles.resumo}>
        <h2 className={styles.resumoTitle}>RESUMO DO PEDIDO</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Qtd</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>R$ {(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.totals}>
          <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
          <p>Desconto: R$ {desconto.toFixed(2)}</p>
          <p>Juros (se aplicável): R$ {juros.toFixed(2)}</p>
          <h3>Total: R$ {totalFinal.toFixed(2)}</h3>
          <p>Valor por parcela: R$ {parcelaValor.toFixed(2)}</p>
        </div>
      </div>

      {/* Endereço do usuário */}
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

      {/* Opções de pagamento */}
      <div className={styles.payment}>
        <h2 className={styles.paymentTitle}>Método de pagamento</h2>
        <div className={styles.paymentOption} onClick={handlePixClick}>
          <Image src={pixIcon} alt="Pix" className={styles.icon} />
          <span>Pix</span>
        </div>
        <div className={styles.paymentOption}>
          <Image src={cardIcon} alt="Cartão de crédito" className={styles.icon} />
          <span>Cartão de crédito</span>
        </div>

        {/* Exibição do QR Code */}
        {showQRCode && (
          <div className={styles.qrCodeContainer}>
            <QRCodeImage
              text={qrValue}
              options={{
                type: "image/png",
                quality: 1,
                errorCorrectionLevel: "M",
                margin: 3,
                scale: 4,
                color: {
                  dark: "#000000",
                  light: "#FFFFFF",
                },
              }}
            />
            <button className={styles.copyButton} onClick={handleCopyQRCode}>
              Copiar Código
            </button>
          </div>
        )}
      </div>

      {/* Botões de ação */}
      <div className={styles.actions}>
        <button className={styles.button} onClick={handleConfirmOrder}>
          Confirmar Pedido
        </button>
        <button className={styles.button} onClick={handleAddProducts}>
          Adicionar Produtos
        </button>
      </div>

      {/* Bandeiras aceitas */}
      <div className={styles.bandeiras}>
        <Image src={amexIcon} alt="Amex" className={styles.bandeira} />
        <Image src={visaIcon} alt="Visa" className={styles.bandeira} />
        <Image src={eloIcon} alt="Elo" className={styles.bandeira} />
        <Image src={masterIcon} alt="Mastercard" className={styles.bandeira} />
      </div>
    </div>
  );
}