import { useState } from 'react';
import React from 'react';

function MakeTable(props){
    const [currSort, setSort] = useState("up");
    const [sortType, setSortType] = useState("level_learned_at");
    let [lrtMoves, learnt_method] = [props.lrtMovesProp, props.learntMethodName];

    console.log("as the tides ebb and flow. So to does life finds a way.");

    const sortTypes = {
        up: {
          class: 'sort-up',
          fnNumber: (a, b) => a[sortType] - b[sortType],
          fnString: (a ,b) =>a[sortType] - b[sortType]
        },
        down: {
          class: 'sort-down',
          fnNumber: (a, b) => b[sortType] - a[sortType],
          fnString: (a ,b) =>a[sortType] - b[sortType]
        },
        default: {
          class: 'sort',
          fnNumber: (a, b) => a[sortType],
          fnString: (a ,b) =>a[sortType] - b[sortType]
        }
      };


    function handleSortReverse() {
		let nextSort;

		if (currSort === 'down') nextSort = 'up';
		else if (currSort === 'up') nextSort = 'down';
        setSortType("level_learned_at");
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
            <button onClick={handleSortReverse}>Sort by Level</button> 
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