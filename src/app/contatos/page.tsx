import styles from './styles.module.scss'
import Image from 'next/image'
import cafeImage from '../../../public/DALL·E 2024-09-26 10.48.56 - A dynamic scene of coffee being poured into a cup. The coffee is mid-air, with droplets splashing as the stream flows from a coffee pot into a simple  1 (1).svg'

export default function Page(){
  return(
    <main>
   <div className={styles.container}>
    <Image
     className={styles.img} 
     src={cafeImage}
    alt='Imagem de fundo'
    objectFit='cover' // A imagem cobre toda área de fundo
    quality={100}
    priority={true}
    />
<h1 className={styles.contatoTitle}>Contato</h1>

<div className={styles.content}>
          
          <div className={styles.rightSection}>
          <h2 className={styles.question}>Como podemos<br/> transformar sua <br/>pausa em um <br/>momento <br/>inesquecível?</h2>

            
            <form className={styles.form}>
            <h2 className={styles.messageTitle}>Mensagem</h2>
              <input
                className={styles.input}
                type="text"
                placeholder="Digite seu nome"
              />
              <input
                className={styles.input}
                type="email"
                placeholder="Digite seu email"
              />
              <textarea
                className={styles.textarea}
                placeholder="Digite sua mensagem"
              />
            
            </form>
          </div>
        </div>
              <div className={styles.leftSection}>
              <p className={styles.subText}>
              Entre em contato e nos deixe saber sua opinião sobre nossos <br/>serviços.
            </p>
              <button type="submit" className={styles.submitButton}>
                Enviar
              </button>
           </div>
      </div>
    </main>
  );
}