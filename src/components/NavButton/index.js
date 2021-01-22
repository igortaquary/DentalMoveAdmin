import {Link} from 'react-router-dom';
import './styles.css'

const NavButton = (props) => {
    return(
        <Link to={props.to} >
            <div className='ButtonContainer'>
                {props.title}
            </div>
        </Link>
    )
}

export default NavButton;