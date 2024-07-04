import React from 'react'
import { useId } from 'react'
const Select = ({
    options = [],
    label,
    //crash na ho tbhi initialze krte hain cheeze
    className = "",
    ...props
}, ref) => {
    const id = useId();
    return (


        <div className=' w-full' >

            {
                label &&
                <label htmlFor={id} className=''>
                    {label}
                </label>
            }
            <select
                {...props}
                className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                name=""
                id={id}
                ref={ref}>
          {/* if length is greater than 0 then loop */}
                {options?.map((option) => <option key={option} value={option}  >{option}</option>)}
            </select>
        </div>



    )
}

export default React.forwardRef(Select)