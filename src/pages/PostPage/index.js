import { MainContainer, Logo, NavButton } from "../../components"
import { useParams } from "react-router-dom";

const PostPage = () => {

    const { id } = useParams();

    return(
        <MainContainer>
            <Logo />
            <NavButton to={`/posts/edit/${id}`} title='Editar'/>
            <NavButton title='Apagar'/>
        </MainContainer>
    )
}

export default PostPage;