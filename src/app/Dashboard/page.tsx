"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './page.module.scss'
import Layout from "../layout_check";

const Dashboard: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.isAuthenticated;
    if (!isAuthenticated) {
      router.push('/Login')
    }
  }, [router])

  return (
    <Layout>
      <section className={styles.dashboard}>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </section>
    </Layout>

  );
};

export default Dashboard;
