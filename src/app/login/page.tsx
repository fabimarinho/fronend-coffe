import styles from "./styles.module.scss";
import imgbg from "../../../public/DALL·E 2024-09-26 10.48.56 - A dynamic scene of coffee being poured into a cup. The coffee is mid-air, with droplets splashing as the stream flows from a coffee pot into a simple  1 (1).svg";
import googleIcon from "../../../public/devicon_google.svg";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainer}>
        <Image
         className={styles.imgcoffee}
          src={imgbg}
          alt="Imagem de fundo"
          objectFit="cover"
          quality={100}
          priority={true}
        />
      </div>

      <div className={styles.loginBox}>
        <h1>Entrar</h1>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">
              <span>📧</span> Digite seu email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">
              <span>🔒</span> Digite sua senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button type="submit" className={styles.accessButton}>
            Acessar
          </button>

          <p className={styles.signupLink}>
            Ainda não possui uma conta? <Link href="/newLogin">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
