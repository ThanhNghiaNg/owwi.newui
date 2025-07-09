import React, { useCallback } from 'react'

export const usePagination = () => {
    const [cursor, setCursor] = React.useState<string | null>(null);
    const [limit, setLimit] = React.useState(10)

    return {
        cursor,
        setCursor,
        limit,
        setLimit,
    }
}

export type UsePaginationReturn = ReturnType<typeof usePagination>;
