import { createRouter, createWebHistory } from "vue-router";
import index from "../views/index.vue";
import NotFound from "../views/NotFound.vue"; // Import the NotFound component

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: index,
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/blog.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/our-team",
      name: "our team",
      component: () => import("../views/OurTeam.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/press-resources",
      name: "press resources",
      component: () => import("../views/PressResources.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/services/photo",
      name: "photo",
      component: () => import("../views/photo.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/services/video",
      name: "video",
      component: () => import("../views/video.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/contact.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/blog/:id",
      name: "blog single",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/article.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    // Add the NotFound route at the end
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

// Navigation guard that runs before each route change
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem("user");
  console.log("is auth", isAuthenticated);
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  console.log("requires auth", requiresAuth);

  // If the route requires authentication and the user is not authenticated, redirect to the home page
  if (!isAuthenticated && requiresAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
