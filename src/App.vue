<!-- src/App.vue -->
<template>
  <div class="min-h-full">
    <nav class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <a href="./">
                <h1
                  class="text-xl font-bold bg-black p-3 mt-3 rounded-lg text-gray-900"
                >
                  <img
                    src="data:image/png;base64,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"
                    alt="JUMAP"
                    width="150"
                  />
                </h1>
              </a>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                v-for="route in routes"
                :key="route.path"
                :to="route.path"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[
                  $route.path === route.path
                    ? 'border-b-2 border-indigo-500 text-gray-900'
                    : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                ]"
              >
                {{ route.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="py-10">
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      routes: [
        { path: "/products", name: "Produtos" },
        { path: "/inventory", name: "Inventário" },
        { path: "/sales", name: "Vendas" },
        { path: "/reports", name: "Relatórios" },
      ],
    }
  },
}
</script>
