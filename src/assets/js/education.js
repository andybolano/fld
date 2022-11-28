import Swiper, { Autoplay, FreeMode } from 'swiper'

const initSlider = () => {
    new Swiper("#courses-slider", {
        modules : [Autoplay, FreeMode],
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
        lazy: true,
        loop: false,
        slidesPerView: 'auto',
        centeredSlides: false,
        freeMode: true,
        slideToClickedSlide: true 
    })
}

export const initEducation = () => {
    setTimeout(()=> {
        initSlider()
    },300)
}