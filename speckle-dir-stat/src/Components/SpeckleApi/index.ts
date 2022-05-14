import {Speckle, SpeckleObject} from '@strategies/speckle';

export const speckleApi = async () => {
    const api = new Speckle({token: "9f2007a7243b375259c50707617034f9f00fd6b904"});

    const commit = await api.Stream( "070d4ec5a3").Commit("8c19e43e82").data;

    console.log("commit data");
    console.log(commit);
    //
    // const obj = await api.Stream("070d4ec5a3").Object();

    // console.log("object data");
    // console.log(obj);

    // const data = commit.loadObject(commit.refe)

}