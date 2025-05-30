<template>
  <div>
    <div class="bg-red-50 p-4">
      <div class="container mx-auto">
        <h1
          class="text-2xl md:text-3xl font-bold text-center text-red-600 mb-2"
        >
          <span class="capitalize">{{
            formatCategoryName(route.params.categoryName as string)
          }}</span>
          - UP TO 90% OFF! 🔥
        </h1>
        <p class="text-center text-red-500 text-sm md:text-base animate-pulse">
          ⚡️ Flash Sale Ending Soon! ⏰ Limited Time Only
        </p>
      </div>

      <div class="bg-yellow-50 py-3">
        <div class="container mx-auto">
          <div class="flex items-center justify-center gap-4 text-sm">
            <div class="flex items-center gap-2">
              <span class="text-yellow-600">🚚</span>
              <span>Free Shipping</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-yellow-600">⭐️</span>
              <span>Top Rated</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-yellow-600">💰</span>
              <span>Best Prices</span>
            </div>
          </div>
        </div>
      </div>

      <section class="container mx-auto py-8">
        <div class="text-center mb-8">
          <p class="text-sm text-gray-500">
            🎉 {{ dataByCategory?.length }} Amazing Deals Available Now!
          </p>
        </div>

        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          <HomeProductItem
            v-for="product in dataByCategory"
            :key="product.id"
            :product="product"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: dataByCategory } = await useAsyncData("dataByCategory", () =>
  queryCollection("product").where("category", "=", "Category 1").all()
);

function formatCategoryName(categoryName: string): string {
  return categoryName.replace(/-/g, " ");
}
</script>
