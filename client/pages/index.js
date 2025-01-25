import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function App() {
    const router = useRouter();


    useEffect(() => {
        router.push('/hero');
    }, [router]);

    return (
        <div/>
    );
}

export default App;