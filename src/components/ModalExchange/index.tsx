import styles from './styles.module.scss';

import { FormEvent, useContext, useState } from 'react';
import { UserContext } from './../../contexts/UserContext';
import { useRouter } from 'next/router';

export default function ModalExchange({ props }) {
    const userContext = useContext(UserContext);
    const [data, setData] = useState('');

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        setData(e.currentTarget.value);
    };

    return(
        userContext.user && (
            <div className={props.modal ? `${styles.modalContainer} ${styles.on}` : styles.modalContainer }>
                {props.data && (
                    <div className={styles.wrapper}>
                        <form action="#">
                            <h2>Intercambio</h2>
                            
                            <label htmlFor="text">Texto</label>
                            <textarea placeholder="Texto" name="text" defaultValue={
                                `¡Hola, tengo interese en el libro "${props.data.titol}"! ¿Lo intercambiamos?`
                            }/>
                            <label htmlFor="text">E-mail</label>
                            <input type="text" defaultValue={userContext.user.email}/>
                            <label htmlFor="text">Usuario</label>
                            <input type="text" defaultValue={userContext.user.name}/>
                        
                        <div className={styles.buttonsActions}>
                                <input type="button" className={styles.cancelar} onClick={props.handleModal} value="Cancelar" />
                                <button className={styles.enviar}>Enviar</button>
                            </div>
                        </form>
                    </div>)}
            </div>
        )
    );
}