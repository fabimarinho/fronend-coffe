import styles from './styles.module.scss'


export default function Footer() {
    return(
        <footer className={styles.container}>
            <div>
                
                <span className={styles.phoneNumber}> Telefone: (+55) 999 9999-9999</span>
                
                <span className={styles.address}> Endereço: Rua dos cafés - Centro, Cidade Exemplo, Brasil</span>

            </div>
            <p className={styles.text}> @ 2024 cafeteria gostinho de café</p>
        </footer>
    )
}