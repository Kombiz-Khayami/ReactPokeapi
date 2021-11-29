import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';
import MakeTable from './MakeTable';
import MakeTypeEffectivenessTable from './MakeTypeEffectivenessTable';
import pokemonMoves from './pokemonMoves';

function App() {
  const axios = require('axios').default;
  const [post, setPost] = useState(null);
  const [baseURL, setBaseURL] = useState("https://pokeapi.co/api/v2/pokemon/1")
  const [searchQuery, setSearchQuery] = useState('');
  let [lrtMachien, lrtLevel, lrtEgg, lrtTutor] = [[], [], [], []];
  let newItem = {};
  let moveID = 0;
  let inches, feet, meters = 0;
  let kg, pounds = 0;

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, [baseURL]);

  if (!post) return null;



  meters = post.height/10;
  feet = Math.floor((post.height*3.937).toFixed(0)/12);
  inches = (post.height*3.937).toFixed(0)%12;

  kg = post.weight/10;
  pounds = (kg*2.205).toFixed(1);


  post.moves.map(val => {
    val.version_group_details.map(value => {
      if (value.version_group.name === "sun-moon") {
        switch (value.move_learn_method.name) {
          case 'egg':
            moveID = val.move.url.split('/')[6];
            newItem["name"] = pokemonMoves[moveID].name 
            newItem["type"] = pokemonMoves[moveID].type 
            newItem["damage_class"] = pokemonMoves[moveID].damage_class 
            newItem["power"] = pokemonMoves[moveID].power 
            newItem["accuracy"] = pokemonMoves[moveID].accuracy 

            newItem["url"] = val.move.url.split('/')[6];
            lrtEgg.push(newItem);
            newItem = [];
            break;
          case 'machine':
            moveID = val.move.url.split('/')[6];
            newItem["name"] = pokemonMoves[moveID].name 
            newItem["type"] = pokemonMoves[moveID].type 
            newItem["damage_class"] = pokemonMoves[moveID].damage_class 
            newItem["power"] = pokemonMoves[moveID].power 
            newItem["accuracy"] = pokemonMoves[moveID].accuracy 

            newItem["url"] = val.move.url.split('/')[6];
            lrtMachien.push(newItem);
            newItem = [];
            break;
          case 'tutor':
            moveID = val.move.url.split('/')[6];
            newItem["name"] = pokemonMoves[moveID].name 
            newItem["type"] = pokemonMoves[moveID].type 
            newItem["damage_class"] = pokemonMoves[moveID].damage_class 
            newItem["power"] = pokemonMoves[moveID].power 
            newItem["accuracy"] = pokemonMoves[moveID].accuracy

            newItem["url"] = val.move.url.split('/')[6];
            lrtTutor.push(newItem);
            newItem = [];
            break;
          case 'level-up':
            moveID = val.move.url.split('/')[6]; 
            newItem["level_learned_at"] = value.level_learned_at;
            newItem["name"] = pokemonMoves[moveID].name 
            newItem["type"] = pokemonMoves[moveID].type 
            newItem["damage_class"] = pokemonMoves[moveID].damage_class 
            newItem["power"] = pokemonMoves[moveID].power 
            newItem["accuracy"] = pokemonMoves[moveID].accuracy 

            //newItem["move_name"] = val.move.name;
            newItem["url"] = val.move.url.split('/')[6];
            lrtLevel.push(newItem);
            newItem = [];
            break;
        };
      }
    })
  })

  // post.sprites.versions.map(val => {
    
  // })




  function handleSearch() {
    if (searchQuery == "") return; 
    setBaseURL("https://pokeapi.co/api/v2/pokemon/" + searchQuery);
       
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

      <div class="main">
        <div class="grid-row">
          <div>
            <p class="pokemon-name">{post.name}</p>
            <div class="type">
              {post.types.map(val => {
                let name = "type-icon type-"+val.type.name;
                return (<>
                  <div class="type-name"><button class={name}>{val.type.name}</button> </div>
                </>);
              })}
            </div>
            <p> <img src={post.sprites.other['official-artwork'].front_default}></img> </p>
            <div class="grid-row">
              <div>
                {post.stats.map(val => {
                  return (<>
                  <div class="stats">
                    <div class="stat-name">{val.stat.name} </div>
                    <div class="stat" > {val.base_stat} </div> 
                  </div>
                  </>);
                })}
              </div>
            </div>
          </div>
            <div>
              <MakeTypeEffectivenessTable types={post.types}/>
              <div>
                <h3>Average Height</h3>
                <p>{meters}m ({feet}'{inches})</p>
                <h3>Average Weight</h3>
                <p>{kg}kg {pounds}lbs</p>
                <h3>Abilities</h3>
                {post.abilities.map(val => {
                  if (!val.is_hidden)  return <p>{val.ability.name}</p>
                  return <small class="hidden_ability" >{val.ability.name} (hidden)</small>
                })}
              </div>
            </div>
            <div class="grid-row">
              <MakeTable lrtMovesProp={lrtLevel} learntMethodName="Level"/>
              <MakeTable lrtMovesProp={lrtEgg} learntMethodName="Egg"/>
              <MakeTable lrtMovesProp={lrtMachien} learntMethodName="Machien"/>
            </div>
          <div>
            <h3>Sprites</h3>
            <table>
              <tr>
                <th>Type</th>
                <th>Generation 1</th>
                <th>Generation 2</th>
                <th>Generation 3</th>
                <th>Generation 4</th>
                <th>Generation 5</th>
                <th>Generation 6</th>
                <th>Generation 7</th>
              </tr>
            <tr>
              <td>Normal</td>
              <td><img src={post.sprites.versions["generation-i"]["red-blue"].front_gray}></img></td>
              <td><img src={post.sprites.versions["generation-ii"].silver.front_default}></img></td>
              <td><img src={post.sprites.versions["generation-iii"]["ruby-sapphire"].front_default}></img></td>
              <td><img src={post.sprites.versions["generation-iv"]["diamond-pearl"].front_default}></img></td>
              <td><img src={post.sprites.versions["generation-v"]["black-white"].front_default}></img></td>
              <td><img src={post.sprites.versions["generation-vi"]["x-y"].front_default}></img></td>
              <td><img src={post.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default}></img></td>
            </tr>
            <tr>
              <td>Shiny</td>
              <td>--</td>
              <td><img src={post.sprites.versions["generation-ii"].silver.front_shiny}></img></td>
              <td><img src={post.sprites.versions["generation-iii"]["ruby-sapphire"].front_shiny}></img></td>
              <td><img src={post.sprites.versions["generation-iv"]["diamond-pearl"].front_shiny}></img></td>
              <td><img src={post.sprites.versions["generation-v"]["black-white"].front_shiny}></img></td>
              <td><img src={post.sprites.versions["generation-vi"]["x-y"].front_shiny}></img></td>
              <td><img src={post.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_shiny}></img></td>
            </tr>
            </table>
          </div>
        </div>
      </div>


    </div>
      </header>
    </div>
  );
}

export default App;
