

import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, SplitText)


const __container = document.querySelector("#smooth-content")
let __linkPositions = []

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
    ScrollTrigger.create({
        markers: false,
        trigger: '#missions',
        start:"20px 40%",
        end:"100% 80%",
        onEnter: onEnterOnMission,
        onLeave: onLeaveOnMission,
        onEnterBack: onEnterBackOnMission,
        onLeaveBack: onLeaveBackOnMission,
    })
}

const onEnterOnMission = () => {
    goTo(__linkPositions[0])
    animateTitle()
}

const onLeaveOnMission = () => {
    console.log('onLeaveOnMission')
}

const onEnterBackOnMission = () => {
    goTo(__linkPositions[0])
}

const onLeaveBackOnMission = () => {
    console.log('onLeaveBackOnMission')
}


const hiddeNavbar = () => {
    setTimeout(() => {
        document.getElementById("navbar").style.top = "-7.7rem";
    }, 1000);
}

const animateTitle = () => {
    const overlayElement = document.querySelector('.missions__overlay')
    const __titleTimeLine = gsap.timeline()
    __titleTimeLine
    .to(overlayElement, { delay:2, left: '-100%', opacity:'0.5', ease: 'Power3.easeOut', duration: 3})
}


export const initMissions = () => {
    initTrigger()
}
