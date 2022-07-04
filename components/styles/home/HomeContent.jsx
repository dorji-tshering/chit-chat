import styled from 'styled-components'
import { Feed, useStreamContext } from 'react-activity-feed'

import CreateTweetTop from './CreateTweetTop'
import MainHeader from './MainHeader'
import Timeline from '../Home/Timeline'
import LoadingIndicator from '../LoadingIndicator'

// middle component along LeftSide and RightSide
const Container = styled.div`
  .header {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .create-tweet-top {
    border-bottom: 1px solid #333;
  }

  .new-tweets-info {
    border-bottom: 1px solid #333;
    padding: 20px;
    text-align: center;
    color: var(--theme-color);
    display: block;
    width: 100%;
    font-size: 16px;

    &:hover {
      background: #111;
    }
  }
`;

export default function HomeContent() {
    const { user } = useStreamContext();
    const userData = user.data;
  
    if (!userData)
      return (
        <Container>
          <LoadingIndicator />
        </Container>
      )
  
    return (
      <Container>
        <div className="header">
          <MainHeader />
        </div>
        <Feed feedGroup="user">
          <div className="create-tweet-top">
            <CreateTweetTop />
          </div>
          <Timeline />
        </Feed>
      </Container>
    )
}