import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import TeamsList from "./components/teams/TeamsList.vue";
import UsersList from "./components/users/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";
import NotFound from "./components/nav/NotFound.vue";
import TeamFooter from "./components/teams/TeamFooter.vue";
import UserFooter from "./components/users/UserFooter.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/teams" },
    {
      name: "teams",
      path: "/teams",
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
  // next(false); // deny  access
  // if (to.name === "team-members") {
  //   next();
  // } else {
  //   next({ name: "team-mambers", params: { teamId: "t2" } });
  // }
  next();
});

const app = createApp(App);

app.use(router);

app.mount("#app");
