const config = {
    radix: 2,
    numbers: [
        {
            textContent: '1',
        },
        {
            textContent: '0',
        },
    ],
    operations: [
        {
            operator: '+',
            classNames: 'row-span-2 aspect-auto',
            operation: (x, y, radix = 2) =>
                (parseInt(x, radix) + parseInt(y, radix)).toString(radix),
        },
        {
            operator: '-',
            classNames: '',
            operation: (x, y, radix = 2) =>
                (parseInt(x, radix) - parseInt(y, radix)).toString(radix),
        },
    ],
}
export default config
