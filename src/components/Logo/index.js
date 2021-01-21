import './styles.css';
import logo from '../../assets/dente.png';

const Logo = () => {
    return(
        <div className='LogoContainer'>
            <img src={logo} alt='logo dental move' height='100%'/>
            <div className='LogoWordsContainer'>
                Dental Move
            </div>
        </div>
    )
}

export default Logo;