// pages/_app.tsx
import 'tailwindcss/tailwind.css';
import '@/app/globals.css';
import NavBar from '../components/nav/NavBar'; // Import the NavBar component
import NewsletterForm from '../components/nav/NewsLetterForm'; // Import the NewsletterForm component
import CookieConsent from '../components/cookieConsent'; // Import the CookieConsent component
import { AppProps } from 'next/app'; // Import AppProps from Next.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
        <>
            <NavBar />
            <div className=' '>
                <Component {...pageProps} />
            </div>
            <NewsletterForm />
            <CookieConsent /> {/* Add the CookieConsent component */}
        </>
    );
}

export default MyApp;
