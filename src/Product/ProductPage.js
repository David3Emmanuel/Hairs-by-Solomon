import {useParams} from "react-router-dom";
import "./ProductPage.css";

export default function ProductPage() {
    let product = useParams().product;
    product = product.replaceAll('-', ' ');

    return <div className="product-page">
        <h1>{product}</h1>
    </div>
}