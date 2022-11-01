import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs';

export default function RideComponent({text, remove}) {
    return (
        <div className="item">
            <div className="text">{text}</div>
            <div className="icons">
                <i onClick={remove}><BsFillTrashFill /></i>
            </div>
        </div>
    )
}