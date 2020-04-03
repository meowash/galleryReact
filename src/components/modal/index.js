import React from 'react'

import './modal.scss'

const Modal = React.forwardRef(({images, ...props}) => {
    return (
        <div className='modal' onClick={props.handleCloseModal}>
                <img src={images.secure_url} alt="" className='modal__img' onClick={(e) => { e.stopPropagation()}}/>
        </div>
    )})

export default Modal
