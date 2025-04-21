type DropdownOption = {
    label: string;
    value: string | number;
};

export function toDropdownOptions<T extends Record<string, any>>(
    data: T[],
    labelKey: keyof T,
    valueKey: keyof T = "_id" as keyof T
): DropdownOption[] {
    return data.map(item => ({
        label: String(item[labelKey]).trim(),
        value: item[valueKey],
    }));
}