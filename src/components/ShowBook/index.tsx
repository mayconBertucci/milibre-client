import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faMapMarkerAlt, faSearch, faStar, faUser } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.scss';
import htmlParse from 'html-react-parser';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from './../../contexts/UserContext';
import ModalExchange from '../ModalExchange';

interface IUser {
    id: string,
    name: string,
    email: string,
    location: string,
    favorite_book: string,
    favorite_author: string,
    birthday: Date,
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
    description: string,
    user: IUser
}


export default function ShowBook() {
    const [data, setData] = useState<IBook>();
    const [modal, setModal] = useState(false);
    const userContext = useContext(UserContext);
    
    const getData = async () => {
        const response = await fetch(`http://localhost:3333/books/${localStorage.getItem('book')}`, {
            method: 'GET',
        });
    
        const parsedRes = await response.json();
        setData(parsedRes);
    } 

    const handleModal = (e) => {
        e.preventDefault();

        setModal(!modal);
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <div className={styles.bookContainer}>
            <ModalExchange props={{data, modal, handleModal}}/>
            {data && (
                <div className={styles.wrapper}>    
                    <div className={styles.bookData}>
                        <div className={styles.bookAside}>
                            <img src={data.photo} alt="Capa del libro" />
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
                                                    width: `calc(${(data.book_note * 20)}% - ${data.book_note > 0 ? (Math.floor(data.book_note - 1) * 4) : 0}px)`
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
                           
                            {userContext.user && (
                                userContext.user.id !== data.user.id && (
                                    <button className={styles.bookExchange} onClick={handleModal}>Pedir intercambio</button>
                                )
                            )}
                        </div>
                        <div className={styles.bookDescription}>
                            <h1>{data.titol}</h1>
                           
                            <table className={styles.tableDescription}>
                                <thead>
                                    <tr>
                                        <th><FontAwesomeIcon icon={faUser} className={styles.icons} /></th>
                                        <th><FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icons} /></th>
                                        <th><FontAwesomeIcon icon={faBook} className={styles.icons} /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{data.user.name}</td>
                                        <td>{data.user.location}</td>
                                        <td>{data.book_status}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className={styles.description}>
                                {htmlParse(data.description)}
                            </div>                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}