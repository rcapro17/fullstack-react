import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = () => {
    axios
      .get('http://localhost:5050/api/profiles')
      .then((response) => {
        setProfiles(response.data.profiles);
      })
      .catch((error) => {
        console.error('There was an error fetching the profiles!', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProfile = { nome, endereco, telefone };

    axios
      .post('http://localhost:5050/api/profiles', newProfile)
      .then((response) => {
        setProfiles([...profiles, response.data]);
        setNome('');
        setEndereco('');
        setTelefone('');
      })
      .catch((error) => {
        console.error('There was an error submitting the profile!', error);
      });
  };

  return (
    <div>
      <h1>Profiles</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endereco">Endereco:</label>
          <input
            type="text"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            {profile.nome} - {profile.endereco} - {profile.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
