import {Link} from 'react-router-dom';
import './styles.css'

const NavButton = (props) => {

    const styles = () => 
    (props.red && {backgroundColor: '#db3838', color: 'white'}) || 
    (props.hollow && {backgroundColor: '#5599FF', color: 'white', border: '1px solid white', boxShadow: 'none'})

    return(
        props.to ?
        <Link to={props.to} >
            <div className='ButtonContainer' onClick={props.onClick}
            style={styles()}>
                {props.title}
            </div>
        </Link>
        : 
        <div className='ButtonContainer' onClick={props.onClick}
        style={styles()} >
            {props.title}
        </div>
        
    )
}

export default NavButton;