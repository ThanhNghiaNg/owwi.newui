import React from 'react'
import { FetchNextPageOptions } from '@tanstack/react-query'
type TableLoadMoreProps = {
    fetchNextPage: (options?: FetchNextPageOptions) => void,
    isLoading?: boolean,
    setLimit?: (limit: number) => void
    defaultLimit?: number
}
const TableLoadMore = ({ fetchNextPage, setLimit, isLoading, defaultLimit = 10 }: TableLoadMoreProps) => {
    if (isLoading) {
        return <div className='loader mt-6' />
    }

    const onChangePageLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.stopPropagation()
        setLimit?.(Number(event.target.value))
        setTimeout(() => {
            fetchNextPage()
        })
    }

    return (
        <div className="flex items-center mt-6 gap-2">
            <button className="" onClick={() => fetchNextPage()}>
                Load
            </button>
            <select onChange={onChangePageLimit}
                defaultValue={defaultLimit}
                className='border border-gray-300 dark:border-gray-600 rounded-md p-0 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            <button className="" onClick={() => fetchNextPage()}>
                more items
            </button>
        </div>
    )
}

export default TableLoadMore