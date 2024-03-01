import React, { useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import OwnerHotels from './OwnerHotels/OwnerHotels';
import { CursorAnimation } from '../CursorAnimation/CursorAnimation';
import OwnerSidebar from '../OwnerDashboard/OwnerSidebar/OwnerSidebar';
import Footer from '../Footer/Footer';
import HotelReservations from '../HotelReservations/HotelReservations';

const OwnerDashboard = () => {
    useEffect(() => {
        CursorAnimation();
    }, []);

    return (
        <div >
            <Navigation/>.
            <OwnerSidebar/>
            <div id="cursor-blur"></div>
            <div className='manage-sidebar'  style={{ marginTop: '100px' }}>
                <OwnerHotels />
                <HotelReservations hotelId={3}/>
            </div>
            <Footer/>
        </div>
    );
};

export default OwnerDashboard;
