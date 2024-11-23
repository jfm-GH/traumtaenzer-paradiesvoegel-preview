<template>
  <div class="mx-auto md:grid md:w-full md:grid-cols-1">
    <header
      ref="headerElement"
      class="fixed z-10 mx-auto max-h-fit w-full -translate-y-full bg-gray-200 shadow-sm transition-all duration-500 dark:bg-gray-900 dark:text-white md:sticky md:top-0 md:flex md:h-[--navbar-height] md:translate-y-0 md:justify-center"
    >
      <div
        class="relative z-50 mx-0 grid grid-cols-1 flex-row px-0 duration-500 dark:text-white md:static md:min-h-fit md:w-1/2 md:translate-y-0 md:grid-cols-2 md:content-center md:py-0"
      >
        <div
          ref="navBarElements"
          class="relative order-2 h-full w-3/4 max-md:pb-5 max-md:pt-5 md:fixed md:right-16 md:top-0 md:w-auto md:pb-0"
        >
          <div class="ml-3 flex h-full items-center justify-between gap-4">
            <div class="font-bold md:hidden">Traumtänzer und Paradiesvögel</div>
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
        <ul
          ref="navLinks"
          class="order-1 flex flex-col gap-8 md:flex-row md:gap-0 md:pb-0"
        >
          <li
            class="w-full rounded px-2 py-1 text-center transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <NuxtLink to="#" @click="handleClick(true)">Home</NuxtLink>
          </li>
          <!-- <li
            class="w-full rounded px-2 py-1 text-center transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <NuxtLink to="/OnePageApp" @click="toggleMenu">OnePageApp</NuxtLink>
          </li> -->
          <li
            class="w-full rounded px-2 py-1 text-center transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <NuxtLink to="#WerBinIch" @click="toggleMenu"
              >Wer bin ich?</NuxtLink
            >
          </li>
          <li
            class="w-full rounded px-2 py-1 text-center transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <NuxtLink to="#Gallerie" @click="toggleMenu">Gallerie</NuxtLink>
          </li>
          <!-- <li
            class="w-full min-w-fit justify-center rounded px-2 py-1 text-center transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <button @click="toggleDropdown">
              Account
              <svg
                class="ml-1 inline-flex h-4 w-4 min-w-fit"
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
              <NuxtLink
                to="/account-details"
                class="rounded-lg bg-gray-100 px-2 py-2 text-gray-900 transition-all duration-200 hover:bg-blue-200"
                @click="toggleMenu"
              >
                Details
              </NuxtLink>
            </div>
          </li> -->
        </ul>
      </div>
    </header>
    <div
      ref="menubarIconRef"
      class="fixed right-5 top-3 z-50 flex justify-self-auto rounded-lg bg-gray-900/50 md:hidden"
    >
      <UButton
        :icon="menubarIcon"
        color="white"
        variant="soft"
        @click="toggleMenu"
      />
    </div>
    <div class="flex min-h-screen dark:bg-gray-700 dark:text-white">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useIntersectionObserver, useColorMode } from "#imports";

// Reactive references
const isDarkMode = ref(useColorMode().preference === "dark");
const navLinks = ref<HTMLDivElement | null>(null);
const headerElement = ref<HTMLElement | null>(null);
const menubarIcon = ref("i-mdi-menu");
const isNavbarOpen = ref(false);
const heroSectionsDivIsVisible = ref(true);
const navBarElements = ref<HTMLElement | null>(null);
const navBarOrderChangeIsQueuedUp = ref(false);
const dropdownOpen = ref(false);

const menubarIconRef = ref<HTMLDivElement | null>(null);

watch(isDarkMode, (newVal) => {
  useColorMode().preference = newVal ? "dark" : "light";
});

const toggleMenu = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
  // console.log("entering toggleMenu");
  // console.log("isNavbarOpen.value: ", isNavbarOpen.value);
  /* console.log(
    "navBarOrderChangeIsQueuedUp.value: ",
    navBarOrderChangeIsQueuedUp.value,
  ); */
  if (heroSectionsDivIsVisible.value) {
    applyHeroSectionStyles();
  } else {
    if (navBarOrderChangeIsQueuedUp.value && !isNavbarOpen.value) {
      changeOrderOnNextMenuClose();
    } else {
      toggleNavbarOrder();
    }
  }
  toggleMenuIcon();
};
const handleClick = (isHomeClicked: boolean) => {
  // handle click on navbar link
  // for now only implemendet for home link
  // but should be extended for other links
  // for consistency
  if (isHomeClicked) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  toggleMenu();
};

const applyHeroSectionStyles = () => {
  addClass(navLinks.value, "order-2", "pb-5");
  addClass(navBarElements.value, "order-1");
  toggleClass(headerElement.value, "-translate-y-full");
};

const toggleNavbarOrder = () => {
  toggleClass(navLinks.value, "order-1", "order-2", "pb-3");
  toggleClass(
    headerElement.value,
    "-translate-y-[calc(100%-var(--navbar-height))]",
  );
  addClass(navBarElements.value, "max-md:pb-5", "max-md:pt-5");
};

const toggleMenuIcon = () => {
  menubarIcon.value =
    headerElement.value?.classList.contains(
      "-translate-y-[calc(100%-var(--navbar-height))]",
    ) || headerElement.value?.classList.contains("-translate-y-full")
      ? "i-mdi-menu"
      : "i-mdi-close";
};

const changeOrderOnNextMenuClose = () => {
  addClass(navLinks.value, "order-1");
  removeClass(navLinks.value, "order-2");
  addClass(navBarElements.value, "order-2");
  removeClass(navBarElements.value, "order-1");
  toggleClass(
    headerElement.value,
    "-translate-y-[calc(100%-var(--navbar-height))]",
  );
  navBarOrderChangeIsQueuedUp.value = false;
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
const heroSectionsDivRef = ref<HTMLElement | null>(null);
onMounted(() => {
  heroSectionsDivRef.value = document.getElementById(
    "heroSectionsDiv",
  ) as HTMLElement;
  setupIntersectionObserver();
});

const setupIntersectionObserver = () => {
  const headerHeightPx = calculateHeaderHeightPx();
  const { resume: headerResume } = useIntersectionObserver(
    heroSectionsDivRef,
    handleIntersection,
    {
      immediate: false,
      rootMargin: `-${headerHeightPx}px 0px 0px 0px`,
    },
  );
  headerResume();
};

const handleIntersection = ([
  { isIntersecting },
]: IntersectionObserverEntry[]) => {
  heroSectionsDivIsVisible.value = isIntersecting;
  if (isIntersecting) {
    handleHeroVisible();
  } else {
    handleHeroHidden();
  }
};

const handleHeroVisible = () => {
  if (!isNavbarOpen.value) {
    addClass(headerElement.value, "-translate-y-full");
    removeClass(
      headerElement.value,
      "-translate-y-[calc(100%-var(--navbar-height))]",
    );
  }
  toggleButtonBackground("bg-gray-900/50", "bg-gray-900/0");
  resetNavbarOrder("order-2", "order-1");
};

const handleHeroHidden = () => {
  if (!isNavbarOpen.value) {
    toggleClass(
      headerElement.value,
      "-translate-y-full",
      "-translate-y-[calc(100%-var(--navbar-height))]",
    );
    resetNavbarOrder("order-1", "order-2");
    applyNavbarPadding();
  } else {
    navBarOrderChangeIsQueuedUp.value = true;
  }
  toggleButtonBackground("bg-gray-900/0", "bg-gray-900/50");
};

const toggleButtonBackground = (
  addClassName: string,
  removeClassName: string,
) => {
  addClass(menubarIconRef.value, addClassName);
  removeClass(menubarIconRef.value, removeClassName);
};

const resetNavbarOrder = (
  navLinksOrder: string,
  navBarElementsOrder: string,
) => {
  addClass(navLinks.value, navLinksOrder);
  removeClass(navLinks.value, navBarElementsOrder);
  addClass(navBarElements.value, navBarElementsOrder);
  removeClass(navBarElements.value, navLinksOrder);
};

const applyNavbarPadding = () => {
  addClass(navBarElements.value, "max-md:pb-5");
  addClass(navLinks.value, "pb-3");
};

const calculateHeaderHeightPx = () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const rootFontSize = parseFloat(rootStyles.fontSize); // in pixels
  const headerHeightRem = rootStyles.getPropertyValue("--navbar-height").trim();
  return parseFloat(headerHeightRem) * rootFontSize;
};

const addClass = (element: HTMLElement | null, ...classNames: string[]) => {
  element?.classList.add(...classNames);
};

const removeClass = (element: HTMLElement | null, ...classNames: string[]) => {
  element?.classList.remove(...classNames);
};

const toggleClass = (element: HTMLElement | null, ...classNames: string[]) => {
  classNames.forEach((className) => element?.classList.toggle(className));
};
</script>

<style scoped></style>
