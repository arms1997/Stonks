import "./styles/DataBubble.scss";

export default function DataBubble(props) {
  const hintDataClass = props.timestamp ? "data__timestamp" : "data__item";

  return (
    <div className={hintDataClass}>
      <p className={`${hintDataClass}-text`}>
        {props.ticker ? props.ticker : null} {props.value}
      </p>
    </div>
  );
}
