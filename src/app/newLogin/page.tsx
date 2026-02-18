"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import Image from "next/image";
import backgroundImg from "../../../public/coffee-hero.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function NewLogin() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("As senhas nao coincidem. Tente novamente.");
      return;
    }
    setPasswordError("");

    if (email !== confirmEmail) {
      setEmailError("Os e-mails informados nao conferem.");
      return;
    }
    setEmailError("");

    localStorage.setItem("userName", fullName);
    setSuccessMessage("Cadastro realizado com sucesso!");

    setTimeout(() => {
      setSuccessMessage("");
      router.push("/login");
    }, 1500);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainer}>
        <Image className={styles.imgcoffee} src={backgroundImg} alt="Imagem de fundo" quality={100} priority />
      </div>

      <div className={styles.loginBox}>
        <p className={styles.kicker}>Cadastro</p>
        <h1>Criar conta</h1>
        <p className={styles.description}>Finalize seu cadastro para continuar o pedido com mais rapidez no proximo acesso.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.divAlign}>
            <label htmlFor="fullName">
              <span>Nome completo</span>
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Digite seu nome completo"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>

          <div className={styles.divAlign}>
            <label htmlFor="phoneNumber">
              <span>Telefone</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Digite seu numero de telefone"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
            />
          </div>

          <div className={styles.divAlign}>
            <label htmlFor="email">
              <span>E-mail</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className={styles.divAlign}>
            <label htmlFor="confirmEmail">
              <span>Confirme seu e-mail</span>
            </label>
            <input
              type="email"
              id="confirmEmail"
              placeholder="Confirme seu e-mail"
              value={confirmEmail}
              onChange={(event) => setConfirmEmail(event.target.value)}
              required
            />
          </div>

          {emailError && <p className={styles.error}>{emailError}</p>}

          <div className={styles.DivPassword}>
            <div className={styles.inputGroupPass}>
              <label htmlFor="password">Senha</label>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Escolha uma senha"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={styles.eyeIcon}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className={styles.inputGroupRepeatPass}>
              <label htmlFor="confirmPassword">Confirme a senha</label>
              <div className={styles.passwordContainer}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirme a senha"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className={styles.eyeIcon}
                  aria-label={showConfirmPassword ? "Ocultar confirmacao da senha" : "Mostrar confirmacao da senha"}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <p className={styles.passwordInfo}>Use uma senha forte com letras e numeros.</p>
          {passwordError && <p className={styles.error}>{passwordError}</p>}

          <button type="submit" className={styles.signupButton}>
            Cadastrar
          </button>
        </form>

        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      </div>
    </div>
  );
}
