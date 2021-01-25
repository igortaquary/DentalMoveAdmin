import { MainContainer, Logo, NavButton} from '../../components';

const HomePage = () => {
    return(
        <MainContainer center>
            <Logo />
            <div style={{height: '50px'}}></div>
            <NavButton to='/posts' title='Gerenciar Posts'/>
            <NavButton to='/tags' title='Gerenciar Tags' hollow/>
        </MainContainer>
    )
}

export default HomePage;