import './styles.css';

const MainContainer = (props) => {
    return(
        <div className='MainContainer' 
        style={{
            alignItems: (props.center ? 'center': 'flex-start'),
            justifyContent: (props.center ? 'center': 'flex-start')
                }}>
            {props.children}
        </div>
    )
}

export default MainContainer;