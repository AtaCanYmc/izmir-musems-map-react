import React, {useEffect, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const IzmirMap = (props) => {
    const { markers = [] } = props;
    const museumCustomIcon = L.icon({
        iconUrl: require('../icons/museum.png'), // SVG simgesinin dosya yolu
        iconSize: [24, 24], // İkon boyutu (genişlik, yükseklik)
        iconAnchor: [12, 41], // İkonun harita üzerindeki konumunu ayarlamak için
        popupAnchor: [1, -34], // Popup'ın konumunu ayarlamak için
    });
    const userLocationIcon = L.icon({
        iconUrl: require('../icons/red-marker.png'), // SVG simgesinin dosya yolu
        iconSize: [24, 24], // İkon boyutu (genişlik, yükseklik)
        iconAnchor: [12, 41], // İkonun harita üzerindeki konumunu ayarlamak için
        popupAnchor: [1, -34], // Popup'ın konumunu ayarlamak için
    });
    const izmirPosition = [38.4237, 27.1428];
    const mapStyle = {
        height: '800px',
        width: '100%'
    };
    const [userPosition, setUserPosition] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserPosition([latitude, longitude]);
                },
                (error) => {
                    console.error("Konum alınırken hata oluştu:", error);
                }
            );
        } else {
            console.error("Tarayıcı Geolocation API'sini desteklemiyor.");
        }
    }, []);

    return (
        <MapContainer center={izmirPosition} zoom={13} style={mapStyle}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            {markers.map((marker) => (
                <Marker key={marker.id} position={marker.position} icon={museumCustomIcon}>
                    <Popup>
                        <h3>{marker.name}</h3>
                        <p>{marker.description}</p>
                    </Popup>
                </Marker>
            ))}
            {userPosition && <Marker position={userPosition} icon={userLocationIcon}>
                <Popup>Bu sizin anlık konumunuz.</Popup>
            </Marker>}
        </MapContainer>
    );
};