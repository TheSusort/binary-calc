import Button from '../Button'
import InputField from '../InputField'
import React, { useEffect, useState } from 'react'

/**
 * Calulator component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Calculator = (props) => {
    const { config } = props
    const [value, setValue] = useState('')
    const [valueInMemory, setValueInMemory] = useState('')
    const [currentOperation, setCurrentOperation] = useState('')
    const [output, setOutput] = useState('')

    /**
     * Handle operation click
     * @param operator
     */
    const handleOperation = (operator) => {
        setCurrentOperation(operator)

        if (value) {
            setValueInMemory(value)
            setValue('')
        }

        if (valueInMemory) calculate()
    }

    const handleNumber = (numberValue) => {
        if (!currentOperation) {
            setValueInMemory('')
        }

        setValue(value + numberValue)
        setOutput(value + numberValue)
    }

    /**
     * checks that values required to do a calculation, then runs the calculation from config.
     */
    const calculate = () => {
        if (value && valueInMemory && currentOperation) {
            const operation = config.operations?.find(
                (operation) => operation.operator === currentOperation
            )

            if (typeof operation.operation === 'function') {
                const sum = operation.operation(valueInMemory, value)
                setValueInMemory(sum)
                setOutput(sum)
            } else {
                console.error(
                    'An operator must have an operation function to work. Check your config.'
                )
            }
        }
    }

    /**
     * clears all or partial
     * @param partial
     */
    const clear = (partial = false) => {
        if (!partial) {
            setValueInMemory('')
        }
        setValue('')
        setCurrentOperation('')
        setOutput('')
    }

    /**
     * Handles keyboard events
     * @param event
     */
    const handleKeyPress = (event) => {
        if (event.key === 'c' || event.key === 'C') {
            clear(event.shiftKey)
            return
        }

        if (event.key === '=') {
            calculate()
            return
        }

        const isNumberPressed = config.numbers.find(
            (number) => number.textContent === event.key
        )

        if (isNumberPressed) {
            handleNumber(isNumberPressed.textContent)
            return
        }

        const isOperationPressed = config.operations.find(
            (operation) => operation.operator === event.key
        )
        if (isOperationPressed) {
            handleOperation(isOperationPressed.operator)
        }
    }

    /**
     * Handling adding keyboard event listener
     */
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    })

    /**
     * Map out buttons for number inputs
     * @type {Object[]}
     */
    const numbers = config.numbers?.map((number, index) => (
        <Button
            key={index}
            textContent={number.textContent}
            classNames={'bg-slate-700 ' + number.classNames}
            onClick={() => handleNumber(number.textContent)}
        />
    ))

    /**
     * maps out operations
     * @type {Object[]}
     */
    const operations = config.operations?.map((operation, index) => (
        <Button
            key={index}
            textContent={operation.operator}
            classNames={'bg-slate-500 ' + operation.classNames}
            onClick={() => handleOperation(operation.operator)}
        />
    ))

    return (
        <div className={'flex flex-col w-full md:w-1/2 lg:w-1/3 m-2'}>
            <div className={'bg-cyan-800 p-5 rounded-t'}>
                <InputField
                    placeholderText={'Ready to calculate'}
                    classNames={'w-full rounded'}
                    value={output}
                />
            </div>
            <div
                className={
                    'bg-sky-100 p-5 rounded-b grid gap-4 grid-cols-4 grid-rows-2'
                }
            >
                {numbers}
                {operations}
                <Button
                    textContent={'CE'}
                    classNames={'bg-red-800'}
                    onClick={() => clear(true)}
                />
                <Button
                    textContent={'C'}
                    classNames={'bg-red-800'}
                    onClick={clear}
                />
                <Button
                    textContent={'='}
                    classNames={'bg-slate-500'}
                    onClick={calculate}
                />
            </div>
        </div>
    )
}

export default Calculator
