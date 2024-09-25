import { axiosInstance } from '@/utils/supabase/axios';
import Link from 'next/link';

export default async function Index() {
  let counties = null;
  let error = null;

  try {
    // Fetch counties using Axios server-side
    const { data } = await axiosInstance.get('/counties', {
      params: {
        select: '*', // Select all fields
      },
    });
    counties = data;
  } catch (err) {
    error = err.message || 'Error fetching counties';
  }

  if (error) {
    return (
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2>This is the home page</h2>
        <div>
          <h1>Welcome to the County Advocacy Platform</h1>
          <p>Select a county to view its projects.</p>
          <p>Error fetching counties: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <h2>This is the home page</h2>
      <div>
        <h1>Welcome to the County Advocacy Platform</h1>
        <p>Select a county to view its projects.</p>
        <ul>
          {counties?.map((county) => (
            <li key={county.id}>
              <Link href={`/counties/${county.slug}`}>
                {county.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}


// import { createClient } from '@/utils/supabase/server';
// import Link from 'next/link';



// export default async function Index() {

//   const supabase = createClient();
//   const { data: counties, error } = await supabase.from('counties').select();

//   if (error) {
//     return (
//     <>
//       <main className="flex-1 flex flex-col gap-6 px-4">
//         <h2>This is home page</h2>

//         <div>
//           <h1>Welcome to the County Advocacy Platform</h1>
//           <p>Select a county to view its projects.</p>
//             <p>Error fetching counties.</p>;
//         </div>
//       </main>
//     </>
//     )
//   }

//   return (
//     <>
//       <main className="flex-1 flex flex-col gap-6 px-4">
//         <h2>This is home page</h2>

//         <div>
//           <h1>Welcome to the County Advocacy Platform</h1>
//           <p>Select a county to view its projects.</p>
//           <ul>
//             {counties?.map((county) => (
//               <li key={county.id}>
//                 <Link href={`/counties/${county.slug}`}>
//                   {county.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </main>
//     </>
//   );
// }




