import {Speckle} from '@strategies/speckle';

export const SpeckleApi = async () => {
    const api = new Speckle({token: "9f2007a7243b375259c50707617034f9f00fd6b904"});
    const streams = await api.streams;
    console.log(streams)
}