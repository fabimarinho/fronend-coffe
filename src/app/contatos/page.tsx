"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import cafeImage from "../../../public/coffee-hero.svg";

export default function Page() {
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setMessage("");
    setRating(0);
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image className={styles.heroImage} src={cafeImage} alt="Cafe e atendimento" priority />
        <div className={styles.overlay} />
        <div className={styles.heroContent}>
          <h1>Feedback</h1>
          <p>Sua opiniao nos ajuda a melhorar cada detalhe da experiencia.</p>
        </div>
      </section>

      <section className={styles.content}>
        <article className={styles.infoCard}>
          <h2>Conte para a gente</h2>
          <p>
            Como foi sua experiencia com nossos produtos e servicos? Seus comentarios orientam
            nossas proximas melhorias.
          </p>
          <ul>
            <li>Qualidade dos produtos</li>
            <li>Tempo de atendimento</li>
            <li>Sugestoes para o menu</li>
          </ul>
        </article>

        <article className={styles.formCard}>
          <h2>Enviar feedback</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.ratingSection}>
              <p>Avaliacao</p>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`${styles.star} ${rating >= star ? styles.starActive : ""}`}
                    onClick={() => setRating(star)}
                    aria-label={`Avaliar com ${star} estrela${star > 1 ? "s" : ""}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <textarea
              className={styles.textarea}
              placeholder="Conte como foi sua experiencia e o que podemos melhorar"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />

            <button type="submit" className={styles.submitButton}>
              Enviar feedback
            </button>
          </form>

          {submitted && (
            <div className={styles.successBanner}>
              Obrigado! Seu feedback foi enviado com sucesso.
            </div>
          )}
        </article>
      </section>
    </main>
  );
}
