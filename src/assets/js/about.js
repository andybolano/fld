

import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
const $ = require('jquery')

gsap.registerPlugin(ScrollTrigger, SplitText)

const initTrigger = () => {
    gsap.to(".about-page__overlay", {
        scrollTrigger: {
            start:"20px 40%",
            end:"100% 50%",
            markers: false,
            trigger: ".about-page__overlay"
        },
        delay: 10, 
        left: '-100%', 
        opacity:'0.5', 
        ease: 'Power3.easeOut', 
        duration: 5,
        onComplete() {
            
        }
    })
}

export const initAbout = () => {
    setTimeout(()=> {
        initTrigger()
    },300)
  
}