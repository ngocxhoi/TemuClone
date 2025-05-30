<template>
  <div>
    <ClientOnly>
      <div class="container mx-auto py-3 px-4">
        <UBreadcrumb :items="items" />
      </div>
      <div class="bg-gradient-to-r from-red-500/10 to-red-600/10 py-6 px-4">
        <div class="container mx-auto">
          <h1
            class="text-2xl md:text-4xl font-bold text-center text-red-600 mb-3"
          >
            🔥 FLASH SALE - 80% OFF 🔥
          </h1>
          <div class="flex flex-col items-center gap-2">
            <p
              class="text-center text-red-500 text-sm md:text-base font-semibold animate-pulse"
            >
              ⚡️ Only {{ Math.floor(Math.random() * 10) + 1 }} items left at
              this price!
            </p>
            <div class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
              ⏰ Offer ends soon!
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 py-4">
        <div class="container mx-auto">
          <div class="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div class="flex items-center gap-2">
              <span class="text-yellow-600 text-xl">🚚</span>
              <span class="font-medium">Free Express Shipping</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-yellow-600 text-xl">✨</span>
              <span class="font-medium">Satisfaction Guaranteed</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-yellow-600 text-xl">🔒</span>
              <span class="font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>

    <div v-if="product" class="container mx-auto py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-if="product.image"
          class="bg-white rounded-2xl p-4 aspect-square overflow-hidden shadow-lg"
        >
          <div class="relative aspect-square">
            <NuxtImg
              class="object-cover w-full hover:scale-105 transition-transform duration-300"
              :alt="product.title ?? 'Product Image'"
              :src="product.image"
            />
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
            {{ product.title }}
          </h1>
          <p class="text-gray-600">
            {{ product.description }}
          </p>

          <div class="flex flex-col gap-2 mt-4">
            <div class="flex items-center gap-3">
              <div class="flex items-baseline gap-1">
                <span class="text-xs font-bold text-red-600">US</span>
                <span class="text-5xl font-black text-red-600 tracking-tight">
                  {{ formatPrice(product.price).replace("$", "") }}
                </span>
              </div>
              <div class="flex flex-col">
                <span
                  class="text-lg text-gray-400 line-through decoration-red-500/50 decoration-2"
                >
                  {{ formatPrice(originalPrice) }}
                </span>
                <div class="flex items-center gap-2">
                  <span
                    class="bg-red-600 text-white px-2 py-0.5 rounded text-sm font-bold animate-pulse"
                  >
                    -80%
                  </span>
                  <span class="text-red-600 font-bold text-sm">
                    MEGA SAVINGS
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
              <span class="text-red-600 font-bold">💰</span>
              <span class="text-red-600 font-medium text-sm">
                You save {{ formatPrice(originalPrice - product.price) }}!
              </span>
            </div>

            <div class="flex items-center gap-2 text-xs text-gray-600">
              <span
                class="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"
              ></span>
              <span
                >{{ Math.floor(Math.random() * 50) + 20 }} people bought in the
                last hour</span
              >
            </div>
          </div>

          <div
            class="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 p-4 rounded-xl mt-4"
          >
            <div class="flex items-center gap-2 text-yellow-800">
              <span class="text-xl">⚡️</span>
              <span class="font-bold">Limited Time Offer!</span>
            </div>
            <div class="text-sm text-yellow-700 mt-1 font-medium">
              Order now before price changes!
            </div>
          </div>

          <AddToCartButton :product="product" />

          <div
            class="flex flex-col gap-3 mt-6 text-sm bg-white p-4 rounded-xl shadow-sm border border-gray-100"
          >
            <div class="flex items-center gap-3 text-gray-700">
              <span class="bg-green-100 p-2 rounded-full">✅</span>
              <span class="font-medium">In stock - Ships within 24 hours</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <span class="bg-green-100 p-2 rounded-full">🔄</span>
              <span class="font-medium">30-day money-back guarantee</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <span class="bg-green-100 p-2 rounded-full">🛡️</span>
              <span class="font-medium">Secure payment processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from "@nuxt/ui";
useSeoMeta({
  title: "Detail",
});

const route = useRoute();
const { params, query } = toRefs(route);

const { data: product } = await useAsyncData(
  `product-${params.value.id}`,
  () => {
    return queryCollection("product")
      .where("uuid", "=", params.value.id)
      .first();
  }
);

const originalPrice = computed(() => {
  return product.value?.price ? product.value.price * 5 : 0;
});

const items = ref<BreadcrumbItem[]>([
  {
    label: "Home",
    icon: "i-lucide-house",
    to: "/",
  },
  {
    label: "Components",
    icon: "i-lucide-box",
    to: "/",
  },
  {
    label: product.value?.title,
  },
]);
</script>
