import { useEffect, useState } from 'react';


// Adapted from code by Ferdinand Steenkamp at the following link:
// https://forum.rescript-lang.org/t/addeventlistener-for-window-resize/1254

const useViewportWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return { width };
};

export default useViewportWidth