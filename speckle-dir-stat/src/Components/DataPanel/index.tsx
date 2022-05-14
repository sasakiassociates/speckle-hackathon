import {observer} from 'mobx-react';
import {FiGrid} from 'react-icons/fi';
import {useStores} from '@strategies/stores';
import {Panel, Title, Toggle, Body} from '@strategies/ui';

import {Stores} from '../../stores';
import SpaceTreemap from "../TreeMap/SpaceTreemap";
import XYPlot from "../XYPlot";

export default observer(function DataPanel() {
    const {ui, entities} = useStores() as Stores;

    return (
        <Panel
            className="DataPanel"
            active={ui.dataPanelIsOpen}
            onToggle={() => ui.setDataPanelOpen(!ui.dataPanelIsOpen)}
        >
            <Title>Stream as Data</Title>
            <Toggle><FiGrid/></Toggle>
            <Body>
                <XYPlot width={400} height={400} treeTotals={entities.activeTreeMap}></XYPlot>
                <SpaceTreemap width={800} height={400}
                              treeTotals={entities.activeTreeMap}/>
            </Body>
        </Panel>
    );
});
