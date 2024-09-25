import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function CountyProjects({ params }: { params: { slug: string } }) {
    const supabase = createClient();
    const { data: county } = await supabase.from('counties').select().eq('slug', params.slug).single();

    if (!county) {
        return <p>County not found.</p>;
    }

    const { data: projects, error } = await supabase
        .from('projects')
        .select()
        .eq('county_id', county.id);

    if (error) {
        return <p>Error fetching projects for {county.name}.</p>;
    }

    return (
        <div>
            <h1>Projects in {county.name}</h1>
            <ul>
                {projects?.map((project) => (
                    <li key={project.id}>
                        <Link href={`/projects/${project.id}`}>
                            {project.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

