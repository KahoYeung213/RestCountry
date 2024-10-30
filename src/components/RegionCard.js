import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

const RegionCard = ({ region }) => {

    
    return (
        <Card className='my-3 p-2'>
            <Card.Body>
                <Card.Title>
                    <Link to={`/region/${region}`}>{region}</Link>
                </Card.Title>
            </Card.Body>
        </Card>
    )
}

export default RegionCard;