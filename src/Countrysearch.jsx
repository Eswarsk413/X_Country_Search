import { useEffect, useState } from "react";

const CountryCard = ({ name, flag, altText }) => {
  return (
    <div
      className="countryCard" // Ensures the class name is correct
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
        border: "1px solid black",
        borderRadius: "8px",
        height: "200px",
        width: "200px",
        margin: "10px",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <img
        src={flag}
        alt={altText}
        style={{
          width: "100px",
          height: "100px",
        }}
      />
      <h2>{name}</h2>
    </div>
  );
};

const API_URL = "https://restcountries.com/v3.1/all";

function Countrysearch() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data: ", error)); // Log errors as required
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <input
          type="text" // Ensures correct input type
          placeholder="Search for a country"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "8px",
            border: "1px solid black",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.cca3}
            name={country.name.common}
            flag={country.flags.png} // Ensure only img is used
          />
        ))}
      </div>
    </>
  );
}

export default Countrysearch;
