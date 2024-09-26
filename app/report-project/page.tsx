"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { axiosInstance } from "@/utils/supabase/axios";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    county: Yup.string().required("County is required"),
    status: Yup.string().required("Project status is required"),
    description: Yup.string().required("Description is required"),
    docs: Yup.mixed()
        .test("fileSize", "Docs should be less than 15 MB", (value) => {
            if (!value) return true; // No file upload
            return value.size <= 15 * 1024 * 1024;
        }),
    images: Yup.mixed()
        .test("fileSize", "Image should be less than 5 MB", (value) => {
            if (!value) return true; // No file upload
            return value.size <= 5 * 1024 * 1024;
        }),
});

// Main Form Component
export default function ProjectSubmissionForm() {
    const [ counties, setCounties ] = useState([]);
    const [ statuses, setStatuses ] = useState([]);
    const [ submitSuccess, setSubmitSuccess ] = useState(null);
    const [ submitError, setSubmitError ] = useState(null);

    useEffect(() => {
        // Fetch counties and project statuses for dropdowns
        async function fetchOptions() {
            try {
                const countiesRes = await axiosInstance.get("/counties");
                const statusesRes = await axiosInstance.get("/project_status");

                setCounties(countiesRes.data);
                setStatuses(statusesRes.data);
            } catch (err) {
                console.error("Error fetching options:", err);
            }
        }

        fetchOptions();
    }, []);

    // Initial Form Values
    const initialValues = {
        title: "",
        county: "",
        status: "",
        description: "",
        docs: null,
        images: null,
    };

    // Handle Form Submission
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("county", values.county);
            formData.append("status", values.status);
            formData.append("description", values.description);
            if (values.docs) {
                formData.append("docs", values.docs);
            }
            if (values.images) {
                formData.append("images", values.images);
            }

            // Post form data to Supabase endpoint
            await axiosInstance.post("/projects", formData);

            setSubmitSuccess("Project submitted successfully!");
            resetForm();
        } catch (error) {
            setSubmitError("Error submitting project. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-slate-200 text-zinc-950 shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Submit a project</h1>
            {submitSuccess && <p className="text-green-600">{submitSuccess}</p>}
            {submitError && <p className="text-red-600">{submitError}</p>}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
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
                            {isSubmitting ? "Submitting..." : "Submit Project"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
