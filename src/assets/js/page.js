
import gsap from 'gsap'
import ScrollSmoother from 'gsap/ScrollSmoother'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import { initBanner } from './banner'
import { initMissions } from './missions'
import { initMap } from './map'
import { Router, Routes } from '../lib/router'
import { initAbout } from './about'
import { initEducation } from './education'
const $ = require('jquery')


const home = () => {
    initBanner()
    marquee()
    initMap()
    initMissions()
}

const about = () => {
    initAbout()
}

const education = () => {
    initEducation()
}

const initRouter = () => {
    const routeConfig = [
        new Routes({
            path: 'home',
            url: './views/home.html'
        }, true),
        new Routes({
            path: 'about',
            url: './views/about.html'
        }),
        new Routes({
            path: 'education',
            url: './views/education.html'
        }),
        new Routes({
            path: 'education/course',
            url: './views/course.html'
        })
    ]
  
    
    new Router(routeConfig, 'app', 
        (hash) => {

            $('.anchor').removeClass('active')
            if (hash === 'home') {
                setTimeout(()=> {
                    home()
                },500)
            }
            if (hash === 'about') {
                $('#about').addClass('active')
                about()
            }
            if (hash.split('/')[0] === 'education' ) {
                $('#education').addClass('active')
                education()
             
            }
        }
    )
}

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
        e.preventDefault()
        goTo(__linkPositions[i])
      })
    }) 
    ScrollTrigger.addEventListener("refresh", calculatePositions)
}

export const goTo = (linkPosition) => {
    gsap.to(window, {scrollTo: linkPosition, ease: "power4", overwrite: true})
}

const animateNavbar = () => {
    let prevScrollpos = window.pageYOffset
    const top = 300
    window.onscroll = function() {
        let nav = document.getElementById('navbar')
        const currentScrollPos = window.pageYOffset
        prevScrollpos > currentScrollPos ?  nav.style.top = "0" : nav.style.top = "-7.7rem"
        currentScrollPos >= top ? nav.classList.add('nav-with-color') : nav.classList.remove('nav-with-color');
        prevScrollpos = currentScrollPos
    }
}

const marquee = () => {
    $(".marquee").each(function () {
        const rate = 50
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

$('.logo__ico-burger').on('click', () => {
    $('#menu-mobile').toggleClass('menu-mobile--open')
})

$('body').on('click', (event) => {
    if(!$(event.target).is('.logo__ico-burger') && !$(event.target).is('#menu-mobile')){
      $("#menu-mobile").removeClass("menu-mobile--open");
    }
 })
    
initRouter()
animateNavbar()
initAnimationScroll()

