/* 
JS file for the displaying the Map
*/

//Importing dependencies
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Returns a Map Contiainer using React-leaflet
function Map(props) {

    return (
        <div>
            <MapContainer className="mapid" center={[props.latitude, props.longitude]} zoom={10} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[props.latitude, props.longitude]} x>
                    <Popup>
                        Your location
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map
