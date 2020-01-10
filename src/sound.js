import { Howl } from "howler";

export function sound(filename, volume = 0.5, onplay, onend){
    const sound = new Howl({
        src: [filename],
        volume,
        onplay,
        onend,
      });

    return function(){
        sound.play();
    }
}