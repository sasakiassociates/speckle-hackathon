import { Speckle } from '@strategies/speckle';

export const buildUrl = async (streamId: string, commitId: string, server: string, token?: string): Promise<string> => {
    const api = new Speckle({ server, token });
    const data = await api.Stream(streamId).Commit(commitId).get;

    return `https://speckle.xyz/streams/${streamId}/objects/${data.referencedObject}`;
}
