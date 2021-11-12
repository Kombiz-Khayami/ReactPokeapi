import { useEffect, useState } from 'react';
import React from 'react';

function MakeRow(props){
    const axios = require('axios').default;
    const [data2, setData2] = useState(null);
    const baseURL = "https://pokeapi.co/api/v2/move/"+props.move;

    console.log();
    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            console.log(props.move);
          setData2(response.data);
        });
      });

      if (!data2) return null;

      return(
          <>
          <td>{data2.type.name}</td>
          <td>{data2.meta.category.name}</td>          
          <td>{data2.power}</td>
          <td>{data2.accuracy}</td>
          </>
      );

} 

export default MakeRow;