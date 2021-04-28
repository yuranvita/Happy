import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {Map , TileLayer , Marker , Popup} from 'react-leaflet';
import {FiPlus , FiArrowRight} from 'react-icons/fi';
import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from "../utils/mapIcon";

import '../styles/pages/Orphanages-map.css';
import api from '../services/api';


interface Orphanage {
    id : number;
    latitude : number ;
    longitude : number ;
    name : String ;
}

function OrphanagesMap(){

    const [orphanages , setOrphanages ] = useState<Orphanage[]>([]);


    useEffect(()=> {
        api.get('orphanages').then(Response => {
           setOrphanages(Response.data);
        })
    },[]);


    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt=""/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :) </p>
                </header>
                <footer>
                    <strong>Roraima</strong>
                    <span>Boa Vista</span>
                </footer>
            </aside>
            <Map
            center={[2.807199,-60.6965615]}
            zoom={15}
            style={{ width : '100%', height: '100%'    }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            
              {
                  orphanages.map(orphanage => {
                      return (
                        <Marker
                        key={orphanage.id}
                        icon= {mapIcon}
                        position={[orphanage.latitude,orphanage.longitude]}
                    >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup"  >
                            {orphanage.name}
                            <Link to={`/orphanage/${orphanage.id}`}>
                                <FiArrowRight size={32}  color= "#FFF"/>
                            </Link>
                        </Popup>
                    </Marker>   
                      )
                  })
              }

            </Map>

            <Link to="/orphanage/create"className="create-orphanage">
                <FiPlus size={32} color="FFF"/>
            </Link>
        </div>
    );
}



export default OrphanagesMap;