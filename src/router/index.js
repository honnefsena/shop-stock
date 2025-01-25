import { createRouter, createWebHistory } from "vue-router"

const routes = [
 {
   path: "/",
   redirect: "/products",
 },
 {
   path: "/products",
   name: "Products", 
   component: () => import("@/views/Products.vue"),
 },
 {
   path: "/inventory",
   name: "Inventory",
   component: () => import("@/views/Inventory.vue"),
 },
 {
   path: "/sales",
   name: "Sales",
   component: () => import("@/views/Sales.vue"),
 },
 {
   path: "/reports",
   name: "Reports",
   component: () => import("@/views/Reports.vue"),
 },
 {
   path: "/:pathMatch(.*)*",
   redirect: "/"
 }
]

const router = createRouter({
 history: createWebHistory(),
 routes,
})

router.beforeEach((to, from, next) => {
 if (!to.matched.length) {
   next({ path: '/' })
   return
 }
 next()
})

export default router
