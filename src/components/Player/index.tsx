import { useContext, useRef, useEffect, useState } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import  styles from './styles.module.scss';
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player(){

  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)

  function setupProgressListener(){
    audioRef.current.currentTime = 0
    audioRef.current.addEventListener('timeupdate',() => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(amount:number){
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  function handleRandomEpisode(){
    if(hasNext){
      playNext()
    }else{
      clearPlayState()
    }
  }

  const { episodeList, 
          currentEpisodeIndex, 
          isPlaying, 
          togglePlay, 
          toggleLoop,
          toggleShuffle,
          setPlayState,
          playNext,
          playPrevious,
          clearPlayState,
          hasNext,
          hasPrevious,
          isLooping,
          isShuffling
        } = useContext(PlayerContext)

  useEffect(() => {
    if(!audioRef.current){
      return
    }

    if(isPlaying){
      audioRef.current.play()
    }else{
      audioRef.current.pause()    
    }
  }, [isPlaying])

  const episode = episodeList[currentEpisodeIndex]
  
  return(
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando Agora"/>
        <strong> Tocando agora {episode?.title} </strong>
      </header>

        { episode ? ( 
          <div className={styles.currentEpisode}>
            <Image 
              width={592}
              height={592}
              src={episode.thumbnail}
              objectFit="cover"
            />
            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </div>
        ):(
          <div className={styles.emptyPlayer}>
            <strong>Selecione um podcastr para ouvir</strong>
          </div>
        ) }

      <footer className={ !episode && styles.empty }>
        <div className={styles.progress}>
        <span>{convertDurationToTimeString(progress)}</span>
            <div className={styles.slyder}>
               { episode ? ( 
                 <Slider 
                  max={episode.duration}
                  value={progress}
                  onChange={handleSeek}
                  trackStyle={{background:' #04d361'}}
                  railStyle={{backgroundColor:' #9775ff'}}
                  handleStyle={{borderColor:' #04d361', borderWidth: 4 }}
                 /> 
                 ) : (
                 <span className={styles.emptySlyder}></span> 
                ) 
              }
            </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>

        { episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            autoPlay
            onEnded={handleRandomEpisode}
            onPlay={() => setPlayState(true)}
            onPause={() => setPlayState(false)}
            onLoadedMetadata={setupProgressListener}
          />
        ) }

        <div className={styles.buttons}>
          <button type="button" disabled={!episode || episodeList.length === 1} onClick={toggleShuffle} className={ isShuffling && styles.isActive}>
            <img src="/shuffle.svg" alt="Aleátorio"/>
          </button >
          <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
            <img src="/play-previous.svg" alt="Voltar"/>
          </button >
          <button type="button" className={styles.playButton} disabled={!episode} onClick={togglePlay}>
            { isPlaying
            ? <img src="/pause.svg" alt="Pausar"/>
            : <img src="/play.svg" alt="Tocar"/> }
          </button >    
          <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
            <img src="/play-next.svg" alt="próximo"/>
          </button >
          <button type="button" onClick={toggleLoop} className={isLooping && styles.isActive} disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir"/>
          </button >
        </div>
      </footer>
    </div>    
  );
}