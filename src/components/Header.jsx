import styles from './Header.module.css';
import logoWhite from '../assets/images/logo-white.svg';
import logoPincred from '../assets/images/logo-pincred.svg';

export function Header(){
    return(
        <>
          <header className={styles.header}>
            <img src={logoWhite} />
          </header>
        </>
    )
}