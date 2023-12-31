import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Ajouter = () => {
  const [inputData, setInputData] = useState({
    nom: '',
    role: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/utilisateurs', inputData)
      .then(() => {
        alert("Utilisateur ajouté");
        navigate('/formateur');
      });
  };

  return (
    <div className='d-flex w-100 vh-100 align-items-center justify-content-center '>
      <div className='w-50 p-5 bg-secondary text-white rounded '>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nom">Nom :</label>
            <input
              type='text'
              id='nom'
              className='form-control'
              value={inputData.nom}
              onChange={handleChange}
            />
          </div>

          <select
            id='role'
            className='form-control my-3 border border-dark border-3 border-success bg-opacity-75 border-opacity-50 border border-dark'
            value={inputData.role}
            onChange={handleChange}
          >
            <option value=''>Sélectionner un rôle</option>
            <option value='FORMATEUR'>FORMATEUR</option>
            <option value='PARTICIPANT'>PARTICIPANT</option>
          </select>

          <br />
          <button className='btn btn-info'>Ajouter</button>
        </form>
      </div>
    </div>
  );
};
