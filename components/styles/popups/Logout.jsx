import styled from 'styled-components';
import Link from 'next/link';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    background: #222;
    border-radius: 10px;
    padding: 12px 0px;
    color: white;

    .top-section {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid #2f2e2e;

        img {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .user_id {
            color: #aaa;
        }
    }

    .bottom_links {
        display: flex;
        flex-direction: column;

        a {
            padding: 12px 16px;
            color: white;

            &:hover {
                background: #2f2e2e;
            }
        }
    }

`;


const Logout = ({userData}) => {
    return (
        <Container>
            <div className="top-section">
                <img src={userData.image} alt="profile-image" />
                <span className="user_details">
                    <span className="user_name">{userData.name}</span>
                    <span className="user_id">@{userData.id}</span>
                </span>
            </div>
            <div className="bottom_links">
                <Link href='/login'>
                    <a>Add and existing account </a>
                </Link>
                <Link href='/logout'>
                    <a>Logout @{userData.id}</a>    
                </Link>
            </div>
        </Container>
    );
};

export default Logout;