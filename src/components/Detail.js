import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';

function Detail() {
    const { id } = useParams();
    const [person, setPerson] = useState([]);
    const [films, setFilm] = useState([]);
    const [species, setSpecies] = useState([]);
    const [starships, setStarship] = useState([]);
    const [vehicles, setVehicle] = useState([]);

    const fetchPerson = async () => {
        const res = await fetch(`https://swapi.dev/api/people/${id}`);
        const data = await res.json();

        if (data) {
            setPerson(data);

            // Get data film
            if(data.films && data.films.length){
                let filmList = [];
                for(let film of data.films){
                    const resFilm = await fetch(film);
                    const dataFilm = await resFilm.json();

                    if (dataFilm) filmList.push(dataFilm.title);
                }
                setFilm(filmList);
            }

            // Get data species
            if(data.species && data.species.length){
                let speciesList = [];
                for(let species of data.species){
                    const resSpecies = await fetch(species);
                    const dataSpecies = await resSpecies.json();

                    if (dataSpecies) speciesList.push(dataSpecies.name);
                }
                setSpecies(speciesList);
            }

            // Get data starship
            if(data.starships && data.starships.length){
                let starshipList = [];
                for(let starship of data.starships){
                    const resStarship = await fetch(starship);
                    const dataStarship = await resStarship.json();

                    if (dataStarship) starshipList.push(dataStarship.name + ' : ' + dataStarship.model);
                }
                setStarship(starshipList);
            }

            // Get data vehicle
            if(data.vehicles && data.vehicles.length){
                let vehicleList = [];
                for(let vehicle of data.vehicles){
                    const resVehicle = await fetch(vehicle);
                    const dataVehicle = await resVehicle.json();

                    if (dataVehicle) vehicleList.push(dataVehicle.name + ' : ' + dataVehicle.model);
                }
                setVehicle(vehicleList);
            }
        } 
    };

    useEffect(() => {
        fetchPerson();
    }, []);

    return (
        <Container>
            <Link to="/react-star-wars" className="btn btn-link">Back to list</Link>
            { person ? (
                <Row>
                    <Col md="12" sm="12" className="margin-bottom-10">
                        <h2>{ person.name }</h2>
                    </Col>
                    <Col md="12" sm="12" className="margin-bottom-10">
                        <Table striped bordered responsive>
                            <thead>
                                <tr>
                                    <th>Gender</th>
                                    <th>Birth Year</th>
                                    <th>Height</th>
                                    <th>Mass</th>
                                    <th>Hair Color</th>
                                    <th>Skin Color</th>
                                    <th>Eye Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>{ person.gender }</th>
                                    <th>{ person.birth_year }</th>
                                    <th>{ person.height }</th>
                                    <th>{ person.mass }</th>
                                    <th>{ person.hair_color }</th>
                                    <th>{ person.skin_color }</th>
                                    <th>{ person.eye_color }</th>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col md="3" sm="6" className="margin-bottom-10">
                        <ListGroup>
                            <ListGroup.Item active>Film</ListGroup.Item>
                            { films && films.length ? films.map((item) => (
                                <ListGroup.Item>{ item }</ListGroup.Item>
                            )) : (
                                <ListGroup.Item> No Film </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>
                    <Col md="3" sm="6" className="margin-bottom-10">
                        <ListGroup>
                            <ListGroup.Item active>Species</ListGroup.Item>
                            { species && species.length ? species.map((item) => (
                                <ListGroup.Item>{ item }</ListGroup.Item>
                            )) : (
                                <ListGroup.Item> No Species </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>
                    <Col md="3" sm="6" className="margin-bottom-10">
                        <ListGroup>
                            <ListGroup.Item active>Starship</ListGroup.Item>
                            { starships && starships.length ? starships.map((item) => (
                                <ListGroup.Item>{ item }</ListGroup.Item>
                            )) : (
                                <ListGroup.Item> No Starship </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>
                    <Col md="3" sm="6" className="margin-bottom-10">
                        <ListGroup>
                            <ListGroup.Item active>Vehicle</ListGroup.Item>
                            { vehicles && vehicles.length ? vehicles.map((item) => (
                                <ListGroup.Item>{ item }</ListGroup.Item>
                            )) : (
                                <ListGroup.Item> No Vehicle </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
            ) : (
                <div className="loading">Loading...</div>
            )}
        </Container>
    );
};

export default Detail;