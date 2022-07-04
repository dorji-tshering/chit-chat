import { FlatFeed, useStreamContext } from 'react-activity-feed';
import TweetBlock from '../Tweet/TweetBlock';

// component after CreateTweetTop
export default function Timeline() {
    const { user } = useStreamContext();

    return (
        <div className="feeds">
            <FlatFeed Activity={TweetBlock} userId={user.id} feedGroup="user"/>
        </div>
    );
}