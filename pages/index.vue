<template>
  <section class="container mx-auto py-8">
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <HomeProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
// const { data: home } = await useAsyncData(() =>
//   queryCollection("page").path("/page").first()
// );

const { data: products } = await useAsyncData("products", () =>
  queryCollection("product").order("title", "DESC").all()
);

const auth = useAuth();
</script>
