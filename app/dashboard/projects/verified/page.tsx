"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { axiosInstance } from "@/utils/supabase/axios";

import Breadcrumb from "@/components/breadcrumb/Breadcrumb";

export default function VerifiedProjects() {

    

    const [ projects, setProjects ] = useState([]);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data } = await axiosInstance.get("/projects?verified=eq.true");
                setProjects(data);
            } catch (err) {
                setError("Error fetching verified projects.");
            }
        }

        fetchProjects();
    }, []);

    if (error) return <p>{error}</p>;
    if (!projects.length) return <p>No verified projects found.</p>;

    
    const breadcrumbItems = [
        { label: 'Dashboard', url: '/dashboard' },
        { label: 'Projects', url: '/dashboard/projects' },
        { label: 'Verified projects', url: null },
    ];

    return (
        <main className="p-8">
            <Breadcrumb items={breadcrumbItems} />

            <h1 className="text-2xl font-bold mb-6">Verified Projects</h1>
            <div className="space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white p-4 shadow rounded-md">
                        <h2 className="text-xl font-semibold text-zinc-950">{project.title}</h2>
                        <p className="text-gray-600">{project.description}</p>
                        <div className="flex space-x-4 mt-4">
                            <Link
                                href={`/dashboard/projects/verified/${project.id}`}
                                passHref
                                className="text-blue-600 hover:underline"
                            >
                                View Project
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

