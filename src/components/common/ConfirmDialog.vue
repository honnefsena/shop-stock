<!-- src/components/common/ConfirmDialog.vue -->
<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    v-if="show"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
    >
      <div class="mt-3 text-center">
        <div
          class="mx-auto flex items-center justify-center h-12 w-12 rounded-full"
          :class="typeClasses.iconWrapper"
        >
          <svg
            class="h-6 w-6"
            :class="typeClasses.icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="type === 'danger'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h3 class="text-lg leading-6 font-medium text-gray-900 mt-2">
          {{ title }}
        </h3>
        <div class="mt-2 px-7 py-3">
          <p class="text-sm text-gray-500">
            {{ message }}
          </p>
        </div>
        <div class="items-center px-4 py-3">
          <button
            @click="confirm"
            class="px-4 py-2 mr-2 text-white rounded-md"
            :class="typeClasses.confirmButton"
          >
            {{ confirmText }}
          </button>
          <button
            @click="cancel"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            {{ cancelText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    confirmText: {
      type: String,
      default: "Confirm",
    },
    cancelText: {
      type: String,
      default: "Cancelar",
    },
    type: {
      type: String,
      default: "info",
      validator: function (value) {
        return ["info", "danger"].indexOf(value) !== -1
      },
    },
  },
  computed: {
    typeClasses() {
      return {
        info: {
          iconWrapper: "bg-blue-100",
          icon: "text-blue-600",
          confirmButton: "bg-blue-600 hover:bg-blue-700",
        },
        danger: {
          iconWrapper: "bg-red-100",
          icon: "text-red-600",
          confirmButton: "bg-red-600 hover:bg-red-700",
        },
      }[this.type]
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm")
    },
    cancel() {
      this.$emit("cancel")
    },
  },
}
</script>
