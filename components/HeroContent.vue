<template>
  <div :class="contentClasses">
    <p v-if="index === 0" :class="textClasses">Traumtänzer</p>
    <p v-if="index === 0" :class="centerTextClasses">und</p>
    <p v-if="index === 0" :class="textClasses">Paradiesvögel</p>
    <p v-else-if="index === 1" :class="textClasses">Sooo viele ...</p>
    <p v-else-if="index === 2" :class="textClasses">
      ... schau' sie dir genau an
    </p>
    <p v-else-if="index === 3" :class="textClasses">
      Jede und jeder ist einzigartig
    </p>
    <p v-else-if="index === 4" :class="textClasses">
      Ähnlichkeiten rein zufällig
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  index: number;
}

const props = defineProps<Props>();

const contentClasses = computed(() => {
  return [
    "absolute rounded-[25px] bg-red-500 bg-opacity-50 text-white transition-all font-kablammo",
    props.index === 0
      ? "top-[20px] px-20 py-3 md:left-[400px] md:bg-opacity-100 xl:left-[600px] xl:top-[40px] xl:px-32 xl:py-6 2xl:left-[80%]"
      : "bottom-[200px] px-10 py-3 md:left-[500px] md:bg-opacity-100 lg:bottom-[200px] lg:px-16 lg:py-6 xl:left-[700px] xl:px-32 xl:py-6 2xl:left-[1000px]",
  ];
});

const textClasses = computed(() => {
  return [
    "mb-0 pb-0 text-4xl font-bold ",
    props.index === 0
      ? "-mr-4 text-right md:-mr-5 md:text-3xl "
      : "min-w-fit pb-0 text-right",
  ];
});

const centerTextClasses = computed(() => {
  return "my-0 mt-0 py-0 text-center text-4xl md:text-3xl ";
});
</script>
