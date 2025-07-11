import React from 'react'

export const DotLoader = ({ isShow }: { isShow: boolean }) => {
    if (!isShow) {
        return null
    }
    return (
        <div className="loader-dots absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
    )
}
