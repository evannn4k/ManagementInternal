import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemHeader,
    ItemTitle,
} from "@/components/ui/item";
import { ProjectStatus } from "@/types/data/project";

const tasks = [
    {
        id: "01a0e800-1111-718a-acea-d3a239cfe701",
        status_id: "01a0e717-8d83-718a-acea-d3a239cfe735", // draft[cite: 1]
        title: "Perancangan UI/UX Halaman Utama",
        description:
            "Membuat wireframe dan mockup high-fidelity untuk halaman dashboard utama menggunakan Figma.",
        priority: "high",
        due_date: "2026-10-10",
        label: JSON.stringify(["design", "frontend"]),
        file: "documents/wireframe_v1.pdf",
    },
    {
        id: "01a0e800-2222-718a-acea-d3a239cfe702",
        status_id: "01a0e717-8d83-718a-acea-d3a239cfe735", // draft[cite: 1]
        title: "Riset Kompetitor Aplikasi POS",
        description:
            "Menganalisis fitur dan kelemahan dari 3 aplikasi point of sales yang ada di pasaran.",
        priority: "medium",
        due_date: "2026-10-12",
        label: JSON.stringify(["research", "planning"]),
        file: "documents/riset_kompetitor.docx",
    },
    {
        id: "01a0e800-3333-718a-acea-d3a239cfe703",
        status_id: "01a0e717-8d86-72c0-8890-3b971f5f7c1c", // in_progress[cite: 1]
        title: "Setup Database & Migrasi Laravel",
        description:
            "Membuat struktur tabel database PostgreSQL sesuai dengan ERD yang telah disetujui.",
        priority: "urgent",
        due_date: "2026-10-05",
        label: JSON.stringify(["backend", "database"]),
        file: "documents/erd_schema.png",
    },
    {
        id: "01a0e800-4444-718a-acea-d3a239cfe704",
        status_id: "01a0e717-8d86-72c0-8890-3b971f5f7c1c", // in_progress[cite: 1]
        title: "Implementasi Autentikasi Sanctum",
        description:
            "Membuat sistem login, register, dan token-based authentication untuk API backend.",
        priority: "high",
        due_date: "2026-10-07",
        label: JSON.stringify(["backend", "security"]),
        file: "documents/api_auth_spec.pdf",
    },
    {
        id: "01a0e800-5555-718a-acea-d3a239cfe705",
        status_id: "01a0e717-8d86-72c0-8890-3b971f5f7c1c", // in_progress[cite: 1]
        title: "Integrasi Midtrans Payment Gateway",
        description:
            "Menghubungkan sistem pembayaran online untuk transaksi pesanan kasir cafe.",
        priority: "high",
        due_date: "2026-10-15",
        label: JSON.stringify(["backend", "payment"]),
        file: "documents/midtrans_config.pdf",
    },
    {
        id: "01a0e800-6666-718a-acea-d3a239cfe706",
        status_id: "01a0e716-ffb2-70f4-aa9c-e37e4f1c102", // review[cite: 1]
        title: "Pembuatan Komponen Tabel Produk",
        description:
            "Membuat reusable component untuk daftar produk menggunakan Tailwind CSS dan Shadcn UI.",
        priority: "medium",
        due_date: "2026-10-08",
        label: JSON.stringify(["frontend", "ui"]),
        file: "documents/component_docs.md",
    },
    {
        id: "01a0e800-7777-718a-acea-d3a239cfe707",
        status_id: "01a0e716-ffb2-70f4-aa9c-e37e4f1c102", // review[cite: 1]
        title: "Optimasi Query Laporan Penjualan",
        description:
            "Melakukan indexing pada tabel transaksi agar proses generate laporan bulanan menjadi lebih cepat.",
        priority: "low",
        due_date: "2026-10-09",
        label: JSON.stringify(["database", "performance"]),
        file: "documents/query_analysis.sql",
    },
    {
        id: "01a0e800-8888-718a-acea-d3a239cfe708",
        status_id: "01a0e716-ffb2-70f4-aa9c-e37e4f1c102", // review[cite: 1]
        title: "Penyusunan Dokumentasi API",
        description:
            "Menulis dokumentasi endpoint menggunakan Swagger/Postman untuk tim frontend.",
        priority: "medium",
        due_date: "2026-10-11",
        label: JSON.stringify(["documentation"]),
        file: "documents/api_documentation.json",
    },
    {
        id: "01a0e800-9999-718a-acea-d3a239cfe709",
        status_id: "01a0e716-ffb5-723f-a129-e0eb8e53e986", // done[cite: 1]
        title: "Inisialisasi Repositori Git",
        description:
            "Membuat repository GitHub utama dan mengatur branch protection rules.",
        priority: "urgent",
        due_date: "2026-09-29",
        label: JSON.stringify(["setup", "git"]),
        file: "documents/git_guidelines.pdf",
    },
    {
        id: "01a0e800-aaaa-718a-acea-d3a239cfe710",
        status_id: "01a0e716-ffb5-723f-a129-e0eb8e53e986", // done[cite: 1]
        title: "Meeting Kickoff Project",
        description:
            "Diskusi awal bersama klien (Michael Caffe) untuk membahas kebutuhan fungsional sistem POS.",
        priority: "high",
        due_date: "2026-09-28",
        label: JSON.stringify(["meeting", "management"]),
        file: "documents/notulen_meeting.pdf",
    },
    {
        id: "01a0e800-bbbb-718a-acea-d3a239cfe711",
        status_id: "01a0e716-ffb5-723f-a129-e0eb8e53e986", // done[cite: 1]
        title: "Setup Lingkungan Pengembangan (Docker)",
        description:
            "Menyiapkan docker-compose untuk PHP, Nginx, PostgreSQL, dan Redis agar seragam di semua developer.",
        priority: "medium",
        due_date: "2026-09-30",
        label: JSON.stringify(["devops", "docker"]),
        file: "documents/docker_setup.md",
    },
    {
        id: "01a0e800-cccc-718a-acea-d3a239cfe712",
        status_id: "01a0e716-ffb5-723f-a129-e0eb8e53e986", // done[cite: 1]
        title: "Desain Logo dan Color Palette",
        description:
            "Menentukan identitas visual dan palet warna yang akan digunakan pada antarmuka aplikasi kasir.",
        priority: "low",
        due_date: "2026-10-01",
        label: JSON.stringify(["design", "branding"]),
        file: "documents/brand_guideline.pdf",
    },
];
export function TaskKanban({ statuses }: { statuses: ProjectStatus[] }) {
    return (
        <Card className="p-0">
            <CardContent className="flex items-start gap-4 w-full flex-nowrap no-scrollbar overflow-x-auto py-4">
                {statuses.map((status) => (
                    <Item key={status.id} className="w-58 flex-shrink-0 p-0">
                        <ItemHeader className="p-2">
                            <ItemTitle className="capitalize">
                                <span className="text-primary text-lg">•</span>{" "}
                                {status.name}
                            </ItemTitle>
                        </ItemHeader>
                        <ItemContent className="p-0">
                            {tasks
                                .filter((t) => t.status_id == status.id)
                                .map((task) => (
                                    <Item className="bg-muted/50" key={task.id}>
                                        <ItemTitle>{task.title}</ItemTitle>
                                        <ItemDescription className="text-xs">
                                            {task.description}
                                        </ItemDescription>
                                    </Item>
                                ))}
                        </ItemContent>
                    </Item>
                ))}
            </CardContent>
        </Card>
    );
}
