import { useState, useRef } from 'react';
import { useStreamContext } from 'react-activity-feed';
import styled from 'styled-components';
import Logout from '../popups/Logout';

import LeftSide from './LeftSide';
import CreateTweetDialog from '../tweet/CreateTweetDialog';
import RightSide from './RightSide';
import LoadingIndicator from '../LoadingIndicator';

const ModalContainer = styled.div`
    .logout-modal {
        height: min-content;

        .close-btn {
            display: none;
        }
    }
`;

const Container = styled.div`
  min-height: 100vh;
  background: black;
  --left: 300px;
  --right: 400px;
  --middle: calc(100% - var(--left) - var(--right));

  .content {
    max-width: 1300px;
    margin: 0 auto;
    width: 100%;
    display: flex;
  }

  .left-side-bar {
    height: 100vh;
    width: var(--left);
    position: sticky;
    top: 0;
  }

  .main-content {
    position: relative;
    width: var(--middle);
    border-left: 1px solid #333;
    border-right: 1px solid #333;
    min-height: 100vh;
  }

  .right-side-bar {
    width: var(--right);
  }
`; 
 
export default function Layout({ children }) {
    const { user } = useStreamContext();
    const [createDialogOpened, setCreateDialogOpened] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const leftSidebarRef = useRef();

    // remove resize event upon clicking on backdrop and button links
    const onClickOutside = () => {
        setLogoutOpen(false);
    }

    if (!user) return <LoadingIndicator />;
  
    return (
      <>
        <ModalContainer>
            {createDialogOpened && (
            <CreateTweetDialog
                onClickOutside={() => setCreateDialogOpened(false)}
            />
            )}

            {logoutOpen && (
                <Logout userData={user.data} onClickOutside={onClickOutside} leftSidebarRef={leftSidebarRef}/>
            ) }
        </ModalContainer>

        <Container>
          <div className="content">
            <div className="left-side-bar" ref={leftSidebarRef}>
              <LeftSide onClickTweet={() => setCreateDialogOpened(true)} onClickLogout={() => setLogoutOpen(true)} />
            </div>
            <main className="main-content">
              {!user ? <LoadingIndicator /> : children}
            </main>
            <div className="right-side-bar">
              <RightSide />
            </div>
            <div />
          </div>
        </Container>
      </>
    );
}


