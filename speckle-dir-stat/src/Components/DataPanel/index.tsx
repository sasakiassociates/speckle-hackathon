import {observer} from 'mobx-react';
import {FiGrid} from 'react-icons/fi';
import {useStores} from '@strategies/stores';
import {Panel, Title, Toggle, Body} from '@strategies/ui';

import {Stores} from '../../stores';
import SpaceTreemap from "../TreeMap/SpaceTreemap";
import { ManualScatter } from "../ManualScatter/ManualScatter";

export default observer(function DataPanel() {
    const {ui, entities} = useStores() as Stores;

    return (
        <Panel
            className="DataPanel"
            active={ui.dataPanelIsOpen}
            onToggle={() => ui.setDataPanelOpen(!ui.dataPanelIsOpen)}
        >
            <Title>Model Data</Title>
            <Toggle><FiGrid/></Toggle>
            <Body>
                <ManualScatter width={800} height={400}/>
                <SpaceTreemap width={800} height={400}
                              treeTotals={entities.activeTreeMap}/>
            </Body>
        </Panel>
    );
});
