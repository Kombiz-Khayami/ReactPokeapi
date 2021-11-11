import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';
import MakeTable from './MakeTable';
/*
for the table sorting. Make them components. that way you're going to be able to 
change how each individual table operates with out needing to track which table you wanna change
*/

function App() {
  const axios = require('axios').default;
  const [post, setPost] = useState(null);
  const [baseURL, setBaseURL] = useState("https://pokeapi.co/api/v2/pokemon/1")
  const [searchQuery, setSearchQuery] = useState('');
  let [lrtMachien, lrtLevel, lrtEgg, lrtTutor] = [[], [], [], []];
  let newItem = {};


  React.useEffect(() => {
    console.log(baseURL);
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
            lrtEgg.push(val.move.name);
            break;
          case 'machine':
            lrtMachien.push(val.move.name);
            break;
          case 'tutor':
            lrtTutor.push(val.move.name);
            break;
          case 'level-up':                      
            newItem["level_learned_at"] = value.level_learned_at;
            newItem["move_name"] = val.move.name;
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

      <div class="main">
        <div class="grid-row">
          <div>
            <p>{post.name}</p>
            <p> <img src={post.sprites.other['official-artwork'].front_default}></img> </p>
          </div>
          
          <div class="type">
            {post.types.map(val => {
              let name = "type-button type-"+val.type.name;
              return (<>
                <div class="type-name"><button class={name}>{val.type.name}</button> </div>
              </>);
            })}
          </div>
        </div>

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
        
        <div class="grid-row">
          {console.log(lrtEgg)}
          <MakeTable lrtMovesProp={lrtLevel} learntMethodName="Level"/>
          <MakeTable lrtMovesProp={lrtEgg} learntMethodName="Egg"/>
          <MakeTable lrtMovesProp={lrtMachien} learntMethodName="Machien"/>
        </div>



      </div>


    </div>
      </header>
    </div>
  );
}

export default App;
