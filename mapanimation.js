
// set mapbox token for access
mapboxgl.accessToken = "pk.eyJ1IjoidG9wYWlpbiIsImEiOiJja29rNmRheW4wMXN4MndyemJwZ2kybW4yIn0.0Zvju6lrkRqlFvLMStgeQg";

//create map using mapbox instructions and styling
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: ([-71.092761, 42.357575]),
zoom: 14
});

//create a temporary marker location for the bus that will be updated within page load
const marker = new mapboxgl.Marker()
    .setLngLat([-71.092761, 42.357575])
    .addTo(map)


// run async function to fetch bus location and set longitude and latitude again base on the info 
async function run(){   
    const locations = await getBusLocations();

        for(let i = 0; i < locations.length; i ++){
        // use longitude and latitude from the array busStops
        let lg = busStops[i][0];
        let lat = busStops[i][1];
        // set the longitude and latitude in the map
        marker.setLngLat([lg, lat]);
                // re center the map based on that location (kudos to fellow student marianamizoguchi)
                map.setCenter([lg, lat]);
            map.resize();
    }
    // run the function every 15 seconds to comply with MBTA guidelines
    setTimeout(run, 15000);
}
    

var busStops = [];
// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
  //transform response to json format
	const json     = await response.json();

  // grab only longitude and latitude from the information fetched and push to busStops Array
  await data.forEach((item) =>{
    busStops.push([item.attributes.longitude, item.attributes.latitude]);
  }); 
  return busStops;
}

window.onload = run();
