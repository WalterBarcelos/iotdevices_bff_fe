import React from 'react';

interface PaginationProps {
    devicesPerPage: number;
    totalDevices: number;
    paginate: (pageNumber: number) => void;
}

const DevicesTablePagination: React.FC<PaginationProps> = ({devicesPerPage, totalDevices, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalDevices / devicesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4">
            <ul className="flex justify-center">
                {pageNumbers.map((number) => (
                    <li key={number} className="mx-1">
                        <button
                            onClick={() => paginate(number)}
                            className="px-3 py-1 border rounded hover:bg-gray-200"
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default DevicesTablePagination;
