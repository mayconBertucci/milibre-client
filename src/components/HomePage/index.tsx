
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { FormEvent, useContext } from 'react';

import styles from './styles.module.scss';
import { SearchDataContext } from '../../contexts/SearchContext';

export function HomePage() {
    const router = useRouter();
    const searchDataContext = useContext(SearchDataContext);

    const onChange = async (e: FormEvent<HTMLInputElement>) => {
        searchDataContext.setSearch(e.currentTarget.value)
        router.push('/books');
    }

    return (
        <div className={styles.containerHome}>
            <div className={styles.searchHome}>
                <section className={styles.searchBook}>
                    <h2>Encuentra tu libro</h2>
                    <form action="#">
                        <input type="search" name="" id="" placeholder="Buscar..." onChange={onChange} />
                        <button className={styles.btnSearch} type="submit"><FontAwesomeIcon icon={faSearch}  /></button>
                    </form>
                </section>
            </div>
            
            <section className={styles.sectionIllustration}>
                <img className={styles.illustration} src="img/book_lover_mkck.svg" alt="Book Lover" />
            </section>
        </div>
    );
}
