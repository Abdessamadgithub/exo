import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserRow = ({ id, nom, role, formations_inscrites, handleDelete, navigateToUpdate }) => (
  <tr>
    <td>{id}</td>
    <td>{nom}</td>
    <td>{role}</td>
    <td>{formations_inscrites}</td>
    <td>
      <button className='btn btn-sm text-decoration btn-danger' onClick={() => handleDelete(id)}>Supprimer</button>
      <Link className='btn btn-sm text-decoration btn-warning' to={navigateToUpdate(id)}>Update</Link>
    </td>
  </tr>
);

const Formateur = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/utilisateurs')
      .then(res => setUtilisateurs(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Etes-vous sûr de vouloir supprimer cet utilisateur ?');
    if (confirmDelete) {
      axios.delete(`http://localhost:3000/utilisateurs/${id}`)
        .then(() => {
          alert("Utilisateur supprimé");
          setUtilisateurs(utilisateurs => utilisateurs.filter(user => user.id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  const navigateToUpdate = (id) => `/update/${id}`;

  return (
    <div className='container'>
      <h2>Liste des utilisateurs</h2>
      <Link to='/ajouter' className='btn btn-success my-3'>Ajouter</Link>
      <table className="table border shadow bg-light rounded border-dark border-3 border-success bg-opacity-75 border-opacity-50 border border-dark ">
        <thead>
          <tr>
            <th>ID</th>
            <th>NOM</th>
            <th>ROLE</th>
            <th>ID-FORMATION</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map(user => (
            <UserRow
              key={user.id}
              handleDelete={handleDelete}
              navigateToUpdate={navigateToUpdate}
              {...user}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Formateur;
