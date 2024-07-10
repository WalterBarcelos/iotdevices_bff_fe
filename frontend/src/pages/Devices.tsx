import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDevices, refreshDevices} from '../store/deviceSlice';
import {RootState, AppDispatch} from '../store/store';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import DevicesTable from '../components/DevicesTable';
import DevicesTablePagination from '../components/DevicesTablePagination';

const Devices: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const navigate = useNavigate();
    const {devices, loading, error} = useSelector((state: RootState) => state.devices);
    const [currentPage, setCurrentPage] = useState(1);
    const [devicesPerPage] = useState(10);

    useEffect(() => {
        dispatch(fetchDevices());
    }, [dispatch]);

    useEffect(() => {
        if (location.state && location.state.refresh) {
            dispatch(refreshDevices());
            dispatch(fetchDevices());
        }
    }, [location, dispatch]);

    const indexOfLastDevice = currentPage * devicesPerPage;
    const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
    const currentDevices = devices.slice(indexOfFirstDevice, indexOfLastDevice);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleCreateDevice = () => {
        navigate('/devices/new');
    };

    return (
        <div>
            <div className="bg-red-600 p-4 navbar-h">
                <div className="container mx-auto">
                    <h1 className="text-white text-2xl font-bold">Devices</h1>
                    <div className="ml-auto float-right new-device-button-adjust">
                        <button
                            onClick={handleCreateDevice}
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Create Device
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-4 container mx-auto">
                <DevicesTable devices={currentDevices}/>
                <DevicesTablePagination
                    devicesPerPage={devicesPerPage}
                    totalDevices={devices.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default Devices;
