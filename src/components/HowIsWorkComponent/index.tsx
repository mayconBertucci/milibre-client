import styles from './styles.module.scss';
import Link from 'next/link'

export function HowIsWorkComponent() {

    return (
        <div className={styles.container}>
            <h2>¡Para intercambiar libros es muy fácil! </h2>
            <div>
                <img src="img/Bookshelves_re_lxoy.svg" alt="foto" />
                <p>Regístrese en nuestra página, agregue tu primer libro y gane 1 punto.</p>
            </div>
            <div>
                <p>Por cada libro que intercambies ganarás 1 punto, y así podrás obtener más libros.</p>
                <img src="img/travel_together_re_kjf2.svg" alt="foto" />
            </div>
            <div>
                <img src="img/Reading_book_re_kqpk.svg" alt="foto" />
                <p>Utiliza tus puntos para solicitar nuevos libros o acumule puntos para futuros intercambios.</p>
            </div>
        </div>
    );
}