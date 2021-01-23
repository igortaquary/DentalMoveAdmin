import './styles.css'

const PostsTable = (props) => {
    return(
        <table className='PostsTable'>
            <tr>
                <th>Título</th>
                <th>Autor(a)</th>
                <th>Tags</th>
                <th>Detalhes</th>
            </tr>
            {props.children}
        </table>
    )
}

export default PostsTable;