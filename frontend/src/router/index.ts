import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/index.vue"),
    },
    {
      path: "/:catchAll(.*)", // Catch-all for undefined routes
      name: "NotFound",
      component: () => import("../views/404.vue"),
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
      path: "/blog/:_id",
      name: "article",
      component: () =>
        import(/* webpackChunkName: "article" */ "../views/article.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/about.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    // SERVICES
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
    {
      path: "/services/post-production",
      name: "post-production",
      component: () => import("../views/post-production.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/services/drone",
      name: "drone",
      component: () => import("../views/drone.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    // LEGAL
    {
      path: "/legal",
      name: "Legal",
      component: () => import("../views/legal.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/legal/:id",
      name: "Legal article",
      component: () => import("../views/legal-article.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    // Add the NotFound route at the end
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("../views/404.vue"),
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
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // If the route requires authentication and the user is not authenticated, redirect to the home page
  if (!isAuthenticated && requiresAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
