import { useEffect, useState} from "react";
const useUserLocation = () => {
  const [state, setState] = useState({lng: -70.9, lat: 42.35, loading: true});
  useEffect(() => {
    if (!navigator.geolocation) {
      setState(o => ({...o, loading: false }));
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      setState({lng: position.coords.longitude,lat: position.coords.latitude,loading: false})
    });
  }, [setState])

  return state;
}

export default useUserLocation;
