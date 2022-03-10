import "./App.css";
import { Consulta } from "./Consulta";
import Form from "./Form";
import docimg from "./imgs/docimg.jpg";
import drMario from "./imgs/drMario.png";
import { useState } from "react";
import { Button, Typography } from "@mui/material";

function App() {
  const [showHome, setShowHome] = useState(true);

  const handleClick = () => {
    setShowHome(false);
  };

  return (
    <div>
      {showHome ? (
        <div className="HomePage" >
          <Typography variant="h2" color="white">Michael Clínicas</Typography>
          <img className="HomeImage" src={drMario} alt="" />
          
          <p></p>
          <Button variant="contained" color="success" onClick={handleClick}>
          <Typography variant="h4" color="white">Consultar Cadastros</Typography>
          </Button>
        </div>
      ) : (
        <div className="App">
          <img className="imagem" src={docimg} alt="" />
          <div className="PageFunc">
            <Consulta className="SearchBar" />
            <Form className="itemOne" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
