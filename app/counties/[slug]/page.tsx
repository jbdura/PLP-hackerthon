import { axiosInstance } from "@/utils/supabase/axios";
import Link from "next/link";

import Breadcrumb from "@/components/breadcrumb/Breadcrumb";

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
    // Safely cast the error to an instance of Error
    if (err instanceof Error) {
      error = err.message || 'Error fetching projects';
    } else {
      error = 'Error fetching projects'; // Fallback if err is not an Error instance
    }
  }

  if (error) {
    return <p>Error loading projects: {error}</p>;
  }

  // breadcrumbs details
  const countyName = decodeURIComponent(params.slug); // Assuming slug holds the county name

  const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: countyName + ' Projects', url: null }, // Replace with dynamic county name
  ];

  return (
    <main className="p-8">
      <Breadcrumb items={breadcrumbItems} />

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
