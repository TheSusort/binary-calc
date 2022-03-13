const Button = (props) => {
    const { textContent, classNames, onClick } = props

    return (
        <button
            className={
                'aspect-square place-content-center ' +
                'text-white rounded ' +
                classNames
            }
            onClick={onClick}
        >
            <span className={''}>{textContent}</span>
        </button>
    )
}

export default Button
