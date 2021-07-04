import {Link} from 'react-router-dom';
import './styles.css'

const NavButton = ({onClick, to, title, hollow, red, disabled}) => {

    const styles = () => 
    (red && {backgroundColor: '#db3838', color: 'white'}) || 
    (hollow && {backgroundColor: '#5599FF', color: 'white', border: '1px solid white', boxShadow: 'none'})

    return to ?
        <Link to={to} >
            <div className='ButtonContainer' onClick={onClick}
            style={styles()}>
                {title}
            </div>
        </Link>
        : 
        <div className='ButtonContainer' onClick={disabled ? () => {} : onClick}
        style={{ opacity: disabled ? 0.5 : 1 , ...styles()}} >
            {title}
        </div>
}

export default NavButton;