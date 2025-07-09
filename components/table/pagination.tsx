import React from 'react'
import { FetchNextPageOptions } from '@tanstack/react-query'

const TableLoadMore = ({ fetchNextPage }: { fetchNextPage: (options?: FetchNextPageOptions) => void }) => {

    return (
        <div className="flex items-center justify-between mt-6">
            <button className="text-sm text-gray-600 dark:text-gray-400" onClick={() => fetchNextPage()}>Load more 10 items</button>
        </div>
    )
}

export default TableLoadMore