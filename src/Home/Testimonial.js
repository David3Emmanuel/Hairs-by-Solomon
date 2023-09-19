import "./Testimonial.css";

export default function Testimonial({name, location, comment}) {
    return <div className="testimonial">
        <p>"{comment}"</p>
        <em className="customer-name">- <span style={{color: "hsl(173, 72%, 45%)"}}>{name}</span> from {location}</em>
    </div>
}