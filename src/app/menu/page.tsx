import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import coffeimg from '../../../public/DALL·E 2024-09-26 10.48.56 - A dynamic scene of coffee being poured into a cup. The coffee is mid-air, with droplets splashing as the stream flows from a coffee pot into a simple  1 (1).svg'
import {FiPlus} from 'react-icons/fi'
export default function Menu() {
    return (
      <div className={styles.menuPage}>
        <Image 
        className={styles.imgcoffee} 
        src={coffeimg} 
        alt="logo" 
        width={100} 
        height={100} 
        objectFit='cover' // A imagem cobre toda área de fundo
    quality={100}
    priority={true}
        />
        <div className={styles.content}>
         
          <div className={styles.menuContainer}> 
          <div className={styles.menuSection}>
            {/* Nossas Tortas */}
            <div className={styles.menuCategory}>
              <h2>Nossas Tortas</h2>
              <ul>
                <li>
                  <strong>Torta de Chocolate</strong> 
                  <button className={styles.iconlink} >
                  < FiPlus className={styles.plusIcon}/>
                  </button> <br/>
                  -Fatia de torta de chocolate grego, com chantilly.
                
                </li>
                <li>
                  <strong>Torta de Morango</strong> 
                  <button className={styles.iconlink} >
                  < FiPlus className={styles.plusIcon}/>
                  </button><br/>
                  - Fatia de torta de morango silvestre
                </li>
                <li>
                  <strong>Torta de Banana</strong> 
                  <button className={styles.iconlink} >
                  < FiPlus className={styles.plusIcon}/>
                  </button><br/>
                  - Fatia de torta de banana com canela
                </li>
                <li>
                  <strong>Torta de Maçã</strong> 
                  <button className={styles.iconlink} >
                  < FiPlus className={styles.plusIcon}/>
                  </button><br/>
                  - Fatia de torta de maçã do nordeste brasileiro
                </li>
                <li>
                  <strong>Torta de Nozes</strong> 
                  <button className={styles.iconlink} >
                  < FiPlus className={styles.plusIcon}/>
                  </button><br/>
                  - Fatia de torta de nozes americanas
                </li>
                <li>
                  <strong>Torta de Abacaxi</strong> 
                  <button className={styles.iconlink} >
                  < FiPlus className={styles.plusIcon}/>
                  </button><br/>
                  - Fatia de torta de abacaxi caramelizado
                </li>
                <li>
                  <strong>Torta de Limão</strong> 
                  <button className={styles.iconlink} >
                  < FiPlus className={styles.plusIcon}/>
                  </button><br/>
                  - Fatia de torta com cobertura de chocolate branco
                </li>
              </ul>
            </div>
          </div>
  <div>
            {/* Nossos Cafés */}
            <div className={styles.menuCategory}>
              <h2>Nossos Cafés</h2>
              <ul>
                <li>
                  <strong>Expresso</strong> 
                  <button className={styles.iconCafe} >
                  < FiPlus className={styles.plusIcon}/>
                  </button><br/>
                  - Grãos cuidadosamente selecionados
                </li>
                <li>
                  <strong>Cappuccino</strong> 
                  <button className={styles.iconCafe} >
                  < FiPlus className={styles.plusIcon}/>
                  </button><br/>
                  - Expresso com leite vaporizado
                </li>
                <li>
                  <strong>Afogato</strong> 
                  <button className={styles.iconCafe} >
                  < FiPlus className={styles.plusIcon}/>
                  </button><br/>
                  - Expresso com sorvete
                </li>
                <li>
                  <strong>Café Macchiato</strong> - café manchado com leite vaporizado
                  <button className={styles.iconCafe} >
                  < FiPlus className={styles.plusIcon}/>
                  </button><br/>
                  - Café manchado com leite vaporizado
                </li>
                <li>
                  <strong>Chocolate Quente</strong> 
                  <button className={styles.iconCafe} >
                  < FiPlus className={styles.plusIcon}/>
                  </button> <br/>
                  - Leite vaporizado com manchas de chocolate
                </li>
                <li>
                  <strong>Café Gelado</strong> 
                  <button className={styles.iconCafe} >
                  < FiPlus className={styles.plusIcon}/>
                  </button><br/>
                  - Frappe de café
                </li>
                
              </ul>
              </div>
            </div>
          </div>
  
          {/* Carrinho */}
          <div className={styles.cart}>
            <Link href="/carrinho" className={styles.cartButton}>
              Visualizar no carrinho <span className={styles.cartIcon}>🛒</span>
            </Link>
          </div>
        </div>
        
      </div>
    );
  }