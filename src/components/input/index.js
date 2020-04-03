import React from 'react'

class Input extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            loading: false,
            files: null,
            fileArray: [],
            inputComment: '',
            showBtnPost: false,
            comments: [],
            inputForChangeComment: '',
        }
    }

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

    submitMakePost = () => {
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
        
        console.log(this.state.comments)
        
    }

    handleEnter = (event) => {
        if(event.key ==='Enter') this.submitMakePost();
    }

    render() {
    return (
        <div>
            <div className="upload__image">
                    <div className="upload__intro">
                        <h3 className='upload__title'>Upload your image</h3>
                        <input 
                        className="upload__input-img"
                        type="file"
                        name="file"
                        onChange={this.uploadImage}
                        placeholder='Upload your image'/>
                    </div>
                    <div className="">
                        <input 
                        type="text" 
                        onChange={this.handleInputComment} 
                        placeholder='add your comment!'
                        className="upload__input-comment"/>
                    </div>

                    {showBtnPost ? <button onClick={this.submitMakePost} className='btn__make-post'> Post it </button>
                    : null}
                    {uploadImage()}
                </div>
        </div>
    )
}
}

export default Input
