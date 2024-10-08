import { createRouter, createWebHistory } from "vue-router";
import index from "../views/index.vue";
import NotFound from "../views/404.vue";

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
      path: "/blog/:slug",
      name: "blog Article",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/article.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/our-team",
      name: "our team",
      component: () => import("../views/our-team.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/press-resources",
      name: "press resources",
      component: () => import("../views/press-resources.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/services/photo",
      name: "photo",
      component: () => import("../views/Photo.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/services/video",
      name: "video",
      component: () => import("../views/Video.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    // Add the NotFound route at the end
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: NotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
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
