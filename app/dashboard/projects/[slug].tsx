import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/utils/supabase/axios";
import Link from "next/link";

export default function ProjectDetails() {
    const router = useRouter();
    const { slug } = router.query; // The dynamic slug from URL
    const [ project, setProject ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        if (!router.isReady) return; // Wait for the router to be ready
        if (!slug) return;

        async function fetchProject() {
            try {
                const { data } = await axiosInstance.get(`/projects/${slug}`);
                setProject(data);
            } catch (err) {
                setError("Error fetching project details.");
            }
        }

        fetchProject();
    }, [ router.isReady, slug ]);

    if (error) return <p>{error}</p>;
    if (!project) return <p>Loading...</p>;

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg text-gray-700 mb-6">{project.description}</p>

            {project.status && (
                <div className="mb-4">
                    <span className="font-semibold">Status: </span>
                    {project.status}
                </div>
            )}

            <div className="flex space-x-4">
                <Link href={`/dashboard/projects/${project.id}/edit`} passHref className="text-green-600 hover:underline">
                    Edit
                </Link>
                <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:underline"
                >
                    Delete
                </button>
            </div>
        </main>
    );
}

// Handle Delete Functionality
async function handleDelete(projectId: string) {
    if (confirm("Are you sure you want to delete this project?")) {
        try {
            await axiosInstance.delete(`/projects/${projectId}`);
            window.location.href = "/dashboard/projects";
        } catch (err) {
            alert("Error deleting project.");
        }
    }
}
