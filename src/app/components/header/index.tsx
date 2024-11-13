import styles from './styles.module.scss';
import Image from 'next/image';
import logo from '../../../../public/cafe 1.svg';
import instagramIcon from '../../../../public/skill-icons_instagram.svg';
import facebookIcon from '../../../../public/logos_facebook.svg';
import whatsappIcon from '../../../../public/logos_whatsapp-icon.svg';
import phoneIcon from '../../../../public/noto-v1_telephone.svg';
import Link from 'next/link';

export default function Header() {
    return (
        <>
            <header className={styles.header}>
            <div className={styles.cafeteria}>
                    <h1>Cafeteria</h1>
                </div>

                <div className={styles.leftSection}>
                <div className={styles.divlogo}>
                    <Image  src={logo} alt="logo" width={100} height={100} />
                    <h1>gostinho de café</h1>
                </div>
                <div className={styles.iconsTag}>

                    <nav className={styles.navLinks}>
                        <Link href="/">
                        Home
                        </Link>
                        <Link href="/menu">Menu</Link>
                        <Link href="/contatos">
                        Contatos
                        </Link>
                    </nav>
                    <div className={styles.socialIcons}>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <Image src={instagramIcon} alt="Instagram" width={24} height={24} />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <Image src={facebookIcon} alt="Facebook" width={24} height={24} />
                        </a>
                        <a href="https://wa.me/numero" target="_blank" rel="noopener noreferrer">
                            <Image src={whatsappIcon} alt="WhatsApp" width={24} height={24} />
                        </a>
                        <a href="tel:+55000000000">
                            <Image src={phoneIcon} alt="Phone" width={24} height={24} />
                        </a>
                    </div>
                </div>
                </div>

             

                
            </header>
        </>
    );
}

