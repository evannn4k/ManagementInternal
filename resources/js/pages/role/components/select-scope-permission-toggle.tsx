import { Permission } from "@/types/data/role";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export const SelectPermissionToggle = ({
    p,
    handleChangePermission,
    selected,
}: {
    p: Permission;
    handleChangePermission: (checked: boolean, value: number) => void;
    selected: number[];
}) => (
    <FieldLabel key={p.id} htmlFor={p.name} className="p-0 m-0">
        <Field orientation="horizontal">
            <FieldContent className="flex flex-col gap-1">
                <FieldTitle className="text-xs capitalize">
                    {p.action} {p.resource}
                </FieldTitle>
                <FieldDescription className="text-sm">
                    {p?.description ?? "-"}
                </FieldDescription>
            </FieldContent>
            <Switch
                checked={selected?.includes(p!.id)}
                onCheckedChange={(checked) =>
                    handleChangePermission(checked, p.id)
                }
                id={p.name}
            />
        </Field>
    </FieldLabel>
);
