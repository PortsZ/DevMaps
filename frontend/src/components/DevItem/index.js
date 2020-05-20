import React, {useState} from 'react';
import './styles.css'
import api from '../../services/api';


function DevItem({ dev, onSubmit }) {

  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  async function handleDeleteDevButton(e) {

    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude,
    });

  }

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <button onChange={handleDeleteDevButton}>Close</button>
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>See profile @ github</a>

    </li>
  );
}

export default DevItem;