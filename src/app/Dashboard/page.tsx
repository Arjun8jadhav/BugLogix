"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './page.module.scss';
import Layout from "../layout_check";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    assignee: "",
    dueDate: "",
  });

  useEffect(() => {
    const isAuthenticated = localStorage.isAuthenticated;
    if (!isAuthenticated) {
      router.push('/Login');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = async () => {
    try {
      const response = await fetch("http://localhost:8800/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowForm(false);
        setFormData({ title: "", description: "", priority: "", status: "", assignee: "", dueDate: "" });
      } else {
        alert("Inavlid date or server is down")
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Layout>
      <section className={styles.dashboard}>
        
        <button onClick={() => setShowForm(true)} className={styles.createButton}>
          Create Task
        </button>

        {showForm && <div className={styles.overlay} onClick={() => setShowForm(false)}></div>}


        {showForm && (
          <div className={styles.floatingForm}>
            <h2>Create New Task</h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              required
            />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              required
            />
            <select name="priority" value={formData.priority} onChange={handleInputChange} required>
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select name="status" value={formData.status} onChange={handleInputChange} required>
              <option value="">Select Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
            <input
              type="text"
              name="assignee"
              value={formData.assignee}
              onChange={handleInputChange}
              placeholder="Assignee"
              required
            />
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
            />
            <div className={styles.buttons}>
              <button onClick={() => setShowForm(false)}>Cancel</button>
              <button onClick={handleCreateTask}>Submit</button>
              
            </div>

          </div>
        )}
      </section>
    </Layout>
  );
};

export default Dashboard;
