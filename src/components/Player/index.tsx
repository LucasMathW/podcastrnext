import  styles from './styles.module.scss';

export function Player(){
  return(
    <div className={styles.playerContainer}>
      <header>
        <img src="playing.svg" alt="Tocando Agora"/>
        <strong>Tocando agora</strong>
      </header>
      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcastr para ouvir</strong>
      </div>
      <footer className={styles.empty}>
        <div className={styles.progress}>
          <div>00:00</div>
            <div className={styles.slyder}>
              <span className={styles.emptySlyder}></span>
            </div>
          <div>00:00</div>  
        </div>
        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="Aleátorio"/>
          </button >
          <button type="button">
            <img src="/play-previous.svg" alt="Voltar"/>
          </button >
          <button type="button" className={styles.playButton}>
            <img src="/play.svg" alt="Tocar"/>
          </button >
          <button type="button">
            <img src="/play-next.svg" alt="próximo"/>
          </button >
          <button type="button">
            <img src="/repeat.svg" alt="Repetir"/>
          </button >
        </div>
      </footer>
    </div>    
  );
}