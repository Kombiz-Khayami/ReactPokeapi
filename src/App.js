import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';

// let baseURL = "https://pokeapi.co/api/v2/pokemon/12";

function App() {
  const axios = require('axios').default;
  const [post, setPost] = useState(null);
  const [baseURL, setBaseURL] = useState("https://pokeapi.co/api/v2/pokemon/12")
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    console.log("hello");
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, [baseURL]);

  // React.useEffect(() => handleSearch(), [searchQuery])

  if (!post) return null;

  function handleSearch() {
    setBaseURL("https://pokeapi.co/api/v2/pokemon/" + searchQuery);

     console.log(baseURL);
    // axios.get(baseURL).then((response)=> {
    //   setPost(response.data);
    // });
  }

  function handleChange(event) {
    console.log(typeof event.target.value);
    setSearchQuery(event.target.value.toLowerCase());
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        
        <input type="text" placeholder="Search Pokemon" onChange={handleChange}/>
        <button onClick={handleSearch}>Search</button>

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
