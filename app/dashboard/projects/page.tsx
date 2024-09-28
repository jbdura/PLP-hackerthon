import Link from 'next/link';

export default function ProjectsDashboard() {
    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">Projects Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Verified Projects Card */}
                <div className="bg-white shadow-md p-6 rounded-md hover:bg-gray-100 transition">
                    <h2 className="text-2xl font-semibold mb-4">Verified Projects</h2>
                    <p className="text-gray-600 mb-4">Manage all the projects that have been verified.</p>
                    <Link href="/dashboard/projects/verified" className="text-blue-600 hover:underline" passHref>
                        View Verified Projects
                    </Link>
                </div>

                {/* Unverified Projects Card */}
                <div className="bg-white shadow-md p-6 rounded-md hover:bg-gray-100 transition">
                    <h2 className="text-2xl font-semibold mb-4">Unverified Projects</h2>
                    <p className="text-gray-600 mb-4">Review and manage projects that are yet to be verified.</p>
                    <Link href="/dashboard/projects/unverified" className="text-blue-600 hover:underline" passHref >
                        View Unverified Projects
                    </Link>
                </div>
            </div>
        </main>
    );
}
