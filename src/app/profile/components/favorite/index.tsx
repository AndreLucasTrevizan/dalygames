'use client';

import { Metadata } from 'next';
import { useState } from 'react';
import { FiEdit, FiX } from 'react-icons/fi';

export function FavoriteCard() {
  const [input, setInput] = useState("");
  const [gameName, setGameName] = useState("");
  const [showInput, setShowInput] = useState(false);
 
  function handleButton() {
    setShowInput(!showInput);
    if (input != "") {
      setGameName(input);
    }

    setInput("");
  }

  return (
    <div
      className="w-full bg-gray-900 text-white p-4 h-44 rounded-lg flex justify-between flex-col"
    >
      {showInput ? (
        <div className='flex items-center justify-center gap-3'>
          <input type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full rounded-md h-8 px-2 text-white border-1'
            placeholder='Qual é seu jogo favorito?'
          />
          <button onClick={handleButton}>
            <FiX size={24} color='#fff' />
          </button>
        </div>
      ) : (
        <button
          className='self-start hover:scale-110 duration-200 transition-all'
          onClick={handleButton}
        >
          <FiEdit size={24} color='#FFF' />
        </button>
      )}
      {gameName && (
        <div>
          <span className='text-white'>Jogo favorito:</span>
          <p className='font-bold text-white'>{gameName}</p>
        </div>
      )}
      {!gameName && (
        <p className='font-bold text-white'>Adicionar jogo</p>
      )}
    </div>
  )
}