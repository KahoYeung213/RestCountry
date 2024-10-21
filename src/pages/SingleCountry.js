import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Row, Col, Image, Container } from 'react-bootstrap';

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

const SingleCountry = () => {

    const { name } = useParams();

    const [country, setCountry] = useState(null);
    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(res => {
                console.log(res.data);
                setCountry(res.data[0]);
            })
            .catch(err => {
                console.error(err);
            })
    }, [])
    if (!country) {
        return <h1>Loading...</h1>
    }

    return (
        <Row>
            <Col>  <img src={country.flags.png} alt={`${country.name.common}'s flag`} /></Col>

            <Col>
                <h1>{country.name.common}</h1>
                <h2>Official name:{country.name.official}</h2>
                <p>Region:{country.region}</p>
                {
                    country.subregion && <p>Subregion:{country.subregion}</p>
                }
                <ul>
                    <h3>Languages:</h3>
                    {Object.values(country.languages).map((language) => {
                        return <li>{language}</li>
                    })
                    }
                </ul>

                <h4>Currency: {Object.values(country.currencies)[0].name} ({Object.values(country.currencies)[0].symbol})</h4>


            </Col>

            <Col>
                <MapContainer center={[country.latlng[0],country.latlng[1]]} zoom={5} scrollWheelZoom={false} height='50%' width='50%'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[country.latlng[0],country.latlng[1]]}>

                    </Marker>
                </MapContainer>
            </Col>

        </Row>
    )
}

export default SingleCountry;