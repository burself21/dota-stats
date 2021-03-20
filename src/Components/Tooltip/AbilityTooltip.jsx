import React from 'react';

import { withStyles, Tooltip } from '@material-ui/core';

import styles from './AbilityTooltip.module.css';

import cx from 'classnames';

export const AbilityTooltip = (props) => {

    const {

        img: imgStem,
        dname: name,
        desc: description,
        behavior,
        attrib,
        mc,
        cd,
        bkbpierce,
        dmg,
        dmg_type

    } = props.ability

    // clean up props

    const ability_types = Array.isArray(behavior) ? behavior.filter(type => type !== null) : behavior;
    const attributes = attrib
        .filter(attribute => attribute.generated !== true)
        .filter(attribute => attribute.header.slice(0, 7).toLowerCase() !== 'scepter');

    let manacost, cooldown;
    

    if (mc === undefined && cd !== undefined) {
        manacost = ["0"];
        cooldown = cooldown;
    }
    else if (mc !== undefined && cd === undefined) {
        cooldown = ["0"];
        manacost = mc;
    }
    else {
        cooldown = cd;
        manacost = mc;
    }

    let img;
    
    switch(name) {
        case "Tricks of the Trade":
            img = "https://static.wikia.nocookie.net/dota2_gamepedia/images/e/ed/Tricks_of_the_Trade_icon.png";
            break;
        case "Stone Form":
            img = "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/20/Stone_Form_%28Familiar%29_icon.png";
            break;
        case "Terror Wave":
            img = "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/5e/Terror_Wave_icon.png";
            break;
        default:
            img = `https://api.opendota.com${imgStem}`;
            break;
    } 



    const getBehavior = () => {
        let text;
        if (ability_types === undefined)
            text = "No Target";
        else
            text = Array.isArray(ability_types) ? ability_types.join(', ') : ability_types;
        
        return <p className="ability_info"> <span className={styles.attr}>Ability: </span> {text} </p>;
    }

    const getSpellImmunity = () => {
        if (bkbpierce === undefined)
            return null;
        
        const spellImmunityClass = bkbpierce === "Yes" ? styles.spell_immune : styles.non_spell_immune;
        return <p className="ability_info"><span className={styles.attr}>Pierces Spell Immunity: </span><span className={spellImmunityClass}> {bkbpierce} </span></p>;
    }

    const getDmgType = () => {

        if (dmg_type === undefined)
            return null;

        let dmgTypeClass;
        switch(dmg_type) {
            case "Physical": 
                dmgTypeClass = styles.physical;
                break;
            case "Magical":
                dmgTypeClass = styles.magical;
                break;
            case "Pure":
                dmgTypeClass = styles.pure;
                break;
            default:
                dmgTypeClass = styles.magical;
                break;
        }

        return <p className="ability_info"><span className={styles.attr}>Damage Type: </span><span className={dmgTypeClass}> {dmg_type} </span></p>;
    }
    const getManaCostAndCooldown = () => {

        if (manacost === undefined || cooldown === undefined)
            return null;

        return (
            <div className={styles.mc_cd_container}> 
                <p className={styles.manacost}>Mana: {textFormat(manacost)} </p> 
                <p className={styles.cooldown}> {textFormat(cooldown)} </p> 
            </div>
        )
    }

    const getAttributes = () => {

        const damageText = dmg === undefined ? null : (
            <p>
                <span className={cx(styles.attr, styles.ability_info_2)}>Damage: </span>
                <span className={styles.attr_value}> {textFormat(dmg)} </span>
            </p>
        );

        return (
            <React.Fragment>
                {damageText}
                {attributes && [...Array(attributes.length).keys()].map(id => 
                    <p key={id}>
                        <span className={cx(styles.attr, styles.ability_info_2)}>{attributes[id].header} </span>
                        <span className={styles.attr_value}> {textFormat(attributes[id].value)} </span>
                    </p>
                )}
            </React.Fragment>
        );
    }

    const textFormat = (item) => {
        if (Array.isArray(item))
            return item.join(' / ');
        else
            return item;
    }

    console.log(attributes);

    const body = (
        <div className={styles.body_container}>
            <h2 className={styles.ability}> {name} </h2>
            {getBehavior()}
            {getSpellImmunity()} 
            {getDmgType()}
            <p className={cx(styles.ability_info_2, styles.description)}>{description}</p>
            {getAttributes()}
            {getManaCostAndCooldown()}
            
        </div>
    );

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
          backgroundColor: '#111111',
          color: 'white',
          maxWidth: 300,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
          overflow: "hidden"
        },
      }))(Tooltip);
    
    const placement = "top";
    const container_class = props.num_abilities === 4 ? styles.img_container_4 : 
                            (props.num_abilities === 5 ? styles.img_container_5 : styles.img_container_6)

    return (
        <HtmlTooltip title={body} placement={placement} interactive>
            <div className={container_class}>
                <img src={img} alt="" />
           </div>
        </HtmlTooltip>

    )
}