"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useQRCode } from "next-qrcode";
import Image from "next/image";
import styles from "./styles.module.scss";
import pixIcon from "../../../public/ic_round-pix.svg";
import cardIcon from "../../../public/ion_card-outline.svg";
import eloIcon from "../../../public/logos_elo.svg";
import masterIcon from "../../../public/logos_mastercard.svg";
import visaIcon from "../../../public/logos_visaelectron.svg";
import amexIcon from "../../../public/simple-icons_americanexpress.svg";
import { useCart } from "@/hooks/useCart";

const ADDRESS_STORAGE_KEY = "userAddress";
type PaymentMethod = "pix" | "cartao";

export default function Pagamento() {
  const { Image: QRCodeImage } = useQRCode();
  const [cupom, setCupom] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const [userAddress, setUserAddress] = useState("Retirada na loja ou endereco nao informado.");
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { items, summary, clearCart } = useCart();

  useEffect(() => {
    const rawAddress = localStorage.getItem(ADDRESS_STORAGE_KEY);
    if (!rawAddress) return;
    try {
      const parsedAddress = JSON.parse(rawAddress);
      if (parsedAddress) setUserAddress(parsedAddress);
    } catch {
      setUserAddress(rawAddress);
    }
  }, []);

  const subtotal = summary.subtotal;
  const desconto = subtotal * 0.1;
  const totalSemJuros = subtotal - desconto;
  const juros = parcelas > 3 ? totalSemJuros * 0.03 : 0;
  const totalFinal = useMemo(() => totalSemJuros + juros, [totalSemJuros, juros]);
  const parcelaValor = useMemo(() => totalFinal / parcelas, [totalFinal, parcelas]);

  const handleChangeAddress = () => {
    router.push("/carrinho");
  };

  const handleAddProducts = () => {
    router.push("/menu");
  };

  const handleSelectMethod = (method: PaymentMethod) => {
    setPaymentMethod(method);
    if (method === "pix") {
      setQrValue(totalFinal.toFixed(2));
      setShowQRCode(true);
    } else {
      setShowQRCode(false);
      setQrValue("");
    }
  };

  const handleCopyQRCode = () => {
    if (!qrValue) return;
    navigator.clipboard.writeText(qrValue);
    toast.success("Codigo copiado para a area de transferencia");
  };

  const handleConfirmOrder = async () => {
    if (items.length === 0) {
      toast.error("Adicione itens ao carrinho antes de finalizar");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          address: userAddress,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar pedido");
      }

      toast.success("Compra finalizada com sucesso");
      clearCart();
      setCupom("");
      setParcelas(1);
      setShowQRCode(false);
      setQrValue("");
      localStorage.removeItem(ADDRESS_STORAGE_KEY);
    } catch (error) {
      console.error(error);
      toast.error("Nao foi possivel finalizar a compra");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Finalizar pedido</h1>
        <p>Revise seus itens, escolha a forma de pagamento e confirme sua compra.</p>
      </header>

      <section className={styles.layout}>
        <article className={styles.mainCard}>
          <div className={styles.block}>
            <h2>Entrega</h2>
            <div className={styles.addressCard}>
              <p>{userAddress}</p>
              <button type="button" className={styles.ghostButton} onClick={handleChangeAddress}>
                Alterar no carrinho
              </button>
            </div>
          </div>

          <div className={styles.block}>
            <h2>Cupom</h2>
            <input
              type="text"
              id="cupom"
              placeholder="Insira o codigo do cupom"
              value={cupom}
              onChange={(event) => setCupom(event.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.block}>
            <h2>Metodo de pagamento</h2>
            <div className={styles.paymentGrid}>
              <button
                type="button"
                className={`${styles.paymentOption} ${paymentMethod === "pix" ? styles.paymentActive : ""}`}
                onClick={() => handleSelectMethod("pix")}
                aria-pressed={paymentMethod === "pix"}
              >
                <Image src={pixIcon} alt="Pix" className={styles.icon} />
                <span>Pix</span>
              </button>
              <button
                type="button"
                className={`${styles.paymentOption} ${paymentMethod === "cartao" ? styles.paymentActive : ""}`}
                onClick={() => handleSelectMethod("cartao")}
                aria-pressed={paymentMethod === "cartao"}
              >
                <Image src={cardIcon} alt="Cartao de credito" className={styles.icon} />
                <span>Cartao de credito</span>
              </button>
            </div>

            <div className={styles.installments}>
              <label htmlFor="parcelas">Parcelamento</label>
              <select id="parcelas" value={parcelas} onChange={(event) => setParcelas(Number(event.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((option) => (
                  <option key={option} value={option}>
                    {option}x de R$ {(totalFinal / option).toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

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
                  Copiar codigo Pix
                </button>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryButton} onClick={handleConfirmOrder} disabled={isSubmitting}>
              {isSubmitting ? "Confirmando..." : "Confirmar pedido"}
            </button>
            <button className={styles.secondaryButton} onClick={handleAddProducts}>
              Adicionar mais produtos
            </button>
          </div>
        </article>

        <aside className={styles.summaryCard}>
          <h2>Resumo do pedido</h2>
          {items.length === 0 ? (
            <p className={styles.emptyHint}>Seu carrinho esta vazio. Adicione produtos antes de finalizar.</p>
          ) : (
            <ul className={styles.itemsList}>
              {items.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <strong>R$ {(item.price * item.quantity).toFixed(2)}</strong>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <strong>R$ {subtotal.toFixed(2)}</strong>
          </div>
          <div className={styles.totalRow}>
            <span>Desconto</span>
            <strong>R$ {desconto.toFixed(2)}</strong>
          </div>
          <div className={styles.totalRow}>
            <span>Juros</span>
            <strong>R$ {juros.toFixed(2)}</strong>
          </div>
          <div className={styles.totalFinal}>
            <span>Total</span>
            <strong>R$ {totalFinal.toFixed(2)}</strong>
          </div>
          <p className={styles.installmentHint}>Parcela atual: R$ {parcelaValor.toFixed(2)}</p>

          <div className={styles.bandeiras}>
            <Image src={amexIcon} alt="Amex" className={styles.bandeira} />
            <Image src={visaIcon} alt="Visa" className={styles.bandeira} />
            <Image src={eloIcon} alt="Elo" className={styles.bandeira} />
            <Image src={masterIcon} alt="Mastercard" className={styles.bandeira} />
          </div>
        </aside>
      </section>
    </div>
  );
}
