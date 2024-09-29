"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/utils/supabase/axios";
import FileUpload from "./FileUpload"; // Import the file upload component

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  county: Yup.string().required("County is required"),
  status: Yup.string().required("Project status is required"),
  description: Yup.string().required("Description is required"),
});

// Main Form Component
export default function ProjectSubmissionForm() {
  const [ counties, setCounties ] = useState<any[]>([]);
  const [ statuses, setStatuses ] = useState<any[]>([]);
  const [ submitSuccess, setSubmitSuccess ] = useState<string | null>(null);
  const [ submitError, setSubmitError ] = useState<string | null>(null);

  useEffect(() => {
    // Fetch counties and project statuses for dropdowns
    async function fetchOptions() {
      try {
        // Fetch counties
        const countiesRes = await axiosInstance.get("/counties");
        console.log("Counties fetched:", countiesRes.data); // Log the counties data
        setCounties(countiesRes.data);

        // Fetch project statuses
        const statusesRes = await axiosInstance.get("/project_status");
        console.log("Statuses fetched:", statusesRes.data); // Log the statuses data
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
  };

  // Handle Form Submission
const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
        const response = await axiosInstance.post("/projects", {
            title: values.title,
            county: values.county,
            status: values.status,
            description: values.description,
        });
        setSubmitSuccess("Form submitted successfully! Please upload your files.");
        resetForm();
    } catch (error) {
        console.error("Error submitting form:", error.response?.data || error.message);
        setSubmitError("Error submitting form. Please try again.");
    } finally {
        setSubmitting(false);
    }
};


  return (
    <div className="max-w-lg mx-auto p-8 bg-slate-200 text-zinc-950 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Submit a Project</h1>
      {submitSuccess && <p className="text-green-600">{submitSuccess}</p>}
      {submitError && <p className="text-red-600">{submitError}</p>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
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
