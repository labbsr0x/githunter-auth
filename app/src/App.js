import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";
import Axios from "axios";
import logo from "./assets/icons/GitHub-Mark-Light-32px.png"
import logoGitlab from "./assets/icons/gitlab.png"

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

  async function handleLoginGitLab() {
    window.location.href = `https://gitlab.com/oauth/authorize?client_id=ec70cae19f6cd6d530d38ea9e4b09de7515b91219ad6be4729dc68ccec621c77&redirect_uri=http://localhost:3000&response_type=code&state=akdjnkajsdnfkjsdnfkasdnfkjadnflka&scope=read_repository+read_user+read_api+profile+email+api`;
  }

  let provider = "github";
  
  useEffect(() => {
    const session_code = getUrlParam("code", "");
    const state = getUrlParam("state", "");

    
    if (state){
      provider = "gitlab"
    }


    if (session_code && session_code !== "") {
      Axios.get(
        "/auth",
        {
          params: {
            code: session_code,
            provider
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
    const state = getUrlParam("state", "");

    
    if (state){
      provider = "gitlab"
    }
    if (accessToken && accessToken !== "") {
      api.get(`/v1/repos`, {
        params: {
          access_token: accessToken,
          provider
        },
      }).then((res) => {
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
        <button className="App-button" type="button" onClick={handleLoginGitLab}>
          <img src={logoGitlab}/>
          <p>Login with GitLab</p>
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
