import { Children, createContext, ReactNode, useContext, useState } from 'react'
type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string; 
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isLooping: boolean;
  isPlaying: boolean;
  isShuffling: boolean;
  play: (episode: Episode) => void;
  toggleLoop: () => void;
  togglePlay: () => void;
  toggleShuffle: () => void;
  setPlayState: (state: boolean) => void;
  playList: (list: Episode[], index:number) => void;
  playNext: () => void;
  playPrevious: () => void;
  clearPlayState: () => void,
  hasNext: boolean;
  hasPrevious: boolean;
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps ={
  children: ReactNode
}

export function PlayerContextProvider({children}:PlayerContextProviderProps){
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true) 
  }

  function playList(list:Episode[], index: number){
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0; 

  function playNext(){
    if(isShuffling){
      const randomEpisode = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(randomEpisode);
       
    } else if(hasNext){
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious(){
    if(hasPrevious){
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  function togglePlay(){
    setIsPlaying(!isPlaying)
  }

  function toggleLoop(){
    setIsLooping(!isLooping)
  }

  function toggleShuffle(){
    setIsShuffling(!isShuffling)
  }

 function setPlayState(state: boolean){
    setIsPlaying(state)
  }

  function clearPlayState(){
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  return(
    <PlayerContext.Provider 
      value={{
          episodeList, 
          currentEpisodeIndex, 
          isPlaying,
          isLooping,
          isShuffling,
          play, 
          togglePlay,
          toggleLoop,
          toggleShuffle, 
          setPlayState,
          playList,
          playNext,
          playPrevious,
          clearPlayState,
          hasNext,
          hasPrevious
      }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer =()=>{
  return useContext(PlayerContext)
}