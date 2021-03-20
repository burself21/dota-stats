import React from 'react';

import styles from './HeroCard.module.css';

import { Card, CardContent, Grid, Typography } from "@material-ui/core";
//import cx from 'classnames';
// images
import agility from './agility.png';
import intelligence from './intelligence.png';
import strength from './strength.png';

import { AbilityTooltip } from '../Tooltip/AbilityTooltip';

export const HeroCard = React.forwardRef((props, ref) => {
    const 
        { 
            localized_name : name, 
            id, 
            img : imgStem,
            primary_attr,
            attack_type,
            base_str,
            base_agi,
            base_int,
            str_gain,
            agi_gain,
            int_gain,
            move_speed,

        } = props.hero;

    const heroImg = name === "Drow Ranger" ? "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/80/Drow_Ranger_icon.png" : `https://api.opendota.com${imgStem}`
    
    const abilities = props.abilities.filter(ability => ability.attrib.length > 0 && (ability.behavior === undefined || !ability.behavior.includes("Hidden")));
    
    const containerClass = abilities.length === 4 ? styles.container_4 : (abilities.length === 5 ? styles.container_5 : styles.container_6);
    const imgContainerClass = abilities.length === 4 ? styles.img_container_4 : 
        (abilities.length === 5 ? styles.img_container_5 : styles.img_container_6);
    
    return (
        <Card align="center" className={containerClass}>
            <CardContent className={styles.container_content}>
                <div className={styles.hero}>
                    
                    
                    <div className={styles.hero__img}>
                        <img src={heroImg} alt="" width="192" height="108"/>
                    </div>
                    
                    <div className={styles.hero__name}>
                        <Typography>{name}</Typography>
                    </div>
                    <div className={styles.hero__attrs}>
                        <Grid container spacing={1} justify="center">
                            <Grid item align="center">
                            <figure className={styles.hero__attr}>
                                <img src={agility}  alt=""/>
                                <figcaption className={styles.attr_growth}>{base_agi} + {agi_gain}</figcaption>
                            </figure>
                            </Grid>
                            <Grid item align="center">
                            <figure className={styles.hero__attr}>
                                <img src={intelligence}  alt=""/>
                                <figcaption className={styles.attr_growth}>{base_int} + {int_gain}</figcaption>
                            </figure>
                            </Grid>
                            <Grid item align="center">
                            <figure className={styles.hero__attr}>
                                <img src={strength}  alt=""/>
                                <figcaption className={styles.attr_growth}>{base_str} + {str_gain}</figcaption>
                            </figure>
                            </Grid>
                        </Grid>
                    </div>

                    <div className={styles.abilities}>
                        <h2> Abilities </h2>
                        <Grid container spacing={2} justify="center" className={styles.ability_grid}>
                            {abilities && [...Array(abilities.length).keys()].map(id => 
                                <Grid item align="center" key={id} className={imgContainerClass}>
                                    <AbilityTooltip 
                                        ability={abilities[id]} 
                                        num_abilities={abilities.length} 
                                        side={id - (abilities.length - 1) / 2}
                                    />
                                </Grid>
                            )}
                            
                        </Grid>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
});