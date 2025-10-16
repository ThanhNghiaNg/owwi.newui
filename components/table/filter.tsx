import { cn } from '@/lib/utils';
import React from 'react'
import { Button } from '../ui/button';
import { Combobox } from '../ui/combobox';
import { Input } from '../ui/input';

interface BaseFilter {
    label: string;
    name?: string;
    placeholder?: string;
}
interface FilterCheckbox extends BaseFilter {
    type: "checkbox";
}
interface FilterText extends BaseFilter {
    type: "text";
}
interface FilterCombobox extends BaseFilter {
    type: "combobox";
    options: { value: string; label: string }[];
}
interface FilterNumber extends BaseFilter {
    type: "number";
}

interface Props {
    filters: { [key: string]: string | number | boolean };
    setFilters: React.Dispatch<React.SetStateAction<{ [key: string]: string | number | boolean }>>;
    filterOptions?: FilterOption[];
    className?: string;
    enterLabel?: string;
    disableEnter?: boolean;
    resetLabel?: string;
}

export type FilterOption = FilterText | FilterCheckbox | FilterCombobox | FilterNumber;

const TableFilter = ({ filters, setFilters, filterOptions, className, enterLabel = "Apply", disableEnter, resetLabel = "Reset" }: Props) => {
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const filters = Object.fromEntries(formData.entries()) as unknown as Record<string, string | number | boolean>;
        setFilters(filters);
    }
    const resetFilters = (e:React.FormEvent<HTMLFormElement>) => {
        setFilters({});
    }
    return (
        <form className={cn('space-y-2', className, disableEnter && "pointer-events-none opacity-50")} onSubmit={onSubmit} onReset={resetFilters}>
            <div className='flex flex-wrap gap-2 items-end'>
                {filterOptions?.map(option => (
                <div key={option.label} className='flex flex-col'>
                    <label className='text-sm font-medium text-gray-700 mb-1'>{option.label}</label>
                    {option.type === "text" && (
                        <Input
                            type="text"
                            name={option.name || option.label}
                            className='border border-gray-300 rounded-md px-2 py-1 truncate'
                            placeholder={option.placeholder || `Enter ${option.label}`}
                        />
                    )}
                    {option.type === "number" && (
                        <Input
                            type="number"
                            name={option.name || option.label}
                            className='border border-gray-300 rounded-md px-2 py-1 truncate'
                        />
                    )}
                    {option.type === "checkbox" && (
                        <Input
                            type="checkbox"
                            name={option.name || option.label}
                            checked={filters[option.label] as boolean || false}
                            className='h-4 w-4 text-blue-600 border-gray-300 rounded truncate'
                        />
                    )}
                    {option.type === "combobox" && (
                        <Combobox
                            options={option.options}
                            name={option.name || option.label}
                            placeholder={option.placeholder || `Select ${option.label}`}
                        />
                    )}
                </div>
            ))}
            </div>
            <div className='flex space-x-2'>
                <Button type="submit" className='h-fit' disabled={disableEnter}>{enterLabel}</Button>
            <Button type="reset" className='h-fit' disabled={disableEnter}>{resetLabel}</Button>
            </div>
        </form>
    )
}

export default TableFilter