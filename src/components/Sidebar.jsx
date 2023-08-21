//import { PencilLine } from 'phosphor-react'
import styles from './Sidebar.module.css';
import icon from '../assets/images/user-60.png';
import { useNavigate } from 'react-router-dom';

export function Sidebar(){

    const navigate = useNavigate(); 

    function exit(){
      localStorage.clear();
      navigate('/login');
    }

    return(
        <> 
         <aside className={styles.sidebar}> 
           <img className={styles.cover} src='https://images.unsplash.com/photo-1580894894513-541e068a3e2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'/>
           <div className={styles.profile}> 
             <img className={styles.avatar} src={icon} />
             <strong> { localStorage.getItem('@username') ? localStorage.getItem('@username').slice(1,-1).toUpperCase() : '' } </strong>
           </div>

           <footer>

            <a onClick={exit}>
             Sair
            </a>

           

           </footer>
         </aside>
        </>
    )
}