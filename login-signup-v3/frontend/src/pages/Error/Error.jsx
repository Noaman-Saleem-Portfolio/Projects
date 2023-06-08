import "./Error.css";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="errorWrapper">
      <div className="errorHeader">Error 404 - Page not found</div>
      <div className="errorBody">
        Go back to
        <Link to="/" className="homeLink">
          home
        </Link>
      </div>
    </div>
  );
}

export default Error;
