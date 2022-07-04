import classNames from 'classnames';
import { useState } from 'react';
import { useStreamContext } from 'react-activity-feed';
import Link from 'next/link';
import styled from 'styled-components';

import USERS from '../../../utils/users';
import FollowBtn from '../ui/FollowBtn';
import More from '../../Icons/More';
import Search from '../../Icons/Search';

const Container = styled.div`
  padding: 0 15px 15px;
  .search-container {
    z-index: 1;
    position: sticky;
    background-color: black;
    width: var(--right);
    padding-right: 30px;
    top: 0;
    padding-top: 15px;
    padding-bottom: 10px;
    .search-form {
      width: 100%;
      position: relative;
      .search-icon {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        left: 15px;
        width: 18px;
        height: 18px;
      }
      input {
        width: 100%;
        background: none;
        border: none;
        background-color: #222;
        font-size: 15px;
        padding: 15px 50px;
        border-radius: 30px;
        color: white;
        &:focus {
          outline: none;
          border: 1px solid var(--theme-color);
          background-color: black;
        }
      }
      .submit-btn {
        &.hide {
          display: none;
        }
        position: absolute;
        right: 15px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        background-color: var(--theme-color);
        color: black;
        border-radius: 50%;
        height: 25px;
        width: 25px;
        font-weight: bold;
      }
    }
  }
  .trends,
  .follows {
    background-color: #222;
    border-radius: 20px;
    h2 {
      font-size: 20px;
      color: white;
      padding: 12px 16px;
    }
  }



  .trends {
    margin-top: 10px;
    .trend {
      display: flex;
      justify-content: space-between;
      padding: 12px 16px;
      cursor: pointer;
      &:hover {
          background: #2f2e2e;
      }
      &__details {
        &__category {
          font-size: 13px;
          display: flex;
          color: #aaa;
          &--label {
            margin-left: 20px;
            position: relative;
            &::after {
              content: '';
              width: 2px;
              height: 2px;
              background-color: #aaa;
              border-radius: 50%;
              left: -10px;
              top: 0;
              bottom: 0;
              margin: auto 0;
              position: absolute;
            }
          }
        }
        &__title {
          font-weight: bold;
          color: white;
          font-size: 16px;
          margin: 2px 0;
          display: block;
        }
        &__tweets-count {
          color: #aaa;
          font-size: 12px;
        }
      }
      .more-btn {
        opacity: 0.5;
        padding: 0;
        max-height: 40px;
        max-width: 40px;
        min-height: 40px;
        min-width: 40px;
        border-radius: 50%;
        svg {
            display: block;
            margin: auto;
        }
        &:hover {
            background: #222;
            opacity: 1;
        }

        &:hover svg {
            fill: var(--theme-color);
        }
      }
    }
    .show-more-trends {
        padding: 16px;
        display: block;
        color: var(--theme-color);
        border-radius: 0px 0px 20px 20px;
        &:hover {
            background: #2f2e2e;
        }
    }
  }
  .follows {
    margin-top: 20px;
    .user {
      display: flex;
      justify-content: space-between;
      padding: 12px 16px;
      &:hover {
          background: #2f2e2e;
      }
      cursor: pointer;
      &__details {
        display: flex;
        text-decoration: none;
      }
      &__img {
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &__name {
        font-weight: bold;
        font-size: 16px;
        color: white;
        &:hover {
            text-decoration: underline;
        }
      }
      &__id {
        color: #aaa;
        font-size: 14px;
        margin-top: 2px;
      }
    }
    .show-more-text {
      font-size: 14px;
      cursor: pointer;
      color: var(--theme-color);
      padding: 16px;
      border-radius: 0px 0px 20px 20px;
      &:hover {
            background: #2f2e2e;
      }
    }
  }
`;

const trends = [
    {
      title: 'iPhone 12',
      tweetsCount: '11.6k',
      category: 'Technology',
    },
    {
      title: 'LinkedIn',
      tweetsCount: '51.1K',
      category: 'Business & finance',
    },
    {
      title: 'John Cena',
      tweetsCount: '1,200',
      category: 'Sports',
    },
    {
      title: '#Microsoft',
      tweetsCount: '3,022',
      category: 'Business & finance',
    },
    {
      title: '#DataSciencve',
      tweetsCount: '18.6k',
      category: 'Technology',
    },
];

export default function RightSide() {
    const [searchText, setSearchText] = useState('')
  
    const { client } = useStreamContext()
  
    const whoToFollow = USERS.filter((u) => {
      // filter out currently logged in user
      return u.id !== client.userId
    })

    return (
        <Container>
          <div className="search-container">
            <form className="search-form">
              <div className="search-icon">
                <Search color="rgba(85,85,85,1)" />
              </div>
              <input
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
              <button
                className={classNames(!Boolean(searchText) && 'hide', 'submit-btn')}
                type="button"
                onClick={() => setSearchText('')}
              >
                X
              </button>
            </form>
          </div>
    
          <div className="trends">
            <h2>Trends for you</h2>
            <div className="trends-list">
              {trends.map((trend, i) => {
                return (
                  <div className="trend" key={trend.title + '-' + i}>
                    <div className="trend__details">
                      <div className="trend__details__category">
                        {trend.category}
                        <span className="trend__details__category--label">
                          Trending
                        </span>
                      </div>
                      <span className="trend__details__title">{trend.title}</span>
                      <span className="trend__details__tweets-count">
                        {trend.tweetsCount} Tweets
                      </span>
                    </div>
                    <button className="more-btn">
                      <More color="white" />
                    </button>
                  </div>
                )
              })}
            </div>
            <Link href={'/trends'}>
                <a className="show-more-trends">Show more</a>
            </Link>
          </div>
    
          <div className="follows">
            <h2>Who to follow</h2>
            <div className="follows-list">
              {whoToFollow.map((user) => {
                return (
                  <div className="user" key={user.id}>
                    <Link href={`/${user.id}`}>
                        <a className="user__details">
                            <div className="user__img">
                                <img src={user.image} alt="" />
                            </div>
                            <div className="user__info">
                                <span className="user__name">{user.name}</span>
                                <span className="user__id">@{user.id}</span>
                            </div>
                        </a>
                    </Link>
                    <FollowBtn userId={user.id} />
                  </div>
                )
              })}
            </div>
            <span className="show-more-text">Show more</span>
          </div>
        </Container>
    )
}