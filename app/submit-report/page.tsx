"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
    title: Yup.string().required("Project title is required"),
    county: Yup.string().required("County is required"),
    details: Yup.string().required("Details are required"),
    images: Yup.mixed().required("Images are required").test(
        "fileSize",
        "Image should be less than 5 MB",
        (value) => value && value.size <= 5 * 1024 * 1024
    ),
    documents: Yup.mixed().nullable().test(
        "fileSize",
        "Document should be less than 15 MB",
        (value) => !value || (value && value.size <= 15 * 1024 * 1024)
    ), // Marked as nullable so that it's optional
});

export default function SubmitReport() {
    const [ submitSuccess, setSubmitSuccess ] = useState(null);
    const [ submitError, setSubmitError ] = useState(null);

    const initialValues = {
        title: "",
        county: "",
        details: "",
        images: null,
        documents: null, // Optional field
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("county", values.county);
            formData.append("details", values.details);
            if (values.images) formData.append("images", values.images);
            if (values.documents) formData.append("documents", values.documents); // Only append if provided

            // Send form data to your backend or email handler
            await axios.post("/api/send-report", formData);

            setSubmitSuccess("Report submitted successfully!");
            resetForm();
        } catch (error) {
            setSubmitError("Error submitting report. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-gray-100 text-gray-800 shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Submit a Report</h1>
            {submitSuccess && <p className="text-green-600">{submitSuccess}</p>}
            {submitError && <p className="text-red-600">{submitError}</p>}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="space-y-4">
                        {/* Project Title */}
                        <div>
                            <label htmlFor="title" className="block font-semibold">Project Title</label>
                            <Field name="title" type="text" className="mt-1 block w-full p-2 border rounded-md bg-neutral-200" />
                            <ErrorMessage name="title" component="p" className="text-red-600" />
                        </div>

                        {/* County */}
                        <div>
                            <label htmlFor="county" className="block font-semibold">County</label>
                            <Field name="county" type="text" className="bg-neutral-200 mt-1 block w-full p-2 border rounded-md" />
                            <ErrorMessage name="county" component="p" className="text-red-600" />
                        </div>

                        {/* Details */}
                        <div>
                            <label htmlFor="details" className="block font-semibold">Details</label>
                            <Field name="details" as="textarea" rows="4" className="bg-neutral-200 mt-1 block w-full p-2 border rounded-md" />
                            <ErrorMessage name="details" component="p" className="text-red-600" />
                        </div>

                        {/* Images Upload */}
                        <div>
                            <label htmlFor="images" className="block font-semibold">Upload Images (Max 5 MB)</label>
                            <input
                                id="images"
                                name="images"
                                type="file"
                                className="mt-1 block w-full"
                                onChange={(event) => setFieldValue("images", event.currentTarget.files[ 0 ])}
                            />
                            <ErrorMessage name="images" component="p" className="text-red-600" />
                        </div>

                        {/* Documents Upload (Optional) */}
                        <div>
                            <label htmlFor="documents" className="block font-semibold">Upload Documents (Optional, Max 15 MB)</label>
                            <input
                                id="documents"
                                name="documents"
                                type="file"
                                className="mt-1 block w-full"
                                onChange={(event) => setFieldValue("documents", event.currentTarget.files[ 0 ])}
                            />
                            <ErrorMessage name="documents" component="p" className="text-red-600" />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Report"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}


// "use client";

// import { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";

// // Validation Schema using Yup
// const validationSchema = Yup.object().shape({
//     title: Yup.string().required("Project title is required"),
//     county: Yup.string().required("County is required"),
//     details: Yup.string().required("Details are required"),
//     images: Yup.mixed().required("Images are required").test(
//         "fileSize",
//         "Image should be less than 5 MB",
//         (value) => !value || (value && value.size <= 5 * 1024 * 1024)
//     ),
//     documents: Yup.mixed().test(
//         "fileSize",
//         "Document should be less than 15 MB",
//         (value) => !value || (value && value.size <= 15 * 1024 * 1024)
//     ),
// });

// export default function SubmitReport() {
//     const [ submitSuccess, setSubmitSuccess ] = useState(null);
//     const [ submitError, setSubmitError ] = useState(null);

//     const initialValues = {
//         title: "",
//         county: "",
//         details: "",
//         images: null,
//         documents: null,
//     };

//     const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//         try {
//             const formData = new FormData();
//             formData.append("title", values.title);
//             formData.append("county", values.county);
//             formData.append("details", values.details);
//             if (values.images) formData.append("images", values.images);
//             if (values.documents) formData.append("documents", values.documents);

//             // Send form data to your backend or email handler
//             await axios.post("/api/send-report", formData);

//             setSubmitSuccess("Report submitted successfully!");
//             resetForm();
//         } catch (error) {
//             setSubmitError("Error submitting report. Please try again.");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <div className="max-w-lg mx-auto p-8 bg-gray-100 text-gray-800 shadow-md rounded-md">
//             <h1 className="text-2xl font-bold mb-4">Submit a Report</h1>
//             {submitSuccess && <p className="text-green-600">{submitSuccess}</p>}
//             {submitError && <p className="text-red-600">{submitError}</p>}

//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//             >
//                 {({ setFieldValue, isSubmitting }) => (
//                     <Form className="space-y-4">
//                         {/* Project Title */}
//                         <div>
//                             <label htmlFor="title" className="block font-semibold">Project Title</label>
//                             <Field name="title" type="text" className="mt-1 block w-full p-2 border rounded-md bg-neutral-200" />
//                             <ErrorMessage name="title" component="p" className="text-red-600" />
//                         </div>

//                         {/* County */}
//                         <div>
//                             <label htmlFor="county" className="block font-semibold">County</label>
//                             <Field name="county" type="text" className="bg-neutral-200 mt-1 block w-full p-2 border rounded-md" />
//                             <ErrorMessage name="county" component="p" className="text-red-600" />
//                         </div>

//                         {/* Details */}
//                         <div>
//                             <label htmlFor="details" className="block font-semibold">Details</label>
//                             <Field name="details" as="textarea" rows="4" className="bg-neutral-200 mt-1 block w-full p-2 border rounded-md" />
//                             <ErrorMessage name="details" component="p" className="text-red-600" />
//                         </div>

//                         {/* Images Upload */}
//                         <div>
//                             <label htmlFor="images" className="block font-semibold">Upload Images (Max 5 MB)</label>
//                             <input
//                                 id="images"
//                                 name="images"
//                                 type="file"
//                                 className="mt-1 block w-full"
//                                 onChange={(event) => setFieldValue("images", event.currentTarget.files[ 0 ])}
//                             />
//                             <ErrorMessage name="images" component="p" className="text-red-600" />
//                         </div>

//                         {/* Documents Upload (Optional) */}
//                         <div>
//                             <label htmlFor="documents" className="block font-semibold">Upload Documents (Optional, Max 15 MB)</label>
//                             <input
//                                 id="documents"
//                                 name="documents"
//                                 type="file"
//                                 className="mt-1 block w-full"
//                                 onChange={(event) => setFieldValue("documents", event.currentTarget.files[ 0 ])}
//                             />
//                             <ErrorMessage name="documents" component="p" className="text-red-600" />
//                         </div>

//                         {/* Submit Button */}
//                         <button
//                             type="submit"
//                             className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//                             disabled={isSubmitting}
//                         >
//                             {isSubmitting ? "Submitting..." : "Submit Report"}
//                         </button>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     );
// }
