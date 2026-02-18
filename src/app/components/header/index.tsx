"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import styles from "./styles.module.scss";

const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  },
};

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Cardapio" },
  { href: "/carrinho", label: "Carrinho" },
  { href: "/contatos", label: "Contato" },
];

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/login" });
      router.push("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href) ?? false;
  };

  if (status === "loading") {
    return (
      <motion.header
        className={`${styles.header} ${styles.loading}`}
        initial="hidden"
        animate="visible"
        variants={ANIMATION_VARIANTS.fadeIn}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.loadingSpinner} />
      </motion.header>
    );
  }

  const navLinks = session?.user
    ? [...NAV_LINKS, { href: "/admin", label: "Admin" }]
    : [...NAV_LINKS, { href: "/login", label: "Entrar" }];

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${styles.headerLargeScreen}`}
      initial="hidden"
      animate="visible"
      variants={ANIMATION_VARIANTS.fadeIn}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.topSection}>
        <div className={`${styles.cafeteriaTitle} ${styles.cafeteriaTitleLargeScreen}`}>
          <h1 className={styles.titleHeading}>Cafeteria</h1>
          <motion.p
            key={session?.user?.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={styles.titleParagraph}
          >
            {session?.user?.name ? `Bem-vindo, ${session.user.name}!` : "Bem-vindo, visitante!"}
          </motion.p>
        </div>

        <div className={styles.logoSection}>
          <Link href="/">
            <Image src="/logo.png" alt="Logo da cafeteria" width={80} height={80} className={styles.logo} priority />
          </Link>
          <h2 className={`${styles.logoText} ${styles.logoTextLargeScreen}`}>Cafe & Cia</h2>
        </div>
      </div>

      <div className={styles.mainSection}>
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActiveLink(link.href) ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {session?.user && (
          <motion.button
            className={styles.logoutButton}
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            type="button"
          >
            Sair
          </motion.button>
        )}

        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
          type="button"
        >
          <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""}`}>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className={styles.mobileNav}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={ANIMATION_VARIANTS.slideDown}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileNavContent}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${isActiveLink(link.href) ? styles.active : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}