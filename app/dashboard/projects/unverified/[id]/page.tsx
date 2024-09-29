"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/utils/supabase/axios";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";

// Validation Schema using Yup
// Validation Schema using Yup
const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    county: Yup.string().required("County is required"),
    status: Yup.string().required("Project status is required"),
    description: Yup.string().required("Description is required"),
    docs: Yup.mixed()
        .test("fileSize", "Docs should be less than 15 MB", (value) => {
            if (!value) return true; // No file uploaded
            return value instanceof File && value.size <= 15 * 1024 * 1024; // Ensure value is a File object
        }),
    images: Yup.mixed()
        .test("fileSize", "Image should be less than 5 MB", (value) => {
            if (!value) return true; // No file uploaded
            return value instanceof File && value.size <= 5 * 1024 * 1024; // Ensure value is a File object
        }),
    verified: Yup.boolean(),
});


export default function ProjectEditForm({ params }: { params: { id: string } }) {
    const { id } = params;
    const router = useRouter();
    const [ counties, setCounties ] = useState([]);
    const [ statuses, setStatuses ] = useState([]);
    const [ project, setProject ] = useState(null);
    const [ submitSuccess, setSubmitSuccess ] = useState(null);
    const [ submitError, setSubmitError ] = useState(null);

    useEffect(() => {
        // Fetch counties, statuses, and project details
        async function fetchData() {
            try {
                const countiesRes = await axiosInstance.get("/counties");
                const statusesRes = await axiosInstance.get("/project_status");
                const projectRes = await axiosInstance.get(`/projects?id=eq.${id}`);

                setCounties(countiesRes.data);
                setStatuses(statusesRes.data);
                setProject(projectRes.data[ 0 ]); // Assuming project data comes as an array
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

        if (id) fetchData();
    }, [ id ]);

    if (!project) return <p>Loading...</p>;

    const initialValues = {
        title: project.title || "",
        county: project.county || "",
        status: project.status || "",
        description: project.description || "",
        docs: null,
        images: null,
        verified: project.verified || false,
    };

    // Handle form submission for editing
    const handleEditSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("county", values.county);
            formData.append("status", values.status);
            formData.append("description", values.description);
            formData.append("verified", values.verified ? "true" : "false");
            if (values.docs) formData.append("docs", values.docs);
            if (values.images) formData.append("images", values.images);

            await axiosInstance.patch(`/projects?id=eq.${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSubmitSuccess("Project updated successfully!");
            router.push("/dashboard/projects/verified");
        } catch (error) {
            setSubmitError("Error updating project. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // Handle project deletion
    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this project?")) {
            try {
                await axiosInstance.delete(`/projects?id=eq.${id}`);
                alert("Project deleted successfully.");
                router.push("/dashboard/projects/verified");
            } catch (error) {
                alert("Error deleting project.");
            }
        }
    };

    // Bread crumb details
    const breadcrumbItems = [
        { label: 'Dashboard', url: '/dashboard' },
        { label: 'Projects', url: '/dashboard/projects' },
        { label: 'Unverified', url: '/dashboard/projects/verified' },
        { label: 'Edit project', url: null }, // Replace with dynamic ID if needed
    ];


    return (
        <div className="max-w-lg mx-auto p-8 bg-slate-200 text-zinc-950 shadow-md rounded-md">
            <Breadcrumb items={breadcrumbItems} />

            <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
            {submitSuccess && <p className="text-green-600">{submitSuccess}</p>}
            {submitError && <p className="text-red-600">{submitError}</p>}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleEditSubmit}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="space-y-4">
                        {/* Title Field */}
                        <div>
                            <label htmlFor="title" className="block font-semibold">Project Title</label>
                            <Field name="title" type="text" className="mt-1 block w-full border rounded-md p-2 bg-sky-50" />
                            <ErrorMessage name="title" component="p" className="text-red-600" />
                        </div>

                        {/* County Dropdown */}
                        <div>
                            <label htmlFor="county" className="block font-semibold">County</label>
                            <Field name="county" as="select" className="mt-1 block w-full border rounded-md p-2 bg-sky-50">
                                <option value="">Select County</option>
                                {counties.map((county) => (
                                    <option key={county.name} value={county.name}>
                                        {county.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="county" component="p" className="text-red-600" />
                        </div>

                        {/* Status Dropdown */}
                        <div>
                            <label htmlFor="status" className="block font-semibold">Project Status</label>
                            <Field name="status" as="select" className="mt-1 block w-full border rounded-md p-2 bg-sky-50">
                                <option value="">Select Status</option>
                                {statuses.map((status) => (
                                    <option key={status.status_name} value={status.status_name}>
                                        {status.status_name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="status" component="p" className="text-red-600" />
                        </div>

                        {/* Description Field */}
                        <div>
                            <label htmlFor="description" className="block font-semibold">Description</label>
                            <Field name="description" as="textarea" rows="4" className="mt-1 block w-full border rounded-md p-2 bg-sky-50" />
                            <ErrorMessage name="description" component="p" className="text-red-600" />
                        </div>

                        {/* Verified Checkbox */}
                        <div className="flex items-center">
                            <Field type="checkbox" name="verified" id="verified" />
                            <label htmlFor="verified" className="ml-2 font-semibold">Verified</label>
                        </div>

                        {/* Docs Upload */}
                        <div>
                            <label htmlFor="docs" className="block font-semibold">Upload Documents (Max 15 MB)</label>
                            <input
                                id="docs"
                                name="docs"
                                type="file"
                                className="mt-1 block w-full"
                                onChange={(event) => setFieldValue("docs", event.currentTarget.files[ 0 ])}
                            />
                            <ErrorMessage name="docs" component="p" className="text-red-600" />
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Updating..." : "Update Project"}
                        </button>

                        {/* Delete Button */}
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4"
                        >
                            Delete Project
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

