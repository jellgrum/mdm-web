import { ChangeEvent, useEffect, useState } from 'react';

import {
    Badge,
    Button,
    Calendar,
    Checkbox,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    ScrollArea,
    ScrollBar,
} from '@/components/ui';
import { getHorizontalScrollAreaContentWidth } from '@/utils';
import { useSettings } from '@/hooks';


export enum ToolbarType {
    MasterView = 'master-view',
    DetailView = 'detail-view',
}

export interface ToolbarProps {
    type: ToolbarType;
    onCreate: () => void;
    searchInput: string;
    onChangeSearchInput: (search: string) => void;
    searchDate: Date | undefined;
    onChangeSearchDate: (date: Date | undefined) => void;
    defaultVisibleColumns: {
        accessorKey: string;
        header: string;
        isDisabled: boolean;
    }[];
    onChangeVisibleColumns: (columns: string[]) => void;
}

const today = new Date();

export const Toolbar = ({
    type,
    onCreate,
    searchInput,
    onChangeSearchInput,
    searchDate,
    onChangeSearchDate,
    defaultVisibleColumns,
    onChangeVisibleColumns,
}: ToolbarProps) => {
    const { isSidebarCollapsed } = useSettings();

    const [countActiveFilters, setCountActiveFilters] = useState(0);
    const [visibleColumns, setVisibleColumns] = useState(() => defaultVisibleColumns.map(column => ({
        ...column,
        isChecked: true,
    })));

    useEffect(() => {
        let countActiveFilters = 0;
        if (searchInput.length > 0) countActiveFilters += 1;
        if (searchDate) countActiveFilters += 1;

        setCountActiveFilters(countActiveFilters);
    }, [searchInput, searchDate]);

    const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        const normalized = search.toLocaleLowerCase();
        onChangeSearchInput(normalized);
    };

    const handleClearSearchDate = () => {
        onChangeSearchDate(undefined);
    };

    return (
        <ScrollArea className={getHorizontalScrollAreaContentWidth(isSidebarCollapsed)}>
            <div className="flex align-stretch gap-2 mb-4">
                <Button onClick={onCreate} variant="outline">
                    Create {type === ToolbarType.MasterView ? 'Master' : 'Detail'} View
                </Button>

                <Popover>
                    <PopoverTrigger asChild>
                        <div className="relative">
                            <Button variant="outline">
                                Filter
                            </Button>
                            {countActiveFilters > 0 && (
                                <Badge className="absolute bottom-[-6px] right-[-4px] py-0.5 px-1.5">
                                    {countActiveFilters}
                                </Badge>
                            )}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="space-y-2">
                            <Input
                                type="text"
                                onChange={handleChangeSearchInput}
                                value={searchInput}
                                className="w-[280px]"
                                placeholder="Filter by title"
                            />
                            <Calendar
                                mode="single"
                                selected={searchDate}
                                onSelect={onChangeSearchDate}
                                disabled={{ after: today }}
                                footer={
                                    <Button
                                        onClick={handleClearSearchDate}
                                        variant="outline"
                                        disabled={!searchDate}
                                        className="w-full mt-2"
                                    >
                                        Clear date
                                    </Button>
                                }
                            />
                        </div>
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <div className="relative">
                            <Button variant="outline">
                                Columns
                            </Button>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-48">
                        <div className="space-y-2">
                            {visibleColumns.map(({ accessorKey, isDisabled, header, isChecked }) => {
                                const handleChangeVisibleColumn = (isChecked: boolean) => {
                                    setVisibleColumns(visibleColumns => {
                                        const newVisibleColumns = visibleColumns.map(column => ({
                                            ...column,
                                            isChecked: column.accessorKey === accessorKey
                                                ? isChecked
                                                : column.isChecked,
                                        }));
                                        onChangeVisibleColumns(
                                            newVisibleColumns
                                                .map(({ accessorKey, isChecked }) => isChecked ? accessorKey : '')
                                                .filter(Boolean),
                                        );

                                        return newVisibleColumns;
                                    });
                                };

                                return (
                                    <div key={accessorKey} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={accessorKey}
                                            disabled={isDisabled}
                                            onCheckedChange={handleChangeVisibleColumn}
                                            checked={isChecked}
                                        />
                                        <label
                                            htmlFor={accessorKey}
                                            className="text-sm w-full leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {header}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};
