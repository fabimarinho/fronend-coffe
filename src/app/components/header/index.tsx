"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import Image from "next/image";
import logo from "../../../../public/cafe 1.svg";
import Link from "next/link";

export default function Header() {
  const [userName, setUserName] = useState("");
  const router = useRouter(); // Hook para redirecinar

  // Pega o nome do usuário do localStorage quando o componente é carregado
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    } else {
      router.push("/login"); // Caso o usuário não esteja logado, ele será redirecionado para a pagina de login
    }
  }, []);

  // Função para realizar o logout
  const handleLogout = () => {
    localStorage.removeItem("userName"); // Remove o nome do localStorage
    setUserName(""); // Limpa o estado local
    router.push("/login"); // Redireciona para a página de login
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.cafeteria}>
          <h1>Cafeteria</h1>

          <p>Bem-vindo (a)! {userName ? userName : "Visitante"}</p>
        </div>

        <div className={styles.leftSection}>
          <div className={styles.divlogo}>
            <Image src={logo} alt="logo" width={100} height={100} />
            <h1>gostinho de café</h1>
          </div>
          <div className={styles.iconsTag}>
            <nav className={styles.navLinks}>
              <Link href="/">Home</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/contatos">Contatos</Link>
              <Link href="/login">Entrar</Link>
              <Link href="/newLogin">Inscreva-se</Link>
            </nav>
          </div>
        </div>
        {userName && (
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        )}
      </header>
    </>
  );
}
