import './styles.css'

const PostsTable = (props) => {
    return(
        <table className='PostsTable'>
            {props.children}
        </table>
    )
}

export default PostsTable;