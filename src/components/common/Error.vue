<!-- src/components/common/Error.vue -->
<template>
  <div class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <!-- Error Icon -->
        <svg
          class="h-5 w-5 text-red-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">
          {{ title }}
        </h3>
        <div class="mt-2 text-sm text-red-700">
          <p>{{ message }}</p>
        </div>
        <div v-if="retryable" class="mt-4">
          <button
            @click="$emit('retry')"
            type="button"
            class="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: {
    title: {
      type: String,
      default: "Error",
    },
    message: {
      type: String,
      required: true,
    },
    retryable: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
