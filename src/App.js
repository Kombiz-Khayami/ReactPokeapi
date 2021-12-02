import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';
import MakeTable from './MakeTable';
import MakeTypeEffectivenessTable from './MakeTypeEffectivenessTable';
import pokemonMoves from './pokemonMoves';

function App() {
  const [post, setPost] = useState(null);
  const [baseURL, setBaseURL] = useState("https://pokeapi.co/api/v2/pokemon/1")
  const [searchQuery, setSearchQuery] = useState('');
  let [lrtMachien, lrtLevel, lrtEgg, lrtTutor] = [[], [], [], []];
  let newItem = {};
  let moveID = 0;
  let inches, feet, meters = 0;
  let kg, pounds = 0;

  React.useEffect(() => {
    const axios = require('axios').default;
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


  post.moves.forEach(val => {
    val.version_group_details.forEach(value => {
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
          default:
            console.log("No moves");
        };
      }
    })
  })

  // post.sprites.versions.map(val => {
    
  // })




  function handleSearch() {
    if (searchQuery === "") return; 
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
        return <p> <img src={val} alt="Art work of the Pokemon" /> </p>;
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

      <div className="main">
        <div className="nav-bar-pokedex">
          <button>Moves</button>
          <button>Type effectiveness</button>
          <button>Stats</button>
        </div>
        <div className="grid-row display-box">
          <div>
              <div className="name-image-display">
                <p className="pokemon-name">{post.name}</p>
                <div className="type">
                  {post.types.map(val => {
                    let name = "type-icon type-"+val.type.name;
                    return (
                    <div className="type-name" key={val.type.name}>
                      <button className={name} >{val.type.name}</button> 
                    </div>
                    );
                  })}
                </div>
                <p> <img src={post.sprites.other['official-artwork'].front_default} alt="Offical artwork of the Pokemon"></img> </p>
              </div>
              <div className="grid-row">
                <div>
                  <h3>Average Height</h3>
                  <p>{meters}m ({feet}'{inches})</p>
                  <h3>Average Weight</h3>
                  <p>{kg}kg {pounds}lbs</p>
                  <h3>Abilities</h3>
                  {post.abilities.map(val => {
                    if (!val.is_hidden)  return <p key={val.ability.name}>{val.ability.name}</p>
                    return <small className="hidden_ability" key={val.ability.name} >{val.ability.name} (hidden)</small>
                  })}
                </div>
              </div>
            </div>


            <div className="display-box-2">
              
              {/* <div>
                  {post.stats.map(val => {
                    return (<>
                    <div className="stats">
                      <div className="stat-name">{val.stat.name} </div>
                      <div className="stat" > {val.base_stat} </div> 
                    </div>
                    </>);
                  })}
              </div>  */}
              <div className="type-tables">
                <MakeTypeEffectivenessTable types={post.types}/>
              </div>
              
            </div>




          </div>
      </div>


    </div>
      </header>
    </div>
  );
}

export default App;

/*
            <div> 
              <MakeTypeEffectivenessTable types={post.types}/>
            </div>
            <div className="grid-row">
              <MakeTable lrtMovesProp={lrtLevel} learntMethodName="Level"/>
              <MakeTable lrtMovesProp={lrtEgg} learntMethodName="Egg"/>
              <MakeTable lrtMovesProp={lrtMachien} learntMethodName="Machien"/>
            </div>
*/


/* <div>
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
 </div>*/
