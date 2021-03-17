import "./styles/NewsBubble.scss";

export default function NewsBubble(props) {
  return (
    <div className="news__item">
      <p className="news__item-title">{props.title}</p>
    </div>
  );
}
