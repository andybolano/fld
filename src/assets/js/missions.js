

import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Swiper, { Pagination, FreeMode } from 'swiper'
import { geoJson, flyToPoint } from './map'
import { goTo } from './page'
const $ = require('jquery')

gsap.registerPlugin(ScrollTrigger, SplitText)

let __swiper = undefined
let __linkMission = undefined

const initTrigger = () => {
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
    goTo(__linkMission)
}

const onEnterBackOnMission = () => {
    goTo(__linkMission)
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
    __swiper.slideTo(index, 1000, false)
    setTimeout(()=> {
        showMissionDescription(document.getElementById(index))
    },1000)

}

export const initMissions = (linkMission) => {
    __linkMission = linkMission
    initSliderMissions()
    initTrigger()
}
