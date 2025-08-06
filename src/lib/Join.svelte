<script>

    import {navigate } from 'svelte-routing'
    import {signUserIn} from "../firebase.svelte"
    async function login() {
        await signUserIn()
        navigate('/tester')
    }
</script>
<main class="mx-auto text-center max-w-3xl">
    <section class="p-10">
        <h1 class="text-4xl">Become a Beta Tester</h1>
        <p class="p-4">Sign in with Google to create an Easy Meals Account</p>
        <button onclick={login} class="inline-block bg-green-600 text-white text-lg font-semibold px-6 py-3 rounded hover:bg-green-700 transition">Register</button>
    </section>
    <section class="md:columns-3">
        <div class="items-center flex flex-col">
            <p class="pt-8 text-lg">Gain immediate access to the app.</p>
            <img src="/src/assets/SmallLogo.png" alt="app logo" class="max-w-20 pt-2">
        </div>
        <div class="items-center flex flex-col">
            <p class="pt-8">Join the community of beta testers.</p>
            <img src="/src/assets/Community.png" alt="community icon" class="max-w-20 pt-2">
        </div>
        <div class="items-center flex flex-col">
            <p class="pt-8">Recieve emails when new versions and patches come out.</p>
            <img src="/src/assets/mail.png" alt="mail icon" class="max-w-20 pt-2">
        </div>
    </section>

</main>