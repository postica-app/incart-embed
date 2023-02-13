import { styled, keyframes } from 'incart-fe-common'

const spinning = keyframes({
    '0%': {
        transform: 'rotate(0deg)',
    },
    '100%': {
        transform: 'rotate(360deg)',
    },
})

const Ring = styled('div', {
    display: 'inline-block',
    width: '80px',
    height: '80px',
    '&::after': {
        content: ' ',
        display: 'block',
        width: '64px',
        height: '64px',
        margin: '8px',
        borderRadius: '50%',
        borderWidth: '6px',
        borderStyle: 'solid',
        borderColor: 'transparent $grey2 transparent $grey2',
        animation: `${spinning} 1.5s linear infinite`,
    },
})

export const loader = <Ring />
