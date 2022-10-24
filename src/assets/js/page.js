
import gsap from 'gsap'
import ScrollSmoother from 'gsap/ScrollSmoother'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import { initBanner } from './banner'
import { initMissions } from './missions'
import { initMap } from './map'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin)

const initAnimationScroll = () => {
    ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1
    })
}

const animateNavbar = () => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-7.7rem";
        }
        prevScrollpos = currentScrollPos;
    }
}


 initBanner()
 initAnimationScroll()
 animateNavbar()
 initMissions()
 initMap()

