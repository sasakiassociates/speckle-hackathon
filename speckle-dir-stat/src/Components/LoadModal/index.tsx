import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '@strategies/stores';
import { Input } from '@strategies/react-form';
import { Modal, Body, Buttons, Button } from '@strategies/ui';

import { Stores } from '../../stores';
// @ts-ignore
import SasakiLogo from '../../assets/sasaki.svg';


export default observer(function LoadModal() {
    const { app, ui } = useStores() as Stores;

    const start = useCallback(() => {
        app.makeUnclean();
        ui.setLoadModalOpen(false);
    }, []);

    return (
        <Modal 
            className="LoadModal"
            active={ui.loadModalIsOpen}
            onClose={() => !app.clean && ui.setLoadModalOpen(false)}
        >
            <Body>
                <div className="logo">
                    <img src={SasakiLogo} alt="Sasaki Logo" />
                </div>

                <p>
                    This Speckle product provides statistics and analysis while
                    allowing you to view your geometry model to perform cleanup
                    and be able to separate geometries into various streams.
                </p>

                <Input
                    name="Get Started with a Commit URL"
                    left="URL"
                    value={app.url}
                    onChange={(url: string|number) => app.setUrl(String(url))}
                />

                <Input
                    name="Token (optional)"
                    left="App Token"
                    value={app.token || ''}
                    onChange={(token: string|number) => app.setToken(String(token))}
                />
            </Body>

            <Buttons>
                <Button onClick={start} disabled={app.url === ''}>
                    Load
                </Button>
            </Buttons>
        </Modal>
    );
});
