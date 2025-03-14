import React from "react";

export default function RangeSlider({ value, handleChange, min, max }) {


    const handleChangeValue = (event) => {
        const value = event.target.value;
        handleChange(value);
    }

    return (
        <div className="space-x-5 inline text-white">
            <input className="h-2 rounded-lg cursor-pointer" type="range" min={min} max={max} value={value} onChange={handleChangeValue} />
            <span className="text-lg">{value}</span>
        </div>
    )
}