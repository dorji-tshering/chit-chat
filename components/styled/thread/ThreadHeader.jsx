import Router from 'next/router';
import styled from 'styled-components';

import ArrowLeft from '../../Icons/ArrowLeft';

const Header = styled.header`
display: flex;
align-items: center;
padding: 15px;

button {
    width: 25px;
    height: 20px;
    margin-right: 40px;
}

span {
    font-size: 20px;
    color: white;
    font-weight: bold;
}
`

export default function ThreadHeader() {


    return (
        <Header>
            <button onClick={() => Router.back()}>
                <ArrowLeft size={20} color="white" />
            </button>
            <span>Tweet</span>
        </Header>
    )
}