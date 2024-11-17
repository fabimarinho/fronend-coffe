"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import coffeimg from "../../../public/DALL·E 2024-09-26 10.48.56 - A dynamic scene of coffee being poured into a cup. The coffee is mid-air, with droplets splashing as the stream flows from a coffee pot into a simple  1 (1).svg";
import { FiPlus } from "react-icons/fi";

interface Produto {
  product: string;
  price: number;
  quantity: number;
}

export default function Menu() {
  const [data, setData] = useState<Produto[]>([]);
  const [showMessage, setShowMessage] = useState(false); // Estado para exibir mensagem

  function handleAdd(product: string, price: number, quantity: number): void {
    const novoItem: Produto = { product, price, quantity };
    const updatedCart = [...data, novoItem];
    setData(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Salva o estado no localStorage
    setShowMessage(true); // Exibe a mensagem
    setTimeout(() => setShowMessage(false), 2000); // Esconde após 2 segundos
  }

  useEffect(() => {
    // Carrega o estado inicial do carrinho do localStorage
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setData(JSON.parse(savedCart));
    }
  }, []);
  return (
    <div className={styles.menuPage}>
      <h1>
        "Sinta o sabor da felicidade em cada gole de café e em cada fatia de
        torta"{" "}
      </h1>
      <h2> Uma combinação que vai deixar seu dia ainda mais doce!</h2>
      <Image
        className={styles.imgcoffee}
        src={coffeimg}
        alt="Imagem de fundo"
        objectFit="cover"
        quality={100}
        priority={true}
      />
      <div className={styles.content}>
        <div className={styles.menuContainer}>
          {/*Retângulo para Nossas tortas*/}

          <div className={styles.transparentRectangle}>
            <h2>Nossas Tortas</h2>
            <ul>
              <li>
                <div>
                  <strong>Torta de Chocolate - R$ 12,00</strong>
                  <p className={styles.descricao}>
                    - Fatia de torta de chocolate grego, com chantilly.
                  </p>
                </div>
                <button
                  className={styles.iconlink}
                  title="Adicionado ao carrinho"
                  onClick={() => handleAdd("Torta de Chocolate", 12, 1)}
                >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Torta de Morango - R$ 10,00</strong>
                  <p className={styles.descricao}>
                    - Fatia de torta de morango silvestre
                  </p>
                </div>
                <button
                  className={styles.iconlink}
                  title="Adicionado ao carrinho"
                  onClick={() => handleAdd("Torta de Morango", 10, 1)}
                >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Torta de Banana - R$ 9,00</strong>
                  <p className={styles.descricao}>
                    - Fatia de torta de banana com canela
                  </p>
                </div>
                <button
                  className={styles.iconlink}
                  title="Adicionado ao carrinho"
                  onClick={() => handleAdd("Torta de Banana", 9, 1)}
                >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Torta de Maçã - R$ 11,00</strong>
                  <p className={styles.descricao}>
                    - Fatia de torta de maçã do nordeste brasileiro
                  </p>
                </div>
                <button
                  className={styles.iconlink}
                  title="Adicionado ao carrinho"
                  onClick={() => handleAdd("Torta de Maçã", 11, 1)}
                >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Torta de Nozes - R$ 14,00</strong>
                  <p className={styles.descricao}>
                    - Fatia de torta de nozes americanas
                  </p>
                </div>
                <button
                  className={styles.iconlink}
                  title="Adicionado ao carrinho"
                  onClick={() => handleAdd("Torta de Nozes", 14, 1)}
                >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Torta de Abacaxi - R$ 8,00</strong>
                  <p className={styles.descricao}>
                    - Fatia de torta de abacaxi caramelizado
                  </p>
                </div>
                <button
                  className={styles.iconlink}
                  title="Adicionado ao carrinho"
                  onClick={() => handleAdd("Torta de Abacaxi", 8, 1)}
                >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Torta de Limão - R$ 10,00</strong>
                  <p className={styles.descricao}>
                    - Fatia de torta limãocom cobertura de chocolate branco
                  </p>
                </div>
                <button
                  className={styles.iconlink}
                  title="Adicionado ao carrinho"
                  onClick={() => handleAdd("Torta de Limão", 10, 1)}
                >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
            </ul>
          </div>

          {/* Nossos Cafés */}
          <div className={styles.roundedRectangle}>
            <h2>Nossos Cafés</h2>
            <ul>
              <li>
                <div>
                  <strong>Expresso - R$ 5,00</strong>
                  <p className={styles.descriCafe}>
                    - Grãos cuidadosamente selecionados
                  </p>
                </div>
                <button
                  className={styles.iconCafe}
                  title="Adicionado ao carrinho"
                  onClick={() => handleAdd("Expresso", 5, 1)}
                >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Cappuccino - R$ 7,00</strong>
                  <p className={styles.descriCafe}>
                    - Expresso com leite vaporizado
                  </p>
                </div>
                <button
                  className={styles.iconCafe}
                  title="Adicionado ao carrinho"
                  onClick={() => handleAdd("Cappuccino", 7, 1)}
                >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Afogato - R$ 9,00</strong>
                  <p className={styles.descriCafe}>- Expresso com sorvete</p>
                </div>
                <button
                  className={styles.iconCafe}
                  title="Adicionado ao carrinho"
                  onClick={() => handleAdd("Afogato", 9, 1)}
                >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Café Macchiato - R$ 6,50</strong>
                  <p className={styles.descriCafe}>
                    - Café manchado com leite vaporizado
                  </p>
                </div>
                <button
                  className={styles.iconCafe}
                  title="Adicionado ao carrinho"
                  onClick={() => handleAdd("Café Macchiato", 6.5, 1)}
                >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Chocolate Quente - R$ 8,00</strong>
                  <p className={styles.descriCafe}>
                    - Leite vaporizado com manchas de chocolate
                  </p>
                </div>
                <button
                  className={styles.iconCafe}
                  title="Adicionado ao carrinho"
                  onClick={() => handleAdd("Chocolate Quente", 8, 1)}
                >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Café Gelado - R$ 6,00</strong>
                  <p className={styles.descriCafe}>- Frappe de café</p>
                </div>
                <button
                  className={styles.iconCafe}
                  title="Adicionado ao carrinho"
                  onClick={() => handleAdd("Café Gelado", 6, 1)}
                >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Leite Macchiado - R$ 7,50</strong>
                  <p className={styles.descriCafe}>
                    - Leite vaporizado, manchado com café
                  </p>
                </div>
                <button
                  className={styles.iconCafe}
                  title="Adicionado ao carrinho"
                  onClick={() => handleAdd("Leite Macchiato", 7.5, 1)}
                >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Carrinho */}
        <div className={styles.cart}>
          <Link href="/carrinho" className={styles.cartButton}>
            Visualizar no carrinho <span className={styles.cartIcon}>🛒</span>
          </Link>
          <p> "OBS: Todas as bebidas têm o mesmo tamanho de 200ml"</p>
        </div>
      </div>
    </div>
  );
}
