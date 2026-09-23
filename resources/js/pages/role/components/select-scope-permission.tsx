import { Permission } from "@/types/data/role";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const SelectScopePermission = ({
    handleChangeScopePermission,
    selected,
    scopes,
}: {
    handleChangeScopePermission: (scopeIds: number[], value?: number) => void;
    selected: number[];
    scopes?: Permission[];
}) => {
    if (!scopes) return;

    return (
        <FieldLabel key={scopes[0].id} className="p-0 m-0">
            <Field orientation="horizontal">
                <FieldContent className="flex flex-col gap-1">
                    <FieldTitle className="text-xs capitalize">
                        {scopes[0].action} {scopes[0].resource}
                    </FieldTitle>
                    <FieldDescription className="text-sm">
                        {scopes[0]?.description ?? "-"}
                    </FieldDescription>
                </FieldContent>
                <ToggleGroup
                    value={selected
                        ?.find((s) => scopes.map((s) => s.id).includes(s))
                        ?.toString()}
                    type="single"
                    variant="outline"
                    onValueChange={(val: string) =>
                        handleChangeScopePermission(
                            scopes.map((s) => s.id),
                            Number(val),
                        )
                    }
                >
                    {scopes.map((s: Permission) => (
                        <ToggleGroupItem key={s.id} value={s.id.toString()}>
                            {s.scope}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </Field>
        </FieldLabel>
    );
};
