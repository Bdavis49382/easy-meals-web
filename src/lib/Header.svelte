<script>
    import {user} from "../stores.svelte"
    import {navigate, Link} from 'svelte-routing'
    import {signUserIn, signUserOut} from "../firebase.svelte"
    function logout() {
        signUserOut()
        navigate('/')
    }
    async function login() {
        await signUserIn()
        navigate('/tester')
    }
</script>
<header class="bg-white shadow">
<div class="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
    <Link to="/">
        <h1 class="text-2xl font-bold text-green-600">Easy Meals</h1>
    </Link>
    <nav>
        <Link to="/contact" class="mx-2">
            Contact Us
        </Link>
    {#if user.isLoggedIn}
        <Link to="/tester" class="mx-2">
            Home
        </Link>
        <Link to="/change-log" class="mx-2">
            Change Log
        </Link>
        <button class="text-gray-600 hover:text-green-600 mx-2 cursor-pointer" onclick={logout}>Log Out</button>
    {:else}
        <button class="text-gray-600 hover:text-green-600 mx-2 cursor-pointer" onclick={login}>Log In</button>
    {/if}
    </nav>
</div>
</header>