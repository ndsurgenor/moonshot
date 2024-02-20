import React, { createContext, useContext, useEffect, useState } from 'react';

import { axiosRes } from '../api/axiosDefaults';


export const DisplayedProfileContext = createContext();
export const SetDisplayedProfileContext = createContext();

export const useDisplayedProfile = () => useContext(DisplayedProfileContext);
export const useSetDisplayedProfile = () => useContext(SetDisplayedProfileContext);

export const DisplayedProfileProvider = ({ children }) => {

    const [displayedProfile, setDisplayedProfile] = useState(null);
    const handleMount = async () => {
        try {
            const { data } = await axiosRes.get(`/user-profiles/:id`);
            setDisplayedProfile(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleMount();
    }, []);    

    return (
        <DisplayedProfileContext.Provider value={displayedProfile}>
            <SetDisplayedProfileContext.Provider value={setDisplayedProfile}>
                {children}
            </SetDisplayedProfileContext.Provider>
        </DisplayedProfileContext.Provider>
    );
};