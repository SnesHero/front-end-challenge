import { TextField, Button, Typography, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";

export default function Form() {
  // States for registration
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [capital, setCapital] = useState("");
  const [address, setAddress] = useState("");
  const [nextButton, setNextButton] = useState(false);

  // States for checking the errors
  const [error, setError] = useState(false);

  // Request OK
  const [postRequest, setPostRequest] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Handling the cpf change
  const handlecpf = (e) => {
    setCpf(e.target.value);
  };

  // Handling the capital change
  const handlecapital = (e) => {
    setCapital(e.target.value);
  };

  const handleaddress = (e) => {
    setAddress(e.target.value);
  };

  // Handling the form submission
  const handleSubmit1 = (e) => {
    e.preventDefault();
    if (name === "" || cpf === "" || capital === "") {
      setError(true);
    } else {
      setNextButton(true);
      setError(false);
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (address === "") {
      setError(true);
    } else {
      setPostRequest(true);
      setError(false);
    }
  };

  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: name,
        CPF: cpf,
        Capital: capital,
        Endereco: address,
      }),
    };
    fetch("http://localhost:8000/clinics", requestOptions).then((response) =>
      response.json()
    );
  }, [postRequest]);

  const addressSuccessMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: postRequest ? "" : "none",
        }}
      >
        <h1>Cadastro Completo!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  const carouselItens = [
    <Paper className="PaperBg">
      <div className="messages">{errorMessage()}</div>
      <TextField
        className="TextInput"
        id="outlined-basic"
        variant="outlined"
        onChange={handleName}
        value={name}
        label="name"
        type="name"
      />
      <TextField
        id="outlined-basic"
        variant="outlined"
        onChange={handlecpf}
        value={cpf}
        label="cpf"
        type="cpf"
      />
      <TextField
        id="outlined-basic"
        variant="outlined"
        onChange={handlecapital}
        value={capital}
        label="capital"
        type="capital"
      />
      <Button onClick={handleSubmit1} variant="contained" type="submit">
        Cadastrar
      </Button>
    </Paper>,
    <Paper className="PaperBg">
      <TextField
        id="outlined-basic"
        variant="outlined"
        onChange={handleaddress}
        value={address}
        label="address"
        type="address"
      />
      <Button onClick={handleSubmit2} variant="contained" type="submit">
        Cadastrar
      </Button>
      <div className="messages">{addressSuccessMessage()}</div>
    </Paper>,
  ];

  return (
    <div className="itemOne">
      <Typography variant="h4" color="white">
        Cadastre uma clínica:
      </Typography>
      <Carousel
        className="PaperBg"
        autoPlay={nextButton}
        animation="slide"
        indicators={false}
        navButtonsAlwaysInvisible={true}
        navButtonsAlwaysVisible={true}
        cycleNavigation={false}
      >
        {carouselItens}
      </Carousel>
    </div>
  );
}
