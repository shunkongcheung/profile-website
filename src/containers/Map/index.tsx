import React, { useEffect, useRef, useState} from "react";
import styled from "styled-components";

import useUserLocation from "./useUserLocation";
import SearchControl from "./SearchControl";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1bmtvbmdjaGV1bmciLCJhIjoiY2w1dWxybXI5MDEwZDNqcDkxZDAyeDJmcSJ9.XP5AblWeSlVe31K3CQfmAw';


const Container = styled.div `
height: 100vh;
position:relative;
`

const Map: React.FC = () => {
const mapContainer = useRef()
  const map = useRef<mapboxgl.Map>()
  const userLocation = useUserLocation();
  const [status, setStatus] = useState({ lng: -70.9, lat: 42.35, zoom: 9 })

  useEffect(() => {
    if (map.current || userLocation.loading) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [userLocation.lng, userLocation.lat],
      zoom: 8
    });

    map.current.on("move", () => {
      const center = map.current.getCenter()
      setStatus({ lng: center.lng, lat: center.lat, zoom: map.current.getZoom() })
    });

    map.current.addControl(new SearchControl({
      latitude: userLocation.lat,
      longitude: userLocation.lng,
      accessToken: mapboxgl.accessToken,
    }));


    new mapboxgl.Marker()
    .setLngLat([userLocation.lng, userLocation.lat])
    .addTo(map.current);
  }, [setStatus, userLocation])

   return  <Container ref={mapContainer} />
}

export default Map;
