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
        name:"",
        damage_taken:100
    },
    poison: {
        name:"",
        damage_taken:100
    },
    bug: {
        name:"",
        damage_taken:100
    },
    flying: {
        name:"",
        damage_taken:100
    },
    fairy: {
        name:"",
        damage_taken:100
    },
    ghost: {
        name:"",
        damage_taken:100
    },
    fire: {
        name:"",
        damage_taken:100
    },
    fighting: {
        name:"",
        damage_taken:100
    },
    normal: {
        name:"",
        damage_taken:100
    },
    ground: {
        name:"",
        damage_taken:100
    },
    psychic: {
        name:"",
        damage_taken:100
    },
    dragon: {
        name:"",
        damage_taken:100
    },
    dark: {
        name:"",
        damage_taken:100
    },
    steel: {
        name:"",
        damage_taken:100
    },
    electric: {
        name:"",
        damage_taken:100
    },
    water: {
        name:"",
        damage_taken:100
    },
    ice: {
        name:"",
        damage_taken:100
    },
    rock: {
        name:"",
        damage_taken:100
    }
}
    props.types.map(value => {
        pokemonTypes[value.type.name.toLowerCase()].damage_relations.double_damage_from.map(   //grab type details based on what type the pokemon is
            val => {
                allTypes[val.name].damage_taken *=2;
                allTypes[val.name].name = "cell-"+allTypes[val.name].damage_taken;
        });
        pokemonTypes[value.type.name.toLowerCase()].damage_relations.half_damage_from.map(     //grab type details based on what type the pokemon is
            val => {
                allTypes[val.name].damage_taken *=0.5;
                allTypes[val.name].name = "cell-"+allTypes[val.name].damage_taken;
        });
        pokemonTypes[value.type.name.toLowerCase()].damage_relations.no_damage_from.map(     //grab type details based on what type the pokemon is
            val => {
                allTypes[val.name].damage_taken *=0;
                allTypes[val.name].name = "cell-"+allTypes[val.name].damage_taken;
        });
    })



      return(<>
        <div class="type-tables">
            <th>Damage Taken</th>
            <table>
                <tbody>
                    <tr>
                        <td class ="type-icon type-normal">Nor</td>
                        <td class ="type-icon type-fire">Fir</td>
                        <td class ="type-icon type-water">Wat</td>
                        <td class ="type-icon type-electric">Ele</td>
                        <td class ="type-icon type-grass">Gra</td>
                        <td class ="type-icon type-ice">Ice</td>
                        <td class ="type-icon type-fighting">Fig</td>
                        <td class ="type-icon type-poison">Poi</td>
                        <td class ="type-icon type-ground">Gro</td>
                        <td class ="type-icon type-fly">Fly</td>
                        <td class ="type-icon type-psychic">Psy</td>
                        <td class ="type-icon type-bug">Bug</td>
                        <td class ="type-icon type-rock">Roc</td>
                        <td class ="type-icon type-ghost">Gho</td>
                        <td class ="type-icon type-dragon">Dra</td>
                        <td class ="type-icon type-dark">Dar</td>
                        <td class ="type-icon type-steel">Ste</td>
                        <td class ="type-icon type-fairy">Fai</td>
                    </tr>
                    <tr>
                        <td class={allTypes.normal.name}>{allTypes.normal.damage_taken/100}</td>
                        <td class={allTypes.fire.name}>{allTypes.fire.damage_taken/100}</td>
                        <td class={allTypes.water.name}>{allTypes.water.damage_taken/100}</td>
                        <td class={allTypes.electric.name}>{allTypes.electric.damage_taken/100}</td>
                        <td class={allTypes.grass.name}>{allTypes.grass.damage_taken/100}</td>
                        <td class={allTypes.ice.name}>{allTypes.ice.damage_taken/100}</td>
                        <td class={allTypes.fighting.name}>{allTypes.fighting.damage_taken/100}</td>
                        <td class={allTypes.poison.name}>{allTypes.poison.damage_taken/100}</td>
                        <td class={allTypes.ground.name} >{allTypes.ground.damage_taken/100}</td>
                        <td class={allTypes.flying.name}>{allTypes.flying.damage_taken/100}</td>
                        <td class={allTypes.psychic.name}>{allTypes.psychic.damage_taken/100}</td>
                        <td class={allTypes.bug.name}>{allTypes.bug.damage_taken/100}</td>
                        <td class={allTypes.rock.name}>{allTypes.rock.damage_taken/100}</td>
                        <td class={allTypes.ghost.name}>{allTypes.ghost.damage_taken/100}</td>
                        <td class={allTypes.dragon.name}>{allTypes.dragon.damage_taken/100}</td>
                        <td class={allTypes.dark.name}>{allTypes.dark.damage_taken/100}</td>
                        <td class={allTypes.steel.name}>{allTypes.steel.damage_taken/100}</td>
                        <td class={allTypes.fairy.name}>{allTypes.fairy.damage_taken/100}</td>                   
                    </tr>
                </tbody>
            </table> 
        </div>
      </>);

} 

export default MakeTypeEffectivenessTable;