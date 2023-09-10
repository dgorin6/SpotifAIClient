import React from 'react';
import {useNavigate } from 'react-router-dom';
import spotifai_logo from "../images/spotifai_logo-transparent.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="app-header">
      <h1 className="app-title">
      </h1>
      <img onClick = {() => navigate("/")} src={spotifai_logo} className="app-logo" />
    </header>
  );
};

export default Header;
