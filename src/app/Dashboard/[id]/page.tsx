"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/app/layout_check";
import Styles from './Page.module.scss';

interface Task {
  title: string;
  description: string;
  priority: string;
  status: string;
  assignee: string;
  dueDate: string;
  _id: string; 
}

const ViewTask: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Task>({
    title: "",
    description: "",
    priority: "",
    status: "",
    assignee: "",
    dueDate: "",
    _id: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const taskId = searchParams.get("ID"); 

  useEffect(() => {
    fetchData();
  }, [taskId]);

  const fetchData = async () => {
    const response = await fetch(`https://bug-logix-backend.vercel.app/tasks/${taskId}`);
    if (response.ok) {
      const data: Task = await response.json();
      setFormData(data);
    } else {
      alert("Invalid path");
    }
  };


const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`https://bug-logix-backend.vercel.app/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsEditing(false);
        fetchData(); // Refresh data after save
      } else {
        alert("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Layout>
      <div className={Styles.boardView}>
        <div className={Styles.taskCard}>
          <h2 className={Styles.taskTitle}>
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={Styles.inputField}
              />
            ) : (
              formData.title
            )}
          </h2>
          <div className={Styles.taskDetail}>
            <p>
              <strong>Description:</strong>
              {isEditing ? (
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={Styles.textAreaField}
                />
              ) : (
                formData.description
              )}
            </p>
            <p>
              <strong>Priority:</strong>
              {isEditing ? (
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className={Styles.selectField}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              ) : (
                formData.priority
              )}
            </p>
            <p>
              <strong>Status:</strong>
              {isEditing ? (
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={Styles.selectField}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              ) : (
                formData.status
              )}
            </p>
            <p>
              <strong>Assignee:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleInputChange}
                  className={Styles.inputField}
                />
              ) : (
                formData.assignee
              )}
            </p>
            <p>
              <strong>Due Date:</strong>
              {isEditing ? (
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className={Styles.inputField}
                />
              ) : (
                new Date(formData.dueDate).toLocaleDateString()
              )}
            </p>
          </div>
          {isEditing ? (
            <div className={Styles.buttonGroup}>
              <button onClick={handleSaveChanges} className={Styles.saveButton}>
                Save Changes
              </button>
              <button onClick={() => setIsEditing(false)} className={Styles.cancelButton}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className={Styles.editButton}>
              Edit Task
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ViewTask;
