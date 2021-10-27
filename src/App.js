import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';


function App() {
  const axios = require('axios').default;
  const [post, setPost] = useState(null);
  const [baseURL, setBaseURL] = useState("https://pokeapi.co/api/v2/pokemon/1")
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    console.log(baseURL);
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, [baseURL]);


  if (!post) return null;

  function handleSearch() {
    if (searchQuery != "") {
      setBaseURL("https://pokeapi.co/api/v2/pokemon/" + searchQuery);
    }
    
  }

  function handleChange(event) {
    setSearchQuery(event.target.value.toLowerCase());
  }

  function testRecursion(value1){
    return Object.values(value1).map(val => {
      if ( typeof val === "object" && val != null) {
        return testRecursion(val);
      }
      else if(val !=null) {
        console.log(val);
        return <p> <img src={val} /> </p>;
      }
      else 
        return <p>--</p>;
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        
        <input type="text" placeholder="Search Pokemon" onChange={handleChange}/>
        <button onClick={handleSearch}>Search</button>

      {<p>{post.name}</p>}
      {<p><a herf={post.species.url}>{post.name}</a></p>}
      {<p> <img src={post.sprites.other['official-artwork'].front_default}></img> </p>}
      

    </div>
      </header>
    </div>
  );
}

export default App;
