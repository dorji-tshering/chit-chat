import GlobalStyles from '../components/styles/global/global.css';
import { ThemeProvider } from 'styled-components';
import ScrollToTop from '../components/ScrollToTop';
import { useEffect, useState } from 'react';
import { StreamClient } from 'getstream';
import Router from 'next/router';
import { StreamApp } from 'react-activity-feed';
import USERS from '../utils/users';
import { getFromStorage } from '../utils/storage'; 
import Authentication from '../utils/auth';
import Login from './login';
import LoadingIndicator from '../components/styles/LoadingIndicator'

const APP_ID = '1196591';
const API_KEY = 'cagbpmqjzekp';

// _app.jsx will be rendered on every page of the application(top-level-component)

function MyApp({ Component, pageProps }) {
    const userId = getFromStorage('user');
    console.log('app.js');

    // check if user is currently logged in
    const user = USERS.find((u) => u.id === userId);
    const [client, setClient] = useState(null);
    const [onLoginPage, setOnLoginPage] = useState(false);
    const [userName, setUserName] = useState(userId);

    useEffect(() => {
        async function init() {
            const client = new StreamClient(API_KEY, user.token, APP_ID);
            await client.user(user.id).getOrCreate({ ...user, token: '' });
            setClient(client);
        }

        if(user === undefined && Router.pathname !== '/login') {
            Router.push('/login');
            setOnLoginPage(true);
        }else if(user === undefined && Router.pathname === '/login') {
            setOnLoginPage(true);
        }else if(user) {
            init();
        }   

        console.log('useeffect');
        }, [userName,])

    if(!client && !onLoginPage) {
        return<LoadingIndicator/>;
    }

    return (
        <>
            {
                onLoginPage ? <>
                    <GlobalStyles/>
                    <Component setOnLoginPage={setOnLoginPage} setUserName={setUserName} {...pageProps} />
                </> 
                : 
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
            }
        </>       
    );
}

export default MyApp;







