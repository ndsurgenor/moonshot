import React from 'react'
import styles from '../styles/Avatar.module.css'

const Avatar = ({ src, height = 44, text }) => {
    return (
        <img
            className={styles.Avatar}
            src={src}
            height={height}
            width={height}
            alt="avatar"
        />
    )
}

export default Avatar