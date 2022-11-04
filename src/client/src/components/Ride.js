import React from 'react'

export default function Ride({details}) {
    return (
        <div className="item">
            <div className="desc">{details.desc}</div>
            <div className="address">{details.address}</div>
            <div className="date">Ride Date: {details.date}</div>
            <div className="grpSize">Group Size: {details.grpSize}</div>
        </div>
    )
}