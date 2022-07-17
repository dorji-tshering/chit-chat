import { removeFromStorage } from "../utils/storage";
import styled from 'styled-components';
import Twitter from '../components/Icons/Twitter';
import Router from 'next/router';
import Modal from '../components/styled/Modal';

const Wrapper = styled.div`
    max-width: 300px;
    color: white;
    padding: 25px;
    border-radius: 10px;
    background: #222;

    .buttons {

        button {
            border-radius: 30px;
            color: white;
            text-align: center;
            padding: 12px;
            font-size: 16px;
            display: block;
            margin: auto;
            min-width: 100%;
        }

        .logout {
            margin-bottom: 15px;
            background: var(--theme-color);
        }

        .cancel {
            border: 1px solid white;
        }
     }
    
    p {
        margin-bottom: 25px;
    }

    .icon-wrapper {
        text-align: center;
        margin-bottom: 10px;
    }

    h2 {
        margin-bottom: 10px;
    }
`;

const LogoutPage = () => {
    const onClickLogout = () => {
        removeFromStorage();
        Router.push('/login');
    }

    const onClickCancel = () => {
        Router.back();
    }

    return (
        <Modal onClickOutside={onClickCancel} className='logout-confirm'>
            <Wrapper>
                <span className="icon-wrapper"> <Twitter color='white' size={40} /> </span>
                <h2>Log out of Chirp?</h2>
                <p>You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account. </p>
                <div className="buttons">
                    <button className="logout" onClick={onClickLogout}>Yes, logout</button>
                    <button className="cancel" onClick={onClickCancel}>Cancel</button>
                </div>
            </Wrapper>
        </Modal>
    );
};

export default LogoutPage;