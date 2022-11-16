import mapboxgl from 'mapbox-gl';
import { sliderGoTo } from './missions'
let __map = undefined

export const geoJson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [-72.2872426, 0.2951363]
            },
            'properties': {
                'id':'0',
                'title': 'Amazonas',
            }
        }, {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.2833573, 8.5101094]
            },'properties': {
                'id':'1',
                'title': 'Guambia',
            }
        }, {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [-76.3933853, 3.8602729]
            },'properties': {
                'id':'2',
                'title': 'Acandí',
            }
        }, {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [-65.7109377, 7.8899098]
            },'properties': {
                'id':'3',
                'title': 'Yotoco',
            }
        }, {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [-68.0469615, -16.2360191]
            },'properties': {
                'id':'4',
                'title': 'Bolivia',
            }
        }
    ]
}
const map = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5keWJvbGFubyIsImEiOiJjandjNHhvdzkwNWFlNGFvdWVvMjYyajVhIn0.0Bb7Pjf8yJPO5icxbfglyQ'
    __map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/andybolano/cl9g45ya6002e14pgsiyynuhc',
        center: [-74.297333, 4.570868],
        zoom: 5
    })

    __map.scrollZoom.disable()

    __map.on('load', () => {
        __map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 })
        __map.addImage('pulsing-dot-active', pulsingDotActive, { pixelRatio: 2 })
        __map.addSource('dot-point', {

            'type': 'geojson',
            'data': geoJson
        })

        __map.addLayer({
            'id': 'location-marker',
            'type': 'symbol',
            'source': 'dot-point',
            'layout': {
                'icon-image': 'pulsing-dot'
            }
        })
    })

    // Center the map on the coordinates of any clicked circle from the 'circle' layer.
    __map.on('click', 'location-marker', (e) => {
        flyToPoint(e.features[0].geometry.coordinates)
        sliderGoTo(e.features[0].properties.id)
    })

    // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
    __map.on('mouseenter', 'location-marker', () => {
        __map.getCanvas().style.cursor = 'pointer'
    })

    // Change it back to a pointer when it leaves.
    __map.on('mouseleave', 'location-marker', () => {
        __map.getCanvas().style.cursor = ''
    })

    __map.on('style.load', () => {
        __map.setFog({
            color: 'transparent',
            'high-color': 'transparent',
            'horizon-blend': 0
        })
    })

    const size = 200

    // This implements `StyleImageInterface`
    // to draw a pulsing dot icon on the map.
    const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // When the layer is added to the map,
        // get the rendering context for the map canvas.
        onAdd: function () {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d', { willReadFrequently: true });
        },

        // Call once before every frame where the icon will be used.
        render: function () {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;

            const radius = (size / 2) * 0.3;
            const outerRadius = (size / 2) * 0.7 * t + radius;
            const context = this.context;

            // Draw the outer circle.
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2
            );
            context.fillStyle = `rgba(255, 255, 255, ${1 - t})`;
            context.fill();

            // Draw the inner circle.
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(69, 180, 103, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            // Update this image's data with data from the canvas.
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height
            ).data;

            // Continuously repaint the map, resulting
            // in the smooth animation of the dot.
            __map.triggerRepaint();

            // Return `true` to let the map know that the image was updated.
            return true;
        }
    }

    const pulsingDotActive = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // When the layer is added to the map,
        // get the rendering context for the map canvas.
        onAdd: function () {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d', { willReadFrequently: true });
        },

        // Call once before every frame where the icon will be used.
        render: function () {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;

            const radius = (size / 2) * 0.3;
            const outerRadius = (size / 2) * 0.7 * t + radius;
            const context = this.context;

            // Draw the outer circle.
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2
            );
            context.fillStyle = `rgba(255, 255, 255, ${1 - t})`;
            context.fill();

            // Draw the inner circle.
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'yellow';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            // Update this image's data with data from the canvas.
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height
            ).data;

            // Continuously repaint the map, resulting
            // in the smooth animation of the dot.
            __map.triggerRepaint();

            // Return `true` to let the map know that the image was updated.
            return true;
        }
    }
}


export const flyToPoint = (coordinates) => {
    try {
        __map.flyTo({
            center: coordinates
        })
    } catch (e) {
        console.log(console.error(e))
    }
}

export const initMap = () => {
    map()
}
