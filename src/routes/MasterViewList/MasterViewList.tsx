import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { IconDots } from '@tabler/icons-react';

import { useAlert, useRouter } from '@/hooks';
import { useAppStore } from '@/store';
import {
    Button,
    DataTable,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui';
import { getReadableDate } from '@/utils';

import { Toolbar, ToolbarType } from './components';

import type { MasterView } from '@/types';
import type { ToolbarProps } from './components';


const getColumns = (
    pushHistory: (pathname: string) => void,
    showConfirmMasterViewDeleting: (masterView: MasterView) => void,
): ColumnDef<MasterView>[] => [{
    accessorKey: 'title',
    header: 'Title',
}, {
    accessorKey: 'created',
    header: 'Created',
    cell: ({ row }) => {
        const { created } = row.original;
        return getReadableDate(created);
    },
}, {
    accessorKey: 'lastChange',
    header: 'Last change',
    cell: ({ row }) => {
        const { lastChange } = row.original;
        return getReadableDate(lastChange);
    },
}, {
    accessorKey: 'detailViewCount',
    header: 'Detail Views',
}, {
    id: 'actions',
    cell: ({ row }) => {
        const masterView = row.original;

        const handleEditMasterView = () => {
            pushHistory(`/${masterView.id}/edit`);
        };

        const handleShowConfirmMasterViewDeleting = () => {
            showConfirmMasterViewDeleting(masterView);
        };

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 max-w-4">
                        <span className="sr-only">Open actions</span>
                        <IconDots className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={handleEditMasterView}
                        className="cursor-pointer"
                    >
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleShowConfirmMasterViewDeleting}
                        className="cursor-pointer"
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    },
}];

const searchMasterViews = (masterViews: MasterView[], searchTitle: string, searchDate: Date | undefined) => {
    const getComparingDate = (date: Date | undefined) => date
        ? `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        : '';
    const exactDate = getComparingDate(searchDate);

    return masterViews.filter(({ title, created, lastChange }) => {
        const hasTitleMatch = title.toLocaleLowerCase().includes(searchTitle);
        if (!exactDate) return hasTitleMatch;

        const createdDate = getComparingDate(created);
        const lastChangeDate = getComparingDate(lastChange);

        return hasTitleMatch && (exactDate ? (exactDate === createdDate || exactDate === lastChangeDate) : true);
    });
};

export const MasterViewList = () => {
    const { pushHistory } = useRouter();
    const { masterViews, deleteMasterView } = useAppStore();
    const { showAlert, hideAlert } = useAlert();

    const [searchInput, setSearchInput] = useState('');
    const [searchDate, setSearchDate] = useState<Date | undefined>();
    const [filteredMasterViews, setSearchedMasterViews] = useState(() =>
        searchMasterViews(masterViews, searchInput, searchDate));

    useEffect(() => {
        setSearchedMasterViews(searchMasterViews(masterViews, searchInput, searchDate));
    }, [masterViews, searchInput, searchDate]);

    const handleCreateMasterView = () => {
        pushHistory('/create');
    };

    const handleDeleteMasterView = (id: MasterView['id']) => {
        deleteMasterView(id);
        hideAlert();
    };

    const showConfirmMasterViewDeleting = (masterView: MasterView) => {
        showAlert({
            title: 'Are you absolutely sure?',
            description: `This action cannot be undone.
                    This will permanently remove Master View "${masterView.title}"`,
            onCancel: hideAlert,
            onConfirm: () => handleDeleteMasterView(masterView.id),
        });
    };

    const originalColumns = getColumns(pushHistory, showConfirmMasterViewDeleting) as (
        ColumnDef<MasterView> & { accessorKey: string }
    )[];

    const [visibleColumns, setVisibleColumns] = useState(() => originalColumns
        .map(column => column.accessorKey)
        .filter(Boolean));

    const columns = originalColumns.filter(({ id, accessorKey }) =>
        id === 'actions' || visibleColumns.some(column => column === accessorKey));

    const defaultVisibleColumns = originalColumns.reduce(
        (columns: ToolbarProps['defaultVisibleColumns'], { id, accessorKey, header }) =>
            id === 'actions'
                ? columns
                : columns.concat({
                    accessorKey,
                    header: header as string,
                    isDisabled: accessorKey === 'title',
                }),
        [],
    );

    return (
        <>
            <Toolbar
                type={ToolbarType.MasterView}
                onCreate={handleCreateMasterView}
                searchInput={searchInput}
                onChangeSearchInput={setSearchInput}
                searchDate={searchDate}
                onChangeSearchDate={setSearchDate}
                defaultVisibleColumns={defaultVisibleColumns}
                onChangeVisibleColumns={setVisibleColumns}
            />
            <DataTable
                columns={columns}
                data={filteredMasterViews}
                emptyData="No Master Views"
                cellClassNames={{ actions: 'text-right' }}
            />
        </>
    )
};
