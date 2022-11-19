import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs';

export default function RideShareComponent({remove, region, destination, date, time, desc}) {
    return (
        <div className="item">
            <div>{region}</div>
            <div>{destination}</div>
            <div className="text">{date}</div>
            <div className="text">{time}</div>
            <div className="text">{desc}</div>
            <div className="icons">
                <i onClick={remove}><BsFillTrashFill /></i>
            </div>
        </div>
    )
}