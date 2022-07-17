import { useFeedContext } from 'react-activity-feed';

export default function useLike() {
    const feed = useFeedContext();

    const toggleLike = async (activity, hasLikedTweet) => {
        await feed.onToggleReaction('like', activity)
    }

    return { toggleLike }
}