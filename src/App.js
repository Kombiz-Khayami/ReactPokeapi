import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';


function App() {
  const axios = require('axios').default;
  const [post, setPost] = useState(null);
  const [baseURL, setBaseURL] = useState("https://pokeapi.co/api/v2/pokemon/1")
  const [searchQuery, setSearchQuery] = useState('');
  let [lrtMachien, lrtLevel, lrtEgg, lrtTutor] = [[], [], [], []];
  let test = {};

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


  function makeTable(array) {
    if (array.length === 0) {
      return;
    }
    return (<div>
    <h3>Moves learnt by Egg</h3>
      <table>
        <tr>
          <th>Move</th>
        </tr>
      {lrtEgg.map(val =>{
        return(
        <tr>
          <td>{val}</td>
        </tr>
        );
      })}
      </table>
    </div>);
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
        <div>
          <p>{post.name}</p>
          <p> <img src={post.sprites.other['official-artwork'].front_default}></img> </p>
        </div>

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


        <div>
          {post.moves.map(val => {
            return (<>
              {val.version_group_details.map(value => {
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
                      test["level_learned_at"] = value.level_learned_at;
                      test["move_name"] = val.move.name;
                      lrtLevel.push(test);
                      test = [];
                      break;
                  };
                }
              })}
            </>
            );
          })}
        </div>
      
      <div>
        <h3>Moves learnt by level up</h3>
        <table>
          <tr>
            <th>Move</th>
            <th>Level</th>
          </tr>
        {lrtLevel.map(val =>{
          return(
          <tr>
            <td>{val.move_name}</td>
            <td>{val.level_learned_at}</td>
          </tr>
          );
        })}
        </table>
      </div>


{makeTable(lrtEgg)}

      <div>
      <h3>Moves learnt by Machien</h3>
        <table>
          <tr>
            <th>Move</th>
          </tr>
        {lrtMachien.map(val =>{
          return(
          <tr>
            <td>{val}</td>
          </tr>
          );
        })}
        </table>
      </div>


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
      </header>
    </div>
  );
}

export default App;
