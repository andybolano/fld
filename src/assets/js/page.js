
import gsap from 'gsap'
import ScrollSmoother from 'gsap/ScrollSmoother'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import { initBanner } from './banner'
import { initMissions } from './missions'
import { initMap } from './map'
const $ = require('jquery')

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin)
const __container = document.querySelector("#smooth-content")


const initAnimationScroll = () => {
    ScrollSmoother.create({
        smooth: 1.5,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
        smoothTouch: 0.1,
    })
}

const setupLinks = (scroller) => {
    let __linkPositions = []
    const linkElements = gsap.utils.toArray('.menu .anchor')
    const linkTargets = linkElements.map((e) => document.querySelector(e.getAttribute("href")))
    const calculatePositions = () => {
        const offset = gsap.getProperty(scroller, "y")
        linkTargets.forEach((e, i) => __linkPositions[i] = e.getBoundingClientRect().top - offset + 1)
    }
    
    linkElements.forEach((element, i) => {
      element.addEventListener("click", e => {
        e.preventDefault();
        goTo(__linkPositions[i])
      })
    }) 
    ScrollTrigger.addEventListener("refresh", calculatePositions)
}


export const goTo = (linkPosition) => {
    gsap.to(window, {scrollTo: linkPosition, ease: "power4", overwrite: true})
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
 marquee()
 initMap()
 setupLinks(__container) 
 initMissions()
