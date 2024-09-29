'use client';

import { useState, useEffect } from 'react';
import CreateCountyForm from '@/components/counties/CreateCountyForm';
import EditCountyForm from '@/components/counties/EditCountyForm';
import CountyList from '@/components/counties/CountyList';
import { axiosInstance } from '@/utils/supabase/axios';

import Breadcrumb from "@/components/breadcrumb/Breadcrumb"


export default function Dashboard() {

    const breadcrumbItems = [
        { label: 'Dashboard', url: '/dashboard' },
        { label: 'Counties', url: '/dashboard/counties' },
    ];

    const [ counties, setCounties ] = useState([]);
    const [ selectedCounty, setSelectedCounty ] = useState(null);

    useEffect(() => {
        const fetchCounties = async () => {
            try {
                const { data } = await axiosInstance.get('/counties', {
                    params: {
                        select: '*',
                    },
                });
                setCounties(data);
            } catch (err) {
                console.error('Error fetching counties:', err);
            }
        };

        fetchCounties();
    }, []);

    const handleCreate = (newCounty) => {
        setCounties((prev) => [ ...prev, newCounty ]);
    };

    const handleUpdate = (updatedCounty) => {
        setCounties((prev) =>
            prev.map((county) => (county.id === updatedCounty.id ? updatedCounty : county))
        );
        setSelectedCounty(null); // Deselect after update
    };

    const handleDelete = (deletedId) => {
        setCounties((prev) => prev.filter((county) => county.id !== deletedId));
    };

    const handleEdit = (county) => {
        setSelectedCounty(county); // Select the county to edit
    };

    return (
        <main className="flex-1 flex flex-col gap-6 px-4">
            <Breadcrumb items={breadcrumbItems} />

            <h2 className="font-medium text-xl mb-4">Admin Dashboard - Manage Counties</h2>

            {selectedCounty ? (
                <EditCountyForm county={selectedCounty} onUpdate={handleUpdate} />
            ) : (
                <CreateCountyForm onCreate={handleCreate} />
            )}

            <CountyList counties={counties} onDelete={handleDelete} onEdit={handleEdit} />

            {selectedCounty && (
                <button onClick={() => setSelectedCounty(null)} className="bg-green-600 text-white px-3 py-1 rounded">
                    Add New County
                </button>
            )}
        </main>
    );
}
