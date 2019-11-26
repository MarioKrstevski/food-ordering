import React from 'react'
import styles from './Places.module.css'

function Place({ name, link, _id, makeSelection }) {
    return (
        <div className={styles.Place}>
            <div className={styles.information}>
                <h2 className={styles.heading}>{name}</h2>
                <p>
                    <a target="_blank" rel="noopener noreferrer" className={styles.link} href={link}>
                        Menu link
                    </a>
                </p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => makeSelection(_id)}> Sellect </button>
            </div>
        </div>
    )
}
const Places = ({makeSelection, places}) => {
    const placesList = places.map(place => (
        <Place
            name={place.name}
            link={place.link}
            key={place._id}
            makeSelection={makeSelection}
            _id={place._id}
        />
    ))
    return (
        <div id="places">
            <p className={styles.title}> Izbor na mesto </p>
            <div className={styles.list}>{placesList}</div>
        </div>
    )
}

export default Places
