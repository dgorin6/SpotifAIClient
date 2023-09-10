import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ICreateSuccess {
  link: string;
}

const CreateSuccess = ({ link }: ICreateSuccess) => {
  const navigate = useNavigate();

  const handleMakeAnotherPlaylist = () => {
    navigate('/');
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-header">
          <h2>Congratulations! The playlist was successfully added.</h2>
        </div>
        <p>
          Click{' '}
          <a className = "success-link" href={link} target = "_blank">
            here
          </a>{' '}
          to view the playlist or{' '}
          <span className = "success-link" onClick={handleMakeAnotherPlaylist}>here</span> to make another playlist.
        </p>
      </div>
    </div>
  );
};

export default CreateSuccess;
