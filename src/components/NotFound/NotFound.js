import { Link } from "react-router-dom";
import Button from "../Button";
import "./NotFound.scss";

function NotFound() {
    return (
        <section className="not-found">
            <h1 className="not-found__title">404 Not Found</h1>
            <p className="not-found__description">Oops...we can't seem to find the page you're looking for.</p>
            <Button as={Link} to="/" buttonText={"Go To Homepage"}></Button>
        </section>
    );
}

export default NotFound;