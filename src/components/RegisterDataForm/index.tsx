import styles from './styles.module.scss';

import { FormEvent, useState, useContext, useEffect, useRef } from 'react';
import { UserRegContext } from './../../contexts/UserRegContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface IUser {
    name: string,
    email: string,
    password: string,
    location: string,
    favorite_book: string,
    favorite_author: string,
    birthday: Date,
}

export function RegisterDataForm() {
    const [data, setData] = useState<IUser>();
    const [isReg, setIsReg] = useState(false);
    const [isValid, setIsvalid] = useState(true);
    const userRegContext = useContext(UserRegContext);
    const router = useRouter();

    const hasMounted = useRef(false);
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
        } else {
            onSubmit();
        }
    }, [isReg]);

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    const handleReturn = (e) => {
        e.preventDefault();
        
        router.push('/register');
    }

    const handleIsValid = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (data !== undefined) {
            if (data.location !== undefined && data.birthday !== undefined) {
                if (data.location.length > 0) {
                    userRegContext.setState({...userRegContext.user, ...data }, data);
                    setIsReg(true);
                } else {
                    setIsvalid(false);
                }
            } else {
                setIsvalid(false);
            }
        } else {
            setIsvalid(false);
        }
    }

    const onSubmit = async () => {
        const response = await fetch('http://localhost:3333/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userRegContext.user),
        });

        const parsedRes = await response.json();
        
        if (!parsedRes.message) {
            toast.success('Usuario registrado con exito');
            router.push('/login');
        } else {
            toast.error(parsedRes.message);
        }
    } 

    return(
        <div className={styles.container}>
            <form method="POST" className={styles.wrapper}>
                <input type="text" name="location" required placeholder="Localidad..." className={!isValid ? `${styles.required}` : ''} onChange={onChange} />
                <input type="text" name="favorite_book" placeholder="Libro preferido" onChange={onChange} />
                <input type="text" name="favorite_author" placeholder="Author preferido" onChange={onChange} />
                <label htmlFor="birthday">Fecha de nacimiento</label>
                <input type="date" name="birthday" required className={!isValid ? `${styles.required}` : ''} onChange={onChange} />
                <span className={!isValid ? `${styles.message} ${styles.required}` : styles.message }>Campos Obligatorios *</span>

                <div className={styles.buttonsActions}>
                    <input type="button" className={styles.cancelar} onClick={handleReturn} value="Volver" />
                    <button className={styles.enviar} onClick={(e: FormEvent<HTMLButtonElement>) => handleIsValid(e)}>Enviar</button>
                </div>
            </form>
        </div>
    );
}