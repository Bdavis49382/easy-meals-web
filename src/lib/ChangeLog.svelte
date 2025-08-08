<script>
    import { user } from "../stores.svelte";
    import {addVersion, getVersions} from "../firebase.svelte";
  import { onMount } from "svelte";
    let versionNumber = $state("");
    let entry = $state("");
    let versions = $state();
    async function onSubmit() {
        await addVersion(versionNumber, entry)
        entry = "";
        versionNumber = "";
        versions = getVersions();
    }
    onMount(() => versions = getVersions())
</script>
<main class="mx-auto text-center max-w-3xl">
    <h1 class="text-4xl">Change Log</h1>
    {#if user.email == import.meta.env.VITE_ADMIN_EMAIL}
        <form action="/" class="text-left">
            <label for="version-number">Version Number</label>
            <input type="text" name="version-number" id="version-number" bind:value={versionNumber} class="bg-slate-200 rounded-sm">
            <label for="description" class="block">Description</label>
            <textarea name="description" id="description" bind:value={entry} class="bg-slate-200 rounded-sm block" rows="3" cols="40"></textarea>
        </form>
        <button class="inline-block bg-green-600 text-white ms-5 text-sm font-semibold px-3 py-1 rounded hover:bg-green-700 transition" onclick={onSubmit}>Submit</button>
    {/if}
    {#await versions}
        <p>loading...</p>
    {:then versionsAwaited} 
    {#each versionsAwaited as version}
        <section class="text-left">
            <h1 class="text-2xl">{version.versionNumber}</h1>
            <p>{version.entry}</p>
        </section>
    {/each}
        
    {/await}
</main>