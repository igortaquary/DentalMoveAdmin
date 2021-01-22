import { Logo, MainContainer } from '../../components';


const NotFoundPage = () => {
    return(
        <MainContainer center>
            <Logo />
            <div style={{fontSize: '2rem', margin: '50px 0px'}}>
                Página não encontrada
            </div>
        </MainContainer>
    )
}

export default NotFoundPage;