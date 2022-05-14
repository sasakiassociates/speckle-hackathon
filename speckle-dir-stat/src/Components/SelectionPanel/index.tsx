import { observer} from 'mobx-react';
import { FiCheck } from 'react-icons/fi';
import { useStores } from '@strategies/stores';
import { Panel, Title, Toggle, Body } from '@strategies/ui';

import { Stores } from '../../stores';
import { List } from "../List/List";


export default observer(function SelectionPanel() {
    const { ui } = useStores() as Stores;

    return (
        <Panel
            className="SelectionPanel"
            active={ui.selectionPanelIsOpen}
            onToggle={() => ui.setSelectionPanelOpen(!ui.selectionPanelIsOpen)}
        >
            <Title>Selected Data</Title>
            <Toggle><FiCheck /></Toggle>
            <Body>
                <List/>
            </Body>
        </Panel>
    );
});
