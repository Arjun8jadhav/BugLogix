"use client"

import { useRouter } from 'next/navigation'; 
import styles from './page.module.scss';
import {asset} from '../../public/asset';
import Image from 'next/image';
export default function Home() {
  const Router=useRouter();
  const test_here=()=>{
       Router.push('/Login')
  }
  return (
    <section className={styles.home}>  
        <div className={styles.border_here}>
        <div className={styles.top}>
             <div className={styles.heading}>
                    <div className={styles.logo}>
                            <Image src={asset.Logo} alt='logo'/>
                    </div>
                    <div className={styles.title}>
                            <h2>BugLogix</h2>
                    </div>
                   
             </div>
             <div className={styles.description}>
                     <p>BugLogix simplifies bug tracking and task management, making it easy to stay on top of your development workflow.</p>
             </div>

        </div>
        <div className={styles.bottom}>
            <div className={styles.valid}>
               <p>UserName: user</p>
               <p>Password: pass</p>
            </div>
            <div className={styles.button}>
                <button onClick={test_here}>Start</button>
            </div>

        </div>
        </div>
    </section>
  );
}
