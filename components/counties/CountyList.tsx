import { useState } from 'react';
import { axiosInstance } from '@/utils/supabase/axios';

export default function CountyList({ counties, onDelete, onEdit }) {
    const [ countyToDelete, setCountyToDelete ] = useState(null);
    const [ isDeleting, setIsDeleting ] = useState(false);

    const handleDelete = async (id) => {
        setIsDeleting(true);
        try {
            await axiosInstance.delete(`/counties/${id}`);
            onDelete(id); // Remove the deleted county from the list
        } catch (err) {
            console.error('Error deleting county:', err);
        } finally {
            setIsDeleting(false);
            setCountyToDelete(null); // Close the confirmation dialog
        }
    };

    return (
        <div className="space-y-4">
            {counties.map((county) => (
                <div
                    key={county.id}
                    className="bg-gray-100 p-4 rounded-md shadow-sm flex justify-between items-center"
                >
                    <div>
                        <h3 className="text-lg font-medium text-blue-500">{county.name}</h3>
                        <p className="text-gray-500">{county.description}</p>
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => onEdit(county)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setCountyToDelete(county)}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {/* Confirmation Dialog */}
            {countyToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">
                            Are you sure you want to delete <strong>{countyToDelete.name}</strong>?
                        </h3>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setCountyToDelete(null)}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(countyToDelete.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
