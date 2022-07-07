import { useEffect, useState } from 'react';
import { useStreamContext } from 'react-activity-feed';

// accepts user_id of other user which can be followed or unfollowed
export default function useFollow({ userId, getFollowStatus = false }) {
    const { client } = useStreamContext();

    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        async function init() {
        const response = await client
            .feed('timeline', client.userId)
            .following({ filter: [`user:${userId}`] })
    
            // Boolean(response.results.length)
            setIsFollowing(!!response.results.length);
        }
    
        init()
    }, [userId]);

    const toggleFollow = async () => {
        const action = isFollowing ? 'unfollow' : 'follow';
      
        // get current user feed
        const timelineFeed = client.feed('timeline', client.userId);

        // follow or unfollow other user's feed
        await timelineFeed[action]('user', userId);
      
        setIsFollowing((isFollowing) => !isFollowing);
    }

    if(getFollowStatus) {
        return isFollowing;
    }else {
        return { isFollowing, toggleFollow };
    }
}