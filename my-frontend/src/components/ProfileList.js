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
      .get('http://localhost:5051/api/profiles')
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
      .post('http://localhost:5051/api/profiles', newProfile)
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
    <div className="container">
      <h1>Profiles</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome:
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endereco" className="form-label">
            Endereco:
          </label>
          <input
            type="text"
            className="form-control"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">
            Telefone:
          </label>
          <input
            type="text"
            className="form-control"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Endereco</th>
            <th scope="col">Telefone</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.nome}</td>
              <td>{profile.endereco}</td>
              <td>{profile.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileList;
