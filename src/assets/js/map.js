import mapboxgl from 'mapbox-gl';


const map = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5keWJvbGFubyIsImEiOiJjandjNHhvdzkwNWFlNGFvdWVvMjYyajVhIn0.0Bb7Pjf8yJPO5icxbfglyQ'
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/andybolano/cl9g45ya6002e14pgsiyynuhc',
        center: [-74.297333, 4.570868],
        zoom: 5
    })

    map.scrollZoom.disable()

    map.on('load', () => {
        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 })

        map.addSource('dot-point', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-72.2872426, 0.2951363]
                        }
                    }, {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-77.2833573, 8.5101094]
                        }
                    }, {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-76.3933853, 3.8602729]
                        }
                    }, {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-65.7109377, 7.8899098]
                        }
                    }, {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-68.0469615, -16.2360191]
                        }
                    }
                ]
            }
        });
        map.addLayer({
            'id': 'location-marker',
            'type': 'symbol',
            'source': 'dot-point',
            'layout': {
                'icon-image': 'pulsing-dot'
            }
        })
    })

    // Center the map on the coordinates of any clicked circle from the 'circle' layer.
    map.on('click', 'location-marker', (e) => {
        map.flyTo({
            center: e.features[0].geometry.coordinates
        })
    })

    // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
    map.on('mouseenter', 'location-marker', () => {
        map.getCanvas().style.cursor = 'pointer'
    })

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'location-marker', () => {
        map.getCanvas().style.cursor = ''
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
            this.context = canvas.getContext('2d');
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
            map.triggerRepaint();

            // Return `true` to let the map know that the image was updated.
            return true;
        }
    }

}




export const initMap = () => {
    map()
}
