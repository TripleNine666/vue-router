<template>
  <button @click="confirm">Confirm</button>
  <button @click="sendForm">Send form</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from "./UserItem.vue";

export default {
  components: {
    UserItem,
  },
  inject: ["users"],
  data() {
    return {
      changesSaved: false,
    };
  },
  methods: {
    sendForm() {
      this.changesSaved = true;
    },
    confirm() {
      this.$router.push("/teams");
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log("BeforeRouteEnter UsersList");
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("BeforeRouteLeave UsersList");
    if (this.changesSaved) {
      next();
    } else {
      const userDecision = confirm("Are you sure? You have unsaved data!");
      next(userDecision);
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
