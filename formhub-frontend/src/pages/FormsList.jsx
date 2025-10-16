import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function FormsList() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await API.get("/forms");
        setForms(res.data);
      } catch (err) {
        console.error("Failed to fetch forms:", err);
      }
    };
    fetchForms();
  }, []);

  return (
    <div className="container p-6">
      <h2 className="text-2xl font-bold mb-4">My Forms</h2>
      <Link
        to="/builder"
        className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        + New Form
      </Link>

      {forms.length === 0 ? (
        <p>No forms created yet.</p>
      ) : (
        <ul className="space-y-2">
          {forms.map((f) => (
            <li
              key={f._id}
              className="flex justify-between items-center p-2 border rounded"
            >
              <Link
                to={`/builder/${f._id}`}
                className="font-semibold text-blue-600"
              >
                {f.title}
              </Link>
              <Link
                to={`/forms/${f._id}/submissions`} // Updated route
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                View Submissions
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
