import styles from './page.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import coffeeImage from '../../public/DALL·E 2024-09-26 10.48.56 - A dynamic scene of coffee being poured into a cup. The coffee is mid-air, with droplets splashing as the stream flows from a coffee pot into a simple  1 (1).svg'

export default function Page(){
  return(
    <main>
   <div className={styles.container}>
    <Image 
    className={styles.img} 
    src={coffeeImage}
    alt='Imagem de fundo'
    objectFit='cover' // A imagem cobre toda área de fundo
    quality={100}
    priority={true}
    />
<h1 className={styles.text}>
 "Preparando<br/> seu café com <br/>amor em cada <br/>xicará" 
</h1>
<Link href="/">
Home
</Link>
   </div>
    </main>
  )
}
