import { faBook, faMapMarkerAlt, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useContext } from 'react';

import styles from './styles.module.scss';
import { UserContext } from './../../contexts/UserContext';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';

interface IUser {
    name: string,
    location: string
}

interface IBook {
    id: string,
    titol: string,
    author: string,
    isbn: string,
    year: Date,
    genre: string,
    photo: string,
    book_status: string,
    book_note: number, 
    user: IUser
}

export function CardBookUser() {
    const [data, setData] = useState<IBook[]>([]);
    const userContext = useContext(UserContext);
    const router = useRouter();

    const getData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' ? 'http://' : 'https://'}${process.env.NEXT_PUBLIC_BASE_URL}/books-user/${userContext.user.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const parsedRes = await response.json();
        setData(parsedRes);
    } 

    const setBookId = (e, id: string) => {
        e.preventDefault();
        
        localStorage.setItem('book', id)
        router.push('/book');
    }
    
    useEffect(() => {
        if (userContext.user.id.length > 0) {
            getData();
        }
    }, [userContext]);

    return(
        <>
            <div className={styles.cardsBookContainer}>
                {data.length > 0 && data.map((element) => { 
                    return(
                        <article className={styles.card} key={uuid()} onClick={e => setBookId(e, element.id)} >
                            <div className={styles.cardHearder}>
                            <img src={element.photo} alt="Imagen del libro" className={styles.photo} />
                            </div>
                            <div className={styles.carBody}>
                                <h4>{element.titol}</h4>
                                <table className={styles.notes}>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td className={styles.bookStarsNotActiv}>
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                <div className={styles.bookStarsActiv} style={{
                                                        width: `calc(${(element.book_note * 20)}% - ${element.book_note > 0 ? (Math.floor(element.book_note - 1) * 4) : 0}px)`
                                                    }}>
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                    <FontAwesomeIcon icon={faStar} className={styles.stars} />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>  
                        </article>
                    );
                })}
            </div>
            {data.length === 0 && (
                <>
                    <h1 className={styles.noBooks}>Aún no tienes libros registrados</h1>
                    <h2>Registre el primer libro y gane un punto</h2>
                </>
            )}
        </> 
    );
}
