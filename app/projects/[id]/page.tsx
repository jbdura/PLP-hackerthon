'use client';

import ShareButton from "@/components/ShareButton";
import { axiosInstance } from "@/utils/supabase/axios";

export default async function ProjectDetails({ params }: { params: { id: string } }) {
    let project = null;
    let error = null;

    try {
        // Fetch the specific project by its ID
        const { data } = await axiosInstance.get(`/projects?id=eq.${params.id}`);
        project = data.length > 0 ? data[ 0 ] : null;
    } catch (err) {
        error = err.message || 'Error fetching project details';
    }

    if (error) {
        return <p>Error loading project details: {error}</p>;
    }

    if (!project) {
        return <p>Project not found</p>;
    }

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/projects/${project.id}`;

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg text-gray-700 mb-6">{project.description}</p>

            {project.status && (
                <div className="mb-4">
                    <span className="font-semibold">Status: </span>{project.status}
                </div>
            )}

            {project.verified !== undefined && (
                <div className="mb-4">
                    <span className="font-semibold">Verified: </span>{project.verified ? 'Yes' : 'No'}
                </div>
            )}

            {/* Display Images */}
            {project.images && project.images.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Images</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {project.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Project Image ${index + 1}`}
                                className="rounded-md shadow-lg"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Downloadable Documents */}
            {project.docs && project.docs.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Documents</h3>
                    <ul className="list-disc ml-5">
                        {project.docs.map((doc, index) => (
                            <li key={index}>
                                <a
                                    href={doc}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Download Document {index + 1}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <p className="text-sm text-gray-500">Created at: {new Date(project.created_at).toLocaleDateString()}</p>
            
            {/* Share Button */}
            <div className="mt-6">
                <ShareButton
                    title={project.title}
                    text={project.description}
                    url={shareUrl}
                />
            </div>
        </main>
    );
}


// import { axiosInstance } from "@/utils/supabase/axios";

// export default async function ProjectDetails({ params }: { params: { id: string } }) {
//     let project = null;
//     let error = null;

//     try {
//         // Fetch the specific project by its ID
//         const { data } = await axiosInstance.get(`/projects/${params.id}`);
//         project = data;
//     } catch (err) {
//         error = err.message || 'Error fetching project details';
//     }

//     if (error) {
//         return <p>Error loading project details: {error}</p>;
//     }

//     return (
//         <main className="p-8">
//             <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
//             <p className="text-lg text-gray-700 mb-6">{project.description}</p>

//             {project.status && (
//                 <div className="mb-4">
//                     <span className="font-semibold">Status: </span>{project.status}
//                 </div>
//             )}

//             {project.verified && (
//                 <div className="mb-4">
//                     <span className="font-semibold">Verified: </span>{project.verified ? 'Yes' : 'No'}
//                 </div>
//             )}

//             {/* Display Images */}
//             {project.images?.length > 0 && (
//                 <div className="mb-6">
//                     <h3 className="text-xl font-semibold mb-2">Images</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {project.images.map((image, index) => (
//                             <img key={index} src={image} alt={`Project Image ${index + 1}`} className="rounded-md shadow-lg" />
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Downloadable Documents */}
//             {project.docs?.length > 0 && (
//                 <div className="mb-6">
//                     <h3 className="text-xl font-semibold mb-2">Documents</h3>
//                     <ul className="list-disc ml-5">
//                         {project.docs.map((doc, index) => (
//                             <li key={index}>
//                                 <a href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                                     Download Document {index + 1}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             <p className="text-sm text-gray-500">Created at: {new Date(project.created_at).toLocaleDateString()}</p>
//         </main>
//     );
// }

// // import { createClient } from '@/utils/supabase/server';

// // export default async function ProjectDetails({ params }: { params: { id: string } }) {
// //       const supabase = createClient();
// //       const { data: project, error } = await supabase
// //         .from('projects')
// //           .select()
// //             .eq('id', params.id)
// //             .single();
        
// //       if (!project) {
// //             return <p>Project not found.</p>;
// //       }

// //       return (
// //             <div>
// //               <h1>{project.title}</h1>
// //             <p>{project.description}</p>
// //               <p>Status: {project.status}</p>
// //             </div>
            
            

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         