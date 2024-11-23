<template>
  <div class="m-0 bg-orange-50 text-gray-600 dark:bg-blue-50">
    <div id="heroSectionsDiv">
      <div v-for="(bgImage, index) in bgImages" :key="index">
        <hero-section
          :bg-image="bgImage"
          @hero-section-mounted="addToSectionsRef"
          @scroll-to-next-section="scrollToNextSection"
        >
          <hero-content :index="index" />
        </hero-section>
      </div>
    </div>

    <div ref="section4" class="py-4 text-gray-800">
      <!-- Main row -->
      <div class="flex flex-wrap">
        <!-- Artist Info Wrapper -->
        <div id="WerBinIch" class="mt-20 w-full lg:w-1/2">
          <div class="sticky top-[var(--navbar-height)]">
            <about-the-artist :image="filteredArtistImage!" />
          </div>
        </div>
        <!-- Gallery section -->
        <div id="Gallerie" class="w-full lg:w-1/2">
          <p
            class="mt-20 pt-5 text-center font-kablammo text-4xl font-semibold"
          >
            Gallerie
          </p>
          <p class="mt-3 text-center text-lg">
            Alles sind Unikate (und bleiben es auch)
          </p>
          <!-- To test the responsive image delivery with srcset
              you have to resize the actual browser window and not 
              use the chrome responsive mode slide. After resizing 
              you have to hard refresh (ctrl + shift + r). Then the 
              correct image for the current breakpoint should show. -->
          <!--           <img
            src="
              /hero-images/20241110_144100.jpg"
            srcset="
              /hero-images/20241110_144100.jpg 600w,
              /hero-images/Hero1.png           800w
            "
          /> -->
          <div class="-p-5 flex flex-wrap">
            <div
              v-for="(image, index) in filteredGalleryImages"
              :key="index"
              class="p-5 sm:w-1/2 md:w-1/3"
            >
              <gallery-image
                :image-path="image.path"
                :blur-hash="image.blurHash"
                :alt="image.alt"
                :caption="image.caption"
                @click="openGalleryModal(image)"
              />
            </div>
          </div>
        </div>
      </div>

      <UModal
        v-model="isGalleryModalOpen"
        :ui="{ width: 'sm:max-w-fit', margin: 'sm:my-0' }"
      >
        <div class="flex flex-col justify-center p-4">
          <!-- The v-if is only necessary to avoid ts error
           but realistically currentImage should never be undefined
           when the modal opens, because openGalleryModal sets currentImage -->
          <img
            v-if="currentImage"
            :alt="currentImage.caption"
            :src="currentImage.path"
            class="max-h-[80vh] max-w-full object-contain"
          />

          <div class="mt-4 flex place-content-between">
            <UButton
              label="Share"
              icon="i-mdi-share-variant"
              @click="shareImage"
            />
            <UButton
              label="Close"
              icon="i-mdi-close"
              color="red"
              @click="closeGalleryModal"
            />
          </div>
        </div>
      </UModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import images from "@/data/updatedImages.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import hero1 from "/hero-images/Hero1.png";
import hero2 from "/hero-images/Hero2.png";
import hero3 from "/hero-images/Hero3.png";
import hero4 from "/hero-images/Hero4.png";
import hero5 from "/hero-images/Hero5.png";
import type HeroSection from "~/components/HeroSection.vue";

definePageMeta({
  title: "Traumtänzer und Paradiesvögel",
  description: "A one page app with Vue 3 and Vite",
  layout: "one-page-app",
});

interface IBackgroundImage {
  path: string;
  order: number;
  isLoaded: boolean;
}

const bgImages = ref<IBackgroundImage[]>([
  {
    path: hero1,
    order: 1,
    isLoaded: false,
  },
  {
    path: hero2,
    order: 2,
    isLoaded: false,
  },
  {
    path: hero3,
    order: 3,
    isLoaded: false,
  },
  // Add more images as needed
  {
    path: hero4,
    order: 4,
    isLoaded: false,
  },
  {
    path: hero5,
    order: 5,
    isLoaded: false,
  },
]);

/* const showPlaceholderImageWhileLoading = () => {
  if (!bgImages.value[0].isLoaded) {
    return scrollDownIcon;
  } else {
    return bgImages.value[0];
  }
}; */

interface IImage {
  path: string;
  blurHash: string;
  alt: string;
  caption: string;
  category: string;
}

const currentImage = ref<IImage>();
const currentImageIndex = ref(-1);
const isGalleryModalOpen = ref(false);

const openGalleryModal = (image: IImage) => {
  currentImage.value = image;
  currentImageIndex.value = filteredGalleryImages.value.findIndex(
    (img) => img.path === image.path,
  );
  nextTick(() => {
    isGalleryModalOpen.value = true;
  });
};

const closeGalleryModal = () => {
  isGalleryModalOpen.value = false;
};

// Define the shareImage function
const shareImage = () => {
  if (navigator.share) {
    if (!currentImage.value) {
      console.error("currentImage is not defined");
      return;
    }
    navigator
      .share({
        title: currentImage.value.caption,
        url: currentImage.value.path,
      })
      .then(() => {
        console.log("Danke für's Teilen!");
      })
      .catch(console.error);
  } else {
    // Fallback for browsers that do not support the Web Share API
    alert("Ihr Browser unterstützt das Teilen via Web Share API nicht.");
  }
};

const filteredGalleryImages = computed(() => {
  return images.filter((image) => image.category === "gallery");
});

const filteredArtistImage = computed(() => {
  const filteredImages = images.filter(
    (image) => image.category === "AboutTheArtist",
  );
  const artistImage = filteredImages.length > 0 ? filteredImages[0] : null;
  if (artistImage) {
    const { category, ...rest } = artistImage;
    return rest;
  }
  return null;
});

const checkImageLoaded = (imageUrl: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = imageUrl;
  });
};

interface ISectionInfo {
  heroSectionDiv: HTMLElement;
  heroBgDiv: HTMLElement;
  index: number;
}

const heroSectionInfos = ref<ISectionInfo[]>([]);

const addToSectionsRef = (heroSection: ISectionInfo) => {
  console.log("Entering addToSectionsRef");
  console.log(
    "elInfo.el.clientHeight",
    heroSection.heroSectionDiv.clientHeight,
  );
  console.log("bg", heroSection.heroBgDiv);
  console.log("index", heroSection.index);
  heroSectionInfos.value.push(heroSection);
  if (heroSectionInfos.value.length === bgImages.value.length) {
    heroSectionInfos.value.sort((a, b) => a.index - b.index);
    console.log("All hero sections mounted and sorted");
    console.log("heroSectionInfos", heroSectionInfos.value);
    gsap.registerPlugin(ScrollTrigger);
    initParallax();
    console.log("gsap", gsap);
  }
};

const initParallax = () => {
  console.log("Entering initParallax");
  console.log("heroSectionInfos", heroSectionInfos.value);
  heroSectionInfos.value.forEach((section, i) => {
    if (!heroSectionInfos.value) {
      console.error("heroSectionInfos is not defined");
      return;
    }
    console.log("Starting initParallax for section", i);

    const getRatio = (sectionOffsetHeight: number) =>
      window.innerHeight / (window.innerHeight + sectionOffsetHeight);

    console.log("window.innerHeight", window.innerHeight);
    console.log("section.offsetHeight", section.heroSectionDiv.offsetHeight);
    console.log("getRatio", getRatio(section.heroSectionDiv.offsetHeight));
    gsap.fromTo(
      section.heroBgDiv,
      {
        backgroundPositionY: () =>
          i
            ? `${
                -window.innerHeight *
                getRatio(section.heroSectionDiv.offsetHeight)
              }px`
            : "0px",
      },
      {
        backgroundPositionY: () =>
          `${
            window.innerHeight *
            (1 - getRatio(section.heroSectionDiv.offsetHeight))
          }px`,
        ease: "none",
        scrollTrigger: {
          trigger: section.heroSectionDiv,
          start: () => (i ? "top bottom" : "top top"),
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  });
};

onMounted(async () => {
  bgImages.value.forEach((bgImage, index) => {
    checkImageLoaded(bgImage.path)
      .then(() => {
        bgImage.isLoaded = true;
      })
      .catch(() => {
        console.error(`Failed to load image at index ${index}`);
      });
  });
});

const section4 = ref<HTMLElement | null>(null);

const scrollToNextSection = (nextSection: number) => {
  console.log("scrollToNextSection", nextSection);
  const nextSectionInfo = heroSectionInfos.value.find(
    (section) => section.index === nextSection,
  );
  // if nextSection is 4, scroll to div with id section4
  if (nextSection === 4) {
    if (!section4.value) {
      console.error("section4 not found");
      return;
    }
    section4.value.scrollIntoView({
      behavior: "smooth",
    });
    return;
  }

  if (!nextSectionInfo) {
    console.error("nextSectionInfo not found");
    return;
  }
  console.log("nextSectionInfo", nextSectionInfo);
  nextSectionInfo.heroSectionDiv.scrollIntoView({
    behavior: "smooth",
  });
};
</script>

<style scoped></style>
