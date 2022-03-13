import React from 'react'

const InputField = (props) => {
    const { placeholderText, classNames, value } = props

    return (
        <input
            className={'p-3 ' + classNames}
            placeholder={placeholderText}
            value={value}
            readOnly={true}
        />
    )
}

export default InputField
