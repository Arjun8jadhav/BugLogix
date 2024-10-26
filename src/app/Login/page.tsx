"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import styles from './page.module.scss'
import Image from 'next/image';
import { asset } from '../../../public/asset';
const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();
    useEffect(() => {
      
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated === 'true') {
            router.push('/Dashboard');
        }
    }, [router]);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (username === 'user' && password === 'pass') {
            localStorage.setItem('isAuthenticated', 'true');
            router.push('/Dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <section className={styles.home}>
            <div className={styles.box}>
                <Image src={asset.Logo} alt='' height={40} width={40} />
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </section>
    );
};

export default LoginPage;
