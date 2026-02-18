"use client";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import imgbg from "../../../public/coffee-hero.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("google", { callbackUrl: "/" });
      if (result?.error) {
        toast.error("Falha ao autenticar. Tente novamente.");
      }
    } catch {
      toast.error("Falha ao autenticar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainer}>
        <Image className={styles.imgcoffee} src={imgbg} alt="Imagem de fundo" quality={100} priority />
      </div>

      <div className={styles.shell}>
        <aside className={styles.featureCard} aria-hidden="true">
          <p className={styles.kicker}>Acesso rapido</p>
          <h1>Seu cafe favorito em poucos cliques</h1>
          <p className={styles.lead}>Entre para salvar pedidos, acelerar checkout e acompanhar compras em tempo real.</p>
          <ul className={styles.proofList}>
            <li>Itens salvos no carrinho</li>
            <li>Pagamento seguro</li>
            <li>Historico do pedido no admin</li>
          </ul>
        </aside>

        <div className={styles.loginBox}>
          <h2>Entrar</h2>
          <p>Use sua conta Google para continuar.</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <button type="submit" className={styles.accessButton} disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar com Google"}
            </button>

            <p className={styles.signupLink}>
              Ainda nao possui uma conta? <Link href="/newLogin">Cadastre-se</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
