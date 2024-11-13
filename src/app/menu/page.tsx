"use client";
import { useState } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import coffeimg from '../../../public/DALL·E 2024-09-26 10.48.56 - A dynamic scene of coffee being poured into a cup. The coffee is mid-air, with droplets splashing as the stream flows from a coffee pot into a simple  1 (1).svg'
import {FiPlus} from 'react-icons/fi'

interface Produto {
  product:string, 
  price:number, 
  description:string
}

export default function Menu() {
  const [data, setData] = useState<Produto[]>([])
  function handleAdd(product:string, price:number, description:string):void{
  const novoItem:Produto = {product, price,description};
   setData(prevData => [...prevData, novoItem]);
    
  }

  function ProductToQuary(produto:Produto){
   return{
    product:produto.product,
    price:produto.price.toString(),
    description:produto.description
   }
  }
  return (
    <div className={styles.menuPage}>
      <h1>"Sinta o sabor da felicidade em cada gole de café e em cada fatia de torta" </h1>
      <h2> Uma combinação que vai deixar seu dia ainda mais doce!</h2>
      <Image
        className={styles.imgcoffee}
        src={coffeimg}
        alt="Imagem de fundo"
        objectFit="cover"
        quality={100}
        priority={true}
      />
      <div className={styles.content}>
        <div className={styles.menuContainer}>
          {/*Retângulo para Nossas tortas*/}

          <div className={styles.transparentRectangle}>
            <h2>Nossas Tortas</h2>
            <ul>
              <li>
                <div>
                  <strong>Torta de Chocolate  - R$ 12,00</strong>
                  <p className={styles.descricao}>- Fatia de torta de chocolate grego, com chantilly.</p>
                </div>
                <button className={styles.iconlink} onClick={() => handleAdd('Torta de Chocolate',12,'Fatia de torta de chocolate grego, com chantilly')}>
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Torta de Morango - R$ 10,00</strong>
                  <p className={styles.descricao}>- Fatia de torta de morango silvestre</p>
                </div>
                <button className={styles.iconlink} onClick={() => handleAdd('Torta de Morango',10,'Fatia de torta de morango silvestre')} >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Torta de Banana - R$ 9,00</strong>
                  <p className={styles.descricao}>- Fatia de torta de banana com canela</p>
                </div>
                <button className={styles.iconlink} onClick={() => handleAdd('Torta de Banana',9,'Fatia de torta de banana com canela')} >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Torta de Maçã - R$ 11,00</strong>
                  <p className={styles.descricao}>- Fatia de torta de maçã do nordeste brasileiro</p>
                </div>
                <button className={styles.iconlink} onClick={() => handleAdd('Torta de Maçã',11,'Fatia de torta de maçã do nordeste brasileiro')} >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Torta de Nozes - R$ 14,00</strong>
                  <p className={styles.descricao}>- Fatia de torta de nozes americanas</p>
                </div>
                <button className={styles.iconlink} onClick={() => handleAdd('Torta de Nozes',14,'Fatia de torta de nozes americanas')} >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Torta de Abacaxi - R$ 8,00</strong>
                  <p className={styles.descricao}>- Fatia de torta de abacaxi caramelizado</p>
                </div>
                <button className={styles.iconlink} onClick={() => handleAdd('Torta de Abacaxi',8,'Fatia de torta de abacaxi caramelizado')} >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Torta de Limão - R$ 10,00</strong> 
                  <p className={styles.descricao}>- Fatia de torta limãocom cobertura de chocolate branco</p>
                </div>
                <button className={styles.iconlink} onClick={() => handleAdd('Torta de Limão',10,'Fatia de torta de limão com cobertura de chocolate branco')} >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
            </ul>
          </div>

          {/* Nossos Cafés */}
          <div className={styles.roundedRectangle}>
            <h2>Nossos Cafés</h2>
            <ul>
              <li>
                <div>
                  <strong>Expresso - R$ 5,00</strong>
                  <p className={styles.descriCafe}>- Grãos cuidadosamente selecionados</p>
                </div>
                <button className={styles.iconCafe} onClick={() => handleAdd('Expresso',5,'Grãos cuidadosamente selecionados')} >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Cappuccino - R$ 7,00</strong>
                  <p className={styles.descriCafe}>- Expresso com leite vaporizado</p>
                </div>
                <button className={styles.iconCafe} onClick={() => handleAdd('Cappuccino',7,'Expresso com leite vaporizado')} >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Afogato - R$ 9,00</strong>
                  <p className={styles.descriCafe}>- Expresso com sorvete</p>
                </div>
                <button className={styles.iconCafe} onClick={() => handleAdd('Afogato',9,'Expresso com sorvete')} >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Café Macchiato - R$ 6,50</strong>
                  <p className={styles.descriCafe}>- Café manchado com leite vaporizado</p>
                </div>
                <button className={styles.iconCafe} onClick={() => handleAdd('Café Macchiato',6.5,'Café manchado com leite vaporizado')} >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Chocolate Quente - R$ 8,00</strong>
                  <p className={styles.descriCafe}>- Leite vaporizado com manchas de chocolate</p>
                </div>
                <button className={styles.iconCafe} onClick={() => handleAdd('Chocolate Quente',8,'Leite vaporizado com manchas de chocolate')} >
                  <FiPlus className={styles.plusIcon} />
                </button>
              </li>
              <li>
                <div>
                  <strong>Café Gelado - R$ 6,00</strong>
                  <p className={styles.descriCafe}>- Frappe de café</p>
                </div>
                <button className={styles.iconCafe} onClick={() => handleAdd('Café Gelado',6,'Frappe de café')} >
                  <FiPlus className={styles.plusIcon} />
                </button>
                
              </li>
              <li>
                <div>
                  <strong>Leite Macchiado - R$ 7,50</strong>
                  <p className={styles.descriCafe}>- Leite vaporizado, manchado com café</p>
                </div>
                <button className={styles.iconCafe} onClick={() => handleAdd('Leite Macchiato',7.5,'Leite vaporizado, manchado com café')} >
                  <FiPlus className={styles.plusIcon} />
                </button>
                
              </li>
            </ul>
          </div>
        </div>

        {/* Carrinho */}
        <div className={styles.cart}>
          <Link href="/carrinho"  className={styles.cartButton}>
            Visualizar no carrinho <span className={styles.cartIcon}>🛒</span>
          </Link>
          <p> "OBS: Todas as bebidas têm o mesmo tamanho de 200ml"</p>
        </div>
      </div>
    </div>
  );
}