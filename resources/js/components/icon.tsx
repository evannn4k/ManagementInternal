export function IconBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="shrink-0 rounded-md border border-primary/20 bg-primary/10 p-2 text-primary">
            {children}
        </div>
    );
}