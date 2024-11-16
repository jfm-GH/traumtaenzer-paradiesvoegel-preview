<template>
  <div class="mx-auto md:grid md:w-full md:grid-cols-1">
    <header
      ref="headerElement"
      v-intersection-observer="onIntersectionObserver"
      class="fixed top-0 z-10 mx-auto h-[--navbar-height] w-full -translate-y-full items-center justify-between bg-gray-200 shadow-sm dark:bg-gray-900 dark:text-white md:sticky md:flex md:translate-y-0"
    >
      <div
        ref="navbarDivElement"
        class="fixed left-0 top-[--navbar-height] z-0 flex w-full -translate-y-full items-center bg-gray-200 px-5 pb-6 duration-500 dark:bg-gray-900 dark:text-white md:static md:min-h-fit md:w-auto md:translate-y-0 md:pb-0"
      >
        <ul
          class="flex flex-col gap-8 md:flex-row md:content-center md:items-center md:gap-[4vw]"
        >
          <li>
            <NuxtLink to="/" @click="toggleMenu">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/OnePageApp" @click="toggleMenu">OnePageApp</NuxtLink>
          </li>
          <!-- With auth
            <div v-if="isAuthorized">
              <li><NuxtLink to="/admin">Admin</NuxtLink></li>
            </div>
            -->
          <!-- Without auth -->
          <!-- <div>
              <li><NuxtLink to="/admin">Admin</NuxtLink></li>
            </div> -->
          <!-- <li><NuxtLink to="/protected-test">Protected Page</NuxtLink></li> -->
          <!-- <li><NuxtLink to="/start-page">Home</NuxtLink></li> -->
          <li>
            <NuxtLink class="dark:text-white" to="/about" @click="toggleMenu"
              >About</NuxtLink
            >
          </li>
          <!-- Account dropdown -->
          <li class="relative">
            <button class="flex items-center" @click="toggleDropdown">
              Account
              <svg
                class="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              v-if="dropdownOpen"
              class="absolute right-0 mt-2 flex flex-col items-center rounded border border-neutral-500 bg-gray-800 px-2 py-4 shadow-lg"
            >
              <!-- <button
                  type="button"
                  class="bg-grey-100 hover:bg-blue-200 transition-all duration-200 text-grey-50 rounded-lg py-2 px-2"
                  @click=""
                >
                  Details
                </button> -->
              <NuxtLink
                to="/account-details"
                class="rounded-lg bg-gray-100 px-2 py-2 text-gray-900 transition-all duration-200 hover:bg-blue-200"
                @click="toggleMenu"
              >
                Details
              </NuxtLink>
              <!-- <button
                  type="button"
                  class="bg-red-500 hover:bg-red-600 transition-all duration-200 text-red-50 rounded-lg py-2 px-2"
                  @click="handleLogout"
                >
                  Logout            :ui="{ inline: '' }"
                </button> -->
            </div>
          </li>
        </ul>
      </div>
      <div class="fixed right-16 top-5 justify-end gap-6">
        <div class="flex items-center gap-4">
          <!-- scrollY: {{ scrollY }} <br />
          navbarIsVisible: {{ navbarIsVisible }} -->
          <ClientOnly>
            <UToggle
              v-model="isDarkMode"
              on-icon="i-mdi-moon-waxing-crescent"
              off-icon="i-mdi-white-balance-sunny"
              size="md"
            />
          </ClientOnly>
        </div>
      </div>
    </header>
    <div
      class="fixed right-5 top-3 z-50 flex justify-self-auto rounded-lg bg-gray-900/50 md:hidden"
    >
      <UButton
        ref="menubarIconRef"
        :icon="menubarIcon"
        color="white"
        variant="soft"
        @click="toggleMenu"
      />
    </div>
    <!-- Flex container for sidebar and main content
    <div class="flex bg-black"> -->
    <!-- Sidebar 
      <Sidebar /> -->

    <!-- Main content -->
    <div class="flex min-h-screen dark:bg-gray-700 dark:text-white">
      <slot />
    </div>
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { vIntersectionObserver } from "@vueuse/components";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "~/tailwind.config.js";
import type { UButton } from "#build/components";
// import type { IUser } from "~/server/interfaces/dbInterfaces";

const colorMode = useColorMode();
const isDarkMode = ref(colorMode.preference === "dark");
const dropdownOpen = ref(false);
const navbarDivElement = ref<HTMLDivElement | null>(null);
const headerElement = ref<HTMLElement | null>(null);
const menubarIcon = ref("i-mdi-menu");
const navbarIsVisible = ref(true);

const { width: screenWidth } = useWindowSize();
const { y: scrollY } = useWindowScroll();

// @ts-expect-error - Tailwind config is not typed?
const fullConfig = resolveConfig(tailwindConfig);

const mdBreakpoint = parseInt(fullConfig.theme.screens.md);

const onIntersectionObserver = (entries: IntersectionObserverEntry[]) => {
  const [{ isIntersecting, intersectionRatio }] = entries;
  navbarIsVisible.value = isIntersecting;

  if (screenWidth.value >= mdBreakpoint) {
    return; // Exit early if the screen width is not below the md breakpoint
  }
  console.log("Intersection ratio: ", intersectionRatio);

  if (!isIntersecting) {
    // headerElement.value?.classList.add("fixed", "top-0", "w-full");
    /* navbarDivElement.value?.classList.add("static min-h-fit w-auto pb-0");
    navbarDivElement.value?.classList.remove("-translate-y-full"); */
  }

  const visibilityMessage = navbarIsVisible.value
    ? "Navbar is visible"
    : "Navbar is not visible";

  console.log(visibilityMessage);
};

// watch scrollY to check if scrollY is equal to 0, if so remove classes 'fixed' and 'top-0' 'w-full' from the header element
watch(scrollY, (newVal) => {
  if (headerElement.value === null) return;

  if (newVal >= headerElement.value?.clientHeight) {
    // navbarDivElement.value?.classList.remove("-translate-y-full");
    /* menubarIconClasses.value =
      "sticky z-20 text-white opacity-100 top-60 border-red-500"; */
    // navbarDivElement.value?.classList.add("sticky", "min-h-fit", "w-auto");
  }
  if (newVal < headerElement.value?.clientHeight) {
    /* headerElement.value?.classList.remove(
      "fixed",
      "top-0",
      "w-full",
      //"bg-transparent",
    ); */
  }
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

watch(isDarkMode, (newVal) => {
  colorMode.preference = newVal ? "dark" : "light";
});

/* const { signOut } = useAuth();

const isAuthorized = (useAuth().data?.value?.user as IUser).role === "admin";

async function handleLogout() {
  await signOut({ callbackUrl: "/login" });
} */

// function to change the class 'top-[-100%]' to 'top-[0%]' on click of the menu button
const toggleMenu = () => {
  // navbarDivElement.value?.classList.toggle("top-[--navbar-height]");
  // navbarDivElement.value?.classList.toggle("top-[-100%]");

  headerElement.value?.classList.toggle("-translate-y-full");

  navbarDivElement.value?.classList.toggle("-translate-y-full");
  // navbarDivElement.value?.classList.toggle("-translate-y-full");
  menubarIcon.value = navbarDivElement.value?.classList.contains(
    "-translate-y-full",
  )
    ? "i-mdi-menu"
    : "i-mdi-close";
};
</script>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>
