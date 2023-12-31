import React, { useState, useEffect } from "react";
import styles from "../components/Home.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("select");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/utilisateurs").then((res) => setUsers(res.data));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const isValidInput = name.trim() && role !== "select";

    if (!isValidInput) {
      alert("Veuillez sélectionner votre nom et votre rôle");
      return;
    }

    const loggedInUser = users.find((user) => user.nom === name && user.role === role);

    if (loggedInUser) {
      const roleRoutes = {
        Participant: "/participant",
        Formateur: "/formateur",
      };

      const userRoleRoute = roleRoutes[loggedInUser.role];

      if (userRoleRoute) {
        navigate(userRoleRoute);
      } else {
        alert("Rôle d'utilisateur non pris en charge.");
      }
    } else {
      alert("Aucun utilisateur correspondant trouvé.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <p className={styles.form_title}>Ofppt Inscription</p>
        <div className={styles.input_container}>
          <input type="text" placeholder="Enter Your FullName" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="roleSelect">Rôle :</label>
          <select id="roleSelect" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="select">Sélectionnez</option>
            <option value="Participant">Participant</option>
            <option value="Formateur">Formateur</option>
          </select>
        </div>
        <button type="submit" className={styles.submit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Home;
