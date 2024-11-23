<template>
  <div :id="heroSectionId" ref="heroSectionDiv">
    <div
      ref="heroBgDiv"
      :v-show="showPlaceholderImageWhileLoading"
      class="relative flex items-start justify-center bg-cover bg-[44%] bg-no-repeat md:w-7/12 md:bg-center"
      :class="{
        'h-screen md:h-[calc(100vh-var(--navbar-height))]':
          props.bgImage.order === 1,
        'h-screen': props.bgImage.order !== 1,
      }"
      :style="backgroundImage(props.bgImage.path)"
    >
      <slot></slot>

      <!-- Scroll Down Indicator -->
      <div
        class="absolute bottom-5 right-16 opacity-70 transition-all md:bottom-16 lg:bottom-20 lg:right-10"
      >
        <UButton
          :ui="{
            rounded: 'rounded-full',
            icon: { size: { xxl: 'text-6xl md:text-8xl' } },
          }"
          icon="i-mdi-chevron-double-down"
          color="white"
          variant="solid"
          size="xxl"
          :trailing="false"
          @click="emitScrollToNextSection"
        />

        <!-- <span
          class="rounded-full border-2 border-none bg-gray-500 bg-opacity-60 px-1 pb-5 pt-3 font-semibold text-gray-300 lg:px-1 lg:pb-7 lg:pt-5"
        >
          <a href="#section2">
            <img
              class="inline h-12 opacity-60 lg:h-16"
              :src="scrollDownIcon"
              alt="scroll down icon"
            />
          </a>
        </span> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import scrollDownIcon from "@/assets/img/icons/ScrollDownIcon.png";

interface IBackgroundImage {
  path: string;
  order: number;
  isLoaded: boolean;
}

const props = defineProps<{
  bgImage: IBackgroundImage;
}>();

const heroSectionDiv = ref<HTMLElement | null>(null);
const heroBgDiv = ref<HTMLElement | null>(null);
const heroSectionId = `section${props.bgImage.order}`;

const backgroundImage = (image: string) => {
  return {
    backgroundImage: `url(${image})`,
  };
};

const showPlaceholderImageWhileLoading = () => {
  if (props.bgImage.isLoaded) {
    return scrollDownIcon;
  } else {
    return props.bgImage.path;
  }
};

interface ISectionInfo {
  heroSectionDiv: HTMLElement;
  heroBgDiv: HTMLElement;
  index: number;
}

const emit = defineEmits<{
  (e: "heroSectionMounted", elInfo: ISectionInfo): void;
  (e: "scrollToNextSection", nextSection: number): void;
}>();

onMounted(() => {
  // console.log("HeroSection mounted");
  // const elHeight = element.clientHeight;
  if (!heroBgDiv.value) {
    console.error("bg element not found");
    return;
  } else if (!heroSectionDiv.value) {
    console.error("section element not found");
    return;
  }
  const elInfo = {
    heroSectionDiv: heroSectionDiv.value,
    heroBgDiv: heroBgDiv.value,
    index: props.bgImage.order,
  };
  // console.log("heroSectionDiv element: ", heroSectionDiv);
  // console.log("heroSectionDiv index: ", elInfo.index);
  emit("heroSectionMounted", elInfo);
});

const emitScrollToNextSection = () => {
  emit("scrollToNextSection", props.bgImage.order + 1);
};
</script>

<style></style>
