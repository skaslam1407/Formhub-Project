import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API  from "../api/api";

function SubmissionsList() {
  const { formId } = useParams(); // assuming route like /forms/:formId/submissions
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await API.get(`/submissions/${formId}`);
        setSubmissions(res.data);
      } catch (err) {
        console.error("Failed to fetch submissions:", err);
      }
    };
    fetchSubmissions();
  }, [formId]);

  if (!submissions.length) return <p>No submissions yet.</p>;

  // Get all unique field names across all submissions
  const allFields = Array.from(
    new Set(
      submissions.flatMap(sub => Object.keys(sub.data || {}))
    )
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Form Submissions</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {allFields.map(field => (
              <th key={field} className="p-2 text-left border-b">{field}</th>
            ))}
            <th className="p-2 text-left border-b">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub, idx) => (
            <tr key={idx} className="border-t">
              {allFields.map(field => (
                <td key={field} className="p-2 border-b">
                  {sub.data?.[field] ?? "-"}
                </td>
              ))}
              <td className="p-2 border-b">
                {new Date(sub.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubmissionsList;
