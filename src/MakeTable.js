import { useState } from 'react';
import React from 'react';

function MakeTable(props){
    const [currSort, setSort] = useState("up");
    const [sortType, setSortType] = useState("level_learned_at");
    const [sortBy, setSortBy] = useState("")
    let [lrtMoves, learnt_method] = [props.lrtMovesProp, props.learntMethodName];

    console.log("as the tides ebb and flow. So to does life finds a way.");

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
              </tr>
            {array.sort(sortTypes[currSort].fnNumber).map(val =>{
              return(
              <tr>
                <td>{val.level_learned_at}</td>
                <td>{val.move_name}</td>
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
            </tr>
          {array.map(val =>{
            return(
            <tr>
              <td>{val}</td>
            </tr>
            );
          })}
          </table>
        </div>);
      }

      return(
          makeTable(lrtMoves, learnt_method)  
      );

} 

export default MakeTable;