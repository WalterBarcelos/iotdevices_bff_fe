import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {Device} from '../store/deviceSlice';
import {Link} from 'react-router-dom';
import { formatToLocalDateTime } from '../utils/utils';

const DeviceDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [device, setDevice] = useState<Device | null>(null);
    const {devices} = useSelector((state: RootState) => state.devices);

    useEffect(() => {
        const foundDevice = devices.find((d) => d.id === id);
        if (foundDevice) {
            setDevice(foundDevice);
        }
    }, [id, devices]);

    if (!device) {
        return <p>Loading...</p>;
    }

    return (
      <div>
        <div className="bg-red-600 p-4 navbar-h">
            <div className="container mx-auto">
                <h1 className="text-white text-2xl font-bold">Device Details</h1>
            </div>
        </div>
        <div className="p-4">
            <div className="mb-4 container mx-auto">
                <strong>Name:</strong> {device.name}
            </div>
            <div className="mb-4 container mx-auto">
                <strong>Mobile Number:</strong> {device.mobileNumber}
            </div>
            <div className="mb-4 container mx-auto">
                <strong>Last Connection:</strong> {formatToLocalDateTime(device.lastConnection)}
            </div>
            <div className="mb-4 container mx-auto">
                <strong>Latitude:</strong> {device.latitude}
            </div>
            <div className="mb-4 container mx-auto">
                <strong>Longitude:</strong> {device.longitude}
            </div>
            <div className="mb-4 container mx-auto">
              <Link to="/devices" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Back to Devices
              </Link>
            </div>
        </div>
      </div>
    );
};

export default DeviceDetails;
