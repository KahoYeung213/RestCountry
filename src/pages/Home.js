import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import CountryCard from '../components/Countrycard';


const Home = ({ countries }) => {
    const [countriesList, setCountriesList] = useState([]);
    const [searchTerm, setSearchTerm] = useState(null);

    useEffect(() => {
        if (!searchTerm) {
            axios.get('https://restcountries.com/v3.1/all')
                .then(response => {
                    console.log(response.data);
                    setCountriesList(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }

        setCountriesList(countriesList.filter((country) => {
            return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
        }));
    }, [searchTerm]);


    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`)
                .then(response => {
                    console.log(response.data);
                    setCountriesList(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    let countryCards = countriesList.map((country, index) => {
        return (
            <>
                <CountryCard
                    key={country.ccn3}
                    flag={country.flags.png}
                    name={country.name.common}
                    region={country.region}
                />
            </>)
    });

    return (
        <>
        <Container>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        className='mt-3'
                        type="text"
                        placeholder="Search for a country..."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <button key={5} type="submit">Search</button>
                </form>
                <Row md={3} xs={1}>
                    {countryCards}
                </Row>
            </div>
            </Container>
        </>
    );
}

export default Home;