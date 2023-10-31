import "./SearchInput.css";

export default function SearchInput() {
    return <div className="search-input">
        <form action="shop">
            <input name="search" placeholder="Search for a product..." className="search" />
            <button className="material-icons">search</button>
        </form>
    </div>
}