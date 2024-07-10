import React from 'react';
import {Link} from 'react-router-dom';
import { formatToLocalDateTime } from '../utils/utils';

interface Device {
    id: string;
    name: string;
    mobileNumber: string;
    lastConnection: string;
}

interface DevicesTableProps {
    devices: Device[];
}

const DevicesTable: React.FC<DevicesTableProps> = ({devices}) => {
    return (
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
            <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Mobile Number</th>
                <th className="px-4 py-2 border">Last Connection</th>
            </tr>
            </thead>
            <tbody>
            {devices.map((device) => (
                <tr key={device.id} className="border-t">
                    <td className="px-4 py-2 border">
                        <Link to={`/devices/${device.id}`} className="text-blue-500 hover:underline">
                            {device.name}
                        </Link>
                    </td>
                    <td className="px-4 py-2 border">{device.mobileNumber}</td>
                    <td className="px-4 py-2 border">{formatToLocalDateTime(device.lastConnection)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DevicesTable;
