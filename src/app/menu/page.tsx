"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiPlus, FiShoppingBag } from "react-icons/fi";
import { Coffee, CakeSlice, Heart, Star } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { products as allProducts, type Product } from "@/data/products";
import styles from "./styles.module.scss";
import coffeeImage from "../../../public/coffee-hero.svg";

type CategoryFilter = "Todos" | "Bebidas" | "Doces";
type MenuMetric = "add_to_cart" | "top_seller_add" | "favorite_toggle" | "load_more";
type MenuStats = Record<MenuMetric, number>;

const CATEGORY_FILTERS: CategoryFilter[] = ["Todos", "Bebidas", "Doces"];
const FAVORITES_KEY = "menuFavorites";
const MENU_STATS_KEY = "menuAnalyticsStats";
const PAGE_SIZE = 6;
const TOP_SELLER_IDS = [1, 5, 2, 4];
const DEFAULT_MENU_STATS: MenuStats = {
  add_to_cart: 0,
  top_seller_add: 0,
  favorite_toggle: 0,
  load_more: 0,
};

function getCoverMeta(category: Product["category"]) {
  if (category === "Bebidas") {
    return {
      icon: <Coffee size={28} />,
      className: styles.coverDrink,
      label: "Cafe especial",
    };
  }
  return {
    icon: <CakeSlice size={28} />,
    className: styles.coverDessert,
    label: "Doce artesanal",
  };
}

export default function Menu() {
  const { addItem } = useCart();
  const products = useMemo(() => allProducts, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Todos");
  const [onlyAffordable, setOnlyAffordable] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [favorites, setFavorites] = useState<number[]>([]);

  const recordMenuMetric = (metric: MenuMetric) => {
    const parsed = (() => {
      try {
        const raw = localStorage.getItem(MENU_STATS_KEY);
        return raw ? (JSON.parse(raw) as MenuStats) : DEFAULT_MENU_STATS;
      } catch {
        return DEFAULT_MENU_STATS;
      }
    })();

    const next: MenuStats = {
      add_to_cart: Number(parsed.add_to_cart ?? 0),
      top_seller_add: Number(parsed.top_seller_add ?? 0),
      favorite_toggle: Number(parsed.favorite_toggle ?? 0),
      load_more: Number(parsed.load_more ?? 0),
    };
    next[metric] += 1;
    localStorage.setItem(MENU_STATS_KEY, JSON.stringify(next));
  };

  useEffect(() => {
    try {
      const rawFavorites = localStorage.getItem(FAVORITES_KEY);
      if (!rawFavorites) return;
      const parsed = JSON.parse(rawFavorites) as number[];
      setFavorites(Array.isArray(parsed) ? parsed : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const topSellers = useMemo(
    () => products.filter((product) => TOP_SELLER_IDS.includes(product.id)),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const results = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
      const matchesPrice = !onlyAffordable || product.price <= 20;
      const matchesFavorite = !onlyFavorites || favorites.includes(product.id);
      return matchesSearch && matchesCategory && matchesPrice && matchesFavorite;
    });

    // Prioriza favoritos quando nao estiver filtrando apenas favoritos.
    if (!onlyFavorites) {
      return results.sort((a, b) => Number(favorites.includes(b.id)) - Number(favorites.includes(a.id)));
    }
    return results;
  }, [products, searchTerm, activeCategory, onlyAffordable, onlyFavorites, favorites]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const addProductToCart = (product: Product, source: "grid" | "top") => {
    addItem({ name: product.name, price: product.price, quantity: 1 });
    recordMenuMetric(source === "top" ? "top_seller_add" : "add_to_cart");
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 1800);
  };

  const toggleFavorite = (productId: number) => {
    recordMenuMetric("favorite_toggle");
    setFavorites((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]
    );
  };

  const resetAndApplyCategory = (category: CategoryFilter) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <main className={styles.page}>
      {toastVisible && <div className={styles.toast}>Produto adicionado ao carrinho</div>}

      <header className={styles.hero}>
        <Image className={styles.heroImage} src={coffeeImage} alt="Cafe artesanal" priority />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.kicker}>Menu da casa</span>
          <h1>Escolha seu cafe ideal para agora.</h1>
          <p>Catalogo com bebidas e doces artesanais para consumo na loja, retirada ou entrega.</p>
        </div>
      </header>

      <section className={styles.catalog}>
        <div className={styles.toolbar}>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Buscar por nome ou descricao"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            aria-label="Buscar produtos do menu"
          />

          <div className={styles.filterRow}>
            <div className={styles.chips}>
              {CATEGORY_FILTERS.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`${styles.chip} ${activeCategory === category ? styles.chipActive : ""}`}
                  onClick={() => resetAndApplyCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={`${styles.chip} ${onlyAffordable ? styles.chipActive : ""}`}
              onClick={() => {
                setOnlyAffordable((current) => !current);
                setVisibleCount(PAGE_SIZE);
              }}
            >
              Ate R$ 20
            </button>

            <button
              type="button"
              className={`${styles.chip} ${onlyFavorites ? styles.chipActive : ""}`}
              onClick={() => {
                setOnlyFavorites((current) => !current);
                setVisibleCount(PAGE_SIZE);
              }}
            >
              Favoritos
            </button>

            <Link href="/carrinho" className={styles.cartButton}>
              <FiShoppingBag />
              Ir para carrinho
            </Link>
          </div>
        </div>

        <section className={styles.topSellers}>
          <div className={styles.topHeader}>
            <h2>
              <Star size={18} /> Mais vendidos
            </h2>
            <p>Selecao de itens com maior saida esta semana.</p>
          </div>
          <div className={styles.topGrid}>
            {topSellers.map((product) => {
              const cover = getCoverMeta(product.category);
              return (
                <article key={product.id} className={styles.topCard}>
                  <div className={`${styles.cover} ${cover.className}`}>
                    {cover.icon}
                    <span>{cover.label}</span>
                  </div>
                  <div className={styles.topBody}>
                    <h3>{product.name}</h3>
                    <strong>R$ {product.price.toFixed(2)}</strong>
                    <button type="button" className={styles.quickAdd} onClick={() => addProductToCart(product, "top")}>
                      <FiPlus />
                      Adicionar
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>Nenhum item encontrado</h2>
            <p>Tente ajustar os filtros ou pesquisar por outro termo.</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {displayedProducts.map((product) => {
                const cover = getCoverMeta(product.category);
                const isFavorite = favorites.includes(product.id);

                return (
                  <article key={product.id} className={styles.card}>
                    <div className={`${styles.cover} ${cover.className}`}>
                      {cover.icon}
                      <span>{cover.label}</span>
                    </div>

                    <div className={styles.cardHead}>
                      <span className={styles.category}>{product.category}</span>
                      <strong className={styles.price}>R$ {product.price.toFixed(2)}</strong>
                    </div>

                    <h3>{product.name}</h3>
                    <p>{product.description}</p>

                    <div className={styles.cardActions}>
                      <button
                        type="button"
                        className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ""}`}
                        onClick={() => toggleFavorite(product.id)}
                        aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      >
                        <Heart size={16} />
                      </button>

                      <button
                        type="button"
                        className={styles.addButton}
                        onClick={() => addProductToCart(product, "grid")}
                        title={`Adicionar ${product.name} ao carrinho`}
                      >
                        <FiPlus />
                        Adicionar
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {hasMore && (
              <div className={styles.loadMoreWrap}>
                <button
                  type="button"
                  className={styles.loadMoreButton}
                  onClick={() => {
                    recordMenuMetric("load_more");
                    setVisibleCount((n) => n + PAGE_SIZE);
                  }}
                >
                  Carregar mais
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
