import { createRouter, createWebHistory } from "vue-router";

import TeamsList from "./pages/TeamsList.vue";
import UsersList from "./pages/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";
import NotFound from "./pages/NotFound.vue";
import TeamFooter from "./pages/TeamFooter.vue";
import UserFooter from "./pages/UserFooter.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/teams" },
    {
      name: "teams",
      path: "/teams",
      meta: { needAuth: true },
      components: {
        default: TeamsList,
        footer: TeamFooter,
      },
      children: [
        {
          name: "team-members",
          path: ":teamId",
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      name: "users",
      path: "/users",
      components: {
        default: UsersList,
        footer: UserFooter,
      },
      beforeEnter(to, from, next) {
        console.log("BeforeEnter users");
        console.log(to, from);
        next();
      },
    },
    { name: "not-found", path: "/:notFound(.*)", component: NotFound },
  ],
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, left: 0 };
  },
});

router.beforeEach(function (to, from, next) {
  console.log("Global beforEach");
  console.log(to, from);
  if (to.meta.needAuth) {
    console.log("Need auth!");
    next();
  } else {
    next();
  }
  // next(false); // deny  access
  // if (to.name === "team-members") {
  //   next();
  // } else {
  //   next({ name: "team-mambers", params: { teamId: "t2" } });
  // }
  next();
});

router.afterEach(function (to, from) {
  // good idea to sending analitics data
  console.log("After Each");
  console.log(to, from);
});

export default router;
