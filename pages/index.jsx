import Router from 'next/router';
import { getFromStorage } from '../utils/storage';
import { useEffect } from 'react';
import LoadingIndicator from '../components/styles/LoadingIndicator';

export default function Index() {
	const userId = getFromStorage('user');
    if(userId) {
        Router.push('/home');
    }
}