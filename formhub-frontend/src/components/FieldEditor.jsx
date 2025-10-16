import React from "react";

export default function FieldEditor({ field, onChange, onDelete }) {
  return (
    <div className="field-item">
      <input
        type="text"
        placeholder="Label"
        value={field.label}
        onChange={(e) => onChange({ ...field, label: e.target.value })}
      />
      <select
        value={field.type}
        onChange={(e) => onChange({ ...field, type: e.target.value })}
      >
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="number">Number</option>
      </select>
      <button onClick={() => onDelete(field.key)}>🗑️</button>
    </div>
  );
}
