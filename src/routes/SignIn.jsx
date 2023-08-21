import React,{useEffect,useState } from 'react';
import styles from './SignIn.module.css'
import logoWhite from '../assets/images/logo-white.svg';
import { login } from '../services/Services';
import Modal from 'react-modal';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Base64 } from 'js-base64';
import { URL_API } from '../api/Api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function SignIn(){

    const navigate = useNavigate();

    const [user,setUser] = useState('');
    const [pass,setPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data,setData] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);

  // Função que abre a modal
  function abrirModal() {
    setIsOpen(true);
  }

  // Função que fecha a modal
  function fecharModal() {
    setIsOpen(false);
  }

  

  function notifyDanger(){
    if(user === '' && pass === ''){  
     toast.error("Informe o usuário e senha")
    }
  }

    const [] = useState([])
   
    const handleLogin = async (event) => {
      event.preventDefault();
      notifyDanger();
      try {
         if (user != '' && pass != ''){
            setIsLoading(true); 
            let response = await login(user,pass)
            console.log('resposta => ',response)
            localStorage.setItem('@username', JSON.stringify(response.data.username))
            localStorage.setItem('@token', JSON.stringify(response.headers.auth))
            if(response.data.username === user && response.status === 200 && response != undefined){
                navigate('/home');   
            }
          }  
        } catch (error) {
          console.log('aqui 1 ',error.message); 
          console.log('aqui 2',error.response.status); 
          console.log('aqui 3',error);
          function notifyWarning(){
            toast.warn(`Alerta: ${error.message}`);
          }
          notifyWarning(); 
        }
        
        setIsLoading(false);
      
    }

  
    
    return(
        <div className="container"> 
          <main className={styles.container}> 
           <form onSubmit={handleLogin} className={styles.formLogin}>
            <img src={logoWhite} />
              <hr className={styles.lineHr}/> 
              <h1> Validação Facial </h1>
              <p>Informe seus dados de acesso</p>
              <label>Usuário</label>
              <input
                 id="user" 
                 type="text"
                 value={user} 
                 onChange={(e) => setUser(e.target.value)}
                 placeholder="Digite seu usuário" 
                 />
              <label>Senha</label>
              <input
                 id="pass" 
                 type="password" 
                 value={pass} 
                 onChange={(e) => setPass(e.target.value)}
                 placeholder="Digite sua senha" />
             { 
               isLoading ? 
                 <LoadingSpinner /> 
                         : 
               <button 
                  type="submit"
                  className={styles.btn} 
                  disabled={isLoading}> 
                 Entrar 
               </button> 
            } 

            { <ToastContainer /> }

           </form>
        </main>
        </div>
        
    )
}

