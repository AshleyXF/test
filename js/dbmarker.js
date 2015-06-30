$(document).ready(getmarker);

var marker = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            21.21875,
                            23.304166555404663
                        ],
                        [
                            22.671875,
                            23.132291555404663
                        ],
                        [
                            21.953125,
                            24.538541555404663
                        ],
                        [
                            21.21875,
                            23.304166555404663
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            21.625,
                            24.147916555404663
                        ],
                        [
                            21.625,
                            27.382291555404663
                        ],
                        [
                            28.609375,
                            27.382291555404663
                        ],
                        [
                            28.609375,
                            24.147916555404663
                        ],
                        [
                            21.625,
                            24.147916555404663
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    20.53125,
                    23.897916555404663
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    24.078125,
                    23.522916555404663
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        19.4375,
                        17.716666221618652
                    ],
                    [
                        9.1875,
                        25.654166221618652
                    ],
                    [
                        22.4375,
                        42.02916622161865
                    ],
                    [
                        16.75,
                        27.279166221618652
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            32.875,
                            19.091666221618652
                        ],
                        [
                            47.125,
                            18.404166221618652
                        ],
                        [
                            49.375,
                            29.904166221618652
                        ],
                        [
                            36.3125,
                            25.404166221618652
                        ],
                        [
                            40.625,
                            22.091666221618652
                        ],
                        [
                            44.5,
                            22.779166221618652
                        ],
                        [
                            42.8125,
                            20.716666221618652
                        ],
                        [
                            35.6875,
                            20.466666221618652
                        ],
                        [
                            32.875,
                            19.091666221618652
                        ]
                    ]
                ]
            }
        }
    ]
};


function getmarker(){
    lyrPlq = L.geoJson(marker, {
		
		}
	);

    askForPlaques();
}

function whenMapMoves(e) {
	askForPlaques();
}

function askForPlaques() {
	var data='bbox=1';
	$.ajax({
		url: 'ajax/importmarker.php',
		dataType: 'json',
		data: data,
		success: showPlaques
	});
}

function showPlaques(ajxresponse) {
	lyrPlq.clearLayers();
	lyrPlq.addData(ajxresponse);
}