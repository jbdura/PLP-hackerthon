"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { axiosInstance } from "@/utils/supabase/axios";

import Breadcrumb from "@/components/breadcrumb/Breadcrumb";


export default function UnverifiedProjects() {
    const [ projects, setProjects ] = useState([]);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data } = await axiosInstance.get("/projects?verified=eq.false");
                setProjects(data);
            } catch (err) {
                setError("Error fetching unverified projects.");
            }
        }

        fetchProjects();
    }, []);

    if (error) return <p>{error}</p>;
    if (!projects.length) return <p>No verified projects found.</p>;

    const breadcrumbItems = [
        { label: 'Dashboard', url: '/dashboard' },
        { label: 'Projects', url: '/dashboard/projects' },
        { label: 'Unverified', url: '/dashboard/projects/verified' },
        // { label: 'Project ID: $`{123}', url: null }, // Replace with dynamic ID if needed
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




// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { axiosInstance } from "@/utils/supabase/axios";

// export default function UnverifiedProjects() {
//     const [ projects, setProjects ] = useState([]);
//     const [ error, setError ] = useState(null);

//     useEffect(() => {
//         async function fetchProjects() {
//             try {
//                 const { data } = await axiosInstance.get("/projects?verified=false");
//                 setProjects(data);
//             } catch (err) {
//                 setError("Error fetching unverified projects.");
//             }
//         }

//         fetchProjects();
//     }, []);

//     if (error) return <p>{error}</p>;
//     if (!projects.length) return <p>No unverified projects found.</p>;

//     return (
//         <main className="p-8">
//             <h1 className="text-2xl font-bold mb-6">Unverified Projects</h1>
//             <div className="space-y-4">
//                 {projects.map((project) => (
//                     <div key={project.id} className="bg-white p-4 shadow rounded-md">
//                         <h2 className="text-xl font-semibold">{project.title}</h2>
//                         <p className="text-gray-600">{project.description}</p>
//                         <div className="flex space-x-4 mt-4">
//                             <Link href={`/dashboard/projects/${project.id}`} passHref>
//                                 <a className="text-blue-600 hover:underline">View</a>
//                             </Link>
//                             <Link href={`/dashboard/projects/${project.id}/edit`} passHref>
//                                 <a className="text-green-600 hover:underline">Edit</a>
//                             </Link>
//                             <button
//                                 onClick={() => handleVerify(project.id)}
//                                 className="text-orange-600 hover:underline"
//                             >
//                                 Verify
//                             </button>
//                             <button
//                                 onClick={() => handleDelete(project.id)}
//                                 className="text-red-600 hover:underline"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </main>
//     );
// }

// // Handle Delete Functionality
// async function handleDelete(projectId: string) {
//     if (confirm("Are you sure you want to delete this project?")) {
//         try {
//             await axiosInstance.delete(`/projects/${projectId}`);
//             // You may want to trigger a page refresh or refetch the project list after deletion
//             window.location.reload();
//         } catch (err) {
//             alert("Error deleting project.");
//         }
//     }
// }

// // Handle Verify Functionality
// async function handleVerify(projectId: string) {
//     if (confirm("Are you sure you want to verify this project?")) {
//         try {
//             await axiosInstance.patch(`/projects/${projectId}`, { verified: true });
//             window.location.reload();
//         } catch (err) {
//             alert("Error verifying project.");
//         }
//     }
// }
