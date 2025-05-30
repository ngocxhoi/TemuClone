<template>
  <div class="bg-white rounded-lg overflow-hidden relative">
    <div class="absolute top-2 right-2 z-10">
      <span
        class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce"
        >HOT!</span
      >
    </div>

    <div class="relative h-48 w-full">
      <NuxtImg
        v-if="product.image"
        :src="product.image"
        :alt="product.description"
        class="object-contain p-2"
        loading="lazy"
      />
    </div>

    <div class="p-4">
      <h3 class="text-sm font-medium line-clamp-2 h-10 mb-1">
        {{ product.title }}
      </h3>
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <span class="text-lg font-bold text-red-500"
            >${{ (product.price || 0).toFixed(2) }}</span
          >
          <span class="text-sm text-gray-400 line-through"
            >${{ ((product.price || 0) * 5).toFixed(2) }}</span
          >
        </div>
        <div class="text-xs text-green-500 font-semibold mb-2">
          🔥
          {{
            100 +
            Math.abs(
              product.uuid
                .split("")
                .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 500
            )
          }}+ sold in last 24h
        </div>
        <ULink
          :href="`/product/${product.uuid}`"
          class="w-full text-center bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all"
        >
          GRAB IT NOW!
        </ULink>
        <div class="text-xs text-red-500 text-center mt-1 animate-pulse">
          ⚡ Limited time offer!
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ProductCollectionItem } from "@nuxt/content";
import type { Product } from "~/types/content";

const props = defineProps<{
  product: ProductCollectionItem | Product;
}>();
</script>
