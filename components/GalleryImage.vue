<template>
  <div class="mb-4 bg-cover bg-center" :style="backgroundStyle">
    <NuxtImg
      :src="imagePath"
      :alt="alt"
      provider="cloudflare"
      class="h-auto w-full cursor-pointer rounded-md object-cover"
      placeholder
      :modifiers="{ rotate: 90 }"
      @load="onImageLoad"
    />

    <!-- Optional: Display caption -->
    <!-- <p class="mt-2 text-center text-lg">{{ caption }}</p> -->
  </div>
</template>

<script setup lang="ts">
import { decode } from "blurhash";

const props = defineProps<{
  imagePath: string;
  blurHash: string;
  alt: string;
  caption: string;
}>();

const imageLoaded = ref(false);
const backgroundStyle = ref({});

const displayBlurHash = () => {
  const pixels = decode(props.blurHash, 32, 32); // Adjust dimensions as needed
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 32; // BlurHash dimensions
  canvas.height = 32;
  const imageData = new ImageData(pixels, 32, 32); // Adjust dimensions as needed
  // added "!" to ctx to disable ts null check, because we know it's not null
  // It only returns null if the contextType is not supported, but we know "2d" is supported
  ctx!.putImageData(imageData, 0, 0);

  // Convert canvas to data URL and set as background
  const dataUrl = canvas.toDataURL();
  backgroundStyle.value = {
    backgroundImage: `url(${dataUrl})`,
  };
};

const onImageLoad = () => {
  imageLoaded.value = true;
  backgroundStyle.value = {}; // Clear the background style
};

onMounted(() => {
  displayBlurHash();
});
</script>
