"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

import Image from "next/image";
import coffeimg from "../../../public/DALL·E 2024-09-26 10.48.56 - A dynamic scene of coffee being poured into a cup. The coffee is mid-air, with droplets splashing as the stream flows from a coffee pot into a simple  1 (1).svg";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/router";

const Menu = () => {
  const [data, setData] = useState<any[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const router = useRouter(); // Importação do roteamento

  const handleCartClick = () => {
    router.push("/carrinho"); // Redireciona para a página do carrinho
  };

  const Menu = () => {
    const [data, setData] = useState<any[]>([]); // Cart data
    const [showMessage, setShowMessage] = useState(false); // Show message when adding to cart
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("");
    const [products] = useState([
      {
        id: 1,
        name: "Café Premium",
        category: "Bebidas",
        price: 15.0,
        description: "Um café com aroma intenso e sabor marcante.",
      },
      {
        id: 2,
        name: "Torta de Morango",
        category: "Doces",
        price: 12.0,
        description: "Deliciosa torta feita com morangos frescos.",
      },
      {
        id: 3,
        name: "Expresso",
        category: "Bebidas",
        price: 15.0,
        description: "Um café com sabor inesquecível.",
      },
      {
        id: 4,
        name: "Torta de chocolate",
        category: "Doces",
        price: 12.5,
        description: "Fatia de torta de chocolate grego, com chantilly",
      },
      {
        id: 5,
        name: "Capuccino",
        category: "Bebidas",
        price: 7.0,
        description: "Expresso com leite vaporizado.",
      },
      {
        id: 6,
        name: "Torta de banana",
        category: "Doces",
        price: 9.0,
        description: "Fatia de torta de banana com canela",
      },
      {
        id: 7,
        name: "Afogato",
        category: "Bebidas",
        price: 9.0,
        description: "Expresso com sorvete.",
      },
      {
        id: 8,
        name: "Torta de maçã",
        category: "Doces",
        price: 11.0,
        description: "Fatia de torta de maçã do nordeste brasileiro.",
      },
      {
        id: 9,
        name: "Café Macchiato",
        category: "Bebidas",
        price: 6.5,
        description: "Café manchado com leite vaporizado.",
      },
      {
        id: 10,
        name: "Torta de nozes",
        category: "Doces",
        price: 14.0,
        description: "Fatia de torta com nozes americanas",
      },
      {
        id: 11,
        name: "Chocolate quente",
        category: "Bebidas",
        price: 8.0,
        description: "Leite vaporizado com manchas de chocolate.",
      },
      {
        id: 12,
        name: "Torta de nozes",
        category: "Doces",
        price: 14.0,
        description: "Fatia de torta com nozes americanas",
      },
      {
        id: 13,
        name: "Café gelado",
        category: "Bebidas",
        price: 6.0,
        description: "Frappe de café.",
      },
      {
        id: 14,
        name: "Torta de abacaxi",
        category: "Doces",
        price: 8.0,
        description: "Fatia com torta de abacaxi caramelizado.",
      },
      {
        id: 15,
        name: "Leite macchiado",
        category: "Bebidas",
        price: 7.5,
        description: "Leite vaporizado, manchado com café.",
      },
      {
        id: 16,
        name: "Torta de especial",
        category: "Doces",
        price: 14.5,
        description: "Fatia de torta americana, com calda de cholocate",
      },
    ]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    const handleAdd = (product: string, price: number, quantity: number) => {
      const existingItemIndex = data.findIndex(
        (item) => item.product === product
      );
      let updatedCart;
      if (existingItemIndex >= 0) {
        updatedCart = data.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const novoItem = { product, price, quantity };
        updatedCart = [...data, novoItem];
      }

      setData(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    };

    useEffect(() => {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) {
        setData(JSON.parse(savedCart));
      }
    }, []);

    const filteredProducts = products.filter((product) => {
      if (filter === "preco") {
        return product.price <= 20;
      }
      if (filter === "categoria") {
        return product.category
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
      <div className={styles.menuPage}>
        {showMessage && (
          <div className={styles.toast}>Item adicionado ao carrinho!</div>
        )}
        <h1>
          "Sinta o sabor da felicidade em cada gole de café e em cada fatia de
          torta"
        </h1>
        <h2>Uma combinação que vai deixar seu dia ainda mais doce!</h2>
        <Image
          className={styles.imgcoffee}
          src={coffeimg}
          alt="Imagem de fundo"
          objectFit="cover"
          quality={100}
          priority={true}
        />

        <div className={styles.filterSection}>
          <input
            type="text"
            placeholder="Buscar produtos..."
            className={styles.searchInput}
            onChange={handleSearch}
          />
          <button
            onClick={() => setFilter("preco")}
            className={styles.filterButton}
          >
            Filtrar por Preço
          </button>
          <button
            onClick={() => setFilter("categoria")}
            className={styles.filterButton}
          >
            Filtrar por Categoria
          </button>
        </div>

        <div className={styles.menuContainer}>
          <div className={styles.transparentRectangle}>
            <h2>Nossas Tortas</h2>
            <ul>
              {filteredProducts
                .filter((product) => product.category === "Doces")
                .map((product) => (
                  <li key={product.id}>
                    <div>
                      <strong>
                        {product.name} - R$ {product.price}
                      </strong>
                      <p className={styles.descricao}>{product.description}</p>
                    </div>
                    <button
                      className={styles.iconlink}
                      title="Adicionado ao carrinho"
                      onClick={() => handleAdd(product.name, product.price, 1)}
                    >
                      <FiPlus className={styles.plusIcon} />
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          <div className={styles.roundedRectangle}>
            <h2>Nossos Cafés</h2>
            <ul>
              {filteredProducts
                .filter((product) => product.category === "Bebidas")
                .map((product) => (
                  <li key={product.id}>
                    <div>
                      <strong>
                        {product.name} - R$ {product.price}
                      </strong>
                      <p className={styles.descriCafe}>{product.description}</p>
                    </div>
                    <button
                      className={styles.iconCafe}
                      title="Adicionado ao carrinho"
                      onClick={() => handleAdd(product.name, product.price, 1)}
                    >
                      <FiPlus className={styles.plusIcon} />
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
};

export default Menu;
