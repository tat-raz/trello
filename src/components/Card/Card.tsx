import React, { FC, useState, useRef } from 'react';
import { Note } from '../Note/Note';
import style from './Card.module.scss';
import { TiDeleteOutline } from "react-icons/ti";


interface CardProps {
  id: number,
  title: string,
  addNote: (id: number, noteContent: string) => void,
  onDelete: (id: number) => void;
}

interface Note {
  id: number;
  content: string;
  isCompleted: boolean;
}

export const Card: React.FC<CardProps> =  ({ id, title, addNote, onDelete }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteCard = () => {
    onDelete(id);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleAddNote = () => {
    if (inputRef.current && inputRef.current.value !== '') {
      const newNote: Note = { id: Date.now(), content: inputRef.current.value, isCompleted: false };
      if (inputRef.current.checked) {
        newNote.isCompleted = true;
      }
      setNotes([...notes, newNote]);
      addNote(id, inputRef.current.value);
      inputRef.current.value = ""; 
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      handleAddNote();
    }
  }

  const toggleTodo = (id:number): void => {
    setNotes(notes.map(note => {
      if (note.id !== id) return note;
      return {
        ...note,
        isCompleted: !note.isCompleted
      }
    }))
  }

  return (
    <div className={style.Card}>
        <div className={style.cardHeader}>
          <span>{title}</span>
          <TiDeleteOutline onClick={handleDeleteCard} className={style.deleteIcon}/>
        </div>
        <div className={style.notes}>
            {notes.map(note => (
                <Note 
                  key={note.id} 
                  id={note.id} 
                  content={note.content} 
                  isCompleted={note.isCompleted} 
                  onDelete={handleDeleteNote} 
                  toggleComplete={toggleTodo} 
                />
            ))}
        </div>
        <div className={style.addNote}>
          <input 
            type="text" 
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <button 
            className={style.addNoteButton}
            onClick={handleAddNote}>Add</button>
        </div>
    </div>
  );
};
