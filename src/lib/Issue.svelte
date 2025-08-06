<script>
    import {user} from "../stores.svelte.js";
    import {deleteIssue} from "../firebase.svelte.js";
    let {title, id, poster, status, text, loadIssues, editingStatus = $bindable(), editingId = $bindable(), editingTitle = $bindable(), editingText = $bindable()} = $props();
    function setEditing() {
        editingId = id;
        editingTitle = title;
        editingText = text;
        editingStatus = status
    }
    function removeIssue() {
        deleteIssue(id)
        loadIssues()
    }
</script>
<div class="text-left bg-slate-200 rounded-sm p-2 m-2">
    <h3 class="text-xl flex-row flex justify-between">
        {title}
        {#if user.email == poster || user.email == import.meta.env.VITE_ADMIN_EMAIL}
            <div>
                <button class="p-1 bg-stone-300 cursor-pointer rounded mb-1" onclick={removeIssue}>🗑️</button>
                <button class="p-1 bg-stone-300 cursor-pointer rounded mb-1" onclick={setEditing}>✏️</button>
            </div>
        {/if}
    </h3>
    <hr>
    <h4 class="text-md">Poster: {poster}</h4>
    <h4 class="text-md">Status: {status}</h4>
    <p>{text}</p>
</div>