import Link from 'next/link';
import styled from 'styled-components';

import User from '../../Icons/User';

const Block = styled.div`
padding: 15px;
border-bottom: 1px solid #333;
display: flex;

a {
    color: white;
}

.right {
    margin-left: 20px;
    flex: 1;
}

.actors__images {
    display: flex;

    &__image {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    }
}

.actors__text {
    margin-top: 10px;
    color: white;
    font-size: 15px;

    span {
    display: inline-block;
    }

    .actors__name {
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
    }
}
`;


export default function FollowNotification({ followActivities }) {
    const firstActivity = followActivities[0];

    return (
    <Block>
        <User color="#1c9bef" size={25} />
        <div className="right">
        <div className="actors__images">
            {followActivities.map((follow) => {
            return (
                <Link
                href={`/${follow.actor.id}`}
                key={follow.id}
                >
                    <a className="actors__images__image">
                        <img src={follow.actor.data.image} alt="" />
                    </a>
                </Link>
            )
            })}
        </div>
        <p className="actors__text">
            <Link href={`/${firstActivity.actor.id}`}>
                <a className="actors__name">{firstActivity.actor.data.name}</a>
            </Link>{' '}
            <span>
            {followActivities.length > 1 &&
                `and ${followActivities.length - 1} others`}{' '}
            followed you
            </span>
        </p>
        </div>
    </Block>
    )
}