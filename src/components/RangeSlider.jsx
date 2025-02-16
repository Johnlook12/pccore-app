import React, { useState } from "react";

export default function RangeSlider({ value, handleChange }) {


    const handleChangeValue = (event) => {
        const value = event.target.value;
        handleChange(value);
    }

    return (
        <div className="space-x-5 inline">
            <input className="h-2 rounded-lg cursor-pointer" type="range" value={value} onChange={handleChangeValue} />
            <span className="text-lg">{value}</span>
        </div>
    )
}