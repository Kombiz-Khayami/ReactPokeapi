import { useState } from 'react';
import React from 'react';
import pokemonMoves from './pokemonMoves';

function MakeTable(props){
    const [currSortDirection, setSort] = useState("up");
    const [sortCategory, setSortCategory] = useState("level_learned_at");
    const [sortBy, setSortBy] = useState("")  //either sort by a Number or String (fnNumber or fnString)
    let [lrtMoves, learnt_method] = [props.lrtMovesProp, props.learntMethodName];


    const sortDirections = {
        up: {
          class: 'sort-up',
          fnNumber: (a, b) => a[sortCategory] - b[sortCategory],
          fnString: (a,b) => {
            var nameA = a[sortCategory].toUpperCase(); // ignore upper and lowercase
            var nameB = b[sortCategory].toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }    
            // names must be equal
            return 0;
          }
        },
        down: {
          class: 'sort-down',
          fnNumber: (a, b) => b[sortCategory] - a[sortCategory],
          fnString: (a, b) => {
            var nameA = a[sortCategory].toUpperCase(); // ignore upper and lowercase
            var nameB = b[sortCategory].toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }
            // names must be equal
            return 0;
          }
        },
        default: {
          class: 'sort',
          fnNumber: (a) => a[sortCategory],
          fnString: (a) =>a[sortCategory]
        }
      };
    


    function handleSortReverse(sortByTemp, sortCategoryTemp) {
        let nextSort;
    
        if (currSortDirection === 'down') nextSort = 'up';
        else if (currSortDirection === 'up') nextSort = 'down';
        setSortBy(sortByTemp);
        setSortCategory(sortCategoryTemp);
        setSort(nextSort);
    }

      
      function makeTable(array, learnt_method) {
        if (array.length === 0) return;
        
    
        if (learnt_method === "Level")
        {
          return(
            <div>
            <h3>Moves learnt by Level up</h3>
            <table>
                <tbody>
                <tr>
                  <th><button onClick={() => handleSortReverse("fnNumber", "level_learned_at")}>Level</button></th>
                  <th><button onClick={() => handleSortReverse("fnString", "name")}>Move</button></th>
                  <th><button onClick={() => handleSortReverse("fnString", "type")}>Type</button> </th>
                  <th><button onClick={() => handleSortReverse("fnString", "damage_class")}>Category</button></th>
                  <th><button onClick={() => handleSortReverse("fnNumber", "power")}>Power</button> </th>
                  <th><button onClick={() => handleSortReverse("fnNumber", "accuracy")}>Accuracy</button></th>
                </tr> 
              {array.sort(sortDirections[currSortDirection][sortBy]).map(val =>{
                return(
                <tr key={pokemonMoves[val.url]["name"]+val.level_learned_at}>
                  <td>{val.level_learned_at}</td>
                  <td>{pokemonMoves[val.url].name}</td>
                  <td className="type-name">
                    <button className={"type-icon type-"+pokemonMoves[val.url].type.toLowerCase()}>
                      {pokemonMoves[val.url].type}
                    </button> 
                  </td>
                  <td>{pokemonMoves[val.url].damage_class}</td>
                  <td>{pokemonMoves[val.url].power <= 0 ? '-' : pokemonMoves[val.url].power}</td>
                  <td>{pokemonMoves[val.url].accuracy <= 0 ? '-' : pokemonMoves[val.url].accuracy }</td>
                </tr>
                );
              })}
              </tbody>
            </table>
          </div>
          );
        }

        return (<div>
        <h3>Moves learnt by {learnt_method}</h3>
          <table>
            <tbody>
              <tr>
                <th><button onClick={() => handleSortReverse("fnString", "name")}>Move</button></th>
                <th><button onClick={() => handleSortReverse("fnString", "type")}>Type</button> </th>
                <th><button onClick={() => handleSortReverse("fnString", "damage_class")}>Category</button></th>
                <th><button onClick={() => handleSortReverse("fnNumber", "power")}>Power</button> </th>
                <th><button onClick={() => handleSortReverse("fnNumber", "accuracy")}>Accuracy</button></th>
              </tr>
            {array.sort(sortDirections[currSortDirection][sortBy]).map(val =>{
              return(
              <tr key={pokemonMoves[val.url].name}>
                <td>{pokemonMoves[val.url].name}</td>
                <td className="type-name">
                  <button className={"type-icon type-"+pokemonMoves[val.url].type.toLowerCase()}>
                    {pokemonMoves[val.url].type}
                  </button> 
                </td>
                <td>{pokemonMoves[val.url].damage_class}</td>
                <td>{pokemonMoves[val.url].power <= 0 ? '-' : pokemonMoves[val.url].power}</td>
                <td>{pokemonMoves[val.url].accuracy <= 0 ? '-' : pokemonMoves[val.url].accuracy}</td>
              </tr>
              );
            })}
            </tbody>
          </table>
        </div>);
      }

      if (lrtMoves <= 0) return (<p>This pokemon doesn't have any egg moves</p>);

      return(
          makeTable(lrtMoves, learnt_method)  
      );

} 

export default MakeTable;