<template>
  <form @submit.prevent="handleGoToSearch()" class="w-full px-10">
    <UInput
      v-model="searchQuery"
      type="text"
      placeholder="Search products..."
      trailing-icon="lucide:search"
      size="xl"
      class="w-full [&>input]:rounded-full [&>input]:px-6 [&>input]:placeholder:text-sm focus:ring-0"
    />
  </form>
</template>

<script lang="ts" setup>
const searchQuery = ref<string>("");

const handleGoToSearch = async () => {
  if (searchQuery.value) {
    // Redirect to the search page with the query
    await navigateTo({
      path: "/search",
      query: {
        q: searchQuery.value,
      },
      replace: true,
    });
  }
  searchQuery.value = "";
};
</script>
