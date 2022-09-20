import "./IconButton.scss";

function IconButton({className, imgSrc, altText}) {
    return (
        <button className='icon-button'><img className={className} src={imgSrc} alt={altText}/></button>
    );
}

export default IconButton;