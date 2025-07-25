"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import coffeeImage from "../../public/DALL·E 2024-09-26 10.48.56 - A dynamic scene of coffee being poured into a cup. The coffee is mid-air, with droplets splashing as the stream flows from a coffee pot into a simple  1 (1).svg";

export default function Page() {
  const [showPopup, setShowPopup] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  // Atualizar scrollY com a rolagem da página
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main>
      {/* Pop-up de Boas-Vindas */}
      {showPopup && (
        <div className={styles.popup}>
          <p>🎉 Ganhe 10% de desconto na sua primeira compra! 🎉</p>
          <button onClick={handleClosePopup} className={styles.closeButton}>
            Fechar
          </button>
        </div>
      )}

      <div className={styles.container}>
        {/* Parallax Scrolling no fundo */}
        <div
          className={styles.parallax}
          style={{ backgroundPositionY: `${scrollY * 0.5}px` }}
        />
        <Image
          className={styles.img}
          src={coffeeImage}
          alt="Imagem de fundo"
          objectFit="cover" // A imagem cobre toda área de fundo
          quality={100}
          priority={true}
        />
        <div className={styles.offers}>

          <div>
            <h1 className={styles.text}>
              "Preparando
              <br /> seu café com <br />
              amor em cada <br />
              xicará"
            </h1>
            {/* Texto Aconchegante e Convidativo */}
            <p className={styles.subText}>
              Sinta o aroma e descubra o sabor único que preparamos para você.
            </p>

          </div>

          {/* Carrossel de Produtos */}
          <div>
            <div className={styles.carousel}>
              <div className={styles.divProdHome}>
                <div className={styles.carouselItem}>
                  <h2>Torta de Chocolate</h2>
                  <p>Deliciosa torta com recheio cremoso e cobertura irresistível.</p>
                </div>
                <div className={styles.carouselItem}>
                  <h2>Torta de Morango</h2>
                  <p>Fresca, leve e feita com os melhores morangos.</p>
                </div>

              </div>
              <div className={styles.divProdHome}>
                <div className={styles.carouselItem}>
                  <h2>Café Gelado</h2>
                  <p>Perfeito para dias quentes. Sabor e frescor em cada gole.</p>
                </div>
                <div className={styles.carouselItem}>
                  <h2>Cappuccino</h2>
                  <p>Cremoso e com o equilíbrio perfeito de café e leite.</p>
                </div>

              </div>
              
            </div>
            <div className={styles.btn}>
              <Link href="/menu" className={styles.ctaButton}>
              Explore Nosso Cardápio
              </Link>
            </div>
          </div>
        </div>
        {/* Testemunhos de Clientes */}
          <h2 className={styles.h2Comentarios}>O que nossos clientes dizem:</h2>
        <section className={styles.testimonials}>
          <div className={styles.testimonialList}>
            <div className={styles.testimonialItem}>
              <p>
                "O café é incrível! O sabor é único e a experiência de cada
                xícara é um prazer. Sempre que posso, volto para saborear!"
              </p>
              <p className={styles.clientName}>- Maria Oliveira</p>
            </div>
            <div className={styles.testimonialItem}>
              <p>
                "A torta de chocolate é de outro mundo! Toda vez que visito, não
                posso deixar de pedir uma. Perfeita!"
              </p>
              <p className={styles.clientName}>- João Silva</p>
            </div>
            <div className={styles.testimonialItem}>
              <p>
                "Ambiente aconchegante, excelente atendimento e produtos
                maravilhosos. Sinto-me em casa sempre que venho aqui."
              </p>
              <p className={styles.clientName}>- Ana Costa</p>
            </div>
            <div className={styles.testimonialItem}>
              <p>
                "Adorei o cappuccino! É o melhor que já tomei. O sabor é
                equilibrado e a espuma é cremosa como eu gosto."
              </p>
              <p className={styles.clientName}>- Carlos Souza</p>
            </div>
            <div className={styles.testimonialItem}>
              <p>
                "O café gelado é uma maravilha para os dias quentes! Refresca e
                tem um sabor incrível. Com certeza voltarei!"
              </p>
              <p className={styles.clientName}>- Juliana Pereira</p>
            </div>
            <div className={styles.testimonialItem}>
              <p>
                "A experiência aqui é única. Cada torta é feita com muito
                carinho e o café é sempre fresquinho. Recomendo a todos!"
              </p>
              <p className={styles.clientName}>- Felipe Almeida</p>
            </div>
          </div>
        </section>

        {/* Links de Navegação */}
        <Link href="/" className={styles.homeLink}>
          Home
        </Link>

       
      </div>
    </main>
  );
}
