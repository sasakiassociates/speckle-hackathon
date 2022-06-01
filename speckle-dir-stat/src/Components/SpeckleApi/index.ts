import { Speckle, SpeckleBaseObject, SpeckleObject } from '@strategies/speckle';
import { Entity } from "../../stores/Entities";

export const APP_NAME = process.env.REACT_APP_SPECKLE_NAME
export const TOKEN = `${APP_NAME}.AuthToken`
export const REFRESH_TOKEN = `${APP_NAME}.RefreshToken`
export const CHALLENGE = `${APP_NAME}.Challenge`

export const buildUrl = async (streamId: string, commitId: string, server: string, token?: string): Promise<string> => {
    const api = new Speckle({ server, token });

    const data = await api.Stream(streamId).Commit(commitId).get;

    return `${server}/streams/${streamId}/objects/${data.referencedObject}`;
}

export const send = async (data: Entity[], streamId: string, server: string, token: string): Promise<string> => {

    let speckleObjs: SpeckleBaseObject[] = [];

    // NOTE: The objects bound to the entity are three.js based objects. We would need to load the commit without the speckle view object loader or load each commit twice.
    data.forEach(x => {
        speckleObjs.push({ id: x.id, speckle_type: x.objectType, data: x.bindObject })
    })

    const api = new Speckle({ server, token });
    const obj: SpeckleBaseObject = { speckle_type: "Base", id: api.getId, data: speckleObjs };

    console.log(obj);

    const res = await api.Stream(streamId).writeAndCommitObject(obj, "From SpeckleDirStat", "main") as SpeckleObject;

    console.log(res);

    return res.id;
}

// Redirects to the Speckle server authentication page, using a randomly generated challenge. Challenge will be stored to compare with when exchanging the access code.
export function goToSpeckleAuthPage(serverUrl: string) {
    // Generate random challenge
    const challenge =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

    // app.setChallenge(challenge);
    // Save challenge in localStorage
    localStorage.setItem(CHALLENGE, challenge)
    // Send user to auth page
    // @ts-ignore
    window.location = `${serverUrl}/authn/verify/${process.env.REACT_APP_SPECKLE_ID}/${challenge}`
}

// Log out the current user. This removes the token/refreshToken pair.
export function speckleLogOut() {
    // Remove both token and refreshToken from localStorage
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
}

// Exchanges the provided access code with a token/refreshToken pair, and saves them to local storage.
export async function exchangeAccessCode(accessCode: string, serverUrl: string) {
    const res = await fetch(`${serverUrl}/auth/token/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            accessCode: accessCode,
            appId: process.env.REACT_APP_SPECKLE_ID,
            appSecret: process.env.REACT_APP_SPECKLE_SECRET,
            challenge: localStorage.getItem(CHALLENGE)
        })
    })
    const data = await res.json()
    if (data.token) {
        // If retrieving the token was successful, remove challenge and set the new token and refresh token
        localStorage.removeItem(CHALLENGE)
        localStorage.setItem(TOKEN, data.token)
        localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
    }
    return data
}