import "./IconButton.scss";

function IconButton({className, imgSrc, altText, handleClick}) {
    return (
        <button className='icon-button' onClick={handleClick}>
                <img className={className} 
                    src={imgSrc} alt={altText}/>
        </button>
    );
}

export default IconButton;