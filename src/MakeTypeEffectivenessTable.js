import { useState } from 'react';
import React from 'react';
import pokemonTypes from './pokemonTypes';

/* 
what is it effective against?
    double damage dealt
    half damage taken
    immune against

what is effective against it?
    double damage taken
    half damage delt
    immune to

*/

function MakeTypeEffectivenessTable(props){
    /*
    damage_dealt : the damage the pokeomon is going to deal to X type
    damage_taken : the damage the pokemon is going to take from X type
    */
let allTypes ={
    grass: {
        damage_dealt:1,
        damage_taken:1
    },
    poison: {
        damage_dealt:1,
        damage_taken:1
    },
    bug: {
        damage_dealt:1,
        damage_taken:1
    },
    flying: {
        damage_dealt:1,
        damage_taken:1
    },
    fairy: {
        damage_dealt:1,
        damage_taken:1
    },
    ghost: {
        damage_dealt:1,
        damage_taken:1
    },
    fire: {
        damage_dealt:1,
        damage_taken:1
    },
    fighting: {
        damage_dealt:1,
        damage_taken:1
    },
    normal: {
        damage_dealt:1,
        damage_taken:1
    },
    ground: {
        damage_dealt:1,
        damage_taken:1
    },
    psychic: {
        damage_dealt:1,
        damage_taken:1
    },
    dragon: {
        damage_dealt:1,
        damage_taken:1
    },
    dark: {
        damage_dealt:1,
        damage_taken:1
    },
    steel: {
        damage_dealt:1,
        damage_taken:1
    },
    electric: {
        damage_dealt:1,
        damage_taken:1
    },
    water: {
        damage_dealt:1,
        damage_taken:1
    },
    ice: {
        damage_dealt:1,
        damage_taken:1
    },
    rock: {
        damage_dealt:1,
        damage_taken:1
    }
}
    props.types.map(value => {
        pokemonTypes[value.type.name.toLowerCase()].damage_relations.double_damage_to.map(   //grab type details based on what type the pokemon is
            val => {
                allTypes[val.name].damage_dealt *=2;
        });
        pokemonTypes[value.type.name.toLowerCase()].damage_relations.half_damage_to.map(     //grab type details based on what type the pokemon is
            val => {
                allTypes[val.name].damage_dealt *=0.5;
        });
    })

      return(<>
          
        <table>
            <tbody>
                <tr>
                    <td>Nor</td>
                    <td>Fir</td>
                    <td>Wat</td>
                    <td>Ele</td>
                    <td>Gra</td>
                    <td>Ice</td>
                    <td>Fig</td>
                    <td>Poi</td>
                    <td>Gro</td>
                </tr>
                <tr>
                    <td>{allTypes.normal.damage_dealt}</td>
                    <td>{allTypes.fire.damage_dealt}</td>
                    <td>{allTypes.water.damage_dealt}</td>
                    <td>{allTypes.fighting.damage_dealt}</td>
                    <td>{allTypes.electric.damage_dealt}</td>
                    <td>{allTypes.grass.damage_dealt}</td>
                    <td>{allTypes.ice.damage_dealt}</td>
                    <td>{allTypes.poison.damage_dealt}</td>
                    <td>{allTypes.ground.damage_dealt}</td>
                </tr>
            </tbody>
        </table> 

        <table>
            <tbody>
                <tr>
                    <td>Fly</td>
                    <td>Psy</td>
                    <td>Bug</td>
                    <td>Roc</td>
                    <td>Gho</td>
                    <td>Dra</td>
                    <td>Dar</td>
                    <td>Ste</td>
                    <td>Fai</td>
                </tr>
                <tr>
                    <td>{allTypes.flying.damage_dealt}</td>
                    <td>{allTypes.psychic.damage_dealt}</td>
                    <td>{allTypes.bug.damage_dealt}</td>
                    <td>{allTypes.rock.damage_dealt}</td>
                    <td>{allTypes.ghost.damage_dealt}</td>
                    <td>{allTypes.dragon.damage_dealt}</td>
                    <td>{allTypes.ghost.damage_dealt}</td>
                    <td>{allTypes.steel.damage_dealt}</td>
                    <td>{allTypes.fairy.damage_dealt}</td>                   
                </tr>
            </tbody>
        </table> 
      </>);

} 

export default MakeTypeEffectivenessTable;