import React from 'react';

import styles from './ItemCard.module.css';

import { Card, CardContent, Grid, Typography } from '@material-ui/core';

export const ItemCard = React.forwardRef((props, ref) => {
    
    const {
        dname: name,
        cost,
        cd,
        attrib: stats,
        lore,
        img: imgStem,
        mc,
        hint: info,
        components

    } = props.item;

    const img = `https://api.opendota.com${imgStem}`;

    let manacost, cooldown;
    
    if (!mc && cd) {
        manacost = ["0"];
        cooldown = cd;
    }
    else if (mc && !cd) {
        cooldown = ["0"];
        manacost = mc;
    }
    else {
        cooldown = cd;
        manacost = mc;
    }

    const textFormat = (item) => {
        if (Array.isArray(item))
            return item.join(' / ');
        else
            return item;
    }

    const getTitleCase = (str) => {
        return str.toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }


    const getStatText = (stat, id) => {
        if (stat.hasOwnProperty("generated")) 
            return <React.Fragment key={id}></React.Fragment>;

        const { header, value, footer } = stat;
        return (
            <p key={id} className={styles.stat__text}>
                <span className={styles.stat_header}>{getTitleCase(header)} </span>
                <span className={styles.stat_value}>{Array.isArray(value) ? value.join(',') : value} </span> 
                <span className={styles.stat_footer}>{footer} </span>
            </p>
        );
    }

    const getStats = () => {
        if ((stats.length) === 0) return null;

        return (
            <React.Fragment>
                {[...Array(stats.length).keys()].map(id => getStatText(stats[id], id))}
            </React.Fragment>
        );
    }  
    
    const getInfo = () => {
        if (info === undefined)
            return null;
        return (
            <React.Fragment>
                {info && [...Array(info.length).keys()].map(id => getItemAbility(info[id], id))}
            </React.Fragment>
        );
    }

    const getItemAbility = (ability, id) => {
        let ability0 = ability;

       if (ability.indexOf("Passive") === 0 && ability["Passive".length] !== ":") {
            ability0 = "Passive:" + ability.slice("Passive".length)
        }
        else if (ability.indexOf("Active") === 0 && ability["Active".length] !== ":") {
            ability0 = "Active:" + ability.slice("Active".length)
        }
        else {
            ability0 = ability;
        }

        ["Smoke of Deceit", "Spell Immunity"].forEach(word => {
            if (ability0.includes(word)) {
                ability0 = ability0.slice(0, ability0.indexOf(word)) + word.toLowerCase() + ability0.slice(ability0.indexOf(word) + word.length);
            }
        })

        if (!ability0.includes(":")) {
            return <Typography key={id}>{ability}</Typography>;
        }  
        let full_regex;
        if (name === "Voodoo Mask")
            full_regex = /(\w+:\s*(?:[A-Z][a-z']+\s?)*)((?:[A-Z][^\s]*|(?:[0-9]+%))\s[^A-Z](?:[^\.]+\.)*)((?:\s?[A-Z][a-z]+(?:[\s-][A-Z][a-z]+)*:\s(?:(?:[0-9]+(?:\.[0-9]+)?(?:,[0-9]+(?:\.[0-9]+)?)*(?:\s[a-z]+)?)|(?:[A-Z][a-z]+\s[A-Z][a-z]+)))*)\.?\s?/;
        else
            full_regex = /(\w+:\s*(?:[A-Z][a-z']+\s?)*)([A-Z][^\s]*\s[^A-Z](?:[^\.]+\.)*)((?:\s?[A-Z][a-z]+(?:[\s-][A-Z][a-z]+)*:\s(?:(?:[0-9]+(?:\.[0-9]+)?(?:,[0-9]+(?:\.[0-9]+)?)*(?:\s[a-z]+)?)|(?:[A-Z][a-z]+\s[A-Z][a-z]+)))*)\.?\s?/;
        const sentence_regex = /[^\.]+(?:(?:[0-9]+\.[0-9]+)[^\.]+)*[^\.]+[^0-9]\./g
        const attr_regex = /(\s?[A-Z][a-z]+(?:[\s-][A-Z][a-z]+)*:\s(?:(?:[0-9]+(?:\.[0-9]+)?(?:\,[0-9]+(?:\.[0-9]+)?)*(?:\s[a-z]+)?)|(?:[A-Z][a-z]+\s[A-Z][a-z]+)))/g
        let [_, header, sentences, attrs] = ability0.match(full_regex);
        ["smoke of deceit", "spell immunity"].forEach(word => {
            if (sentences.includes(word)) {
                sentences = sentences.slice(0, sentences.indexOf(word)) + getTitleCase(word) + sentences.slice(sentences.indexOf(word) + word.length);
            }
        })
        const sentence_arr = sentences ? sentences.match(sentence_regex) : null;
        const attr_arr = attrs ? attrs.match(attr_regex) : null;

        console.log(attrs)
        return (
            <React.Fragment key={id}>
                <Typography variant="h6">{header}</Typography>
                {sentence_arr && [...Array(sentence_arr).keys()].map(id2 => 
                <React.Fragment key={id2}>
                    <Typography>{sentence_arr[id2]}</Typography>
                    <br />
                    </React.Fragment>
                )}
                {attr_arr && [...Array(attr_arr).keys()].map(id2 => 
                <React.Fragment key={id2}>
                    <Typography>{attr_arr[id2].split(',').join(', ')}</Typography>
                    <br />
                    </React.Fragment>
                )}
            </React.Fragment>
        );

    }

    const getManaCostAndCooldown = () => {

        if (!manacost && !cooldown)
            return null;

        return (
            <div className={styles.mc_cd_container}> 
                <p className={styles.manacost}>Mana: {textFormat(manacost)} </p> 
                <p className={styles.cooldown}> {textFormat(cooldown)} </p> 
            </div>
        )
    }

    const getCost = () => {
        if (!props.purchasable) {
            return "Not purchasable."
        }
        else {
            return `Cost: ${cost}`;
        }
    }

    return (
        <Card align="center" className={styles.container}>
            <CardContent>
                <div className={styles.item}>
                    <div className={styles.item__header}>
                        <div className={styles.item__img}>
                            <img src={img} alt="" width="70" height="53"/>
                        </div>
                        
                        <Typography className={styles.item__name}>{name}</Typography>
                        <Typography className={styles.item__cost}>{getCost()}</Typography>
                        
                    </div>
                    <div className={styles.item__info}>
                        {getInfo()}
                        {getStats()}
                    </div>
                    {getManaCostAndCooldown()}
                        
                    
                </div>
            </CardContent>
        </Card>
    )
})