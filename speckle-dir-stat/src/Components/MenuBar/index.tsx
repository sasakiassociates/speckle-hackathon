import {observer} from 'mobx-react';
import {useStores} from '@strategies/stores';
import {FiSettings} from 'react-icons/fi';
import {TopRibbon, Title, Logo, Drawer, IconButton} from '@strategies/ui';

import {Stores} from '../../stores';
// @ts-ignore
import SasakiLogo from '../../assets/sasaki.svg';


export default observer(function MenuBar() {
    const { ui } = useStores() as Stores;

    return (
        <TopRibbon className="MenuBar">
            <Logo><img src={SasakiLogo} alt="Sasaki Logo" /></Logo>
            <Title>Hackathon: SpeckleDirStat</Title>
            <Drawer>
                <IconButton onClick={() => ui.setLoadModalOpen()}>
                    <FiSettings />
                </IconButton>
            </Drawer>
        </TopRibbon>
    );
});
