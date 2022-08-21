import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const removeEditMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        editMode
            ? <TextField value={title} onBlur={removeEditMode} onChange={onChangeTitleHandler} autoFocus
                         variant="standard"/>
            : <span onDoubleClick={activateEditMode}>{title}</span>
    )
}