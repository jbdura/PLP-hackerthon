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
      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          <h1 className="text-3xl font-bold">Welcome to the County Advocacy Platform</h1>
          <p className="text-lg">Select a county to view its projects.</p>
          <p>Error fetching counties: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center gap-6 px-4 py-8 min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the County Advocacy Platform</h1>
        <p className="text-lg mb-8">Select a county to view its projects.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {counties?.map((county) => (
            <div key={county.id} className="bg-gray-100 shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
              <Link legacyBehavior href={`/counties/${county.slug}`}>
                <a className="text-xl font-semibold text-blue-600 hover:underline">
                  {county.name}
                </a>
              </Link>
              <p className="text-gray-500 mt-2">{county.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}


// import { axiosInstance } from '@/utils/supabase/axios';
// import Link from 'next/link';

// export default async function Index() {
//   let counties = null;
//   let error = null;

//   try {
//     // Fetch counties using Axios server-side
//     const { data } = await axiosInstance.get('/counties', {
//       params: {
//         select: '*', // Select all fields
//       },
//     });
//     counties = data;
//   } catch (err) {
//     error = err.message || 'Error fetching counties';
//   }

//   if (error) {
//     return (
//       <main className="flex-1 flex flex-col gap-6 px-4">
//         <h2>This is the home page</h2>
//         <div>
//           <h1>Welcome to the County Advocacy Platform</h1>
//           <p>Select a county to view its projects.</p>
//           <p>Error fetching counties: {error}</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="flex-1 flex flex-col gap-6 px-4">
//       <h2>This is the home page</h2>
//       <div>
//         <h1>Welcome to the County Advocacy Platform</h1>
//         <p>Select a county to view its projects.</p>
//         <ul>
//           {counties?.map((county) => (
//             <li key={county.id}>
//               <Link href={`/counties/${county.slug}`}>
//                 {county.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </main>
//   );
// }


// // import { createClient } from '@/utils/supabase/server';
// // import Link from 'next/link';



// // export default async function Index() {

// //   const supabase = createClient();
// //   const { data: counties, error } = await supabase.from('counties').select();

// //   if (error) {
// //     return (
// //     <>
// //       <main className="flex-1 flex flex-col gap-6 px-4">
// //         <h2>This is home page</h2>

// //         <div>
// //           <h1>Welcome to the County Advocacy Platform</h1>
// //           <p>Select a county to view its projects.</p>
// //             <p>Error fetching counties.</p>;
// //         </div>
// //       </main>
// //     </>
// //     )
// //   }

// //   return (
// //     <>
// //       <main className="flex-1 flex flex-col gap-6 px-4">
// //         <h2>This is home page</h2>

// //         <div>
// //           <h1>Welcome to the County Advocacy Platform</h1>
// //           <p>Select a county to view its projects.</p>
// //           <ul>
// //             {counties?.map((county) => (
// //               <li key={county.id}>
// //                 <Link href={`/counties/${county.slug}`}>
// //                   {county.name}
// //                 </Link>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       </main>
// //     </>
// //   );
// // }




