import React, { useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import OwnerHotels from './OwnerHotels/OwnerHotels';
import { CursorAnimation } from '../CursorAnimation/CursorAnimation';
import OwnerSidebar from '../OwnerDashboard/OwnerSidebar/OwnerSidebar';

const OwnerDashboard = () => {
    useEffect(() => {
        CursorAnimation();
    }, []);

    return (
        <div >
            <Navigation />.
            <OwnerSidebar/>
            <div id="cursor-blur"></div>
            <div style={{ marginTop: '100px' }}>
                {/* <h2>Welcome to Owner Dashboard</h2> */}
                <OwnerHotels />
            </div>
        </div>
    );
};

export default OwnerDashboard;
