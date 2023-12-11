import spinner from "../../../assets/img/spinner.svg";

export default function Loader() {
  return (
    <div id="loading">
      <img id="loading-image" src={spinner} alt="Loading..." />
    </div>
  );
}
