import React, { FC, useState } from 'react';
import style from './Note.module.scss';
import { MdOutlineDeleteOutline } from "react-icons/md";


interface NoteProps {
    id: number;
    content: string;
    isCompleted: boolean;
    onDelete: (id: number) => void;
    toggleComplete: (id: number) => void;
}

export const Note: React.FC<NoteProps> =  ({ id, content, isCompleted, onDelete, toggleComplete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(content);

    const handleSave = () => {
        setIsEditing(false);
    };
    return (
        <div className={`${style.Note} ${isCompleted ? style.completed : ''}`}>
            <input 
                type='checkbox'
                checked={isCompleted}
                onChange={() => {
                    toggleComplete(id)
                }}
            />
            {isEditing ? (
                <input
                    type='text'
                    value={newText}
                    onChange={(e) =>
                        setNewText(e.target.value)}
                    onBlur={handleSave}
                    autoFocus
                />
            ) : (
                <p onDoubleClick={() =>
                    setIsEditing(true)
                } style={{textDecoration: isCompleted ? 'line-through' : 'none'}}>
                    {content}
                </p>
            )}
            <MdOutlineDeleteOutline 
                className={style.deleteCardIcon}
                onClick={() => onDelete(id)}
            />
        </div>
    );
};

