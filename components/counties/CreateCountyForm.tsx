import { useState } from 'react';
import { axiosInstance } from '@/utils/supabase/axios';

export default function CreateCountyForm({ onCreate }) {
    const [ name, setName ] = useState('');
    const [ countyNumber, setCountyNumber ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ error, setError ] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/counties', {
                name,
                county_number: countyNumber,
                description,
            });
            onCreate(response.data); // Pass the created county back
            setName('');
            setCountyNumber('');
            setDescription('');
        } catch (err) {
            setError(err.message || 'Error creating county');
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
                Create County
            </button>
        </form>
    );
}
