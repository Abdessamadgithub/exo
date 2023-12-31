import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const FormationCard = ({ id, titre, domaine, niveau, description, clicked, handleButtonClick }) => (
  <div className="col-md-4 mb-4">
    <Card>
      <Card.Body>
        <Card.Title>{titre}</Card.Title>
        <Card.Text>
          <p>Domaine: {domaine}</p>
          <p>Niveau: {niveau}</p>
          <p>Description: {description}</p>
        </Card.Text>
        <Button variant={clicked ? 'danger' : 'primary'} onClick={() => handleButtonClick(id)}>
          {clicked ? 'Quitter' : 'Inscription'}
        </Button>
      </Card.Body>
    </Card>
  </div>
);

const Participant = () => {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/formations")
      .then((res) => setFormations(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleButtonClick = (id) => {
    setFormations(formations.map(formation => (formation.id === id ? { ...formation, clicked: !formation.clicked } : formation)));
  };

  return (
    <div className="row">
      {formations.map((formation) => (
        <FormationCard key={formation.id} {...formation} handleButtonClick={handleButtonClick} />
      ))}
    </div>
  );
};

export default Participant;
