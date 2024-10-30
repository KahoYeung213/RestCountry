import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import CountryCard from '../components/Countrycard';

const RegionDetails = () => {
    const { region } = useParams();
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/region/${region}`)
            .then(res => {
                console.log(res.data); // Log the response data
                setCountries(res.data);
                setError(null); // Clear any previous errors
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch countries. Please check the region name.');
            });
    }, [region]);

    return (
        <div>
            <h1>Countries in {region}</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                <Row>
                    {countries.map((country) => (
                        <Col key={country.cca3} md={3}>
                            <Card className='my-3 p-2'>
                                <Card.Body>
                                    <CountryCard
                                        key={country.ccn3}
                                        flag={country.flags.png}
                                        name={country.name.common}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default RegionDetails;