import styles from './styles.module.scss';

import { FormEvent, useState, useContext } from 'react';
import { UserRegContext } from './../../contexts/UserRegContext';
import { useRouter } from 'next/router';

interface IAuthUser {
    name: string,
    email: string,
    password: string,
    location: string,
    favorite_book: string,
    favorite_author: string,
    birthday: Date,
}

export function RegisterForm() {
    const [data, setData] = useState<IAuthUser>();
    const [isValid, setIsValid] = useState(true);
    const userRegContext = useContext(UserRegContext);
    const router = useRouter();
    
    const onChange = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    const handleIsValid = (e) => {
        e.preventDefault();

        if (data !== undefined) {
            if (data.name !== undefined && data.email !== undefined && data.password !== undefined) {
                if (data.name.length > 0 && data.email.length > 0 && data.password.length > 0) {
                    userRegContext.setState(data);
                   
                    router.push('/registerData');
                } else {
                    setIsValid(false);
                }
            } else {
                setIsValid(false);
            }
        } else {
            setIsValid(false);
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form method="POST">
                    <h2>Registrarse</h2>
                    <span className={!setIsValid? `${styles.message} ${styles.required}` : styles.message }>Campos Obligatorios *</span>
                    <input type="text" required name="name" placeholder="Nombre" className={!isValid ? `${styles.required}` : ''} onChange={onChange} />
                    <input type="email" required name="email" placeholder="E-mail" className={!isValid ? `${styles.required}` : ''} onChange={onChange} />
                    <input type="password" required name="password" placeholder="Contraseña" className={!isValid ? `${styles.required}` : ''} onChange={onChange} />
                    <span className={!isValid ? `${styles.message} ${styles.required}` : styles.message }>Campos Obligatorios *</span>

                    <button onClick={handleIsValid}>Registrarse</button>
                </form>
                <div className={styles.aside}>
                    <img src="img/reading_time_gvg0.svg" alt="img-register" />
                </div>
            </div>
        </div>
    );
}