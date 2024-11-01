// src/app/Dashboard/[id]/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Task {
  title: string;
  description: string;
  priority: string;
  status: string;
  assignee: string;
  dueDate: string;
  _id: string;
}

const TaskDetails: React.FC = () => {
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);



  const fetchTaskDetails = async (taskId: string) => {
    try {
      const response = await fetch(`https://bug-logix-backend.vercel.app/tasks/${taskId}`);
      if (response.ok) {
        const data: Task = await response.json();
        setTask(data);
      } else {
        console.error("Failed to fetch task details");
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    hello
    </>
  )
};

export default TaskDetails;
