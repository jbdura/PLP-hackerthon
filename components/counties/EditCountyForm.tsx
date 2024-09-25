import { useState } from 'react';
import { axiosInstance } from '@/utils/supabase/axios';

export default function EditCountyForm({ county, onUpdate }) {
    const [ name, setName ] = useState(county.name);
    const [ countyNumber, setCountyNumber ] = useState(county.county_number);
    const [ description, setDescription ] = useState(county.description);
    const [ error, setError ] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.put(`/counties/${county.id}`, {
                name,
                county_number: countyNumber,
                description,
            });
            onUpdate(response.data); // Pass the updated county back
        } catch (err) {
            setError(err.message || 'Error updating county');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <div>
                <label className="block text-sm font-medium text-gray-700">County Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">County Number</label>
                <input
                    type="number"
                    value={countyNumber}
                    onChange={(e) => setCountyNumber(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Update County
            </button>
        </form>
    );
}
