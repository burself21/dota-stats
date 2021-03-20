import React, { useState } from "react";

import styles from "./HeroModal.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Modal, Typography } from "@material-ui/core";

import { HeroCard } from "../Card/HeroCard";

export const HeroModal = (props) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    const 
        { 
            localized_name : name, 
            id, 
            img : imgStem,
            primary_attr

        } = props.hero;

    console.log(props.abilities);

    const heroImg = name === "Drow Ranger" ? "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/80/Drow_Ranger_icon.png" : `https://api.opendota.com${imgStem}`

    return (
        <Grid item align="center">
            <button type="div" onClick={handleOpen}>
                <img src={heroImg} alt="" width="96" height="54" />
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <HeroCard
                    hero={props.hero}
                    abilities={props.abilities}
                />
            </Modal>
        </Grid>
    );
}
