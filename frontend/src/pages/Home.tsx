import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchDevices} from '../store/deviceSlice';
import {AppDispatch} from '../store/store';
import MapView from '../components/MapView';

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchDevices());
    }, [dispatch]);

    return (
        <div>
            <div className="bg-red-600 p-4 navbar-h">
                <div className="container mx-auto">
                    <h1 className="text-white text-2xl font-bold">Home</h1>
                </div>
            </div>
            <MapView/>
        </div>
    );
};

export default Home;
