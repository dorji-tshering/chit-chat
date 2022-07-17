import { Feed, useStreamContext } from 'react-activity-feed'
import Router from 'next/router';

import Layout from '../../../components/styled/layout/Layout';
import ThreadContent from '../../../components/styled/thread/ThreadContent'

const FEED_ENRICH_OPTIONS = {
    withRecentReactions: true,
    withOwnReactions: true,
    withReactionCounts: true,
    withOwnChildren: true,
}

export default function Thread() {
    const { user } = useStreamContext()

    const { user_id } = Router.query

    return (
        <Layout>
            <Feed
                feedGroup={user.id === user_id ? 'user' : 'timeline'}
                options={FEED_ENRICH_OPTIONS}
                notify
            >
                <ThreadContent />
            </Feed>
        </Layout>
    )
}