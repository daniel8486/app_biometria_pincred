import { useEffect, useState } from 'react';
import styles from './Post.module.css';
import icon from '../assets/images/user-60.png'
import { Base64 } from 'js-base64';
import { URL_API } from '../api/Api';
import { consultaProsp,consultaCliente,isLogged,consultarAnexos } from '../services/Services';
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
    const [dataCliente,setDataCliente] = useState([]);

    
   const handleConsultaCpf = async (event) => {
    event.preventDefault();
    console.log('Meu CPF =>',cpf)
    try {
      if(cpf != ''){
        setIsLoading(true); 
        let response = await consultaProsp(cpf)
        console.log('resposta => ',response.data.propostas)
        setData(response.data.propostas);
        handleConsultaCliente(); 
      }
    } catch (error) {
      
    }
    setIsLoading(false); 
   } 

    const handleConsultaCliente = async () => {
      console.log('Meu CPF, estou no useEffect =>',localStorage.getItem('@cpf'))
      try {
        setIsLoading(true); 
        let responseCliente = await consultaCliente()
        console.log('resposta cliente => ',responseCliente.data)
        setDataCliente(responseCliente.data);
      } catch (error) {
        
      }
      setIsLoading(false); 
    }


    const handleConsultaAnexos = async (e) => {
      console.log('Estou aqui => Oba',e)
      try {
        setIsLoading(true); 
        let responseListAnexo= await consultarAnexos()
        console.log('resposta cliente Anexos => ',responseListAnexo.data)
        setDataCliente(responseListAnexo.data);
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

             { data.map((item,index,data) => {
              { item.id = index ;}
              { item.nrStatus = item['nrStatus'] } 
              { item.dsStatus = item['dsStatus'] } 
              { item.nrProsp = item['nrProsp'] } 
              { localStorage.setItem('@nrProsp',item.nrProsp)}
              { item.historico = item['historico']}
               { if(item.nrStatus === 4080){
                return(
                  <div>
                     <hr />
                      <h1 className={styles.post.h1 }> Dados do Contrato </h1>
                     <hr />
                      <ul> 
                       <li> Número da Proposta : { item.nrProsp }</li>
                       <li> Status : { item.dsStatus }</li>
                       {
                        item.historico.map((emp,i) => {
                         { if(emp.nrStatus === 4020){
                          return(
                            <ul>
                              <li> Data : { emp.dtIn }</li>
                              <li> Status : { emp.nrStatus}</li>
                              <li> Descrição : { emp.dsStatus }</li>
                              <li> </li>
                              <li> 
                                <button href='#' className={styles.tilt} onClick={ (e = item.nrProsp) => handleConsultaAnexos(e) }> 
                                   Consulta Imagem 
                                </button> 
                              </li> 
                              <li> </li>
                            </ul>

                          )
                         }} 
                        })
                       }
                      </ul>
                    <hr />
                  </div>
                ) 
               }}
                
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