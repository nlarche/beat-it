<script>
    import {starred} from './store/starred';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    const handleClick = (data) => {
        dispatch("select", {
            data
        })
    }

    const handleRemove = (data) => {
        starred.remove(data)
    }
</script>
<div>
{#each $starred as data}
    <div on:click={handleClick(data)}>
        <span>{data.tempo}</span>
        <span>{data.division}</span>
        <button on:click={handleRemove(data)}>x</button>
    </div>
{/each}
</div>
