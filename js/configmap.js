(function() {
    var mapSize = 75;
    var degSize = 0.5859375 / mapSize; // 19200 / 32768
    var origin = L.latLng([0, -6]);

    //echelle de la map custom
    L.CRS.custom = L.Util.extend({}, L.CRS, {
        latLngToPoint: function(latlng, zoom) {
            var adjustedLatlng = L.latLng([latlng.lat - origin.lat, latlng.lng - origin.lng]);

            var point = this.projection.project(adjustedLatlng),
                scale = this.scale(zoom);

            point = this.transformation._transform(point, scale);
            return point;
        },
        pointToLatLng: function(point, zoom) {
            var scale = this.scale(zoom);
            var untransformedPoint = this.transformation.untransform(point, scale);

            var latlng = this.projection.unproject(untransformedPoint);
            latlng.lat += origin.lat;
            latlng.lng += origin.lng;
            return latlng;
        },
        projection: L.Projection.LonLat,
        transformation: new L.Transformation(degSize, 0, degSize, 0)
    });
})();

function init() {
    var mapMinZoom = 2;
    var mapMaxZoom = 5;
    var map = L.map('map', {                                                //creation de la map
      maxZoom: mapMaxZoom,
      minZoom: mapMinZoom,
      crs: L.CRS.custom                                                //Scalede la map custom
    }).setView([0, 0], mapMaxZoom);

    var mapBounds = new L.LatLngBounds(                                     //vue
        map.unproject([0, 4096], mapMaxZoom),
        map.unproject([4864, 0], mapMaxZoom));

    map.fitBounds(mapBounds);
    var base = L.tileLayer('../PhpProject1/map/base/{z}/{x}/{y}.png', {                    //layer map de base
      minZoom: mapMinZoom, maxZoom: mapMaxZoom,
      bounds: mapBounds,
      attribution: 'Rendered with <a href="http://www.maptiler.com/">MapTiler</a>',
      noWrap: true          
    }).addTo(map);

    var bleu = L.tileLayer('../PhpProject1/map/bleu/{z}/{x}/{y}.png', {                    //layer point bleu
      minZoom: mapMinZoom, maxZoom: mapMaxZoom,
      bounds: mapBounds,
      attribution: 'Rendered with <a href="http://www.maptiler.com/">MapTiler</a>',
      noWrap: true          
    }).addTo(map);

    var rouge = L.tileLayer('../PhpProject1/map/rouge/{z}/{x}/{y}.png', {                  //layer point rouge
      minZoom: mapMinZoom, maxZoom: mapMaxZoom,
      bounds: mapBounds,
      attribution: 'Rendered with <a href="http://www.maptiler.com/">MapTiler</a>',
      noWrap: true          
    }).addTo(map);

    L.marker([40, 40]).addTo(map);                                          //marker
    L.marker([50, 40]).addTo(map);                                          //marker
    L.control.mousePosition().addTo(map);                                   //affichage des coordonnée de la sourie
    var hash = new L.Hash(map);                                             //coordonnée dans l'url
    var polygon = L.polygon([                                               //polygon bleu
        [22, 30],
        [28, 40],
        [35, 20]
    ]).addTo(map);

    var polygon = L.polygon([                                               //polygon bleu
        [32, 40],
        [38, 50],
        [45, 30]
    ]).addTo(map);

    var baseMaps = {                                                        //layer de la map
        'base' : base
    };

    var overlayMaps = {                                                     //layer icon 
        'bleu': bleu,
        'rouge': rouge
    };
    
    L.control.layers(baseMaps, overlayMaps).addTo(map);


    /******* Leaflet draw ****************************************************************/


    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    var drawControl = new L.Control.Draw({
            draw: {
                    position: 'topleft',
                    polygon: {
                            title: 'Draw a sexy polygon!',
                            allowIntersection: false,
                            drawError: {
                                    color: '#b00b00',
                                    timeout: 1000
                            },
                            shapeOptions: {
                                    color: '#bada55'
                            },
                            showArea: true
                    },
                    polyline: {
                            metric: false
                    },
                    circle: {
                            shapeOptions: {
                                    color: '#662d91'
                            }
                    }
            },
            edit: {
                    featureGroup: drawnItems
            }
    });
    map.addControl(drawControl);

    map.on('draw:created', function (e) {

        var type = e.layerType,
            layer = e.layer;

        drawnItems.addLayer(layer);

        alert(JSON.stringify(drawnItems.toGeoJSON(), null, 4));
        // Process them any way you want and save to DB

    });

}