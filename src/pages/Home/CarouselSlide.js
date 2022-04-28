import React from 'react'

const CarouselSlide = ({ children }) => {
    return (
        <div className="carrousel-style">
            <div className="layout-content--wrapper slide-wrapper">
                {children}
            </div>
        </div>
    )
}

export default CarouselSlide