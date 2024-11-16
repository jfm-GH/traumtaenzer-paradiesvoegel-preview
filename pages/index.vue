<template>
  <div>
    <h2>Home</h2>
    <p>
      This is the splash page for the app. You can access the login from here.
    </p>
    <!-- Uncomment when auth is implemented
    <h3>Authentication Overview</h3>
    <p>
      See all available authentication & session information below. Navigate to
      different sub-pages to test out the app.
    </p>
    <pre>Status: {{ status }}</pre>
    <pre>Data: {{ data || "no session data present, are you logged in?" }}</pre>
    <ClientOnly>
      <pre>
Last refreshed at: {{ lastRefreshedAt || "no refresh happened" }}
      </pre>
    </ClientOnly>
    <pre>
Decoded JWT token: {{ token || "no token present, are you logged in?" }}</pre
    >
    <pre>CSRF Token: {{ csrfToken }}</pre>
    <pre>Providers: {{ providers }}</pre>
     -->
  </div>
</template>

<script setup lang="ts">
// import { useAuth, useFetch, useRequestHeaders } from "#imports";

/* const { data, status, lastRefreshedAt, getCsrfToken, getProviders } = useAuth();

const providers = await getProviders();
const csrfToken = await getCsrfToken();

const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: token } = await useFetch("/api/token", { headers }); */

definePageMeta({
  // layout: "login",
  // middleware: "custom-auth",
});
</script>

<style scoped></style>
