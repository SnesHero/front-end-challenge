import React from "react";
import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

export const Consulta = () => {
  const [searchContent, setSearchContent] = useState("");
  const [getResponse, setGetResponse] = useState();
  const [searchInput, setSearchInput] = useState(false);
  const [nameString, setNameString] = useState("");
  const [cpfString, setCPFString] = useState("");
  const [capitalString, setCapitalString] = useState("");
  const [endString, setEndString] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearchContent = (e) => {
    setSearchContent(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getApiData();
  };

  const getApiData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/clinics/?nome_like=${searchContent}`
      );
      const data = await response.json();
      if (data.response !== []) {
        setGetResponse(data);
        console.log(data);
        const NameString = data[0].nome;
        const CpfString = data[0].CPF;
        const CapitalString = data[0].Capital;
        const EndString = data[0].Endereco;
        setNameString(NameString);
        setCPFString(CpfString);
        setCapitalString(CapitalString);
        setEndString(EndString);
        setSearchInput(true);
      }
    } catch (err) {
      console.log("nao foi");
      setErrorMessage("Nome inválido")
    }
  };

  return (
    <div>
      <Typography variant="h5" color="white">
        Busque uma clínica:
      </Typography>
      <div className="SearchBar">
        <TextField
          className="WhiteBg"
          id="outlined-basic"
          variant="outlined"
          onChange={handleSearchContent}
          value={searchContent}
          type="searchContent"
        />

        <Button onClick={handleSearch} variant="contained" type="submit">
          Buscar
        </Button>

        {searchInput ? (
          <div>
            <div className="WhiteBg">
              <div>Nome: {nameString}</div>
              <div>CPF: {cpfString}</div>
              <div>Capital Social: {capitalString}</div>
              <div>Endereço: {endString}</div>
            </div>
          </div>
        ) : (
          <div className="WhiteBg">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};
