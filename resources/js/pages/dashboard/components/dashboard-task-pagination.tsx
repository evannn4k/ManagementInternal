import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination";
import { LinkPagination, MetaPagination } from "@/types/paginate";
import { Link } from "@inertiajs/react";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardTaskPagination({
    links,
    meta,
}: {
    links: LinkPagination;
    meta: MetaPagination;
}) {

    return (
        <div className="flex justify-between items-center gap-6 pt-2">
            <div className="text-xs text-muted-foreground">{`${meta.from} - ${meta.to} dari ${meta.total}`}</div>
            <div className="flex gap-4 md:gap-6 items-center">
                <Pagination>
                    <PaginationContent className="gap-2">
                        <PaginationItem>
                            <Button
                                asChild={meta.current_page != 1}
                                size="icon"
                                variant="outline"
                                disabled={meta.current_page == 1}
                            >
                                {meta.current_page == 1 ? (
                                    <span>
                                        <ChevronLeft />
                                    </span>
                                ) : (
                                    <Link href={links.prev ?? "#"}>
                                        <ChevronLeft />
                                    </Link>
                                )}
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                asChild={meta.current_page != meta.last_page}
                                size="icon"
                                variant="outline"
                                disabled={meta.current_page == meta.last_page}
                            >
                                {meta.current_page == meta.last_page ? (
                                    <span>
                                        <ChevronRight />
                                    </span>
                                ) : (
                                    <Link href={links.next ?? "#"}>
                                        <ChevronRight />
                                    </Link>
                                )}
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
