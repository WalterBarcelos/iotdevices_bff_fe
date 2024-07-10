import React, {useEffect} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import 'leaflet.markercluster';
import {useSelector, useDispatch} from 'react-redux';
import {fetchDevices} from '../store/deviceSlice';
import {RootState, AppDispatch} from '../store/store';

const customIcon = new L.Icon({
    iconUrl: '/location.png',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    shadowSize: [41, 41] // size of the shadow
});

const MapView: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {devices, loading, error} = useSelector((state: RootState) => state.devices);

    useEffect(() => {
        dispatch(fetchDevices());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <MapContainer center={[36.53998, -4.62473]} zoom={13} style={{height: '500px'}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            <ClusterMarkers devices={devices}/>
        </MapContainer>
    );
};

const ClusterMarkers: React.FC<{ devices: any[] }> = ({devices}) => {
    const map = useMap();
    useEffect(() => {
        const markers = L.markerClusterGroup();
        devices.forEach((device) => {
            const marker = L.marker([parseFloat(device.latitude), parseFloat(device.longitude)],{ icon: customIcon });
            marker.bindPopup(`<b>${device.name}</b><br />${device.mobileNumber}`);
            markers.addLayer(marker);
        });
        map.addLayer(markers);

        return () => {
            map.removeLayer(markers);
        };
    }, [devices, map]);

    return null;
};

export default MapView;
