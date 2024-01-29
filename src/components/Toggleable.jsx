import { useState, forwardRef, useImperativeHandle } from "react"

const Toggleable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none'}

    const toggleVisibilty = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibilty
        }
    }) 

    return (
        <div>
            <div style = {hideWhenVisible}>
                <button onClick={toggleVisibilty}>{props.buttonLabel}</button>
            </div>
            <div style = {showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibilty}>cancel</button>
            </div>
        </div>
    )
})

export default Toggleable