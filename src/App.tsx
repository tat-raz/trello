import React, { FC, useState, useRef } from 'react';
import style from './App.module.scss';
import { Card } from './components/Card/Card';


export const App: React.FC = () => {
  interface Note {
    id: number;
    content: string;
  }

  interface CardData {
    id: number;
    notes: Note[];
    title: string;
  }

  const [cards, setCards] = useState<CardData[]>([]);
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setShowNewBoardModal(true);
  };

  const createNewBoard = () => {
    if (inputRef.current && inputRef.current.value !== '') {
      const newCard: CardData = { id: Date.now(), title: newBoardName, notes: [] };
      setCards([...cards, newCard]);
      setShowNewBoardModal(false);
      setNewBoardName('');
      inputRef.current.value = ""; 
    }
  };

  const deleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const addNote = (cardId: number, noteContent: string) => {
    const updatedCards = cards.map(card => {
      if (card.id === cardId) {
        const newNote: Note = { id: Date.now(), content: noteContent };
        return { ...card, notes: [...card.notes, newNote] };
      }
      return card;
    });
    setCards(updatedCards);
  };
  
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      createNewBoard();
    }
  }

  return (
    <div className={style.App}>
      <div className={style.wrapper}>
        {showNewBoardModal ? (
          <div className={style.newBoardCreate}>
            <p>What shall we call the board?</p>
            <div className={style.firstLineCreateBoard}>
              <input 
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                ref={inputRef}
                onKeyDown={handleKeyDown}
              />
              <button 
                className={style.buttonYes}
                onClick={createNewBoard}>Yes</button>
            </div>
            <button 
              className={style.buttonNo}
              onClick={() => setShowNewBoardModal(false)}>Cancel</button>
          </div>
        ) : (
          <div className={style.buttonContainer}>
            <button className={style.button} type='button' onClick={handleClick}>Create a new board</button>
          </div>
        )}
        <div className={style.card}>
          {/* <CardList 
            cards={cards}
            addNote={addNote} 
            onDelete={deleteCard} 
          /> */}
          {cards.map(card => (
            <Card id={card.id} title={card.title} addNote={addNote} onDelete={deleteCard} />
          ))}
        </div>
      </div>
    </div>
  );
};

