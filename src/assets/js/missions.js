

import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Swiper, { Pagination, FreeMode, Autoplay } from 'swiper'
import { geoJson, flyToPoint } from './map'
gsap.registerPlugin(ScrollTrigger, SplitText)

const __container = document.querySelector("#smooth-content")
let __linkPositions = []
let __swiper = undefined

const setupLinks = (scroller) => {
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
    ScrollTrigger.addEventListener("refresh", calculatePositions);
}

const goTo = (linkPosition) => {
    gsap.to(window, {scrollTo: linkPosition, ease: "power4", overwrite: true})
}

const initTrigger = () => {
    setupLinks(__container)

    gsap.to(".missions__overlay", {
        scrollTrigger: {
            start:"20px 40%",
            end:"100% 50%",
            markers: false,
            trigger: ".missions__overlay",
            onEnter: onEnterOnMission,
            onEnterBack: onEnterBackOnMission
        },
        delay: 3, 
        left: '-80%', 
        opacity:'0.5', 
        ease: 'Power3.easeOut', 
        duration: 3,
        onComplete() {
            
        }
    })
}

const onEnterOnMission = () => {
    goTo(__linkPositions[0])
}

const onEnterBackOnMission = () => {
    goTo(__linkPositions[0])
}

const initSliderMissions = () => {
    __swiper = new Swiper("#mission-slider", {
        modules : [Pagination, FreeMode, Autoplay],
        lazy: true,
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        freeMode: false,
        on: {
            click: function () {
                if(!this.clickedSlide) return
                const index = this.clickedSlide.getAttribute('data-index')
                flyToPoint(geoJson.features[index].geometry.coordinates)
            }
        }
    })
}


export const sliderGoTo = (index) => {
    __swiper.slideTo(index, 2000, false)
}

export const initMissions = () => {
    initSliderMissions()
    initTrigger()
}
