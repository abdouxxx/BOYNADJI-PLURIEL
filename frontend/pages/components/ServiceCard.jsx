import { Link } from "react-router-dom";

function ServiceCard({ image, title, route }) {

  return (
    <div className="card p-3 text-center">

      <img
        src={image}
        alt={title}
        height="150"
      />

      <h4>{title}</h4>

      <Link
        className="btn btn-secondary"
        to={route}
      >
        Accéder
      </Link>

    </div>
  );
}

export default ServiceCard;