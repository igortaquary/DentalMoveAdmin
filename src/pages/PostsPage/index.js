import { Link } from 'react-router-dom'
import { Logo, MainContainer, NavButton, PostsTable } from '../../components'
import eye from '../../assets/eye.png'

const PostsPage = () => {
    return(
        <MainContainer>
            <Logo/>
            <div style={{margin: '40px'}}>
                <NavButton to='/posts/create' title='Novo post'/>
            </div>
            <PostsTable>
                <tr>
                    <td> 1 </td>
                    <td> O problema da água do mar para os dentes </td>
                    <td> Nome do autor blabla </td>
                    <td> tag1, tag2, tag3 </td>
                    <td>
                        <Link to='/posts/id'>
                             <img src={eye} alt='detalhes' height='20px'/>
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td> 1 </td>
                    <td> O problema da água do mar para os dentes </td>
                    <td> Nome do autor blabla </td>
                    <td> tag1, tag2, tag3 </td>
                    <td>
                        <Link to='/posts/id'>
                             <img src={eye} alt='detalhes' height='20px'/>
                        </Link>
                    </td>
                </tr>
            </PostsTable>
        </MainContainer>
    )
}

export default PostsPage;