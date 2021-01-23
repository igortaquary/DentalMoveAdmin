import './styles.css'

const PostFormContainer = (props) => {
    return(
        <div className='PostFormContainer'>
            {props.children}
        </div>
    )
}

export default PostFormContainer;