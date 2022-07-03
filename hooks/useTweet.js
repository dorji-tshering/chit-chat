import { nanoid } from 'nanoid';
import { useStreamContext } from 'react-activity-feed';

export default function useTweet() {
    const { client } = useStreamContext();
    const userFeed = client.feed('user', client.userId);

    const createTweet = async (text) => {
        // .add() returns collection object = {collection: value, data: {value}, ...{}}
        const collection = await client.collections.add('tweet', nanoid(), { text }); //same as {text: text}

        // object returned by .add() can be embedded directly inside activity
        await userFeed.addActivity({
        verb: 'tweet',
        object: collection,
        });
    }

    return createTweet;
}