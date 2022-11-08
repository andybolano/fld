

import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Swiper, { Pagination, FreeMode } from 'swiper'
import { geoJson, flyToPoint } from './map'
const $ = require('jquery')

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
        modules : [Pagination, FreeMode],
        lazy: true,
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        freeMode: false,
        on: {
            click: function () {
                if(!this.clickedSlide) return
                const index = this.clickedSlide.getAttribute('id')
                flyToPoint(geoJson.features[index].geometry.coordinates)
                showMissionDescription(this.clickedSlide)
            }
        }
    })

    $('.swiper-wrapper').on('mouseenter', function(e){
        hiddenMissionDescription()
    })
}

const showMissionDescription = (element) => {
    const attrutesElement = element.getBoundingClientRect()
    $("#mission-description").css(
        {
            "width": attrutesElement.width+'px',
            "left": attrutesElement.left+'px',
        }
    )
    setTimeout(()=> {
        $("#mission-description").css(
            {
                "opacity": "1", 
                "height": "48vh"
            }
        )
    }, 300)
    
}

const hiddenMissionDescription = () => {
    $("#mission-description").css({"opacity": "0", 'height': 0})
}

export const sliderGoTo = (index) => {
    hiddenMissionDescription()
    __swiper.slideTo(index, 2000, false)
    setTimeout(()=> {
        showMissionDescription(document.getElementById(index))
    },2000)
   

}

export const initMissions = () => {
    initSliderMissions()
    initTrigger()
}
