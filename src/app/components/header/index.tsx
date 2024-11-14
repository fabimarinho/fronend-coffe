import styles from './styles.module.scss';
import Image from 'next/image';
import logo from '../../../../public/cafe 1.svg';
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
                    
                </div>
                </div>

             

                
            </header>
        </>
    );
}

