import styles from './Home.module.css';
import { Header } from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Home(){
    
    function notifySuccess(){
      if(localStorage.getItem('@username') != undefined){
       toast.success(" Seja Bem Vindo ");
      }else{
       toast.error("Algo deu errado")
      }    
    }

    notifySuccess(); 

    return(
        <>
        <Header />

        <p> { localStorage.getItem('@username') }</p>
        <p> { localStorage.getItem('@token') }</p>

        { <ToastContainer /> }

        </>
    )
}