import { useState, useEffect } from "react";
import "./Slideshow.css";

const SLIDE_DELAY = 10; //Number of seconds

export default function Slideshow({ className, children }) {
    const [activeCard, setActiveCard] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCard(prev => (prev + 1) % children.length)
        }, SLIDE_DELAY * 1000)
        return () => clearInterval(interval)
    }, [activeCard, children])

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    function prev() {
        setActiveCard(prev => (prev+children.length-1)%children.length)
    }
    function next() {
        setActiveCard(prev => (prev+1)%children.length)
    }

    function onTouchStart(e) {
        setTouchStart(e.targetTouches[0].clientX);
        setTouchEnd(null);
    }

    function onTouchMove(e) {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    function onTouchEnd() {
        if (touchStart && touchEnd) {
            const distance = touchEnd - touchStart;
            const MIN_DISTANCE = 50;
            if (distance < -MIN_DISTANCE) {
                next();
            } else if (distance > MIN_DISTANCE) {
                prev();
            }
        }
    }

    let formattedClass = "slideshow"
    if (className) formattedClass += " " + className
    return <div className={formattedClass} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div className="counter center">
            {children.map((child, i) => {
                return <Circle key={i} index={i} isActive={activeCard === i} setActive={setActiveCard} />
            })}
        </div>
        <div className="slide-container">
            <button className="navigate-button previous material-icons" onClick={prev}>navigate_before</button>
            {children.map((child, i) => {
                let positionClass;
                if (activeCard === i) {
                    positionClass = "current"
                } else if ((i + 1) % children.length === activeCard) {
                    positionClass = "before"
                } else if ((i + children.length - 1) % children.length === activeCard) {
                    positionClass = "after"
                } else {
                    positionClass = "unknown"
                }
                return <div key={i} className={`slide ${positionClass}`}>{child}</div>
            })}
            <button className="navigate-button next material-icons" onClick={next}>navigate_next</button>
        </div>
    </div>
}

function Circle({ index, isActive, setActive }) {
    let formattedClass = "circle " + (isActive ? "active" : "inactive")
    function handleClick() {
        setActive(index)
    }
    return <span className={formattedClass} onClick={handleClick}></span>
}