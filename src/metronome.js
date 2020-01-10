export function metronome(sound, interval){
    const metronome = setInterval(() => {
		sound();
      }, interval);
      
    return function stop(){
          clearInterval(metronome)
    };
}