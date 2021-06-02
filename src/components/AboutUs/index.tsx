import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import styles from './styles.module.scss';

export function AboutUs() {
    library.add(fab);

    return (
        <div className={styles.container}>
            <div>
                <div>
                    <img src="img/nayara.jpg" alt="Nayara" />
                    <div className={styles.userData}>
                        <h2>Nayara Nivea</h2>
                        <a href="https://www.linkedin.com/in/nayara-nivea-gomes"><FontAwesomeIcon icon={['fab', 'linkedin']} ></FontAwesomeIcon></a>
                    </div>
                </div>
                <div>
                    <img src="img/maycon.jpg" alt="Maycon" />
                    <div className={styles.userData}>
                        <h2>Maycon Bertucci</h2>
                        <a href="https://www.linkedin.com/in/maycon-bertucci/"><FontAwesomeIcon icon={['fab', 'linkedin']} /></a>
                    </div>
                </div>
            </div>
            <p>
                Mi Libre es un proyecto creado por dos estudiantes de Desarrollo Web que surge con el intuito de conectar usuarios para que puedan intercambiar libros que ya hayan leído. La idea es que los lectores puedan intercambiar libros, fomentar la lectura y libertad cultural.
            </p>
        </div>
    );
}