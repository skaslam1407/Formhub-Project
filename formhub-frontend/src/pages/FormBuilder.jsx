import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import API from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import FieldEditor from "../components/FieldEditor";

export default function FormBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Untitled Form");
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if (id) {
      API.get(`/forms/${id}`).then((res) => {
        setTitle(res.data.title);
        setFields(res.data.fields);
      });
    }
  }, [id]);

  const addField = () => {
    setFields([...fields, { key: Date.now().toString(), label: "New Field", type: "text" }]);
  };

  const saveForm = async () => {
    const form = { title, fields };
    if (id) await API.post(`/forms`, form);
    else await API.post(`/forms`, form);
    navigate("/");
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(fields);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setFields(reordered);
  };

  return (
    <div className="builder">
      <h2>Form Builder</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Form title" />
      <button onClick={addField}>Add Field</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {fields.map((f, index) => (
                <Draggable key={f.key} draggableId={f.key} index={index}>
                  {(provided) => (
                    <div
                      className="field"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <FieldEditor
                        field={f}
                        onChange={(newField) =>
                          setFields(fields.map((fld) => (fld.key === f.key ? newField : fld)))
                        }
                        onDelete={(key) =>
                          setFields(fields.filter((fld) => fld.key !== key))
                        }
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={saveForm}>Save Form</button>
    </div>
  );
}
