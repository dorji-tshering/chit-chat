import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ScrollToTop(){
    const router = useRouter();
    useEffect(()=>{
      const handleRouteChange = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    },[]);

    return ('');
}