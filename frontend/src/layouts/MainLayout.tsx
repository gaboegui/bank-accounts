import { Outlet, NavLink } from 'react-router-dom';
import { Users, CreditCard, ArrowRightLeft, FileText, Menu, Landmark } from 'lucide-react';
import { useState } from 'react';
import styles from './MainLayout.module.css';

export function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <div className={styles.logoContainer}>
                    <Landmark size={28} color="var(--color-primary)" />
                    <span className={styles.logoText}>BANCO</span>
                </div>

                <nav className={styles.nav}>
                    <NavLink
                        to="/clientes"
                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <Users size={20} />
                        <span>Clientes</span>
                    </NavLink>

                    <NavLink
                        to="/cuentas"
                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <CreditCard size={20} />
                        <span>Cuentas</span>
                    </NavLink>

                    <NavLink
                        to="/movimientos"
                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <ArrowRightLeft size={20} />
                        <span>Movimientos</span>
                    </NavLink>

                    <NavLink
                        to="/reportes"
                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <FileText size={20} />
                        <span>Reportes</span>
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <div className={styles.mainWrapper}>
                <header className={styles.header}>
                    <button
                        className={styles.menuButton}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className={styles.headerTitle}>NOMBRE DEL BANCO</h1>
                </header>

                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)} />
            )}
        </div>
    );
}
