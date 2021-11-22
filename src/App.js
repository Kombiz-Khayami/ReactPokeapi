import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';
import MakeTable from './MakeTable';
import MakeTypeEffectivenessTable from './MakeTypeEffectivenessTable';

function App() {
  const axios = require('axios').default;
  const [post, setPost] = useState(null);
  const [baseURL, setBaseURL] = useState("https://pokeapi.co/api/v2/pokemon/1")
  const [searchQuery, setSearchQuery] = useState('');
  let [lrtMachien, lrtLevel, lrtEgg, lrtTutor] = [[], [], [], []];
  let newItem = {};


  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, [baseURL]);

  if (!post) return null;


  post.moves.map(val => {
    val.version_group_details.map(value => {
      if (value.version_group.name === "sun-moon") {
        switch (value.move_learn_method.name) {
          case 'egg':
            newItem["url"] = val.move.url.split('/')[6];
            lrtEgg.push(newItem);
            newItem = [];
            break;
          case 'machine':
            newItem["url"] = val.move.url.split('/')[6];
            lrtMachien.push(newItem);
            newItem = [];
            break;
          case 'tutor':
            newItem["url"] = val.move.url.split('/')[6];
            lrtTutor.push(newItem);
            newItem = [];
            break;
          case 'level-up': 
            newItem["level_learned_at"] = value.level_learned_at;
            newItem["move_name"] = val.move.name;
            newItem["url"] = val.move.url.split('/')[6];
            lrtLevel.push(newItem);
            newItem = [];
            break;
        };
      }
    })
  })

  lrtLevel.sort((a,b) => {
    return a.level_learned_at - b.level_learned_at;
  })



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
            <p>{post.name}</p>
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
            <div class="grid-row">
              <MakeTable lrtMovesProp={lrtLevel} learntMethodName="Level"/>
              <MakeTable lrtMovesProp={lrtEgg} learntMethodName="Egg"/>
              <MakeTable lrtMovesProp={lrtMachien} learntMethodName="Machien"/>
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
