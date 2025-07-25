"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import Image from "next/image";
import logo from "../../../../public/cafe 1.svg";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const getFirstName = (name: string | null | undefined) => {
    if (!name) return "Visitante";
    return name.split(" ")[0];
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.cafeteria}>
          <h1>Cafeteria</h1>
          <p>
            Bem-vindo(a)! {
              status === "loading" 
                ? "Carregando..." 
                : session?.user 
                  ? getFirstName(session.user.name) 
                  : "Visitante"
            }
          </p>
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
              <Link href="/contatos">Feedback</Link>
              {!session ? (
                <>
                  <Link href="/login">Entrar</Link>
                  <Link href="/register">Inscreva-se</Link>
                </>
              ) : (
                <Link href="/profile">Perfil</Link>
              )}
            </nav>
          </div>
        </div>
        
        {session && (
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        )}
      </header>
    </>
  );
}

