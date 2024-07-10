import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createDevice, fetchDevices} from '../store/deviceSlice';
import {useNavigate} from 'react-router-dom';
import {AppDispatch} from '../store/store';
import { formatDateTimeUTC } from '../utils/utils';

const CreateDeviceForm: React.FC = () => {
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [lastConnection, setLastConnection] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const formattedLastConnection = formatDateTimeUTC(lastConnection);
      await dispatch(createDevice({name, mobileNumber, lastConnection: formattedLastConnection, latitude, longitude}));
      await dispatch(fetchDevices()); // Fetch devices after creation
      navigate('/devices', {state: {reload: true}});
      window.location.reload(); // Force page reload
    };

    return (
        <div>
            <div className="bg-red-600 p-4">
                <div className="container mx-auto">
                    <h1 className="text-white text-2xl font-bold">Create Device</h1>
                </div>
            </div>
            <div className="p-4 container mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="container mx-auto">
                        <div className="mt-2">
                            <label className="block">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mt-2">
                            <label className="block">Mobile Number</label>
                            <input
                                type="text"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mt-2">
                            <label className="block">Last Connection</label>
                            <input
                                type="datetime-local"
                                value={lastConnection}
                                onChange={(e) => setLastConnection(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mt-2">
                            <label className="block">Latitude</label>
                            <input
                                type="text"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mt-2">
                            <label className="block">Longitude</label>
                            <input
                                type="text"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDeviceForm;
