import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Container } from 'react-bootstrap';
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


    //Maps the countries and makes them return flag,name,region,pop
    let countryCards = countries.map((country, index) => {
        return (
            <>
                <CountryCard
                    key={country.ccn3}
                    flag={country.flags.png}
                    name={country.name.common}
                    region={country.region}
                    population={country.population}
                />
            </>)
    });


    return (
        <div>
            <Container className='mt-3'>
                <h1>Countries in {region}</h1>
                <Row md={3} xs={1}>
                    {countryCards}
                </Row>
            </Container>
        </div>
    );
};

export default RegionDetails;