import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import Swiper, { Pagination, Autoplay, EffectFade } from 'swiper'
gsap.registerPlugin(SplitText)
const __textBannerTimeLine = gsap.timeline()


const animateTextBanner = (titleElement, descriptionElement) => {
    const configuration = { type: 'lines' }
    const titleSplit = new SplitText(titleElement, configuration)
    __textBannerTimeLine.set([descriptionElement], { opacity : 0, y: 0 })
    __textBannerTimeLine
        .from(titleSplit.lines, { delay: 1, duration: 2,  ease: 'Power3.easeOut', opacity:0, rotationX:-10, force3D: false, transformOrigin:"top center -150", stagger: 0.5})
        .to(descriptionElement, { duration: 0.5, opacity : 1, y: -10, force3D: false })      
}

const banner = () => {
    const bannerTitles = document.getElementsByClassName('banner__title')
    const bannerDescriptions = document.getElementsByClassName('banner__description')
    const swiper = new Swiper("#banner-slider", {
        modules : [Pagination, Autoplay, EffectFade],
        lazy: true,
        loop: false,
        spaceBetween: 0,
        effect: 'fade',
        speed: 1000,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        on: {
            init: function(){
                addZoomEffect(0)
                animateTextBanner(bannerTitles[0], bannerDescriptions[0])
            }
        }    
    })

    swiper.on('slideChange', function (e) {
        addZoomEffect(e.activeIndex)
        animateTextBanner(bannerTitles[e.activeIndex], bannerDescriptions[e.activeIndex])
    })
}

const getElementById = (id) => {
    return document.getElementById(id)
}

const addZoomEffect = (indexElement) => {
    const elements = document.querySelectorAll('.banner__image')
    if (!elements.length) {
        return
    }
    setTimeout( ()=> {
        elements.forEach((element, index) => {
            if (index !== indexElement)
            element.classList.remove('banner__zoomIn')
        })
    }, 1000)
    const element = getElementById(`banner-image--${indexElement}`)
    element.classList.add('banner__zoomIn')
}

 export const initBanner = () => {
    banner()
 }
