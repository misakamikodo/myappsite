import styles from './Card.module.css'

export default function Card(props) {
  return (
    <>
      <h1>
          {props.title}
      </h1>
      <p>
          {props.children}
      </p>
    </>
  )
}
