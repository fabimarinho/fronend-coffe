"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import styles from "./styles.module.scss";

type DeliveryMode = "retirada" | "entrega";

const ADDRESS_STORAGE_KEY = "userAddress";
const DELIVERY_STORAGE_KEY = "deliveryMode";

export default function CarrinhoPage() {
  const { items, summary, isLoading, removeItem, clearCart } = useCart();
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("retirada");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const savedMode = localStorage.getItem(DELIVERY_STORAGE_KEY);
    const savedAddress = localStorage.getItem(ADDRESS_STORAGE_KEY);

    if (savedMode === "entrega" || savedMode === "retirada") {
      setDeliveryMode(savedMode);
    }

    if (savedAddress) {
      try {
        setAddress(JSON.parse(savedAddress));
      } catch {
        setAddress(savedAddress);
      }
    }
  }, []);

  const handleDeliveryMode = (mode: DeliveryMode) => {
    setDeliveryMode(mode);
    localStorage.setItem(DELIVERY_STORAGE_KEY, mode);

    if (mode === "retirada") {
      localStorage.removeItem(ADDRESS_STORAGE_KEY);
    } else if (address.trim()) {
      localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(address.trim()));
    }
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    if (value.trim()) {
      localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(value.trim()));
    } else {
      localStorage.removeItem(ADDRESS_STORAGE_KEY);
    }
  };

  const canCheckout = deliveryMode === "retirada" || address.trim().length >= 8;

  if (isLoading) {
    return (
      <main className={styles.page}>
        <section className={styles.loadingBox}>
          <h1>Carregando carrinho...</h1>
        </section>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className={styles.page}>
        <section className={styles.emptyCard}>
          <h1>Seu carrinho esta vazio</h1>
          <p className={styles.emptyIcon}>🛒</p>
          <p className={styles.emptyText}>Adicione produtos para continuar.</p>
          <div className={styles.actions}>
            <Link href="/menu" className={styles.buttonSuccess}>
              Ir para o menu
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <article className={styles.mainCard}>
          <header className={styles.header}>
            <div>
              <h1>Seu carrinho</h1>
              <p>Confira os itens antes de finalizar o pedido.</p>
            </div>
          </header>

          <div className={styles.itemsList}>
            {items.map((item) => {
              const name = item.name || "Produto";
              const subtotal = item.price * item.quantity;
              return (
                <article key={item.id} className={styles.itemCard}>
                  <div className={styles.itemTop}>
                    <p className={styles.itemName}>{name}</p>
                    <p className={styles.itemPrice}>R$ {subtotal.toFixed(2)}</p>
                  </div>
                  <div className={styles.itemBottom}>
                    <span className={styles.qty}>Quantidade: {item.quantity}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remover ${name}`}
                      type="button"
                    >
                      Remover
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <section className={styles.deliveryCard}>
            <h2>Entrega</h2>
            <div className={styles.deliveryOptions}>
              <button
                type="button"
                className={`${styles.deliveryOption} ${deliveryMode === "retirada" ? styles.selectedDelivery : ""}`}
                onClick={() => handleDeliveryMode("retirada")}
              >
                Retirar na loja
              </button>
              <button
                type="button"
                className={`${styles.deliveryOption} ${deliveryMode === "entrega" ? styles.selectedDelivery : ""}`}
                onClick={() => handleDeliveryMode("entrega")}
              >
                Entrega em domicilio
              </button>
            </div>

            {deliveryMode === "entrega" && (
              <div className={styles.addressField}>
                <label htmlFor="deliveryAddress">Endereco de entrega</label>
                <textarea
                  id="deliveryAddress"
                  className={styles.addressInput}
                  placeholder="Rua, numero, bairro, cidade e referencia"
                  value={address}
                  onChange={(event) => handleAddressChange(event.target.value)}
                />
              </div>
            )}
          </section>
        </article>

        <aside className={styles.summaryCard}>
          <h2>Resumo</h2>
          <div className={styles.line}>
            <span>Subtotal</span>
            <strong>R$ {summary.subtotal.toFixed(2)}</strong>
          </div>
          <div className={styles.line}>
            <span>Entrega</span>
            <strong>R$ {summary.shipping.toFixed(2)}</strong>
          </div>
          <div className={styles.line}>
            <span>Desconto</span>
            <strong>R$ {summary.discount.toFixed(2)}</strong>
          </div>
          <div className={styles.total}>
            <span>Total</span>
            <span>R$ {summary.total.toFixed(2)}</span>
          </div>
          <p className={styles.hintText}>Revise os dados antes de confirmar.</p>

          <div className={styles.actions}>
            <button className={styles.buttonError} onClick={clearCart} type="button">
              Limpar carrinho
            </button>
            <Link
              href="/pagamento"
              className={`${styles.buttonSuccess} ${!canCheckout ? styles.checkoutDisabled : ""}`}
              onClick={(event) => {
                if (!canCheckout) event.preventDefault();
              }}
              aria-disabled={!canCheckout}
            >
              {canCheckout ? "Finalizar pedido" : "Informe o endereco para entrega"}
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
