import { Link } from "react-router-dom";
import "./Product.css";

export default function Product({ name }) {
    let formattedName = name.replaceAll(' ', '-');

    return <Link className="product" to={`/product/${formattedName}`}>
        <div className="product-image">
            <img src={`/products/${name}.jpg`} alt={name} />
        </div>
        <div className="title-box">
            <p>{name}</p>
        </div>
    </Link>
}