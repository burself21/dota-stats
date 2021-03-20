import axios from 'axios';

const heroStatsUri = 'https://api.opendota.com/api/heroStats';
const itemsUri = 'https://api.opendota.com/api/constants/items';
const abilitiesUri = 'https://api.opendota.com/api/constants/abilities';
const heroAbilityUri = 'https://api.opendota.com/api/constants/hero_abilities';

export const fetchHeroData = async () => {
    try {
        const { data } = await axios.get(heroStatsUri);
        
        return data;

    } catch (error) {

    }
}

export const fetchItemData = async () => {
    try {
        const { data } = await axios.get(itemsUri);

        return data;
    } catch (error) {

    }
}

export const fetchAbilityData = async () => {
    try {
        const { data } = await axios.get(abilitiesUri);

        return data;
    } catch (error) {
        
    }
}

export const fetchHeroAbilityData = async () => {
    try {
        const { data } = await axios.get(heroAbilityUri);

        return data;
    } catch (error) {
        
    }
}