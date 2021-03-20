import React from 'react';
import { HeroCards } from '../../Containers/Cards/HeroCards';
import { ItemCards } from '../../Containers/Cards/ItemCards';
import { fetchHeroData, fetchItemData, fetchAbilityData, fetchHeroAbilityData } from '../../api';
import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core';
import { TabPanel } from '../../Components/TabPanel/TabPanel';
import PropTypes from 'prop-types';

import styles from './Home.module.css';


/*TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}; */
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
  };


class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            heroes: [],
            items: [],
            abilities: [],
            abilityList: [],
            tab: 0
        }

        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        const heroData = await fetchHeroData();
        const itemData = await fetchItemData();
        const abilityData = await fetchAbilityData();
        const heroAbilityList = await fetchHeroAbilityData();

        this.setState((state) => {
            return {
                heroes: heroData,
                items: itemData,
                abilities: abilityData,
                abilityList: heroAbilityList,
                tab: state.tab
            };
        });
        //console.log(itemData);
    }

    handleChange = (event, newValue) => {
        this.setState((state) => {
            return {
                heroes: state.heroes,
                items: state.items,
                abilities: state.abilities,
                abilityList: state.abilityList,
                tab: newValue
            };
        })
    }

    render() {
        return (
            <div className={styles.container}>
                <AppBar position="static" className={styles.appbar}>
                    <Tabs value={this.state.tab} onChange={this.handleChange} aria-label="nav tabs">
                        <Tab label="Heroes">
                        </Tab>
                        <Tab label="Items">
                        </Tab>
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.tab} index={0}>
                    <HeroCards heroes= {this.state.heroes} abilities={this.state.abilities} abilityList={this.state.abilityList} numCards="120" />
                </TabPanel>
                <TabPanel value={this.state.tab} index={1}>
                    <ItemCards items={this.state.items} numCards="359" />
                </TabPanel>

                
            </div>
        );
    }
}

export default Home;