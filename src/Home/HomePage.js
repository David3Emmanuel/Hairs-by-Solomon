import { Link } from "react-router-dom";
import "./HomePage.css";
import Product from "./Product";
import Slideshow from "./Slideshow";
import Testimonial from "./Testimonial";

const PRODUCTS = [
    "Peruvian Kinky Curly Hair",
    "Body Wave Hair",
    "Long Straight Black Hair"
]

const TESTIMONIALS = [
    {
        name: "Chinwe N.", location: "Lagos",
        comment: "I've struggled with frizzy hair for years, but thanks to these products, my hair has never looked better! I'm thrilled with the results."
    },
    {
        name: "Emeka O.", location: "Abuja",
        comment: "I can't believe how soft and manageable my hair has become since using these products. It's a game-changer for my daily routine."
    },
    {
        name: "Bisi A.", location: "Port Harcourt",
        comment: "I've tried many hair care brands, but this one stands out. My hair is now healthier and shinier than ever before. Highly recommended!"
    },
    {
        name: "Ifeoma E.", location: "Enugu",
        comment: "As someone with sensitive skin, I appreciate that these products are gentle and effective. My scalp feels refreshed, and my hair is thriving."
    },
    {
        name: "Femi K.", location: "Kano",
        comment: "I'm a loyal customer because these products do wonders for my natural hair. The natural ingredients are a big plus. Thank you for making my hair journey easier!"
    }
]

export default function HomePage() {
    return <div className="home">
        <div className="flex-container">
            <section>
                <h1 className="motto"><span>BEAUTY</span> <span>FIRST</span></h1>
                <Link to="/shop" className="cta">
                    <div className="image-container">
                        <h3>LUXURY YOU CAN TRUST</h3>
                        <p className="browse-cta">Browse our products</p>
                    </div>
                </Link>
            </section>
            {/* <a className="down-arrow" href="#latest"><span className="material-icons">arrow_downward</span></a> */}
            <div className="latest" id="latest">
                <h2>LATEST</h2>
                <div className="products">
                    {PRODUCTS.map((product, i) => <Product name={product} key={i} />)}
                </div>
            </div>
        </div>
        <div className="testimonials-container">
            <h2>What our customers have to say</h2>
            <Slideshow className="testimonials">
                {TESTIMONIALS.map((testimonial, i) => <Testimonial {...testimonial} key={i} />)}
            </Slideshow>
        </div>
    </div>
}