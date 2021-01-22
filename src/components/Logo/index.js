import './styles.css';
import logo from '../../assets/dente.png';
import { Link } from 'react-router-dom';

const Logo = () => {
    return(
        <div className='LogoContainer'>
                <img src={logo} alt='logo dental move' height='100%'/>
                <div className='LogoWordsContainer'>
                    <Link to='/'>
                        Dental Move
                    </Link>
                </div>
        </div>
    )
}

export default Logo;