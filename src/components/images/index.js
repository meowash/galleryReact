import React, {useState, useRef, useEffect} from 'react'
import Modal from '../modal'

import './images.scss'

const Images = ({images, inputComment, comment, parentCallback, ...props}) => {

  const [edit, setEdit] = useState(false)
  const [newComment, setNewComment] = useState('')

  const [modalIsOpen, setModalIsOpen] = useState(false)
 
  // change comment 

  const editComment = () => {
    setEdit(true)
  }

  const falseEdit = () => {
     setEdit(false)
  }

  const saveEdit = () => {
    setEdit(false)
    parentCallback(newComment, images.id)

  }

  const inputChangeComment = (e) => {
    let test = e.target.value
    setNewComment(test)
  }

  // modal window


  const handleShowModal = () => {
    setModalIsOpen(true)
  }
  const handleCloseModal = () => {
    setModalIsOpen(false)
  }

  return (
    <div className="container" key={images.id} onDragOver={props.onDragOver}>
         <div className='cart'
         onDragEnd={props.onDragEnd} onDragStart={props.onDragStart} draggable>
            <button className="btn__close-cart" onClick={props.deleteCart}>
              <svg height="15pt" viewBox="0 0 512 512" width="15pt" xmlns="http://www.w3.org/2000/svg"><path d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0"/><path d="m176.8125 351.1875c-4.097656 0-8.195312-1.554688-11.308594-4.691406-6.25-6.25-6.25-16.382813 0-22.632813l158.398438-158.402343c6.253906-6.25 16.386718-6.25 22.636718 0s6.25 16.382812 0 22.636718l-158.402343 158.398438c-3.15625 3.136718-7.25 4.691406-11.324219 4.691406zm0 0"/><path d="m335.1875 351.1875c-4.09375 0-8.191406-1.554688-11.304688-4.691406l-158.398437-158.378906c-6.253906-6.25-6.253906-16.382813 0-22.632813 6.25-6.253906 16.382813-6.253906 22.632813 0l158.398437 158.398437c6.253906 6.25 6.253906 16.382813 0 22.632813-3.132813 3.117187-7.230469 4.671875-11.328125 4.671875zm0 0"/></svg>
            </button>
            <img src={images.secure_url} className='img' alt="" onClick={handleShowModal}/>

            <div className="">
            {edit ? 
            (
              <div className="cart__input">
                <input className='cart__input-comment' type="text" onChange={inputChangeComment} defaultValue={images.comment}/> 
                <button onClick={saveEdit} className='btn__input-comment'>save</button>
                <button onClick={falseEdit} className='btn__input-comment'>false</button>
              </div>
            ) : (
              <div className="cart__comment" onDoubleClick={editComment}>{images.comment}</div>
            )}
            </div>

            {modalIsOpen && (
                <Modal 
                images={images}
                handleCloseModal={handleCloseModal}
                /> 
            )}

        </div>   
    </div>
  )
}

export default Images


