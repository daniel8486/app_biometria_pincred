import { useEffect, useState } from 'react';
import styles from './Post.module.css';
import icon from '../assets/images/user-60.png'
import { Base64 } from 'js-base64';
import { URL_API } from '../api/Api';
import { consultaProsp,consultaCliente,isLogged,consultarAnexos,pegaFoto } from '../services/Services';
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
    const [dataClienteAnexo,setDataClienteAnexo] = useState([]);
    const [dataAnexo,setDataAnexo] = useState([]);

    
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


    const handleConsultaAnexos = async (item) => {
      event.preventDefault();
      console.log('myProsp =>',JSON.parse(JSON.stringify(item)))
      let searchAnexo = JSON.parse(JSON.stringify(item)); 
      try {
        setIsLoading(true); 
        let responseListAnexo= await consultarAnexos(searchAnexo)
        console.log('resposta cliente Anexos => ',responseListAnexo.data.listAnexos)
        setDataClienteAnexo(responseListAnexo.data.listAnexos);
        
      } catch (error) {
        
      }
      setIsLoading(false); 
    }

    const handleConsultarFoto = async (a) => {
      event.preventDefault();
      console.log('sequencial foto', JSON.parse(JSON.stringify(a)));
      let nrSeq  = JSON.parse(JSON.stringify(a)); 
      try {
        setIsLoading(true); 
        let responseAnexo= await pegaFoto(nrSeq)
        console.log('resposta cliente Anexo Base 64 => ',responseAnexo.data.imAnexo)
        setDataAnexo(responseAnexo.data.imAnexo);
        
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
              { item.id = index }
              { item.nrStatus = item['nrStatus'] } 
              { item.dsStatus = item['dsStatus'] } 
              { item.nrProsp = item['nrProsp'] } 
              { item.historico = item['historico']}
               { if(item.nrStatus === 4080){
                return(
                  <div>
                     <hr />
                      <h1 className={styles.post.h1 }> Dados do Contrato </h1>
                     <hr />
                      <ul> 
                       <li key={index}>
                        <p> Número da Proposta : { item.nrProsp }  </p>
                        <p> Status : { item.dsStatus } </p> 
                       </li>
                       {
                        item.historico.map((emp,i) => {
                         { if(emp.nrStatus === 4020){
                          return(
                            <div> 
                             <p> Data : { emp.dtIn } </p>
                             <p> Status : { emp.nrStatus} </p>
                             <p> Descrição : { emp.dsStatus } </p>
                            </div>
                          )
                         }} 
                        })
                       }
                       <div>
                         <button href='#' className={styles.tilt} value={item['nrProsp']} onClick={ (e) => handleConsultaAnexos(e.target.value) }> 
                            Consultar Dados 
                         </button>
                       </div>    
                      </ul>
                    <hr />

                    <div> 
                      { dataClienteAnexo.map( (a,i) => {
                         console.log('Anexo Principal',a['dsAnexo'].match(/Biometria/))
                         if(a['dsAnexo'].match(/Biometria/)){
                          return (
                           <div>  
                            <li key={i}> 
                              <p> { a['dsAnexo'] } </p>
                              <p> { a['nrSeq'] } </p> 
                            </li>
                            <button href='#' className={styles.tilt} value={a['nrSeq']} onClick={ (e) => handleConsultarFoto(e.target.value) }> 
                              Consultar Biometria 
                            </button>
                           </div> 
                           )
                         }else {
                          return <li> { null } </li> 
                         }
                        })
                      }
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className={styles.containerDiv}> 
                        <img src={`data:image/jpeg;base64,${dataAnexo}`} />
                         <li> 
                         <button href='#' className={styles.tilt} value={null} onClick={ (e) => handleConsultarFoto(e.target.value) }> 
                           Validar SERPRO
                         </button>
                         </li>
                    </div>
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