import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    nom: '',
    role: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/utilisateurs/${id}`);
        setInputData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/utilisateurs/${id}`, inputData);
      alert('Utilisateur modifié');
      navigate('/formateur');
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  return (
    <div className='d-flex w-100 vh-100 align-items-center justify-content-center'>
      <div className='w-50 p-5 bg-secondary text-white rounded '>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='id'>ID :</label>
              <input type='text' id='id' name='id' className='form-control' value={inputData.id} disabled />
            </div>
            <div>
              <label htmlFor='nom'>Nom :</label>
              <input
                type='text'
                id='nom'
                name='nom'
                className='form-control'
                value={inputData.nom}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor='role'>Role :</label>
              <input
                type='text'
                id='role'
                name='role'
                className='form-control'
                value={inputData.role}
                onChange={handleInputChange}
              />
            </div>
            <br />
            <button type='submit' className='btn btn-info'>
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Update;
