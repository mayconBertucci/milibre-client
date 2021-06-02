import { useRouter } from 'next/router';
import { FormEvent, useState, useContext, useEffect } from 'react';
import styles from './styles.module.scss';
import { UserContext } from './../../contexts/UserContext';
import axios, { AxiosResponse } from 'axios';
import { v4 as uuid } from 'uuid';

interface IPhoto {
    items: [{
        id: string
        volumeInfo: {
            title: string;
            imageLinks: {
                thumbnail: string;
            }
        }
    }]
}

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
    genre: string,
    photo: string,
    book_status: string,
    book_note: number, 
    user_id: IUser
}

export default function NewBookForm() {
    const [isValid, setIsvalid] = useState(true);
    const [searchGoogleModal, setSearchGoogleModal] = useState(false);
    const userContext = useContext(UserContext);
    const router = useRouter();

    const [data, setData] = useState<IBook>({
        id: '',
        titol: '',
        author: '',
        isbn: '',
        genre: '',
        photo: '',
        book_status: '',
        book_note: 0, 
        user_id: {
            id: '',
            name: '',
            email: '',
            location: '',
            favorite_book: '',
            favorite_author: '',
            birthday: new Date(),
        }
    });
    const [dataGoogle, setDataGoogle] = useState<IPhoto>({
        items: [{
            id: '',
            volumeInfo: {
                title: '',
                imageLinks: {
                    thumbnail: '',
                }
            }
        }]
    });

    useEffect(() => {
        setData({...data, user_id: userContext.user});
    },[]);

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    const onSearchGoogle = async(e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.currentTarget.value.length > 0) {
            setSearchGoogleModal(true);
            const response: AxiosResponse = await axios({ method: 'get', url: `https://www.googleapis.com/books/v1/volumes?q=${e.currentTarget.value}` });
            setDataGoogle(response.data);
        } else {
            setSearchGoogleModal(false);
        }
    };

    const onChangeSelect = (e: FormEvent<HTMLSelectElement>) => {
        e.preventDefault();

        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    const onChangeFile = async (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', e.currentTarget.files[0]);

        const responseBook = await fetch(`${process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' ? 'http://' : 'https://'}${process.env.NEXT_PUBLIC_BASE_URL}/upload/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData
        });
        const parsedResBook = await responseBook.json();
        setData({...data, photo: parsedResBook});
    } 

    const onSubmit = async (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' ? 'http://' : 'https://'}${process.env.NEXT_PUBLIC_BASE_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data)
        });
        const parsedRes = await response.json();

        const responseUser = await fetch(`${process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' ? 'http://' : 'https://'}${process.env.NEXT_PUBLIC_BASE_URL}/user-num-books/${userContext.user.id}`, {
            method: 'PATCH',
        });
        const parsedResUser = await responseUser.json();
        userContext.signIn(parsedResUser)
        localStorage.setItem('user', JSON.stringify(parsedResUser));

        if(parsedResUser.num_books === 1) {
            const responseUser = await fetch(`${process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' ? 'http://' : 'https://'}${process.env.NEXT_PUBLIC_BASE_URL}/user-points/${userContext.user.id}`, {
                method: 'PATCH',
            });
            const parsedResNumBooks = await responseUser.json();
            userContext.signIn(parsedResNumBooks)
            localStorage.setItem('user', JSON.stringify(parsedResNumBooks));
        }

        if(parsedRes) {
            router.push('/profile');
        }
    } 

    const handleReturn = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        router.push('/profile');
    }
 
    return(
        <div className={styles.container}>
            <form method="POST" className={styles.wrapper}>
                <input 
                    type="text"
                    name="titol" 
                    required 
                    placeholder="Nombre" 
                    className={!isValid ? `${styles.required}` : ''} 
                    onChange={(e) => {onChange(e), onSearchGoogle(e)}} 
                    value={data !== undefined ? data.titol : ''}
                />
                <div className={searchGoogleModal ? `${styles.searchGoogle}  ${styles.on}` : styles.searchGoogle }>
                    <ul>
                        {dataGoogle.items.map((element) => {
                            return (
                                <li key={uuid()} onClick={
                                    () => {
                                        setData({...data, titol: element.volumeInfo.title, id: element.id});
                                        setSearchGoogleModal(false);
                                    }}>
                                    {element.volumeInfo.title}
                                    {element.volumeInfo.imageLinks !== undefined && <img src={element.volumeInfo.imageLinks.thumbnail} />}
                                </li>
                            );
                        })}
                     </ul>
                </div>
        
                <div className={styles.sectionFooter}>
                    <label htmlFor="photo">Agregue una foto
                        <input className={styles.photo} type="file" name="file" onChange={onChangeFile} />
                    </label>
                    <label htmlFor="book_state" className={styles.bookStateLabel}>
                        <select name="status" onChange={onChangeSelect}>
                            <option value="Nuevo">Nuevo</option>
                            <option value="Buen estado">Buen estado</option>
                            <option value="Con imperfecciones">Con imperfecciones</option>
                        </select>
                    </label>
                </div>

                <span className={!isValid ? `${styles.message} ${styles.required}` : styles.message }>Campos Obligatorios *</span>

                <div className={styles.buttonsActions}>
                    <input type="button" className={styles.cancelar} onClick={handleReturn} value="Volver" />
                    <input type="button" className={styles.enviar} onClick={onSubmit} value="Enviar"/>
                </div>
            </form>
        </div>
    );
}