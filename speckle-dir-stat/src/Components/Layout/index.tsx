import { observer } from 'mobx-react';
import { useStores } from '@strategies/stores';

import { Stores } from '../../stores';
import DataPanel from '../DataPanel';
import SelectionPanel from '../SelectionPanel';


export default observer(function Layout() {
    const { ui } = useStores() as Stores;

    return (
        <div className={`Layout ${ui.layout}`}>
            <DataPanel />
            <SelectionPanel />
        </div>
    );
});
