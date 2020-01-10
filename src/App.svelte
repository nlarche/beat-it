<script>
  import BeatByMeasure from './BeatByMesure.svelte'; 
  import { sound } from './sound';
  import { metronome } from './metronome';
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';

  const MINUTE = 60;
  const MINUTE_TO_SECONDS = 1000;
  let tempo = 80;
  let mainMetronome;
  let divisionMetronome;
  let isPlaying = false;
  let bpm;
  let division = 1;
  let subDivision;
  
  $: if (!isNaN(tempo)) {
	 bpm = MINUTE / tempo * MINUTE_TO_SECONDS;
	 if (isPlaying){
		play();
	 }
  }
  $: if (!isNaN(division)){
	  subDivision = bpm / division;
	  if (isPlaying){
		play();
	 }
  }

const progress = tweened(0, {
	easing: cubicInOut
  });

  var mainSound = sound(
    "clean-cowbell.wav",
	0.5,
	function() {
		progress.set(100, { duration: bpm / 2});
  	},
	function() {
		progress.set(0, { duration: bpm / 2});
	},
  );

  var divisionSound = sound("single-shot-percussion.wav", 0.4);

  const play = () => {
	  stop();
	  mainSound();
	  mainMetronome = metronome(mainSound, bpm);
	  divisionMetronome = metronome(divisionSound, subDivision);
  };

  const stop = () => {
	  mainMetronome && mainMetronome();
	  divisionMetronome && divisionMetronome();
  };

  const hanldePlay = () => {
	  isPlaying = true;
	  play()
  }

  const handleStop = () => {
		isPlaying = false;
		stop();
  }

</script>

<main>
  <h1>{tempo}</h1>
  <input type="range" min={20} max={220} bind:value={tempo} >
  <BeatByMeasure bind:division={division}></BeatByMeasure>
  <progress value={$progress} />
  <div>
  	<button on:click={handleStop}>stop</button>
  	<button on:click={hanldePlay}>play</button>
  </div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 6em;
		font-weight: 150;
	}

	progress, input {
		width: 100%;
		padding: 20px
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>