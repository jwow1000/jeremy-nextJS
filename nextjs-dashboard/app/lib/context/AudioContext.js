import { createContext, useState } from 'react';

const AudioContext = createContext();

const AudioProvider = ({ children }) => {
  // reactive feature
  const [audio, setAudio] = useState(new Audio());

  return (
    <AudioContext.Provider value={{ audio, setAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export { AudioContext, AudioProvider };