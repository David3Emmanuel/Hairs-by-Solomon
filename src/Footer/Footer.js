import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
    return <footer>
        <div>
            <h1>LINKS</h1>
            <Link to="/">Home</Link>
            <Link to="/contact">About</Link>
            <Link to="/shop">All Products</Link>
        </div>
        <div id="contact">
            <h1>Follow Us</h1>
            <a href="https://web.facebook.com/profile.php?id=100090316114814"><img alt="facebook" src="/facebook.png" /> Facebook page</a>
            <a href="https://wa.me/+2347039669253"><img alt="whatsapp" src="/whatsapp.ico" /> +234 703 966 9253</a>
            <a href="https://www.instagram.com/sure19021992/"><img alt="instagram" src="/instagram.ico" /> Instagram page</a>
            <a href="mailto:hairsbysolomon@gmail.com"><img alt="gmail" src="/gmail.ico" /> hairsbysolomon@gmail.com</a>
        </div>
    </footer>
}