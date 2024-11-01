import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegionCard from '../components/RegionCard';
import { Row, Col, Container } from 'react-bootstrap';

const Regions = () => {
    const [regions, setRegions] = useState([]);

    //maps the country array to get regions
    //set to remove duplicate regions
    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/all`)
            .then(res => {
                const countries = res.data;
                const uniqueRegions = [...new Set(countries.map(country => country.region))].filter(region => region);
                setRegions(uniqueRegions);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);


    
    return (
        <div>
            <Container className='mt-3'>
            <h1>Regions</h1>
            <Row>
                {regions.map((region, index) => (
                    <Col key={index} md={6}>
                        <RegionCard region={region} />
                    </Col>
                ))}
            </Row>
            </Container>
        </div>
    );
}

export default Regions; 