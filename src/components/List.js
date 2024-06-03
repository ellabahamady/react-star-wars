import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function List() {
    const [people, setPeople] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchPeople = async () => {
        const res = await fetch("https://swapi.dev/api/people?page=" + currentPage);
        const data = await res.json();
        if (data.results && data.results.length) setPeople(data.results);
    };

    useEffect(() => {
        fetchPeople();
    }, []);
    
    const paginate = ({ selected }) => {
        setCurrentPage(selected + 1);
        fetchPeople();
    };

    return (
        <Container>
            <h2>People</h2>
            { people ? (
                <Row>
                    { people.map((item) => (
                        <Col md="3" sm="4">
                            <Card className="card-margin">
                                <Card.Body>
                                    <Card.Title className="card-title">{ item.name }</Card.Title>
                                    <div className="d-grid gap-2">
                                        <Link to="/detail" className="btn btn-warning">Detail</Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}

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
                </Row>
            ) : (
                <div className="loading">Loading...</div>
            )}
        </Container>
    );
};

export default List;