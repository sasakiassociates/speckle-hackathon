import {observer} from 'mobx-react';
import {FiGrid} from 'react-icons/fi';
import {useStores} from '@strategies/stores';
import {Panel, Title, Toggle, Body} from '@strategies/ui';

import {Stores} from '../../stores';
import {Treemap} from "../TreeMap";

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
                {entities.list.length > 0 && <Treemap data={entities.list} width={400} height={300}/>}
            </Body>
        </Panel>
    );
});
