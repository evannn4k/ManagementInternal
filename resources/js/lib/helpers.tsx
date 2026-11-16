export function getExtension(fileName: string): string | null {
    const parts = fileName.split(".");

    if (parts.length > 1) {
        return parts[parts.length - 1].toLowerCase();
    }

    return null;
}