"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importando useRouter para redirecionamento
import styles from "./styles.module.scss";
import Image from "next/image";
import backgroundImg from "../../../public/DALL·E 2024-09-26 10.48.56 - A dynamic scene of coffee being poured into a cup. The coffee is mid-air, with droplets splashing as the stream flows from a coffee pot into a simple  1 (1).svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    postalCode: "",
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
      formData.street &&
      formData.number &&
      formData.neighborhood &&
      formData.city &&
      formData.state &&
      formData.postalCode
    ) {
      // Salvar o nome completo no localStorage
      localStorage.setItem("userName", formData.fullName);

      // Se tudo estiver certo, exibe a mensagem de sucesso
      setSuccessMessage("Cadastro realizado com sucesso!");

      // Limpa os campos após um tempo e redireciona para o login
      setTimeout(() => {
        setFormData({
          fullName: "",
          phoneNumber: "",
          street: "",
          number: "",
          complement: "",
          neighborhood: "",
          city: "",
          state: "",
          postalCode: "",
        });
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setConfirmEmail("");

        //após 3 segundos, redireciona para a página de login
        setTimeout(() => {
          setSuccessMessage("");
          router.push("/login");
        }, 3000);
      }, 3000); // <-- Aqui estava o problema, faltava o fechamento deste bloco
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
          className={styles.imgcoffee}
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
          <div className={styles.sectio}>
            <h2> Dados Pessoais</h2>
            <div className={styles.inputGroup}>
              <div className={styles.divAlign}>
                <label htmlFor="fullName">
                  <span>👤</span> <h5>Digite seu nome completo</h5>
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
              <div className={styles.divAlign}>
                <label htmlFor="phoneNumber">
                  <span>📞</span> <h5>Digite um número de telefone</h5>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Digite seu número de telefone"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length > 10) {
                      value = value.replace(
                        /(\d{2})(\d{5})(\d{4})/,
                        "($1) $2-$3"
                      );
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

              <div className={styles.divAlign}>
                <label htmlFor="email">
                  <span>📧</span> <h5>Digite seu email</h5>
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
              <div className={styles.divAlign}>
                <label htmlFor="confirmEmail">
                  <span>📧</span> <h5>Confirme seu email</h5>
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
            </div>
          </div>
          {/*bloco 2 endereço */}
          <h2>Endereço de Entrega</h2>
          <div className={styles.section}>
            <div className={styles.inputGroupStreet}>
              <label htmlFor="street">Rua: </label>
              <input
                type="text"
                id="street"
                placeholder="Digite o nome da rua"
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
                required
              />
            </div>
            <div className={styles.inputGroupNumber}>
              <label htmlFor="number">Nº</label>
              <input
                type="text"
                id="number"
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className={styles.divCountry}>
            <div className={styles.inputGroupCity}>
              <label htmlFor="city">Cidade: </label>
              <input
                type="text"
                id="city"
                placeholder="Cidade"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
            </div>
            <div className={styles.inputGroupTown}>
              <label htmlFor="neighborhood">Bairro: </label>
              <input
                type="text"
                id="neighborhood"
                placeholder="Bairro"
                value={formData.neighborhood}
                onChange={(e) =>
                  setFormData({ ...formData, neighborhood: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className={styles.divStateCEP}>
            <div className={styles.inputGroupState}>
              <label htmlFor="state">Estado: </label>
              <input
                type="text"
                id="state"
                //placeholder="Estado"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                required
              />
            </div>

            <div className={styles.inputGroupCEP}>
              <label htmlFor="postalCode">CEP: </label>
              <input
                type="text"
                id="postalCode"
                placeholder=" 00000-000"
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className={styles.inputGroupComplement}>
            <label htmlFor="complement">Complemento</label>

            <textarea
              placeholder="Apartamento, bloco, etc. (opcional)"
              value={formData.complement}
              onChange={(e) =>
                setFormData({ ...formData, complement: e.target.value })
              }
            />
          </div>
          {/*bloco 3 senha*/}
          <div className={styles.DivPassword}>
            <div className={styles.inputGroupPass}>
              <label htmlFor="password">
                <span>🔒</span> Digite uma senha
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
                <span
                  onClick={togglePasswordVisibility}
                  className={styles.eyeIcon}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                  {/* Ícone que alterna */}
                </span>
              </div>
            </div>

            <div className={styles.inputGroupRepeatPass}>
              <label htmlFor="confirmPassword">Confirma a senha</label>
              <div className={styles.passwordContainer}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirma a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  onClick={togglePasswordVisibility}
                  className={styles.eyeIcon}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                  {/* Ícone que alterna */}
                </span>
              </div>
            </div>
          </div>
          <p className={styles.passwordInfo}>
            A senha deve conter pelo menos 1 número, 1 letra maiúscula, 1 letra
            minúscula e 1 caractere especial.
          </p>

          {passwordError && <p className={styles.error}>{passwordError}</p>}

          <button type="submit" className={styles.signupButton}>
            Cadastrar
          </button>
        </form>

        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
      </div>
    </div>
  );
}
