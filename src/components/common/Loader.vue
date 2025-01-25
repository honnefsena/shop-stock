<!-- src/components/common/Loader.vue -->
<template>
  <div class="flex items-center justify-center p-4">
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
    ></div>
    <span v-if="text" class="ml-3 text-gray-700">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    text: {
      type: String,
      default: "Loading...",
    },
  },
}
</script>
