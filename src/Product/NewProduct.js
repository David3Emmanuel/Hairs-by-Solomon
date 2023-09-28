import "./NewProduct.css";
import useNewProduct from "./useNewProduct";

export default function NewProduct() {
    const { product, dispatch, submit, handleImage, imageUrl } = useNewProduct();

    return <div className="new-product">
        <h1>New Product</h1>
        <form onSubmit={submit}>
            <ProductInput name="name" label="Product name..." value={product.name} dispatch={dispatch} />
            <ProductInput name="price" label="Enter price in naira" value={product.price} dispatch={dispatch} />
            <input name="image" type="file" onChange={handleImage} />
            {imageUrl && <img src={imageUrl} alt="product" />}
            <p>Product description</p>
            <textarea
                name="description" label="Enter product description...." rows={5}
                value={product.description} onInput={e => dispatch({ type: "DESCRIPTION", value: e.target.value })}
            />
            <button type="submit">SUBMIT</button>
        </form>
    </div>
}

function ProductInput({ name, label, value, dispatch, ...attr }) {
    return <div className="product-input">
        <p>{label}</p>
        <input className="mobile"
            type="text" name={name} value={value}
            placeholder={label}
            onInput={e => dispatch({ type: name.toUpperCase(), value: e.target.value })}
            {...attr}
        />
        <input className="desktop"
            type="text" name={name} value={value}
            onInput={e => dispatch({ type: name.toUpperCase(), value: e.target.value })}
            {...attr}
        />
    </div>
}