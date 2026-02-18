import { Phone, Mail, MapPin, Coffee, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import styles from "./styles.module.scss";

interface ContactInfo {
  phone: {
    number: string;
    href: string;
    label: string;
  };
  email: {
    address: string;
    href: string;
    label: string;
  };
  address: {
    full: string;
    mapsUrl: string;
    label: string;
  };
}

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  ariaLabel: string;
}

interface QuickLink {
  name: string;
  href: string;
}

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  const contactInfo: ContactInfo = {
    phone: {
      number: "+55 (11) 99999-9999",
      href: "tel:+5511999999999",
      label: "Ligar para a cafeteria",
    },
    email: {
      address: "contato@cafeteriagostinhodecafe.com",
      href: "mailto:contato@cafeteriagostinhodecafe.com",
      label: "Enviar e-mail para a cafeteria",
    },
    address: {
      full: "Rua dos Cafes, 123 - Centro, Sao Paulo, SP - CEP: 01234-567",
      mapsUrl: "https://maps.google.com/?q=Rua+dos+Cafes+123+Centro+Sao+Paulo+SP",
      label: "Ver localizacao no mapa",
    },
  };

  const socialLinks: SocialLink[] = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/cafeteriagostinhodecafe",
      ariaLabel: "Seguir no Facebook",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/cafeteriagostinhodecafe",
      ariaLabel: "Seguir no Instagram",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/cafeteriagostinho",
      ariaLabel: "Seguir no Twitter",
    },
  ];

  const quickLinks: QuickLink[] = [
    { name: "Inicio", href: "/" },
    { name: "Cardapio", href: "/menu" },
    { name: "Carrinho", href: "/carrinho" },
    { name: "Contato", href: "/contatos" },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.companyInfo}>
            <div className={styles.logoSection}>
              <Coffee className={styles.logoIcon} aria-hidden="true" />
              <h3 className={styles.companyName}>Cafeteria Gostinho de Cafe</h3>
            </div>
            <p className={styles.description}>
              Servindo cafes artesanais desde 2020. Sabor autentico, ambiente acolhedor e paixao em cada xicara.
            </p>
          </div>

          <div className={styles.quickLinks}>
            <h4 className={styles.sectionTitle}>Links rapidos</h4>
            <nav aria-label="Links de navegacao do rodape">
              <ul className={styles.linksList}>
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className={styles.quickLink} aria-label={`Ir para ${link.name}`}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles.contactInfo}>
            <h4 className={styles.sectionTitle}>Contato</h4>
            <address className={styles.addressBlock}>
              <div className={styles.contactItem}>
                <Phone className={styles.contactIcon} aria-hidden="true" />
                <a href={contactInfo.phone.href} className={styles.contactLink} aria-label={contactInfo.phone.label}>
                  {contactInfo.phone.number}
                </a>
              </div>

              <div className={styles.contactItem}>
                <Mail className={styles.contactIcon} aria-hidden="true" />
                <a href={contactInfo.email.href} className={styles.contactLink} aria-label={contactInfo.email.label}>
                  {contactInfo.email.address}
                </a>
              </div>

              <div className={styles.contactItem}>
                <MapPin className={styles.contactIcon} aria-hidden="true" />
                <a
                  href={contactInfo.address.mapsUrl}
                  className={styles.contactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={contactInfo.address.label}
                >
                  {contactInfo.address.full}
                </a>
              </div>
            </address>
          </div>

          <div className={styles.socialMedia}>
            <h4 className={styles.sectionTitle}>Siga-nos</h4>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                  >
                    <IconComponent className={styles.socialIcon} aria-hidden="true" />
                    <span className={styles.socialName}>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.bottomFooter}>
          <div className={styles.copyright}>
            <p className={styles.copyrightText}>(c) {currentYear} Cafeteria Gostinho de Cafe. Todos os direitos reservados.</p>
          </div>

          <div className={styles.legalLinks}>
            <Link href="/privacidade" className={styles.legalLink}>
              Politica de Privacidade
            </Link>
            <span className={styles.separator} aria-hidden="true">
              |
            </span>
            <Link href="/termos" className={styles.legalLink}>
              Termos de Uso
            </Link>
            <span className={styles.separator} aria-hidden="true">
              |
            </span>
            <Link href="/cookies" className={styles.legalLink}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
