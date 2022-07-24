import { FlatFeed, useStreamContext } from 'react-activity-feed';
import TweetBlock from '../tweet/TweetBlock';

// component after CreateTweetTop
export default function Timeline() {
    const { user } = useStreamContext();

    return (
        <div className="feeds">
            <FlatFeed Activity={TweetBlock} userId={user.id} feedGroup="timeline"/>
        </div>
    );
}