import { createClient } from '@/utils/supabase/server';

export default async function ProjectDetails({ params }: { params: { id: string } }) {
    const supabase = createClient();
    const { data: project, error } = await supabase
        .from('projects')
        .select()
        .eq('id', params.id)
        .single();

    if (!project) {
        return <p>Project not found.</p>;
    }

    return (
        <div>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>
        </div>
    );
}

