import { useState } from 'react';
import { useStreamContext } from 'react-activity-feed';
import styled from 'styled-components';
import Logout from '../popups/Logout';
import Modal from '../Modal';

import LeftSide from './LeftSide';
import CreateTweetDialog from '../Tweet/CreateTweetDialog';
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
                <Modal className="logout-modal" backdropClassName='logout' onClickOutside={() => setLogoutOpen(false)}>
                    <Logout userData={user.data}/>
                </Modal>
            ) }
        </ModalContainer>

        <Container>
          <div className="content">
            <div className="left-side-bar">
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


