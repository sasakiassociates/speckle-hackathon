import {Speckle, SpeckleObject} from '@strategies/speckle';

export const speckleApi = async () => {
    const api = new Speckle({token: "9f2007a7243b375259c50707617034f9f00fd6b904"});

    const data = await api.Stream("070d4ec5a3").Commit("8c19e43e82").data;

    console.log("data");
    console.log(data);

}