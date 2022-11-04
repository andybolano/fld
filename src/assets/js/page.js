
import gsap from 'gsap'
import ScrollSmoother from 'gsap/ScrollSmoother'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import { initBanner } from './banner'
import { initMissions } from './missions'
import { initMap } from './map'
const $ = require('jquery')

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin)

const initAnimationScroll = () => {
    console.log(1)
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

const marquee = () => {
    $(".marquee").each(function () {
        let rate = 50
        let m = $(this)
        if (m.hasClass("run")) return
        let el = m.find("span")
        let minEls = 2
        let ct = el.parent()
        let distance = el.outerWidth(true)
        let time = distance / rate;
        m.addClass("run")
        if (ct.outerWidth() <= window.innerWidth) {
            let eqByWidth = Math.ceil(window.innerWidth / distance)
            while (eqByWidth + minEls > 0) {
                eqByWidth--
                el.clone().appendTo(ct)
            }
        } else {
            while (minEls > 0) {
                minEls--
                el.clone().appendTo(ct)
            }
        }
        gsap.to(ct, time, {
            repeat: -1,
            x: "-" + distance,
            ease: 'linear'
        })
    })
}


 initBanner()
 initAnimationScroll()
 animateNavbar()
 initMissions()
 marquee()
 initMap()

