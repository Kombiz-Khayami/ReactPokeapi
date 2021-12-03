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
damage_taken : the damage the pokemon is going to take from X type
*/
let allTypes ={
    normal: {
        name:"",
        damage_taken:100
    },
    fire: {
        name:"",
        damage_taken:100
    },
    water: {
        name:"",
        damage_taken:100
    },
    electric: {
        name:"",
        damage_taken:100
    },
    grass: {
        name:"",
        damage_taken:100
    },
    ice: {
        name:"",
        damage_taken:100
    },
    fighting: {
        name:"",
        damage_taken:100
    },
    poison: {
        name:"",
        damage_taken:100
    },
    ground: {
        name:"",
        damage_taken:100
    },
    flying: {
        name:"",
        damage_taken:100
    },
    psychic: {
        name:"",
        damage_taken:100
    },
    bug: {
        name:"",
        damage_taken:100
    },
    rock: {
        name:"",
        damage_taken:100
    },
    ghost: {
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
    fairy: {
        name:"",
        damage_taken:100
    }
}
    props.types.forEach(value => {
        pokemonTypes[value.type.name.toLowerCase()].damage_relations.double_damage_from.forEach(   //grab type details based on what type the pokemon is
            val => {
                allTypes[val.name].damage_taken *=2;
                allTypes[val.name].name = "cell-"+allTypes[val.name].damage_taken;
        });

        pokemonTypes[value.type.name.toLowerCase()].damage_relations.half_damage_from.forEach(     //grab type details based on what type the pokemon is
            val => {
                allTypes[val.name].damage_taken *=0.5;
                allTypes[val.name].name = "cell-"+allTypes[val.name].damage_taken;
        });

        pokemonTypes[value.type.name.toLowerCase()].damage_relations.no_damage_from.forEach(     //grab type details based on what type the pokemon is
            val => {
                allTypes[val.name].damage_taken *=0;
                allTypes[val.name].name = "cell-"+allTypes[val.name].damage_taken;
        });
    })



      return(<>
            <h4>Damage Taken</h4>
            <table>
                <tbody>
                    <tr>
                        <th className ="type-icon type-normal">Nor</th>
                        <th className ="type-icon type-fire">Fir</th>
                        <th className ="type-icon type-water">Wat</th>
                        <th className ="type-icon type-electric">Ele</th>
                        <th className ="type-icon type-grass">Gra</th>
                        <th className ="type-icon type-ice">Ice</th>
                        <th className ="type-icon type-fighting">Fig</th>
                        <th className ="type-icon type-poison">Poi</th>
                        <th className ="type-icon type-ground">Gro</th>
                        <th className ="type-icon type-fly">Fly</th>
                        <th className ="type-icon type-psychic">Psy</th>
                        <th className ="type-icon type-bug">Bug</th>
                        <th className ="type-icon type-rock">Roc</th>
                        <th className ="type-icon type-ghost">Gho</th>
                        <th className ="type-icon type-dragon">Dra</th>
                        <th className ="type-icon type-dark">Dar</th>
                        <th className ="type-icon type-steel">Ste</th>
                        <th className ="type-icon type-fairy">Fai</th>
                    </tr>
                    <tr>
                        {Object.entries(allTypes).map(([key, value]) => {

                        return(<td className={value.name} key={key}>{value.damage_taken/100}</td>);

                        })}
                    </tr>
                </tbody>
            </table> 
      </>);

} 

export default MakeTypeEffectivenessTable;