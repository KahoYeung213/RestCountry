import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Navbar = () => {
    return (
        <Container fluid className='py-1 mb-3 bg-danger'>
            <Container className='p-0'>
                <div className='mb-2'>
                    <Link to='/'>Home</Link>
                    <Link to='/regions'>Regions</Link>


                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button class="dropdown-item" type="button">Action</button>
                            <button class="dropdown-item" type="button">Another action</button>
                            <button class="dropdown-item" type="button">Something else here</button>
                        </div>
                    </div>
                </div>
            </Container>
        </Container>
    );
};

export default Navbar;