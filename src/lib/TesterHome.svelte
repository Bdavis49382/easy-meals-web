<script>
    import { user } from "../stores.svelte";
    import {getIssues, addIssue, updateIssue} from "../firebase.svelte";
    
    import { onMount} from 'svelte';
    import Issue from "./Issue.svelte"
    let issues = $state();
    let adding = $state(false);
    let editingId = $state("");
    let title = $state("");
    let description = $state("");
    onMount(async () => issues = getIssues());
    async function onSubmit() {
        if (editingId != "") {
            await updateIssue(editingId, title, description)
            editingId = "";
        } else {
            await addIssue({title,text:description,poster:user.email});
            title = "";
            description = "";
            adding = false;
        }
        issues = getIssues();
    }
    function compareIssues(a, b) {
        const table = {'Resolved':100,'In Progress':50,'Unresolved':0}
        const later = a > b ? 1 : -1;
        if (Object.hasOwn(table,a.status) && Object.hasOwn(table,b.status)) {
            return table[a.status] - table[b.status] + later
        } else {
            console.error("An invalid status is stored with an issue.");
            return 0;
        }

    }
</script>

<main class="mx-auto text-center max-w-3xl">
    <h1 class="text-4xl">Welcome {user.name}!</h1>
    <div class="items-center flex flex-col pb-10">
        <p class="pt-8 pb-2 text-lg">Install App Here</p>
        <a href={import.meta.env.VITE_INSTALL_LINK} class="bg-slate-300 rounded-2xl">
            <img src="/src/assets/SmallLogo.png" alt="app logo" class="max-w-20 p-2">
        </a>
    </div>
    <section>
        <h2 class="text-2xl mb-2">Open Issues <button class="inline-block bg-green-600 text-white ms-5 text-sm font-semibold px-3 py-1 rounded hover:bg-green-700 transition" onclick={() => adding = !adding}>Add</button></h2>
        {#if adding || editingId != ""}
            <form action="/" class="text-left">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" bind:value={title} class="bg-slate-200 rounded-sm">
                <label for="description" class="block">Description</label>
                <textarea name="description" id="description" bind:value={description} class="bg-slate-200 rounded-sm block" rows="3" cols="40"></textarea>
            </form>
            <button class="inline-block bg-green-600 text-white ms-5 text-sm font-semibold px-3 py-1 rounded hover:bg-green-700 transition" onclick={onSubmit}>Submit</button>
        {/if}
        {#await issues}
            <Issue title="loading" poster="loading" text="loading" status="loading" id=""/>
            <Issue title="loading" poster="loading" text="loading" status="loading" id=""/>
        {:then issuesAwaited} 
            {#if issuesAwaited != undefined}
                {#each issuesAwaited.sort(compareIssues) as issue}
                    <Issue title={issue.title} poster={issue.poster} text={issue.text} status={issue.status} id={issue.id} bind:editingId bind:editingText={description} bind:editingTitle={title}/>
                {/each}
            {/if}
        {/await}
    </section>
        


</main>