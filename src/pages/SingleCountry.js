import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Row, Col, Image, Container } from 'react-bootstrap';


import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const SingleCountry = () => {
    const { name } = useParams();
    const [country, setCountry] = useState(null);
    const [food, setFood] = useState(null);

    // Fetch country data
    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(res => {
                console.log(res.data);
                setCountry(res.data[0]); // Set country data
            })
            .catch(err => {
                console.error(err);
            });
    }, [name]);

    // Fetch food data when country is set and has a demonym
    useEffect(() => {
        if (country && country.demonyms?.eng?.f) {
            const demonym = country.demonyms.eng.f;
            axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${demonym}`)
                .then(res => {
                    console.log(res.data);
                    setFood(res.data.meals); // Set food data
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [country]);

    if (!country) {
        return <h1>Loading...</h1>
    }

    return (
        <Container className="">
            <Row>
                <Col>  <img src={country.flags.png} alt={`${country.name.common}'s flag`} />

                    <h1>{country.name.common}</h1>
                    <h2>Official name: {country.name.official}</h2>
                    <p>Region: {country.region}</p>
                    {
                        country.subregion && <p>Subregion: {country.subregion}</p>
                    }

                    <h3>Languages:</h3>
                    <ul>
                        {Object.values(country.languages).map((language, index) => {
                            return <li key={index}>{language}</li>;
                        })}
                    </ul>

                    <h4>Currency: {Object.values(country.currencies)[0].name} ({Object.values(country.currencies)[0].symbol})</h4>


                </Col>



                <Col>
                    <MapContainer style={{ height: "400px", width: "100%" }} center={[country.latlng[0], country.latlng[1]]} zoom={4} scrollWheelZoom={false}>    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />    <Marker position={[country.latlng[0], country.latlng[1]]}>        <Popup>            A pretty CSS3 popup. <br /> Easily customizable.        </Popup>    </Marker></MapContainer>
                </Col>

            </Row>


            <Col>
                <Container>
                    {country ? (
                        <h1>{country.name.common}</h1>
                    ) : (
                        <p>Loading country...</p>
                    )}
                    {/* ? and : are used as ifelse statements
                        ? if true and : if false
                    */}
                    {food ? (
                        food.length > 0 ? (
                            <div className="row">
                                {food.map((meal, index) => (
                                    <div key={meal.idMeal} className="col-lg-3 mb-4">
                                        <div className="card h-100 text-center">
                                            <img src={meal.strMealThumb} alt={meal.strMeal} className="card-img-top" />
                                            <div className="card-body">
                                                <h5 className="card-title">{meal.strMeal}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Loading food...</p>
                        )
                    ) : (
                        <p>No meals found for this country.</p>
                    )}
                </Container>
            </Col>

        </Container>
    )
}

export default SingleCountry;