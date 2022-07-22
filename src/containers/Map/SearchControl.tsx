import React, { FormEvent, useCallback, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import wiki from 'wikijs'

import styled, {ThemeProvider} from "styled-components";
import getDistanceFromLatLon from "./getDistanceFromLatLon";
import {getTheme} from "../../utils";

const Container = styled.div `
display: flex;
flex-direction: column;
width: 400px;
`;

const Desc = styled.span `
color: ${props => props.theme.colors.primary[500]};
`;

const Image = styled.img `
width: 100%;
height: auto;
`

const Input =  styled.input `
border: 1px solid #ccc;
border-radius: 5px;
height: 30px;
width: 100%;
`
const LocationInfoContainer = styled.div `
margin: 12px 0px;
padding: 10px;
background: ${props => props.theme.colors.background};
border-radius: 5px;
`

const ResultUnorderList = styled.ul `
list-style: none;
padding: 0;
background: ${props => props.theme.colors.background};
border-radius: 5px;
`;
const ResultListItem = styled.li `
border-top: ${props => props.theme.colors.primary[400]} 1px solid;
padding: 8px 0;
margin: 0px 16px;

:first-child {
  border-top: 0;
}
`;

const ResultBtn = styled.button `
display: flex;
flex-direction: column;
text-align: start;
border: 0;

background: transparent;
cursor: pointer;
`;

const Name = styled.span `
color: ${props => props.theme.colors.primary[400]};
`;

const ShowMoreBtn = styled.button `
cursor: hover;
border: 0;
background: transparent;
color: ${props => props.theme.colors.primary[400]};
:hover {
text-decoration: underline;
}
`

  const Summary = styled.p<{ isMore : boolean }>`
overflow: hidden;
color: ${props => props.theme.colors.primary[400]};
${props => props.isMore && `
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 10;
line-clamp: 10; 
 -webkit-box-orient: vertical;
 `}
`;

  const Title = styled.h2 `
color: ${props => props.theme.colors.primary[400]};
`;

interface Description {
  summary: string;
  info: { [x: string]: string }
  images: Array<string>;
}

interface Result {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  distance: number;
  marker: mapboxgl.Marker;
  description?: Description
}

interface SearchControlBoxProps {
  accessToken: string;
  map: mapboxgl.Map;
  latitude: number;
  longitude: number;
}


const SearchControlBox = ({ map, latitude, longitude, accessToken }: SearchControlBoxProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isMore, setIsMore] = useState(true);
  const [results, setResults] = useState<Array<Result>>([]);
  const [description, setDescription] = useState<Description | undefined>();
  const [searchText, setSearchText] = useState("");

  const handleSearch = useCallback( async (event: FormEvent) => {
    event.preventDefault();
    setDescription(undefined);

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    const searchTextEncoded =  encodeURI(searchText)
    const response = await fetch(`${url}${searchTextEncoded}.json?limit=5&proximity=${longitude},${latitude}&access_token=${accessToken}`);
    const { features } = await response.json();

    const newResults:Array<Result> = await Promise.all(features.map(async ({id, center, place_name: name, properties }) => {
      const distance = getDistanceFromLatLon(latitude, longitude, center[1], center[0])
      const marker = new mapboxgl.Marker().setLngLat(center).addTo(map);

      let [summary, images, info] = ["", [], {}]

      const wikiDataId = properties?.wikidata;
      if(wikiDataId) {
        const wikiDataRessponse = await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${wikiDataId}.json`);
        const wikiData = await wikiDataRessponse.json();
        const wikipageUrl = wikiData.entities?.[wikiDataId]?.sitelinks?.enwiki?.url; 

        if(wikipageUrl) {
          const pageName = wikipageUrl.split("wiki/")[1];
          const page = await wiki().page(pageName);
          [info, summary, images] = await Promise.all([page.info(), page.summary(), page.images()]);
        }
      }

      return { id, name, latitude: center[1], longitude: center[0], distance, marker, description: {summary, images, info } }
    }))

    setResults((previousResults) => {
      previousResults.map(({ marker }) => marker.remove());
      return newResults
    })

    if(features.length) map.setCenter(features[0].center);
    map.zoomTo(15, { duration: 1000 });
  }, [accessToken, latitude, longitude, map, searchText])


  const handleSelect = useCallback((result: Result) => {
    const DURATION = 300;
    map.zoomTo(12, { duration: DURATION })
    results.map(({ id, marker }) => id !== result.id && marker.remove())
    results.map(({ id, name }) => (id === result.id) && setSearchText(name));
    setIsFocus(false);
    setTimeout(() => {
      results.map(({ id, marker }) => (id === result.id) && marker.addTo(map))
      results.map(({ id, description }) => {
        (id === result.id) && setDescription(description)
        console.log({ id, description });
      })
      map.setCenter([result.longitude, result.latitude]).zoomTo(13, { duration: 1000 });
    }, DURATION);
  }, [map, results])

  console.log({results, description});

  return <Container className="mapboxgl-ctrl">
    <form onSubmit={handleSearch} onFocus={() => setIsFocus(true)}>
      <Input onChange={({ target }) => setSearchText(target.value)} value={searchText}
        onMouseDown={() => setDescription(undefined)}
      />
    </form>
    {isFocus && 
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
    }
    {(description?.images.length || description?.summary) && (
      <LocationInfoContainer>
        {description.images.length && <Image src={description.images[0]} alt="image"/>}
        <Summary isMore={isMore}>{description.summary}</Summary>
        {description.summary && <ShowMoreBtn onClick={() => setIsMore(o => !o)}>show {isMore ?"more": "less"}</ShowMoreBtn>}
      </LocationInfoContainer>
    )}
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
