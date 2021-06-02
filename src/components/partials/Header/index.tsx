import styles from './styles.module.scss';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import Link from 'next/link'

export function Header() {
    const [showMenu, setshowMenu] = useState(false);
    const [showUserOptions, setShowUserOptions] = useState(false);
    const userContext = useContext(UserContext); 

    const handleMenuToggle = () => {
        setshowMenu(!showMenu);
    }

    const handleUserOptions = () => {
        setShowUserOptions(!showUserOptions);
    }

    const handleUserSection = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    useEffect(() => {
        userContext.signIn(JSON.parse(localStorage.getItem('user')));
    }, []);

    useEffect(() => {}, [showMenu, showUserOptions]);

    return (
        <header>
            <div className={ styles.headerContainer }>
                <h2><a href="/">Mi Libre</a></h2>

                <div className={ showMenu ? `${styles.menuToggle} ${styles.on}` : styles.menuToggle } onClick={handleMenuToggle}>
                    <div className={ styles.one }></div>
                    <div className={ styles.two }></div>
                    <div className={ styles.three }></div>
                </div>
                <div className={ showMenu ? `${styles.menuSection} ${styles.on}` : styles.menuSection }>
                    <nav>
                        <ul className={ styles.menu }>
                            <li onClick={handleMenuToggle}><Link href="/">Home</Link></li>
                            <li onClick={handleMenuToggle}><Link href="/books">Libros</Link></li>
                            <li onClick={handleMenuToggle}><Link href="/howIsWork">Como funciona</Link></li>
                            <li onClick={handleMenuToggle}><Link href="/about">Sobre nosotros</Link></li>
                        </ul>
        
                        {(userContext.user === null)
                            ? (
                                <ul className={ styles.menuUser }>
                                    <li><Link href="/login">Login</Link></li>
                                    <li><Link href="/register">Registrarse</Link></li>
                                </ul>
                            ) : (
                                <div>
                                    <ul className={styles.menuUserLogin}>
                                        <li><button className={styles.avatar} onClick={handleUserOptions} ><img src={userContext.user.photo !== null ? userContext.user.photo : "img/profile-avatar.svg"} alt="avatar" /></button></li>
                                    </ul>
                                    <ul className={showUserOptions ? `${styles.userOptions} ${styles.on}` : styles.userOptions} onBlur={handleUserOptions}>
                                        <li onClick={handleMenuToggle}><Link href="/profile">Ver Perfil</Link></li>
                                        <li onClick={handleUserSection}><a href="/">Salir</a></li>
                                    </ul>
                                </div>
                            )
                        }
                    </nav>
                </div>
            </div>
        </header>
    );
}