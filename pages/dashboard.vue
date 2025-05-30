<template>
  <div>You are logged in as {{ auth.user?.email }}</div>
</template>

<script lang="ts" setup>
const auth = useAuth();

onMounted(async () => {
  if (!auth.loggedIn) return;
  await $fetch<any>("/api/db/user", {
    method: "POST",
    body: {
      name: auth.user?.given_name + " " + auth.user?.family_name,
      email: auth.user?.email,
      picture: auth.user?.picture,
    },
  });
});
</script>
