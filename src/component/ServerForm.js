import React, { useState } from "react";
import "./../style/Home.css";

function ServerForm(props) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [language, setLanguage] = useState("");
  const [framework, setFramework] = useState("");
  const [click, setClick] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    props.handleSubmit(id, name, language, framework);

    setName("");
    setId("");
    setLanguage("");
    setFramework("");
    setClick(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <h2>Add New Server</h2>
      <div className="sub-container">
        <div className="search-div">
          <button
            onClick={() => {
              setClick(!click);
            }}
          >
            Add New Server
          </button>
        </div>
      </div>

      <div>
        {click && (
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <div className="form-input">
              <label>Name:</label>
              <input type="text" value={name} onChange={(event) => setName(event.target.value)} required="True" />
            </div>

            <div className="form-input">
              <label>ID:</label>
              <input type="text" value={id} onChange={(event) => setId(event.target.value)} required="True" />
            </div>

            <div className="form-input">
              <label>Language:</label>
              <input
                type="text"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                required="True"
              />
            </div>

            <div className="form-input">
              <label>Framework:</label>
              <input
                type="text"
                value={framework}
                onChange={(event) => setFramework(event.target.value)}
                required="True"
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ServerForm;
