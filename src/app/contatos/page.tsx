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
<h1 className={styles.contatoTitle}>Feedback</h1>

<div className={styles.content}>
          
          <div className={styles.rightSection}>
          <h2 className={styles.question}>Sua opnião é muito importante<br/> para nós!<br/>Por favor,<br/>compartilhe sua experiência e sugestões.</h2>

            
            <form className={styles.form}>
            <h2 className={styles.messageTitle}>Mensagem</h2>
              <input
                className={styles.input}
                type="text"
                placeholder="Digite seu nome..."
              />
              <input
                className={styles.input}
                type="email"
                placeholder="Digite seu email..."
              />
              <textarea
                className={styles.textarea}
                placeholder="Digite sua mensagem..."
              />
              <div className={styles.ratingSection}>
  <label className={styles.ratingLabel}>Avaliação:</label>
  <div className={styles.stars}>
    <input type="radio" id="star5" name="rating" value="5" />
    <label htmlFor="star5" className={styles.star}>★</label>
    <input type="radio" id="star4" name="rating" value="4" />
    <label htmlFor="star4" className={styles.star}>★</label>
    <input type="radio" id="star3" name="rating" value="3" />
    <label htmlFor="star3" className={styles.star}>★</label>
    <input type="radio" id="star2" name="rating" value="2" />
    <label htmlFor="star2" className={styles.star}>★</label>
    <input type="radio" id="star1" name="rating" value="1" />
    <label htmlFor="star1" className={styles.star}>★</label>
  </div>
</div>
<textarea
    className={styles.textarea}
    placeholder="Conte-nos sobre sua experiência ou sugerir melhorias"
  />
            
            </form>
          </div>
        </div>
              <div className={styles.leftSection}>
              <p className={styles.subText}>
              como foi sua experiência com nossos produtos e serviços? <br/>serviços.
            </p>
              <button type="submit" className={styles.submitButton}>
                Enviar Feedback
              </button>
              <textarea
  className={styles.textarea}
  placeholder="Tem alguma sugestão para melhorar nosso serviço?"
/>
           </div>
           <div className={styles.thankYouMessage}>
  <h3>Obrigado pelo seu Feedback!</h3>
  <p>Valorizamos muito sua opinião e vamos usá-la para melhorar continuamente nossos serviços.</p>
</div>
      </div>
    </main>
  );
}