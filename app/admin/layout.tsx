import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import AdminSidebar from "./AdminSidebar";
import styles from "./admin.module.css";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <div className={styles.container}>
            <AdminSidebar />
            <main className={styles.main}>{children}</main>
        </div>
    );
}
