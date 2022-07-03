import Router from 'next/router';
import { getFromStorage } from '../utils/storage';

export default function Home() {
	const userId = getFromStorage('user');
    
    if(userId === undefined) {
        Router.push('/login');
    }else {
        Router.push('/home');
    }

	return <></>;
}