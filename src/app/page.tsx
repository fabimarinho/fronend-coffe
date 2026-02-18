"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import coffeeImage from "../../public/coffee-hero.svg";

type PromoVariant = "A" | "B";
type PromoMetric = "impressions" | "clicks";
type PromoStats = Record<PromoVariant, Record<PromoMetric, number>>;

const PROMO_DISMISS_KEY = "homePromoDismissUntil";
const PROMO_VARIANT_KEY = "homePromoVariant";
const PROMO_STATS_KEY = "homePromoStats";
const PROMO_SHOW_DELAY_MS = 10000;
const PROMO_DISMISS_DAYS = 7;
const PROMO_VARIANTS: PromoVariant[] = ["A", "B"];

const DEFAULT_PROMO_STATS: PromoStats = {
  A: { impressions: 0, clicks: 0 },
  B: { impressions: 0, clicks: 0 },
};

const PROMO_CONTENT: Record<
  PromoVariant,
  { badge: string; title: string; description: string; cta: string; footnote: string }
> = {
  A: {
    badge: "Oferta de boas-vindas",
    title: "Ganhe 10% no primeiro pedido",
    description: "Aproveite seu desconto exclusivo e descubra os cafes mais pedidos da casa.",
    cta: "Ativar desconto",
    footnote: "+2.000 pedidos servidos com avaliacao media de 4.9.",
  },
  B: {
    badge: "Oferta limitada",
    title: "Seu cafe especial com 10% OFF hoje",
    description: "Liberamos um beneficio para sua primeira compra. Aproveite enquanto estiver ativo.",
    cta: "Quero meu beneficio",
    footnote: "Oferta aplicada automaticamente no seu primeiro pedido.",
  },
};

export default function Page() {
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [promoVariant, setPromoVariant] = useState<PromoVariant>("A");

  const recordPromoMetric = (variant: PromoVariant, metric: PromoMetric) => {
    const parsed = (() => {
      try {
        const raw = localStorage.getItem(PROMO_STATS_KEY);
        return raw ? (JSON.parse(raw) as PromoStats) : DEFAULT_PROMO_STATS;
      } catch {
        return DEFAULT_PROMO_STATS;
      }
    })();

    const nextStats: PromoStats = {
      A: { ...parsed.A },
      B: { ...parsed.B },
    };

    nextStats[variant][metric] += 1;
    localStorage.setItem(PROMO_STATS_KEY, JSON.stringify(nextStats));
  };

  const closePromo = () => {
    setIsPromoOpen(false);
    const nextAllowedDate = Date.now() + PROMO_DISMISS_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(PROMO_DISMISS_KEY, String(nextAllowedDate));
  };

  const handlePromoPrimaryClick = () => {
    recordPromoMetric(promoVariant, "clicks");
    closePromo();
  };

  useEffect(() => {
    const dismissedUntil = Number(localStorage.getItem(PROMO_DISMISS_KEY) ?? "0");
    if (dismissedUntil > Date.now()) return;

    const storedVariant = localStorage.getItem(PROMO_VARIANT_KEY) as PromoVariant | null;
    const variant: PromoVariant =
      storedVariant && PROMO_VARIANTS.includes(storedVariant)
        ? storedVariant
        : PROMO_VARIANTS[Math.floor(Math.random() * PROMO_VARIANTS.length)];

    setPromoVariant(variant);
    localStorage.setItem(PROMO_VARIANT_KEY, variant);

    const timer = window.setTimeout(() => {
      recordPromoMetric(variant, "impressions");
      setIsPromoOpen(true);
    }, PROMO_SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isPromoOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePromo();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isPromoOpen]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image className={styles.heroImage} src={coffeeImage} alt="Xicara de cafe" priority />
        <div className={styles.overlay} />
        <div className={styles.heroGlow} />

        <div className={styles.heroContent}>
          <span className={styles.kicker}>Cafe artesanal com experiencia premium</span>

          <h1 className={styles.title}>
            <span>Preparando</span>
            <span>seu cafe com</span>
            <span>amor em cada</span>
            <span>xicara</span>
          </h1>

          <p className={styles.subtitle}>Sinta o aroma e descubra o sabor unico que preparamos para voce.</p>

          <div className={styles.heroActions}>
            <Link href="/menu" className={styles.primaryButton}>
              Ver menu
            </Link>
            <Link href="/carrinho" className={styles.secondaryButton}>
              Pedir agora
            </Link>
          </div>

          <div className={styles.proofGrid}>
            <article>
              <strong>4.9</strong>
              <span>nota media</span>
            </article>
            <article>
              <strong>+2.000</strong>
              <span>pedidos servidos</span>
            </article>
            <article>
              <strong>98%</strong>
              <span>clientes retornam</span>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.menuBand}>
        <div className={styles.menuSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>02 Menu</span>
            <h2>Explore nosso menu</h2>
            <p>Cafes especiais, sobremesas artesanais e combinacoes para cada momento.</p>
          </div>

          <div className={styles.menuShowcase}>
            <article className={styles.featuredCard}>
              <span className={styles.featureTag}>Mais pedido da semana</span>
              <h3>Combo Cappuccino Cremoso</h3>
              <p>Leite vaporizado, blend premium e cookie artesanal para acompanhar.</p>
              <Link href="/menu" className={styles.featureLink}>
                Quero experimentar
              </Link>
            </article>

            <div className={styles.menuGrid}>
              <article className={styles.menuCard}>
                <h3>Classicos da casa</h3>
                <p>Espresso, cappuccino e latte com graos selecionados.</p>
              </article>
              <article className={styles.menuCard}>
                <h3>Gelados e cremosos</h3>
                <p>Bebidas refrescantes com equilibrio ideal de sabor e textura.</p>
              </article>
              <article className={styles.menuCard}>
                <h3>Doces artesanais</h3>
                <p>Tortas e acompanhamentos preparados diariamente.</p>
              </article>
            </div>
          </div>

          <Link href="/menu" className={styles.sectionCta}>
            Explorar menu completo
          </Link>
        </div>
      </section>

      <section className={styles.testimonialBand}>
        <div className={styles.testimonialSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>03 Depoimentos</span>
            <h2>O que nossos clientes dizem</h2>
            <p>Depoimentos reais de quem ja viveu a experiencia Frontend Coffee.</p>
          </div>

          <div className={styles.testimonialGrid}>
            <article className={styles.testimonialCard}>
              <div className={styles.clientRow}>
                <div className={styles.avatar}>M</div>
                <div>
                  <div className={styles.rating}>5.0/5</div>
                  <span>Marina Oliveira</span>
                </div>
              </div>
              <p>Atendimento impecavel e o cappuccino mais equilibrado que ja tomei.</p>
            </article>

            <article className={styles.testimonialCard}>
              <div className={styles.clientRow}>
                <div className={styles.avatar}>J</div>
                <div>
                  <div className={styles.rating}>5.0/5</div>
                  <span>Joao Santos</span>
                </div>
              </div>
              <p>O ambiente e acolhedor e os doces artesanais fazem toda diferenca.</p>
            </article>

            <article className={styles.testimonialCard}>
              <div className={styles.clientRow}>
                <div className={styles.avatar}>A</div>
                <div>
                  <div className={styles.rating}>5.0/5</div>
                  <span>Ana Costa</span>
                </div>
              </div>
              <p>Sempre volto pela qualidade constante e pela experiencia completa.</p>
            </article>
          </div>
        </div>
      </section>

      {isPromoOpen && (
        <div className={styles.promoBackdrop} onClick={closePromo} aria-hidden="true">
          <section
            className={styles.promoDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-title"
            aria-describedby="promo-description"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className={styles.promoClose} onClick={closePromo} aria-label="Fechar oferta">
              x
            </button>

            <span className={styles.promoBadge}>{PROMO_CONTENT[promoVariant].badge}</span>
            <h3 id="promo-title" className={styles.promoTitle}>
              {PROMO_CONTENT[promoVariant].title}
            </h3>
            <p id="promo-description" className={styles.promoDescription}>
              {PROMO_CONTENT[promoVariant].description}
            </p>

            <div className={styles.promoActions}>
              <Link href="/menu" className={styles.promoPrimary} onClick={handlePromoPrimaryClick}>
                {PROMO_CONTENT[promoVariant].cta}
              </Link>
              <button type="button" className={styles.promoSecondary} onClick={closePromo}>
                Agora nao
              </button>
            </div>

            <p className={styles.promoFootnote}>{PROMO_CONTENT[promoVariant].footnote}</p>
          </section>
        </div>
      )}

      <Link href="/menu" className={styles.mobileStickyCta}>
        Ver menu e pedir
      </Link>
    </main>
  );
}