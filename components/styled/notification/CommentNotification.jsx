import Router from 'next/router';
import Link from 'next/link';
import { useStreamContext } from 'react-activity-feed';
import styled from 'styled-components';

import { generateTweetLink } from '../../../utils/links';
import TweetActorName from '../tweet/TweetActorName'

const Block = styled.button`
padding: 15px;
border-bottom: 1px solid #333;
display: flex;

a {
    color: white;
}

.user__image {
    width: 35px;
    height: 35px;
    overflow: hidden;
    border-radius: 50%;

    img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    }
}

.user__details {
    margin-left: 20px;
    flex: 1;
}

.user__reply-to {
    color: #555;
    font-size: 15px;
    margin-top: 3px;

    a {
    color: var(--theme-color);
    &:hover {
        text-decoration: underline;
    }
    }
}

.user__text {
    display: block;
    color: white;
    margin-top: 10px;
}
`;



export default function CommentNotification({ commentActivities }) {
    const { user } = useStreamContext();


    return (
    <>
        {commentActivities.map((cAct) => {
        const actor = cAct.actor;

        const tweetLink = generateTweetLink(cAct.actor.id, cAct.object.id)

        return (
            <Block key={cAct.id} onClick={() => Router.push(tweetLink)}>
                <Link href={`/${actor.id}`}>
                    <a className="user__image">
                        <img src={actor.data.image} alt="" />
                    </a>
                </Link>
                <div className="user__details">
                    <TweetActorName
                    id={actor.id}
                    name={actor.data.name}
                    time={cAct.time}
                    />
                    <span className="user__reply-to">
                        Replying to <Link href={`/${user.id}`}>
                            <a>@{user.id}</a></Link>
                        <p className="user__text">{cAct.text}</p>
                    </span>
                </div>
            </Block>
        )
        })}
    </>
    )
}