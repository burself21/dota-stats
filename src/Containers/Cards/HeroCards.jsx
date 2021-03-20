import React from 'react';
import { HeroModal } from '../../Components/Modal/HeroModal';
import styles from './HeroCards.module.css';

import { Grid } from '@material-ui/core';

import agiImg from './agility.png';
import intImg from './intelligence.png';
import strImg from './strength.png';

export const HeroCards = (props) => {

    const heroes = props.heroes.slice(0, props.numCards);
    const agi_heroes = heroes.filter(hero => hero.primary_attr === "agi");
    const int_heroes = heroes.filter(hero => hero.primary_attr === "int");
    const str_heroes = heroes.filter(hero => hero.primary_attr === "str");

    const getAbilities = (name) => {
        //const trimmedName = name.split("npc_dota_hero_").pop();
        //console.log(trimmedName);
        //return Object.keys(props.abilities).filter(ability => ability.indexOf(trimmedName) == 0).map(ability => props.abilities[ability]);
        return props.abilityList[name].abilities.map(ability => props.abilities[ability]);
    }

    return (
        <div className={styles.container}>
            <div className={styles.attr_container} id={styles.agi_container}>
                <h1 className={styles.attr_header} id={styles.agi}> Agility </h1>
                <Grid container spacing={1} justify="center">
                {agi_heroes && agi_heroes.map(hero => 
                    <HeroModal
                        key={hero.id}
                        hero={hero}
                        abilities={getAbilities(hero.name)}
                    />)} 
                </Grid>
                <hr/>
            </div>

            <div className={styles.attr_container} id={styles.int_container}>
                <h1 className={styles.attr_header} id={styles.int}> Intelligence </h1>
                <Grid container spacing={1} justify="center">
                {int_heroes && int_heroes.map(hero => 
                    <HeroModal
                        key={hero.id}
                        hero={hero}
                        abilities={getAbilities(hero.name)}
                    />)} 
                </Grid>
                <hr/>
            </div>

            <div className={styles.attr_container} id={styles.str_container}>
                <h1 className={styles.attr_header} id={styles.str}> Strength </h1>
                <Grid container spacing={1} justify="center">
                {str_heroes && str_heroes.map(hero => 
                    <HeroModal
                        key={hero.id}
                        hero={hero}
                        abilities={getAbilities(hero.name)}
                    />)} 
                </Grid>
                <hr/>
            </div>
            
        </div>
    )
}
