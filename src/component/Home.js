import React, { useState } from "react";
import ServerCard from "./ServerCard";
import ServerForm from "./ServerForm";
import ServerCardWithoutDelete from "./ServerCardWithoutDelete";
import "./../style/Home.css";

function Home() {
  const [data, setDate] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [nameData, setNameData] = useState();
  const [idData, setIdData] = useState();

  const handleGetAllServerClick = () => {
    console.log("GET all servers Clicked");
    fetch("http://127.0.0.1:8080/servers")
      .then((res) => res.json())
      .then((res) => setDate(res));
  };

  const handleDelete = (id) => {
    console.log("Delete Server With ID = ", id);

    fetch(`http://127.0.0.1:8080/servers/${id}`, {
      method: "DELETE",
      redirect: "follow",
    })
      .then((response) => response.text())
      .then(() => handleGetAllServerClick())
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = (id, name, language, framework) => {
    console.log("Handle Submit Clicked");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      id: id,
      name: name,
      language: language,
      framework: framework,
    });
    fetch("http://127.0.0.1:8080/servers", {
      method: "PUT",
      headers: myHeaders,
      body: raw,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        handleGetAllServerClick();
      })
      .catch((error) => console.log("error", error));
  };

  const handleSearchByNameClick = () => {
    fetch(`http://127.0.0.1:8080/servers/name/${name}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.length) {
          setNameData(result);
        } else {
          setNameData();
          setName();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleSearchByIdClick = () => {
    fetch(`http://127.0.0.1:8080/servers/${id}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.length) {
          setIdData(result);
        } else {
          setIdData();
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="container">
      {/* SEARCH BY NAME */}
      <div className="sub-container" style={{ marginTop: "40px" }}>
        <h2>Search Server By Name</h2>
        <div className="search-div">
          <label>Name </label>

          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <button onClick={handleSearchByNameClick}>SEARCH</button>
        </div>
        {nameData && (
          <div className="search-div">
            {" "}
            <ServerCardWithoutDelete data={nameData} />
          </div>
        )}
      </div>

      {/* SEARCH BY ID */}
      <div className="sub-container" style={{ marginTop: "40px" }}>
        <h2>Search Server By Id</h2>
        <div className="search-div">
          <label>Id </label>
          <input
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <button onClick={handleSearchByIdClick}>SEARCH</button>
        </div>
        {idData && (
          <div className="search-div">
            <ServerCardWithoutDelete data={idData} />
          </div>
        )}
      </div>

      {/* GET all server and HIDE server */}
      <h2 style={{ marginTop: "40px" }}>Search Servers</h2>
      <div className="search-div">
        <button onClick={handleGetAllServerClick} style={{ marginRight: "40px", padding: "10px" }}>
          GET ALL SERVERS
        </button>

        <button
          onClick={() => {
            setDate();
          }}
          style={{ padding: "10px" }}
        >
          HIDE SERVERS
        </button>
      </div>

      {data && (
        <div className="search-div">
          <ServerCard data={data} onDelete={handleDelete} />
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <ServerForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Home;
