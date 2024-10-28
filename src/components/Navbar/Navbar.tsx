import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import { asset } from '../../../public/asset';

export const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const logout = (): void => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Only run this code on the client side
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(!!authStatus);
  }, []);

  return (
    <section className={styles.navbar}>
      <div className={styles.left}>
        <Image src={asset.Logo} alt="Logo" width={50} height={50} />
        <p>BugLogix</p>
      </div>
      <div className={styles.right}>
        {isAuthenticated ? (
          <a href="#" onClick={logout}>Logout</a>
        ) : (
          <a href="/Login">Login</a>
        )}
      </div>
    </section>
  );
};
