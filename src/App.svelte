<script>
  import Header from "./lib/Header.svelte";
  import TesterHome from "./lib/TesterHome.svelte";
  import Welcome from "./lib/Welcome.svelte";
  import { Router, Link, Route} from "svelte-routing";
  import { user } from "./stores.svelte";
  import Join from "./lib/Join.svelte";
  import ChangeLog from "./lib/ChangeLog.svelte";
  import Contact from "./lib/Contact.svelte";
  export let url = "";
</script>

<main class="bg-gray-50 text-gray-800 font-sans h-full">
  <Router {url}>
    <Header />
    <Route path="/join">
      <Join />
    </Route>
    <Route path="/contact">
      <Contact />
    </Route>
    <Route path="change-log">
      <ChangeLog />
    </Route>
    <Route path="/">
      <Welcome />
    </Route>
    <Route path="/tester">
    {#if user.isLoggedIn}
      <TesterHome />
      {:else}
      <h1>You are not logged in as a tester.</h1>
    {/if}
    </Route>
  </Router>

  <!-- Footer -->
  <!-- <footer class="bg-white border-t py-6 text-center text-sm text-gray-500">
    &copy; 2025 Easy Meals. All rights reserved.
  </footer> -->
</main>
