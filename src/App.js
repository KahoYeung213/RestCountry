import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
//import components
import Navbar from './components/Navbar';


//import pages
import Home from './pages/Home';
import SingleCountry from './pages/SingleCountry';
import Regions from './pages/Regions';
const App = () => {
    return (

        <Router>
            <Navbar />
            <Container>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/regions' element={<Regions />} />

                    <Route path='/country/:name' element={<SingleCountry />} />

                </Routes>
            </Container>
        </Router>

    )
};

export default App;