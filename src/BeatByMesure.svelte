<script>
    export let division;
    const beats = [1,2, 3, 4]
</script>


<div>
{#each beats as beat}
    <label>
 <input type="radio" bind:group={division} value={beat} 
 >{beat}
</label>
{/each}
</div>

<style>
label {
    display: inline;
    padding: 10px
}
input {
    margin: 0.3em;
}
</style>