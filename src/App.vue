<script setup>
import { onMounted } from "vue";
import { useCookies } from "vue3-cookies";
import { rreloadToken } from "@/api/user";

const { cookies } = useCookies();

function reloadToken() {
  rreloadToken()
    .then((res) => {})
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  if (!cookies.get("sign")) return;
  reloadToken();
});
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
#app {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
