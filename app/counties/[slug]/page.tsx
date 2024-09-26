import { axiosInstance } from "@/utils/supabase/axios";
import Link from "next/link";

export default async function CountyProjects({ params }: { params: { slug: string } }) {
  let projects = null;
  let error = null;

  try {
    // Step 1: Fetch projects filtered by county and verification status on the server
    const { data } = await axiosInstance.get('/projects', {
      params: {
        county: `eq.${params.slug}`,
        verified: 'eq.true',
      },
    });

    projects = data;
  } catch (err) {
    error = err.message || 'Error fetching projects';
  }

  if (error) {
    return <p>Error loading projects: {error}</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Projects in {params.slug}</h1>
      <div className="space-y-4">
        {projects?.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="border-b pb-4 mb-4">
              <Link href={`/projects/${project.id}`} className="text-2xl text-blue-600 hover:underline">
                  {project.title}
              </Link>
              <p className="text-gray-500 mt-2">
                {project.description.length > 100
                  ? `${project.description.slice(0, 100)}...`
                  : project.description}
              </p>
            </div>
          ))
        ) : (
          <p>No projects found for {params.slug}.</p>
        )}
      </div>
    </main>
  );
}


// import { axiosInstance } from "@/utils/supabase/axios";
// import Link from "next/link";

// export default async function CountyProjects({ params }: { params: { slug: string } }) {
//   let projects = null;
//   let error = null;

//   try {
//     // Step 1: Fetch all projects
//     const { data } = await axiosInstance.get('/projects');

//     // Step 2: Filter projects based on county and verification status
//     projects = data.filter(
//       (project) => project.county.toLowerCase() === params.slug.toLowerCase() && project.verified === true
//     );
//   } catch (err) {
//     error = err.message || 'Error fetching projects';
//   }

//   if (error) {
//     return <p>Error loading projects: {error}</p>;
//   }

//   return (
//     <main className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Projects in {params.slug}</h1>
//       <div className="space-y-4">
//         {projects?.length > 0 ? (
//           projects.map((project) => (
//             <div key={project.id} className="border-b pb-4 mb-4">
//               <Link legacyBehavior href={`/projects/${project.id}`}>
//                 <a className="text-2xl text-blue-600 hover:underline">
//                   {project.title}
//                 </a>
//               </Link>
//               <p className="text-gray-500 mt-2">
//                 {project.description.length > 100
//                   ? `${project.description.slice(0, 100)}...`
//                   : project.description}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p>No projects found for {params.slug}.</p>
//         )}
//       </div>
//     </main>
//   );
// }



// // import { axiosInstance } from "@/utils/supabase/axios";
// // import Link from "next/link";

// // export default async function CountyProjects({ params }: { params: { slug: string } }) {
// //   let projects = null;
// //   let error = null;

// //   try {
// //     // Fetch projects related to the county and filter verified projects
// //     const { data } = await axiosInstance.get('/projects', {
// //       params: {
// //         county: params.slug,
// //         verified: true, // Only fetch verified projects
// //       },
// //     });
// //     projects = data;
// //   } catch (err) {
// //     error = err.message || 'Error fetching projects';
// //   }

// //   if (error) {
// //     return <p>Error loading projects: {error}</p>;
// //   }

// //   return (
// //     <main className="p-8">
// //       <h1 className="text-3xl font-bold mb-6">Projects in {params.slug}</h1>
// //       <div className="space-y-4">
// //         {projects?.length > 0 ? (
// //           projects.map((project) => (
// //             <div key={project.id} className="border-b pb-4 mb-4">
// //               <Link href={`/projects/${project.id}`}>
// //                 <a className="text-2xl text-blue-600 hover:underline">
// //                   {project.title}
// //                 </a>
// //               </Link>
// //               <p className="text-gray-500 mt-2">
// //                 {project.description.length > 100
// //                   ? `${project.description.slice(0, 100)}...`
// //                   : project.description}
// //               </p>
// //             </div>
// //           ))
// //         ) : (
// //           <p>No projects found for {params.slug}.</p>
// //         )}
// //       </div>
// //     </main>
// //   );
// // }


// // // import { createClient } from '@/utils/supabase/server';
// // // import Link from 'next/link';

// // // export default async function CountyProjects({ params }: { params: { slug: string } }) {
// // //     const supabase = createClient();
// // //     const { data: county } = await supabase.from('counties').select().eq('slug', params.slug).single();

// // //     if (!county) {
// // //         return <p>County not found.</p>;
// // //     }

// // //     const { data: projects, error } = await supabase
// // //         .from('projects')
// // //         .select()
// // //         .eq('county_id', county.id);

// // //     if (error) {
// // //         return <p>Error fetching projects for {county.name}.</p>;
// // //     }

// // //     return (
// // //         <div>
// // //             <h1>Projects in {county.name}</h1>
// // //             <ul>
// // //                 {projects?.map((project) => (
// // //                     <li key={project.id}>
// // //                         <Link href={`/projects/${project.id}`}>
// // //                             {project.title}
// // //                         </Link>
// // //                     </li>
// // //                 ))}
// // //             </ul>
// // //         </div>
// // //     );
// // // }

