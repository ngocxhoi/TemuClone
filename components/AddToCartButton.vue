<template>
  <button
    @click="handleAddToCart"
    :disabled="isLoading"
    class="w-full mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-full font-bold text-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-[1.02] active:scale-[1.02] shadow-xl flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 disabled:hover:from-red-500 disabled:hover:to-red-600"
  >
    <template v-if="isLoading">
      <Icon name="lucide:loader-circle" size="24" class="animate-spin" />
      <span>Adding to Cart...</span>
    </template>
    <template v-else>
      <Icon name="lucide:shopping-cart" size="24" />
      Add to Cart - {{ formatPrice(product.price) }}
    </template>
  </button>
</template>

<script lang="ts" setup>
import type { ProductItem } from "~/types/content";
const props = defineProps<{
  product: ProductItem;
}>();
const { product } = toRefs(props);

const toast = useToast();
const { addItem } = useCartStore();

const isLoading = ref(false);

async function handleAddToCart() {
  try {
    isLoading.value = true;
    await addItem(product.value.uuid);

    toast.add({
      title: "Added to Cart",
      description: `Product "${product.value.uuid}" has been added to your cart.`,
      color: "success",
      icon: "lucide:check-circle",
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
  } finally {
    isLoading.value = false;
  }
}
</script>
