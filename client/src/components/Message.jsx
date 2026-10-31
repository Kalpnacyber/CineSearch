import styles from "./Message.module.css";

function Message({ icon = "🎬", title, text, children }) {
  return (
    <div className={styles.message}>
      <span className={styles.icon}>{icon}</span>
      {title && <h3>{title}</h3>}
      {text && <p>{text}</p>}
      {children}
    </div>
  );
}

export default Message;
