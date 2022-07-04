import Layout from '../components/styles/layout/Layout';
import HomeContent from '../components/styles/home/HomeContent';
import {useEffect} from 'react';

export default function Home({topName}) {
    console.log('Home');

  return (
    <Layout>
      <HomeContent />
    </Layout>
  )
}