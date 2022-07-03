import GlobalStyles from '../components/styles/global/global.css';
import { ThemeProvider } from 'styled-components';
import ScrollToTop from '../components/ScrollToTop';
import { useEffect, useState } from 'react';
import { StreamClient } from 'getstream';
import Router from 'next/router';
import { StreamApp } from 'react-activity-feed';
import USERS from '../utils/users';
import { getFromStorage } from '../utils/storage'; 

const APP_ID = '1196591';
const API_KEY = 'cagbpmqjzekp';

// _app.jsx will be rendered on every page of the application(top-level-component)
// the <Component/> is being replaced by the current page component
function MyApp({ Component, pageProps }) {
    const userId = getFromStorage('user');
    console.log('Inside app.js');

    const user = USERS.find((u) => u.id === userId) || USERS[0];

    const [client, setClient] = useState(null);

    useEffect(() => {
        if(userId === undefined) {
            Router.push('/login');
        }
        
        async function init() {
            // initialize a client
            const client = new StreamClient(API_KEY, user.token, APP_ID);
            // get or create a new user in the stream before setting the client
            await client.user(user.id).getOrCreate({ ...user, token: '' });
            setClient(client);
        }

        init()
    }, [])

    if (!client) return <></>

    return (
        <StreamApp token={user.token} appId={APP_ID} apiKey={API_KEY}>
            <ThemeProvider theme={{
                    colors : {
                        primary : "red",
                        secondary : "orange",
                        background: "#f1f1f1",
                    }
                }}
            >
                <GlobalStyles/>
                <ScrollToTop/>
                <Component {...pageProps} />  
            </ThemeProvider>
        </StreamApp>         
    );
}

export default MyApp;







