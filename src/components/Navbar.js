import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Navbar = () => {
    return (
        <Container fluid className='py-1 mb-3 bg-danger'>
            <Container className='p-0'>
                <div className='mb-2'>
                    <Button href="/" className="me-2">Home</Button>     
                    <Button href="/regions">Regions</Button>

                </div>
            </Container>
        </Container>
    );
};

export default Navbar;