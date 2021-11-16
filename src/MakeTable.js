import { useState } from 'react';
import React from 'react';
import pokemonMoves from './pokemonMoves';
import pokemonTypes from './pokemonTypes';

function MakeTable(props){
    const [currSort, setSort] = useState("up");
    const [sortType, setSortType] = useState("level_learned_at");
    const [sortBy, setSortBy] = useState("")
    let [lrtMoves, learnt_method] = [props.lrtMovesProp, props.learntMethodName];


    const sortTypes = {
        up: {
          class: 'sort-up',
          fnNumber: (a, b) => a[sortBy] - b[sortBy],
          fnString: (a,b) => {
            var nameA = a[sortBy].toUpperCase(); // ignore upper and lowercase
            var nameB = b[sortBy].toUpperCase(); // ignore upper and lowercase
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
          fnNumber: (a, b) => b[sortBy] - a[sortBy],
          fnString: (a, b) => {
            var nameA = a[sortBy].toUpperCase(); // ignore upper and lowercase
            var nameB = b[sortBy].toUpperCase(); // ignore upper and lowercase
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
          fnNumber: (a) => a[sortBy],
          fnString: (a) =>a[sortBy]
        }
      };
    


    function handleSortReverse(sortByTemp, sortTypeTemp) {
        let nextSort;
    
        if (currSort === 'down') nextSort = 'up';
        else if (currSort === 'up') nextSort = 'down';
        setSortBy(sortByTemp);
        setSortType(sortTypeTemp);
        setSort(nextSort);
    }

      
      function makeTable(array, learnt_method) {
        if (array.length === 0) {
          return;
        }
    
        if (learnt_method === "Level")
        {
          return(
            <div>
            <button onClick={() => handleSortReverse(sortBy, sortType)}>Sort by Level</button> 
            <button onClick={() => handleSortReverse(sortBy, sortType)}>Sort by Move Name</button> 
            <h3>Moves learnt by Level up</h3>
            <table>
              <tr>
                <th>Level</th>
                <th>Move</th>
                <th>Type</th>
                <th>Category</th>
                <th>Power</th>
                <th>Accuracy</th>
              </tr>
            {array.sort(sortTypes[currSort].fnNumber).map(val =>{
              return(
              <tr>
                <td>{val.level_learned_at}</td>
                <td>{pokemonMoves[val.url].name}</td>
                <div class="type-name">
                  <button class={"type-icon type-"+pokemonMoves[val.url].type.toLowerCase()}>
                    {pokemonMoves[val.url].type}
                  </button> 
                </div>
                <td>{pokemonMoves[val.url].damage_class}</td>
                <td>{pokemonMoves[val.url].power}</td>
                <td>{pokemonMoves[val.url].accuracy}</td>
              </tr>
              );
            })}
            </table>
          </div>
          );
        }
        return (<div>
        <h3>Moves learnt by {learnt_method}</h3>
          <table>
            <tr>
              <th>Move</th>
              <th>Type</th>
              <th>Category</th>
              <th>Power</th>
              <th>Accuracy</th>
            </tr>
          {array.map(val =>{
            return(
            <tr>
              <td>{pokemonMoves[val.url].name}</td>
              <div class="type-name">
                <button class={"type-icon type-"+pokemonMoves[val.url].type.toLowerCase()}>
                  {pokemonMoves[val.url].type}
                </button> 
              </div>
              <td>{pokemonMoves[val.url].damage_class}</td>
              <td>{pokemonMoves[val.url].power}</td>
              <td>{pokemonMoves[val.url].accuracy}</td>
            </tr>
            );
          })}
          </table>
        </div>);
      }

      if (lrtMoves <= 0)
        return (<p>This pokemon doesn't have any egg moves</p>);

      return(
          makeTable(lrtMoves, learnt_method)  
      );

} 

export default MakeTable;