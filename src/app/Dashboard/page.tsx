"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import styles from './page.module.scss';
import Layout from "../layout_check";
import Image from "next/image";
import { asset } from "../../../public/asset";

interface Task {
  title: string;
  description: string;
  priority: string;
  status: string;
  assignee: string;
  dueDate: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false); // to show tasks if available
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState<Task>({
    title: "",
    description: "",
    priority: "",
    status: "",
    assignee: "",
    dueDate: "",
  });
  const [Status_sort, SetStatus] = useState<string>("");
  const [Priority_sort, SetPriority] = useState<string>("");

  useEffect(() => {
    const isAuthenticated = localStorage.isAuthenticated;
    if (!isAuthenticated) {
      router.push('/Login');
    }

    fetchTasks();
  }, [router]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("https://bug-logix-backend.vercel.app/tasks");
      if (response.ok) {
        const data: Task[] = await response.json();
        setTasks(data);
        setShow(data.length > 0); // Show tasks if array is not empty
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCreateTask = async () => {
    try {
      const response = await fetch("https://bug-logix-backend.vercel.app/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowForm(false);
        setFormData({ title: "", description: "", priority: "", status: "", assignee: "", dueDate: "" });
        fetchTasks();
      } else {
        alert("Invalid date or server is down");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Layout>
      <section className={styles.dashboard}>
        {show && (
          <div className={styles.top_bar}>
            <select
              name="priority"
              value={Priority_sort}
              onChange={(e) => SetPriority(e.target.value)}
              required
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              name="status"
              value={Status_sort}
              onChange={(e) => SetStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
            <button onClick={() => setShowForm(true)} className={styles.createButton}>
              Create Task
            </button>
          </div>
        )}



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

        {show ? (
          <div className={styles.taskList}>
            {tasks.map((task, index) => (
              <div key={index} className={styles.taskRow}>
                <span>{task.title}</span>
                <span>{task.assignee}</span>
                <span>{task.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <Image className={styles.empty} src={asset.Emp} alt="No tasks available" />
        )}
      </section>
    </Layout>
  );
};

export default Dashboard;
