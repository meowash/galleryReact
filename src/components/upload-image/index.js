import React, { Component } from 'react'

import Spinner from '../spinner'
import Images from '../images'
import ErrorBoundary from '../Error-boundry'
import update from 'react-addons-update';

import './upload-image.scss'


export class UploadImage extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            files: null,
            fileArray: [],
            showPost: false,
            inputComment: '',
            showBtnPost: false,
        }
    }

    componentDidMount= () => {
        let LocalTask = JSON.parse(localStorage.getItem('LocalTask'));
        if (LocalTask) {
          this.setState({fileArray : LocalTask, showPost: true});
        } 
    }

    // upload image & making post

    uploadImage = async e => {
        const files = e.target.files
        this.setState({ loading: true })

        const data = new FormData()
        data.append('file',files[0])
        data.append('upload_preset', 'rxzfz5it')

        const res = await fetch(
        'https://api.cloudinary.com/v1_1/dr3vvup5b/image/upload',
        {
        method: 'POST',
        body: data
        })

        const file = await res.json()
        this.setState({
            images: file,
            loading: false,
            showBtnPost: true
        })
        console.log(this.state.fileArray)
    }

    handleInputComment = (e) => {
        this.setState({inputComment: e.target.value})
    }

    test = () => {
        this.submitMakePost(this.state.inputComment);
    }

    submitMakePost = (e) => {
        this.setState(({fileArray, images, inputComment}) =>{
            fileArray.push({
                secure_url: images.secure_url,
                id: images.public_id, 
                comment: inputComment,
            })
            let a = JSON.stringify(fileArray);
            localStorage.setItem('LocalTask', a)
            return fileArray
        })
        this.setState({showPost: true})
        setTimeout((this.setState({inputComment: ''})), 500)
    }

    handleEnter = (event) => {
        if(event.key ==='Enter') this.submitMakePost();
    }

    // delete cart

    deleteCart = (id) => {
        this.setState(({ fileArray }) => {
            const idx = fileArray.findIndex((el) => el.id === id);
      
            const newArray = [
              ...fileArray.slice(0, idx),
              ...fileArray.slice(idx + 1)
            ];
      
            let local = JSON.stringify(newArray);
            localStorage.setItem('LocalTask', local);
      
            return {
                fileArray: newArray
            };
          });
    }

    // callback to change comment

    callback = (newComment, id) => {
        const updateComment = newComment

        var fileArray = this.state.fileArray;
        var commentIndex = fileArray.findIndex(function(images) { 
            return images.id == id; 
        })
    
        var updatedComment = update(fileArray[commentIndex], {comment: {$set: updateComment}})
    
        var newData = update(fileArray, {
            $splice: [[commentIndex, 1, updatedComment]]
        })

        this.setState({fileArray: newData})

        let local = JSON.stringify(newData);
            localStorage.setItem('LocalTask', local);
      
            return {
                fileArray: newData
            };
    }

    // drag and drop elems

    onDragStart = (e, id) => {
        const index = this.state.fileArray.findIndex((el) => el.id === id);
        
        this.draggedItem = this.state.fileArray[index]
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.setData("text/html", e.target.parentNode)
        e.dataTransfer.setDragImage(e.target.parentNode, 700, 0)
        console.log(this.draggedItem)
      };
    
    onDragOver = (id) => {
        const index = this.state.fileArray.findIndex((el) => el.id === id);
        const draggedOverItem = this.state.fileArray[index]
    
        if (this.draggedItem === draggedOverItem) {
          return
        }
    
        let fileArray = this.state.fileArray.filter(images => images !== this.draggedItem)
        fileArray.splice(index, 0, this.draggedItem)
        this.setState({ fileArray })

        this.setState({fileArray: fileArray})

        let local = JSON.stringify(fileArray);
            localStorage.setItem('LocalTask', local);
      
            return {
                fileArray: fileArray
            };
    };
    
      onDragEnd = () => {
        this.draggedItem = null;
      };

    render() {
        let {loading, fileArray,showPost,showBtnPost} = this.state

        const uploadImage = () => {
            if(loading){
                return <Spinner />
            } 
            else {
                return (
                    <ErrorBoundary>
                        {showPost ? fileArray.map((images) => (
                            <>
                                <Images 
                                images={images}
                                key={images.id}
                            
                                deleteCart={() => this.deleteCart(images.id)}
                                parentCallback={this.callback}

                                onDragOver={() => this.onDragOver(images.id)}
                                draggable
                                onDragStart={e => this.onDragStart(e, images.id)}
                                onDragEnd={() => this.onDragEnd()}
                                /> 

                            </>
                            ))
                        : null}
                    </ErrorBoundary>
                ) 
            }
        }


        return (
            <div className="container">
                <div className="upload__image">
                    <div className="upload__intro">
                        
                            <input 
                            className="upload__input-img"
                            type="file"
                            name="file"
                            id='upload-img'
                            onChange={this.uploadImage}
                            placeholder='Upload your image'/>
                            <label for="upload-img" className='upload__title'>
                            <svg height="20pt" viewBox="0 -18 512 512" width="20pt" xmlns="http://www.w3.org/2000/svg"><path d="m432 0h-352c-44.113281 0-80 35.886719-80 80v280c0 44.113281 35.886719 80 80 80h190c7.628906 0 14.59375-4.339844 17.957031-11.191406 3.359375-6.847656 2.53125-15.015625-2.140625-21.046875l-52.3125-67.609375 144.992188-184.425782 93.503906 111.546876v33.726562c0 11.046875 8.953125 20 20 20s20-8.953125 20-20v-221c0-44.113281-35.886719-80-80-80zm-38.671875 111.152344c-3.871094-4.617188-9.609375-7.253906-15.640625-7.148438-6.027344.09375-11.6875 2.898438-15.410156 7.636719l-154.015625 195.894531-52.445313-67.773437c-3.789062-4.898438-9.628906-7.761719-15.816406-7.761719-.007812 0-.019531 0-.027344 0-6.199218.007812-12.046875 2.890625-15.824218 7.804688l-44.015626 57.21875c-6.734374 8.757812-5.097656 21.3125 3.65625 28.046874 8.757813 6.738282 21.3125 5.097657 28.046876-3.65625l28.210937-36.671874 89.1875 115.257812h-149.234375c-22.054688 0-40-17.945312-40-40v-280c0-22.054688 17.945312-40 40-40h352c22.054688 0 40 17.945312 40 40v125.007812zm-253.328125-39.152344c-33.085938 0-60 26.914062-60 60s26.914062 60 60 60 60-26.914062 60-60-26.914062-60-60-60zm0 80c-11.027344 0-20-8.972656-20-20s8.972656-20 20-20 20 8.972656 20 20-8.972656 20-20 20zm372 229c0 11.046875-8.953125 20-20 20h-55v55c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-55h-55c-11.046875 0-20-8.953125-20-20s8.953125-20 20-20h55v-55c0-11.046875 8.953125-20 20-20s20 8.953125 20 20v55h55c11.046875 0 20 8.953125 20 20zm0 0"/></svg>
                            <span>Upload your image</span>
                            </label>

                    </div>
                    <div className="">
                        <input 
                        type="text" 
                        value={this.state.inputComment}
                        onChange={this.handleInputComment} 
                        placeholder='add your comment!'
                        className="upload__input-comment"/>
                    </div>
                
                    {showBtnPost ? <button onClick={this.test} className='btn__make-post'> Post it </button>
                    : null}

                    <div>
                        {uploadImage()}
                    </div>
                </div>

            </div>
        )
    }
}


export default UploadImage
