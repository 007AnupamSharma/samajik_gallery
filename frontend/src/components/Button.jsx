import React from 'react'

const Button = ({
    label,
    onClick,
    disabled = false,
    type = 'button',
    className = '', // To add additional tailwind css
}) => {
  return (
    <>
    <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-200 ease-in-out ${disabled? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
    >
        {label}
    </button>
    </>
  )
}

export default Button