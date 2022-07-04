import { getFromStorage } from './storage';
import Router from 'next/router';
import { useEffect } from 'react';

export default function Authentication() {
    console.log('Auth Reached');
    let user = getFromStorage('user');
    
    useEffect(() => {
        if(!user) {
            Router.push('/login');
        }
    },[])
}