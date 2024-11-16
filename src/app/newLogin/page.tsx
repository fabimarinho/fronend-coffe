"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importando useRouter para redirecionamento
import styles from "./styles.module.scss";
import Image from "next/image";
import googleIcon from "../../../public/devicon_google.svg";
import backgroundImg from "../../../public/DALL·E 2024-09-26 10.48.56 - A dynamic scene of coffee being poured into a cup. The coffee is mid-air, with droplets splashing as the stream flows from a coffee pot into a simple  1 (1).svg";
import eyeIcon from "../../../public/eye-svgrepo-com.svg";

export default function NewLogin() {
  const router = useRouter(); // Hook de navegação
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Mensagem de sucesso
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
  }); // Para limpar os campos após o envio

  // Função de validação
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (password !== confirmPassword) {
      setPasswordError("As senhas não coincidem. Tente novamente.");
    } else {
      setPasswordError("");
    }

    if (email !== confirmEmail) {
      setEmailError(
        "Os campos digitados não conferem. Verifique o que foi digitado."
      );
    } else {
      setEmailError("");
    }

    if (
      password === confirmPassword &&
      email === confirmEmail &&
      formData.fullName &&
      formData.phoneNumber &&
      formData.birthDate &&
      formData.gender
    ) {
      // Se tudo estiver certo, exibe a mensagem de sucesso
      setSuccessMessage("Cadastro realizado com sucesso!");

      // Limpa os campos após um tempo e redireciona para o login
      setTimeout(() => {
        setFormData({
          fullName: "",
          phoneNumber: "",
          birthDate: "",
          gender: "",
        });
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setConfirmEmail("");
        setSuccessMessage("");

        // Redirecionando para a página de login
        router.push("/login");
      }, 3000); // Limpa e redireciona após 3 segundos
    }
  };

  // Função para garantir que a entrada de texto seja convertida para maiúsculas
  const handleUppercase = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.toUpperCase();
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainer}>
        <Image
          src={backgroundImg}
          alt="Imagem de fundo"
          objectFit="cover"
          quality={100}
          priority={true}
        />
      </div>

      <div className={styles.loginBox}>
        <h1>Novo Usuário</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="fullName">
              <span>👤</span> Digite seu nome completo
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Digite seu nome completo"
              value={formData.fullName}
              onChange={(e) => {
                const uppercased = e.target.value.toUpperCase();
                setFormData({ ...formData, fullName: uppercased });
              }}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="phoneNumber">
              <span>📞</span> Digite seu número de telefone
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Digite seu número de telefone"
              value={formData.phoneNumber}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 10) {
                  value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
                } else if (value.length > 6) {
                  value = value.replace(
                    /(\d{2})(\d{4})(\d{0,4})/,
                    "($1) $2-$3"
                  );
                } else if (value.length > 2) {
                  value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
                }
                setFormData({ ...formData, phoneNumber: value });
              }}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="birthDate">
              <span>📅</span> Data de nascimento
            </label>
            <input
              type="date"
              id="birthDate"
              value={formData.birthDate}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="gender">
              <span>⚥</span> Sexo
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              required
            >
              <option value="">Selecione seu sexo</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
              <option value="prefiro_nao_dizer">Prefiro não dizer</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">
              <span>📧</span> Digite seu email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmEmail">
              <span>📧</span> Confirme seu email
            </label>
            <input
              type="email"
              id="confirmEmail"
              placeholder="Confirme seu email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
          </div>

          {emailError && <p className={styles.error}>{emailError}</p>}

          <div className={styles.inputGroup}>
            <label htmlFor="password">
              <span>🔒</span> Escolha uma senha
            </label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Escolha uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Image
                src={eyeIcon}
                alt="Ícone de olho"
                width={24}
                height={24}
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)} // Alternar visibilidade
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">
              <span>🔒</span> Confirma a senha
            </label>
            <div className={styles.passwordContainer}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirma a senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Image
                src={eyeIcon}
                alt="Ícone de olho"
                width={24}
                height={24}
                className={styles.eyeIcon}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Alternar visibilidade
              />
            </div>
          </div>

          {passwordError && <p className={styles.error}>{passwordError}</p>}

          <button type="submit" className={styles.signupButton}>
            Cadastrar
          </button>
          <div className={styles.orSeparator}>ou</div>
          <button type="button" className={styles.googleButton}>
            <Image
              src={googleIcon}
              alt="Ícone do Google"
              width={20}
              height={20}
            />
            Entrar com Google
          </button>
          <p className={styles.signupLink}>
            Ainda não possui uma conta? <a href="/signup">Cadastre-se</a>
          </p>
        </form>

        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
      </div>
    </div>
  );
}
