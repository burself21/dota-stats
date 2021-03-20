import React, { useState } from 'react';

import styles from './ItemModal.module.css';

import { Button, Card as MUICard, CardContent, Grid, Modal, Typography } from "@material-ui/core";

import { ItemCard } from '../Card/ItemCard';

export const ItemModal = (props) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const { img: imgStem } = props.item;
    const img = `https://api.opendota.com${imgStem.substring(0, imgStem.indexOf("?"))}`;

    return (
        <Grid item align="center">
            <button type="div" onClick={handleOpen}>
                <img src={img} alt="" width="63.75" height="48" />
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <ItemCard
                    item={props.item}
                    purchasable={props.purchasable}
                />
            </Modal>
        </Grid>
    )
}