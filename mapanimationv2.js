
mapboxgl.accessToken = "pk.eyJ1IjoidG9wYWlpbiIsImEiOiJja29rNmRheW4wMXN4MndyemJwZ2kybW4yIn0.0Zvju6lrkRqlFvLMStgeQg";

const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: ([-71.092761, 42.357575]),
zoom: 14
});


const marker = new mapboxgl.Marker()
    .setLngLat([-71.092761, 42.357575])
    .addTo(map)



async function run(){   
    const locations = await getBusLocations();

        for(let i = 0; i < locations.length; i ++){
        let lg = busStops[i][0];
        let lat = busStops[i][1];
        marker.setLngLat([lg, lat]);
                map.setCenter([lg, lat]);
            map.resize();
    }
    
    setTimeout(run, 15000);
}
    

var busStops = [];
// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
  const data     = await json.data;
  
  await data.forEach((item) =>{
    busStops.push([item.attributes.longitude, item.attributes.latitude]);
  }); 
  return busStops;
}

window.onload = run();
