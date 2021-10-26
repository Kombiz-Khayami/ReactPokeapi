import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';

let baseURL = "https://pokeapi.co/api/v2/pokemon/12";

function App() {
  const axios = require('axios').default;
  const [post, setPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  function handleSearch() {
    baseURL = "https://pokeapi.co/api/v2/pokemon/" + searchQuery;
    console.log(baseURL);
    axios.get(baseURL).then((response)=> {
      setPost(response.data);
    });
  }

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        
        <input
            type="text"
            id="header-search"
            placeholder="Search Pokemon"
            name="s" 
            onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
    {typeof post}
        {/* {Object.entries(post).map((val) => {
          if(typeof(val) === "object"){
            for (const [key, value] of Object.entries(val)) {
              return <div> {key} : {value} </div>
            }
          }
          else if (typeof(val) === "array"){
            for (const [key, value] of val) {
              return <div> {key} : {value} </div>
            }
          }
          else
            return <div key={val.name}>{val.name}</div>
        })} */}


      {Object.values(post.sprites).map(val => {
        if (typeof val === "object") {
          return <p> {typeof val} </p>
        }
        else
          return <p><img src={val} /></p>
      })}

    </div>
      </header>
    </div>
  );
}

export default App;
