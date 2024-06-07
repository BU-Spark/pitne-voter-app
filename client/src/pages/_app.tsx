// pages/_app.tsx
import 'tailwindcss/tailwind.css';
import '@/app/globals.css'
import NavBar from '../components/nav/NavBar'; // Import the NavBar component
import { AppProps } from 'next/app'; // Import AppProps from Next.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ActivePageProvider } from '@/contexts/ActivePageContext';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    // Scroll to top on route change
    useEffect(() => {
        const handleRouteChange = () => {
            window.scrollTo(0, 0);
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (
        <ActivePageProvider>
            <div className='mx-4'>
                <Component {...pageProps} />
            </div>
        </ActivePageProvider>
    );
}

export default MyApp;
