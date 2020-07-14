import React, { useEffect } from 'react';
import api from './services/api';
import './App.css';

const client_id = '4c760cd460ed0870f7b8';
const client_secret = 'e4d5260837168214ca812e30c58f42fb5427da8c'

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
  async function handleLogin() {
    window.location.href = `https://github.com/login/oauth/authorize/?scope=user:email&client_id=${client_id}`;
  }

  useEffect(() => {
    const session_code = getUrlParam('code', '');

    if (session_code && session_code !== '') {
      api.post('/login/oauth/access_token', {
        client_id,
        client_secret,
        code: session_code
      }, {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
          "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
        },
      }).then((res) => {
        console.log(res)
      })
    }

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Login with GitHub
        </p>
        <button type="button" onClick={handleLogin}>Click here to login</button>
      </header>
    </div>
  );
}

export default App;
