import React,{useEffect, useState} from 'react';
import styles from './Home.module.css';
import { Header } from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirect,useNavigate } from "react-router-dom";
import { Sidebar } from '../components/Sidebar';
import { Post } from '../components/Post';

export function Home(){
   const [isLogged,setIsLogged] = useState(false);

   const navigate = useNavigate();

    useEffect(() => {
      function logIn(){
       if(localStorage.getItem('@username') === null || undefined ){
         navigate('/login');
       }else{
        function notifySuccess(){
          toast.success(`Logado com Sucesso, ${localStorage.getItem('@username').slice(1,-1).toUpperCase()}`, {
            position: toast.POSITION.TOP_CENTER
          });
         }
         notifySuccess();
         console.log('sucesso');
       }
      }
      logIn();
    }, [])

    
    return(
        <>
         <Header /> 

           <div className={styles.wrapper}> 
             <Sidebar />
             <main> 
              <Post /> 
             </main>  
           </div>
       
        { <ToastContainer /> }

        </>
    )
}