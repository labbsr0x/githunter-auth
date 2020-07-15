import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";
import Axios from "axios";
import logo from "./assets/icons/GitHub-Mark-Light-32px.png"

const client_id = "4c760cd460ed0870f7b8";

const getUrlParam = (parameter, defaultvalue) => {
  let urlparameter = defaultvalue;
  if (window.location.href.indexOf(parameter) > -1) {
    const vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
      vars[key] = value;
    });
    urlparameter = vars[parameter];
  }
  return urlparameter;
};

function App() {
  const [accessToken, setAccessToken] = useState();

  const [reposData, setReposData] = useState();

  async function handleLogin() {
    window.location.href = `https://github.com/login/oauth/authorize/?scope=user:email:repos&client_id=${client_id}`;
  }

  useEffect(() => {
    const session_code = getUrlParam("code", "");

    if (session_code && session_code !== "") {
      Axios.get(
        "/auth",
        {
          params: {
            code: session_code,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers":
              "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
          },
        }
      ).then((res) => {
        if (res && res.data && res.data.success) {
          setAccessToken(res.data.token);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (accessToken && accessToken !== "") {
      api.get(`/v1/repos/${accessToken}`).then((res) => {
        setReposData(res.data); // check when fail
      });
    }
  }, [accessToken]);

  return (
    <div className="App">
      <header className="App-header">
        <button className="App-button" type="button" onClick={handleLogin}>
          <img src={logo}/>
          <p>Login with GitHub</p>
        </button>
        <>
        <p>{reposData && reposData.name}</p>
        {reposData && "List of Repos:"}
          <ul>
            {reposData && reposData.repositories.map( (repo) => 
                <li key={repo}>{repo}</li>
            )}
          </ul>
        </>
        
      </header>
    </div>
  );
}

export default App;
