import styles from './styles.module.scss';

import { UserContext } from '../../contexts/UserContext';
import { FormEvent, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { CardBookUser } from './../CardBookUser/index';
import Link from 'next/link';

export default function UserProfile() {
    const userContext = useContext(UserContext);
    const [showUpdatePhoto, setShowUpdatePhoto] = useState(false);
    const router = useRouter();

    const handleShowUpdatePhoto = () => {
        setShowUpdatePhoto(!showUpdatePhoto);
    }

    const onChange = async (e: FormEvent<HTMLInputElement>) => {
        const formData = new FormData();
        formData.append('file', e.currentTarget.files[0]);

        const response = await fetch(`http://localhost:3333/upload/${userContext.user.id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData
        });

        const parsedRes = await response.json();

        userContext.user.photo = parsedRes.photo;
        localStorage.setItem('user', JSON.stringify(userContext.user));
        router.push('/profile');
    } 
 
    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <section className={styles.aside}>
                    <div className={styles.user}>
                        <a className={styles.userPhoto} onClick={handleShowUpdatePhoto} onBlur={handleShowUpdatePhoto}>
                            <img src={userContext.user.photo !== null ? userContext.user.photo : "img/profile-avatar.svg"} alt="avatar" />
                            <form method="POST" className={showUpdatePhoto ? `${styles.updatePhoto} ${styles.on}` : styles.updatePhoto}>
                                <label htmlFor="file">Actualizar foto</label>
                                <input type="file" name="file" id="file" onChange={e => onChange(e)} />
                            </form>
                        </a>
                        <h3>{userContext.user.name}</h3>
                        <span className={styles.location}><FontAwesomeIcon icon={faMapMarkerAlt} /> {userContext.user.location}</span>
                    </div>
                </section>
                <div className={styles.sectionRight}>
                    <section className={styles.userData}>
                        <div className={styles.userPoints}>
                            <h2>Puntos</h2>
                            <span>{userContext.user.points}</span>
                        </div>
                        <div className={styles.userInformation}>
                            <div>
                                <FontAwesomeIcon icon={faUser} className={styles.icons} />
                                <h4>Autor preferido</h4>
                                {userContext.user.favorite_author}
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faBook} className={styles.icons} />
                                <h4>Libro preferido</h4>
                                {userContext.user.favorite_book}
                            </div>
                            <Link href='/new-book'>
                                <button className={styles.btnNewBook}>Agregar libro</button>
                            </Link>
                        </div>
                    </section>
                    <section className={styles.booksUser}>
                        <CardBookUser />
                    </section>
                </div>
            </div>
        </div>
    );
}