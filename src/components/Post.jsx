import { useState } from 'react';
import styles from './Post.module.css';
import icon from '../assets/images/user-60.png'
import { Base64 } from 'js-base64';
import { URL_API } from '../api/Api';
import { consultaProsp } from '../services/Services';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {useTable} from 'react-table';


export function Post(){
   var date = new Date();
   const [cpf,setCpf] = useState('');

   const [isLoading, setIsLoading] = useState(false);


   const cpfMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }

    const [data,setData] = useState([]);

    
   const handleConsultaCpf = async (event) => {
    event.preventDefault();
    console.log('Meu CPF =>',cpf)
    try {
      if(cpf != ''){
        setIsLoading(true); 
        let response = await consultaProsp(cpf)
        console.log('resposta => ',response.data.propostas)
        setData(response.data.propostas);
      }
    } catch (error) {
      
    }
    setIsLoading(false); 
   } 


    return(
        <> 
         <article className={styles.post}> 
            <header> 
                <div className={styles.author}> 
                  <img className={styles.avatar} src={icon} />
                   <div className={styles.authorInfor}> 
                    <strong> { localStorage.getItem('@username').slice(1,-1).toUpperCase() } </strong>
                   </div>
                </div>
                <time title="Maio-2023" dateTime=""> {date.toLocaleDateString()} </time>
            </header>

            <div className={styles.content}> 
             <form onSubmit={handleConsultaCpf} className={styles.form}> 
               <label> CPF : </label>
                 <input
                   className={styles.forminput} 
                   maxLength='14'
                   value={cpfMask(cpf)}
                   onChange={(e) => setCpf(e.target.value)}
                 />
                 { isLoading ? <LoadingSpinner /> : 
                  <button className={styles.btn}> Consultar </button>
                 }
             
             </form>
            </div>

             { data.map((emp,index) => {
                return(
                  <div>
                      <ul key={index}> 
                       <li> Status: {emp['dsStatus']}</li>
                       <li> Cliente : {emp['nmClient']}</li>
                      </ul>
                    
                    <hr />
                  </div>
                )
              }) 
             }

            {
              data.forEach(function(){
                console.log(data);
              })
            } 
            
           {/**   
            <div>
              {names.filter(name => name.includes('J')).map(filteredName => (
                <li>
                  {filteredName}
                </li>
              ))}
            </div>
            */}

         </article>
        </>
    )
}