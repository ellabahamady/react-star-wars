import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

function List() {
    const [people, setPeople] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false)

    // Get list data
    const fetchPeople = async () => {
        setLoading(true)
        const res = await fetch("https://swapi.dev/api/people?page=" + currentPage);
        const data = await res.json();
        if (data.results && data.results.length) setPeople(data.results);
        setLoading(false)
    };

    useEffect(() => {
        fetchPeople();
    }, []);
    
    // Pagination
    const paginate = ({ selected }) => {
        setCurrentPage(selected + 1);
        fetchPeople();
    };

    return (
        <Container>
            <h2>List of People</h2>
            {/* During get data processing, show loader & hide data list */}
            { loading && (
                <div>
                    <Spinner animation="grow" variant="warning" />
                    <Spinner animation="grow" variant="dark" />
                    <Spinner animation="grow" variant="warning" />
                    <Spinner animation="grow" variant="dark" />
                    <Spinner animation="grow" variant="warning" />
                    <Spinner animation="grow" variant="dark" />
                </div>
            )}
            {/* When get data process done, show data list & hide loader */}
            { !loading && people ? (
                <Row>
                    { people.map((item) => (
                        <Col md="3" sm="4" key={item.url.replace(/\D/g, "")}>
                            <Card className="card-margin">
                                <Card.Body>
                                    <Card.Title className="card-title">{ item.name }</Card.Title>
                                    <div className="d-grid gap-2">
                                        <Link to={`/react-star-wars/detail/` + item.url.replace(/\D/g, "") } className="btn btn-warning">View Details</Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <div>Loading...</div>
            )}

            {/* Pagination */}
            <ReactPaginate
                onPageChange={paginate}
                pageCount={10}
                previousLabel={'Prev'}
                nextLabel={'Next'}
                containerClassName={'pagination'}
                pageLinkClassName={'page-number'}
                previousLinkClassName={'page-number'}
                nextLinkClassName={'page-number'}
                activeLinkClassName={'active'}
            />
        </Container>
    );
};

export default List;