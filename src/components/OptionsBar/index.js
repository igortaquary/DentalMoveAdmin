import './styles.css'

const OptionsBar = (props) => {
    return(
        <div className='OptionsBar'>
            {props.children}
        </div>
    )
}

export default OptionsBar;