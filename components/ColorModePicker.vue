<template>
  <div>
    <div class="min-h-8">
      <ul>
        <li
          v-for="color of ['system', 'light', 'dark', 'sepia']"
          :key="color"
          :class="{
            'bg-green-500 stroke-2':
              !$colorMode.unknown && color === $colorMode.value,
          }"
          class="inline-block"
        >
          <component
            :is="`icon-${color}`"
            @click="$colorMode.preference = color"
          />
        </li>
      </ul>
    </div>
    <!-- <p>
      <ColorScheme placeholder="..." tag="span">
        Color mode: <b>{{ $colorMode.preference }}</b>
        <span v-if="$colorMode.preference === 'system'"
          >&nbsp;(<i>{{ $colorMode.value }}</i> mode detected)</span
        >
      </ColorScheme>
    </p> -->
  </div>
</template>

<style scoped>
/* ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul li {
  display: inline-block;
  padding: 5px;
}
p {
  margin: 0;
  padding-top: 5px;
  padding-bottom: 20px;
} */
</style>
