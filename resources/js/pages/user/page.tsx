import { Button } from "@/components/ui/button";
import { Plus, ShieldCheck } from "lucide-react";
import { UserSectionCard } from "./components/user-section-card";

export default function UserPage() {
    return (
        <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-6">
            <header className="flex justify-between items-center gap-4 md:gap-8">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center text-sm">
                        <ShieldCheck size="24" /> SISTEM AKSES TERPUSAT
                    </div>
                    <h1 className="font-semibold text-2xl md:text-3xl">
                        Manajemen Pengguna & Akses
                    </h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Possimus eligendi quas nisi at veritatis sapiente?
                    </p>
                </div>
                <div className="">
                    <Button>
                        <Plus /> Tambah Pengguna
                    </Button>
                </div>
            </header>
            <UserSectionCard />
        </div>
    );
}
