import "./Product.css";

export default function Product({ name }) {
    return <div className="product">
        <div className="product-image">
            <img src={`/products/${name}.jpg`} alt={name} />
        </div>
        <div className="title-box">
            <p>{name}</p>
        </div>
    </div>
}