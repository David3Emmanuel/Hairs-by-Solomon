import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../utils/globalStates";

import Product from "../Shop/Product";
import Slideshow from "./Slideshow";
import Testimonial from "./Testimonial";
import ContactPage from "../Contact/ContactPage";
import SearchInput from "../Header/SearchInput";

import "./HomePage.css";

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
    const { products } = useContext(GlobalContext);

    return <div className="home">
        <div className="hero">
            <section className="section1">
                <img src="/logo-colored2.png" alt="logo" width="100%" />
                {/* <h1>The best place to buy top quality hair extensions and wigs</h1> */}
                <h1>Quality hair extensions and wigs</h1>
                <p>Shop by hair type, brand, or special offers!</p>
                <div className="hero-search-container">
                    <SearchInput />
                    <button>SEARCH</button>
                </div>
            </section>
            <section className="section2">
                {products && <div className="latest" id="latest">
                    <div className="latest-title-row">
                        <h2>LATEST</h2>
                        <Link to="/shop" className="see-all-cta">See all &gt;</Link>
                    </div>
                    <div className="products">
                        {products && products.map((product, i) => <Product {...product} key={i} />)}
                    </div>
                </div>}
            </section>
        </div>
        <div className="testimonials-container">
            <h2>What our customers have to say</h2>
            <Slideshow className="testimonials">
                {TESTIMONIALS.map((testimonial, i) => <Testimonial {...testimonial} key={i} />)}
            </Slideshow>
        </div>
        <ContactPage />
    </div>
}