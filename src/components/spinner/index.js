import React from 'react'

import './spinner.scss'

const Spinner = () => {
    return (
        <div>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Spinner
