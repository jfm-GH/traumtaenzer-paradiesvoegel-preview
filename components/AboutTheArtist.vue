<template>
  <div class="mb-3 flex flex-wrap rounded-lg p-3 lg:shadow">
    <!-- Headline for below md -->
    <h6
      class="mt-20 block w-full pb-5 text-center font-kablammo text-4xl font-semibold md:hidden"
    >
      Wer bin ich?
    </h6>
    <!-- Image Column -->
    <div v-if="props.image" class="w-full md:w-1/2">
      <GalleryImage
        :image-path="props.image.path"
        :blur-hash="props.image.blurHash"
        :alt="props.image.alt"
        :caption="props.image.caption"
      />
    </div>

    <!-- Text Column -->
    <div class="w-full pl-5 md:w-1/2">
      <!-- Headline for md and above -->
      <h6
        class="hidden pb-5 text-center font-kablammo text-4xl font-semibold md:block"
      >
        Wer bin ich?
      </h6>
      <!-- Artist Info -->
      <h5 class="text-lg font-semibold">Ingride Mateen</h5>
      <p class="text-sm">33332 Gütersloh, Deutschland</p>
      <p class="mb-2 text-sm">
        <a
          href="mailto:ingride@traumtaenzer-paradiesvoegel.de"
          class="text-blue-600 hover:text-blue-800"
          >ingride@traumtaenzer-paradiesvoegel.de</a
        >
      </p>
      <!-- <p class="mb-2 text-sm">
        Telefon:
        <a href="tel:+49176123456" class="text-blue-600 hover:text-blue-800"
          >123-456-7890</a
        >
      </p> -->

      <!-- Artist Bio -->

      <h6 class="mt-20 py-5 text-center font-kablammo text-4xl font-semibold">
        Was mache ich?
      </h6>
      <p class="text-sm">
        Ausprobieren, was möglich ist, mir und meiner Fantasie keine Grenzen
        setzen. UND was mir in dieser Hinsicht geradezu entgegen kam:
        <span class="whitespace-nowrap"
          >Aquarellfarben + Ton = Pure Inspiration</span
        >. Dazu die Erfahrung je mehr ich versuche je mehr ich mich traue umso
        mehr ist möglich (muss lachen) DAS macht einfach Spaß
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import GalleryImage from "./GalleryImage.vue";

const props = defineProps<{
  image: {
    path: string;
    blurHash: string;
    alt: string;
    caption: string;
  };
}>();
</script>
