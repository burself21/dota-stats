import React from 'react';

import styles from './ItemCards.module.css';

import { ItemModal } from '../../Components/Modal/ItemModal';

import { Grid } from '@material-ui/core';

const ItemCardWrapper = (items, header, purchasable) => {
    return (
        <div className={styles.type_specific_container}>
            <h2 className={styles.type_specific_header}> {header} </h2>
            <Grid container spacing={1} justify="center">
                {items && items.map(item => 
                    <ItemModal
                        key={item.id}
                        item={item}
                        purchasable={purchasable}
                    />)
                } 
            </Grid>
        </div>
    )
}
export const ItemCards = (props) => {

    const normal_items_upper = 277;
    const normal_items_lower_2 = 593;
    const normal_items_upper_2 = 635;
    const neutral_items_lower = 287;
    const neutral_items_upper = 381;

    const dead_items = ["Animal Courier", "Flying Courier", "Stout Shield", "Poor Man's Shield"];

    const useless_items = ["Observer and Sentry Wards", "Tango (Shared)"];

    const other_secret_shop = ["Ring of Health", "Void Stone"];

    const exception_normal = ["Shadow Amulet"];

    const roshan_drops = ["Aegis of the Immortal", "Cheese", "Refresher Shard"];

    const other_consumables = ["Bottle", "Aghanim's Shard"];

    const other_common_upgrades = ["Falcon Blade", "Orb of Corrosion", "Moon Shard", "Soul Booster"];

    const support_items = ["Buckler", "Headdress", "Ring of Basilius", "Urn of Shadows",
                           "Medallion of Courage", "Drum of Endurance", "Mekansm", "Holy Locket",
                           "Vladimir's Offering", "Spirit Vessel", "Pipe of Insight"];

    const magic_items = ["Veil of Discord", "Glimmer Cape", "Necronomicon", "Force Staff",
                         "Aether Lens", "Witch Blade", "Eul's Scepter of Divinity", 
                         "Dagon", "Rod of Atos", "Orchid Malevolence", "Solar Crest",
                         "Aghanim's Scepter", "Refresher Orb", "Octarine Core", "Scythe of Vyse",
                         "Aghanim's Blessing", "Wind Waker"];

    const armor_items = ["Hood of Defiance", "Vanguard", "Blade Mail", "Aeon Disk",
                         "Eternal Shroud", "Crimson Guard", "Lotus Orb", "Black King Bar",
                         "Hurricane Pike", "Linken's Sphere", "Heart of Tarrasque", 
                         "Shiva's Guard", "Assault Cuirass"];

    const weapon_items = ["Manta Style", "Crystalys", "Meteor Hammer", "Armlet of Mordiggian",
                          "Skull Basher", "Shadow Blade", "Desolator", "Battle Fury",
                          "Ethereal Blade", "Nullifier", "Monkey King Bar", "Butterfly",
                          "Daedalus", "Radiance", "Silver Edge", "Divine Rapier", "Bloodthorn",
                          "Abyssal Blade"];

    const other_artifacts = ["Arcane Blink", "Overwhelming Blink", "Swift Blink", "Bloodstone", "Kaya"];

    const other_epics = ["Desolator"];

    const consumable_exceptions = ["Iron Branch", "Moon Shard"];


    const exception_neutral = ["Greater Faerie Fire", "Iron Talon", "Mango Tree", "Poor Man's Shield",
                               "Repair Kit", "Ring of Aquila", "Royal Jelly", "Vambrace"]

    const unimplemented_items = ["Satchel", "Horizon", "Pocket Tower", "Gladiator Helm",
                                 "Wizard Glass", "Gloves of Travel", "Warhammer",
                                 "Shadow of Vengeance", "Overflowing Elixir", "Star Mace",
                                 "Venom Gland", "Grandmaster's Glaive", 
                                 "Ancient Perseverance", "Dimensional Doorway", 
                                 "Greater Mango", "Oakheart"];

    const boot_upgrades = ["Tranquil Boots", "Phase Boots", "Power Treads", 
                           "Arcane Boots", "Boots of Travel", "Boots of Travel 2",
                           "Guardian Greaves"]


    const sort_items_alphabetically = (item1, item2) => {
        if (item1.dname < item2.dname) return -1;
        if (item1.dname > item2.dname) return 1;
        return 0;
    }

    const sort_items_by_cost = (item1, item2) => {
        if (item1.cost < item2.cost) return -1;
        if (item1.cost > item2.cost) return 1;
        return 0;
    }
    
    const items = Object.values(props.items).
                  splice(0, props.numCards).
                  filter(item => item.dname !== undefined).
                  filter(item => item.id < 1000 || item.id > 1200).
                  filter(item => !dead_items.includes(item.dname)).
                  filter(item => !useless_items.includes(item.dname)).
                  filter(item => item.id !== 196). //diffusal blade 2
                  sort(sort_items_by_cost);

    
    const normal_items = items.
                         filter(item => item.qual !== undefined || exception_normal.includes(item.dname)).
                         filter(item => !unimplemented_items.includes(item.dname)).
                         filter(item => !exception_neutral.includes(item.dname));

    const neutral_items = items.
                          filter(item => item.qual === undefined || exception_neutral.includes(item.dname)).
                          filter(item => !item.dname.includes("Recipe")).
                          filter(item => !unimplemented_items.includes(item.dname)).
                          filter(item => !exception_normal.includes(item.dname));

    const consumables = normal_items.filter(item => item.qual === "consumable" || other_consumables.includes(item.dname)).
                                     filter(item => !roshan_drops.includes(item.dname)).
                                     filter(item => !consumable_exceptions.includes(item.dname));
    const secret_shop = normal_items.
                        filter(item => item.qual === "secret_shop" || 
                               other_secret_shop.includes(item.dname)).
                        filter(item => item.dname !== "Fluffy Hat");

    const boots = normal_items.
                  filter(item => boot_upgrades.includes(item.dname));

    const artifacts = normal_items.
                      filter(item => item.qual === "artifact" || other_artifacts.includes(item.dname)).
                      filter(item => !roshan_drops.includes(item.dname)).
                      filter(item => !other_epics.includes(item.dname));

    const rares = normal_items.
                  filter(item => item.qual === "rare").
                  filter(item => !boot_upgrades.includes(item.dname)).
                  filter(item => !other_consumables.includes(item.dname)).
                  filter(item => !other_common_upgrades.includes(item.dname)).
                  filter(item => !other_artifacts.includes(item.dname));
    
    const supports = rares.filter(item => support_items.includes(item.dname));
    const magics = rares.filter(item => magic_items.includes(item.dname));

    const epics = normal_items.
                  filter(item => item.qual === "epic" || other_epics.includes(item.dname));

    const armors = epics.filter(item => armor_items.includes(item.dname));
    const weapons = epics.filter(item => weapon_items.includes(item.dname));

    const common_components = normal_items.
                              filter(item => item.qual === "component" || item.dname === "Iron Branch").
                              filter(item => !other_artifacts.includes(item.dname));

    const common_upgrades = normal_items.
                            filter(item => item.qual === "common" || other_common_upgrades.includes(item.dname)).
                            filter(item => !boot_upgrades.includes(item.dname)).
                            filter(item => !other_consumables.includes(item.dname)).
                            filter(item => item.dname !== "Witch Blade");

    const roshan = normal_items.filter(item => roshan_drops.includes(item.dname));

    const tier1_neutrals = neutral_items.filter(item => item.tier === 1);
    const tier2_neutrals = neutral_items.filter(item => item.tier === 2);
    const tier3_neutrals = neutral_items.filter(item => item.tier === 3);
    const tier4_neutrals = neutral_items.filter(item => item.tier === 4);
    const tier5_neutrals = neutral_items.filter(item => item.tier === 5);
 
    console.log(items);

    return (
        <div className={styles.container}>
            <div className={styles.type_container} id={styles.normal_container}>
                <h1 className={styles.type_header} id={styles.normal}> Normal Items </h1>
                {ItemCardWrapper(consumables, "Consumables", true)}
                {ItemCardWrapper(common_components, "Common Components", true)}
                {ItemCardWrapper(secret_shop, "Secret Shop", true)}
                {ItemCardWrapper(boots, "Boot Upgrades", true)}
                {ItemCardWrapper(common_upgrades, "Common Upgrades", true)}
                {ItemCardWrapper(supports, "Support", true)}
                {ItemCardWrapper(magics, "Magic", true)}
                {ItemCardWrapper(armors, "Protection", true)}
                {ItemCardWrapper(weapons, "Weapons", true)}
                {ItemCardWrapper(artifacts, "Artifacts", true)}
                {ItemCardWrapper(roshan, "Roshan Drops", false)}
                
            </div>
            
            <hr/>

            <div className={styles.type_container} id={styles.normal_container}>
                <h1 className={styles.type_header} id={styles.neutral}> Neutral Items </h1>
                
                {ItemCardWrapper(tier1_neutrals, "Tier 1", false)}
                {ItemCardWrapper(tier2_neutrals, "Tier 2", false)}
                {ItemCardWrapper(tier3_neutrals, "Tier 3", false)}
                {ItemCardWrapper(tier4_neutrals, "Tier 4", false)}
                {ItemCardWrapper(tier5_neutrals, "Tier 5", false)}

                <hr/>
            </div>
        </div>
    )
}