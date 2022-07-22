import React, { FormEvent, useCallback, useRef, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

import styled, {ThemeProvider} from "styled-components";
import getDistanceFromLatLon from "./getDistanceFromLatLon";
import {getTheme} from "../../utils";

const Container = styled.div `
display: flex;
flex-direction: column;
width: 400px;
`

const Input =  styled.input `
border: 1px solid #ccc;
border-radius: 5px;
height: 30px;
width: 100%;
`

const ResultUnorderList = styled.ul `
list-style: none;
padding: 0;
background: ${props => props.theme.colors.background};
border-radius: 5px;
`

const ResultListItem = styled.li `
border-top: ${props => props.theme.colors.primary[400]} 1px solid;
padding: 8px 0;
margin: 0px 16px;

:first-child {
  border-top: 0;
}
`

const ResultBtn = styled.button `
display: flex;
flex-direction: column;
text-align: start;
border: 0;

background: transparent;
cursor: pointer;

`

const Name = styled.span `
color: ${props => props.theme.colors.primary[400]};
`

const Desc = styled.span `
color: ${props => props.theme.colors.primary[500]};
`

interface Result {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  distance: number;
  marker: mapboxgl.Marker;
}

interface SearchControlBoxProps {
  accessToken: string;
  map: mapboxgl.Map;
  latitude: number;
  longitude: number;
}

const SearchControlBox = ({ map, latitude, longitude, accessToken }: SearchControlBoxProps) => {
  const [results, setResults] = useState<Array<Result>>([]);
  const searchTextRef = useRef("");

  const handleSearch = useCallback( async (event: FormEvent) => {
    event.preventDefault();

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    const searchText =  encodeURI(searchTextRef.current)
    const response = await fetch(`${url}${searchText}.json?limit=5&proximity=${longitude},${latitude}&access_token=${accessToken}`);
    const { features } = await response.json();
    setResults((previousResults) => {
      previousResults.map(({ marker }) => marker.remove());

      return features.map(({id, center, place_name: name }) => {
        const distance = getDistanceFromLatLon(latitude, longitude, center[1], center[0])
        const marker = new mapboxgl.Marker().setLngLat(center).addTo(map);
        return { id, name, latitude: center[1], longitude: center[0], distance, marker }
      })
    })

    if(features.length) map.setCenter(features[0].center);
    map.zoomTo(15, { duration: 1000 });
  }, [accessToken, latitude, longitude, map])


  const handleSelect = useCallback((result: Result) => {
    const DURATION = 300;
    map.zoomTo(12, { duration: DURATION })
    results.map(({ id, marker }) => id !== result.id && marker.remove())

    setTimeout(() => {
      results.map(({ id, marker }) => id === result.id && marker.addTo(map))
      map.setCenter([result.longitude, result.latitude]).zoomTo(13, { duration: 1000 });
    }, DURATION);
  }, [map, results])

  return <Container className="mapboxgl-ctrl">
    <form onSubmit={handleSearch} >
      <Input onChange={({ target }) => searchTextRef.current = target.value}/>
    </form>
    <ResultUnorderList>
      {results.map(result => (
        <ResultListItem key={result.id}>
          <ResultBtn onClick={() => handleSelect(result)}>
            <Name>{result.name}</Name>
            <Desc>{result.distance.toFixed()}m</Desc>
          </ResultBtn>
        </ResultListItem>
      ))}
    </ResultUnorderList>
  </Container>
}

class SearchControl implements mapboxgl.IControl{
  private _map: mapboxgl.Map;
  private _container: HTMLElement;

  private _accessToken: string;
  private _latitude: number;
  private _longitude: number;

  constructor(options: {accessToken: string, latitude: number, longitude: number}) {
    this._accessToken = options.accessToken;
    this._latitude = options.latitude;
    this._longitude = options.longitude;
  }

  onAdd(map: mapboxgl.Map): HTMLElement {
    this._map = map;
    this._container = document.createElement("div")
    const theme = getTheme("dark");
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <SearchControlBox latitude={this._latitude} longitude={this._longitude} accessToken={this._accessToken} map={this._map}/>
      </ThemeProvider>
      , this._container);
    return this._container;
  }
  onRemove() {
    this._map = undefined;
  }
}




export default SearchControl
