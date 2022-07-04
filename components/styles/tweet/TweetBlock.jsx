import classNames from 'classnames'
import { useState } from 'react'
import { useStreamContext } from 'react-activity-feed'
import Router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import { formatStringWithLink } from '../../../utils/string'
import CommentDialog from './CommentDialog'
import Comment from '../../Icons/Comment'
import Heart from '../../Icons/Heart'
import Retweet from '../../Icons/Retweet'
import Upload from '../../Icons/Upload'
import More from '../../Icons/More'
import TweetActorName from './TweetActorName'
import { generateTweetLink } from '../../../utils/links'

const Block = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #333;
  padding: 15px;
  position: relative;
  cursor: pointer;

  &:hover {
      background: #b1bac41f;
  }

  .user-details {
      display: flex;
      margin-bottom: 5px;
      align-items: center;

      img {
          min-width: 45px;
          height: 45px;
          border-radius: 50%;
      }
  }

  .tweet {
    flex: 1;
    .link {
      display: block;
      padding-bottom: 5px;
      text-decoration: none;
      width: 100%;
    }

    &__text {
      color: white;
      line-height: 20px;
      margin-top: 3px;
      width: 100%;

      &--link {
        color: var(--theme-color);
        text-decoration: none;
      }
    }

    &__actions {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;

      button {
        display: flex;
        align-items: center;

        & svg {
            display: block;
        }

        .icon-wrapper {
            height: 35px;
            width: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }

        &:hover {
            .icon-wrapper {
                background: #222;

                svg {
                    fill: var(--theme-color);
                }
            }

            .tweet__actions__value {
                color: var(--theme-color);
            }
        }
      }

      &__value {
        margin-left: 10px;
        color: #666;

        &.colored {
          color: var(--theme-color);
        }
      }
    }

    &__image {
      margin-top: 20px;
      border-radius: 20px;
      border: 1px solid #333;
      overflow: hidden;
      width: calc(100% + 20px);

      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .more {
    width: 40px;
    height: 40px;
    display: flex; 
    position: absolute;
    right: 6px;
    top: 6px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    &:hover {
        background: #222;
        opacity: 1;

        & svg {
            fill: var(--theme-color);
        }
    }
  }
`;

export default function TweetBlock({ activity }) {
    const { user } = useStreamContext();
    const [commentDialogOpened, setCommentDialogOpened] = useState(false)
    const actor = activity.actor;
  
    let hasLikedTweet = false;
  
    const tweet = activity.object.data;
  
    // check if current logged in user has liked tweet
    if (activity?.own_reactions?.like) {
        const myReaction = activity.own_reactions.like.find(
            (l) => l.user.id === user.id
        )
        hasLikedTweet = Boolean(myReaction)
    }
  
    const onToggleLike = () => {
      // toggle like reaction
    }
  
    const actions = [
      {
        id: 'comment',
        Icon: Comment,
        alt: 'Comment',
        value: activity?.reaction_counts?.comment || 0,
        onClick: () => setCommentDialogOpened(true),
      },
      {
        id: 'retweet',
        Icon: Retweet,
        alt: 'Retweet',
        value: 0,
      },
      {
        id: 'heart',
        Icon: Heart,
        alt: 'Heart',
        value: activity?.reaction_counts?.like || 0,
        onClick: onToggleLike
      },
      {
        id: 'upload',
        Icon: Upload,
        alt: 'Upload',
      },
    ]
  
    const tweetLink = activity.id ? generateTweetLink(actor.id, activity.id) : '#'
  
    const onPostComment = async (text) => {
      // create comment
    }

    return (
        <>
          <Block onClick={() => Router.push(tweetLink)} className="link">
            <div className="user-details">
              <Link href={`/${actor.id}`}>
                  <a onClick={(e) => e.stopPropagation()}>
                      <img src={actor.data.image} alt="" />
                  </a>
              </Link>
              <TweetActorName
                  name={actor.data.name}
                  id={actor.id}
                  time={activity.time}
                />
            </div>
            <div className="tweet">
                <div className="tweet__details">
                    <p
                        className="tweet__text"
                        dangerouslySetInnerHTML={{
                            __html: formatStringWithLink(
                                tweet.text,
                                'tweet__text--link'
                            ).replace(/\n/g, '<br/>'),
                        }}
                    />
                </div>
    
              <div className="tweet__actions">
                {actions.map((action) => {
                  return (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        action.onClick?.()
                      }}
                      key={action.id}
                      type="button"
                    >
                      <span className="icon-wrapper">
                        <action.Icon
                            color={
                            action.id === 'heart' && hasLikedTweet
                                ? 'var(--theme-color)'
                                : '#777'
                            }
                            size={17}
                            fill={action.id === 'heart' && hasLikedTweet && true}
                        />
                      </span>
                      <span
                        className={classNames('tweet__actions__value', {
                          colored: action.id === 'heart' && hasLikedTweet,
                        })}
                      >
                        {action.value}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
            <button className="more" onClick={(e) => e.stopPropagation() /* prevent event propagation to the parent element */}>
              <More color="#777" size={20} />
            </button>
          </Block>
          {activity.id && commentDialogOpened && (
            <CommentDialog
              onPostComment={onPostComment}
              shouldOpen={commentDialogOpened}
              onClickOutside={() => setCommentDialogOpened(false)}
              activity={activity}
            />
          )} 
        </>
    )
}

