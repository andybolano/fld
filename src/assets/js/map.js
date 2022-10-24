import mapboxgl from 'mapbox-gl';

const map = () =>
 {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5keWJvbGFubyIsImEiOiJjandjNHhvdzkwNWFlNGFvdWVvMjYyajVhIn0.0Bb7Pjf8yJPO5icxbfglyQ'
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/andybolano/cl9g45ya6002e14pgsiyynuhc',
        center: [-74.297333, 4.570868],
        zoom: 5
    });

    map.scrollZoom.disable()
 }


export const initMap = () => {
    map()
 }
