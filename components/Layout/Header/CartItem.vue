<template>
  <li
    v-if="product"
    class="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
  >
    <img :src="product.image" alt="" class="w-16 h-16 object-cover rounded" />
    <div class="flex-1">
      <div class="font-semibold">{{ product.title }}</div>
      <div class="text-sm text-gray-700">${{ product.price.toFixed(2) }}</div>
      <div class="flex items-center gap-3">
        <UInput
          v-model="quantityNew"
          @change="handleChange()"
          type="number"
          class="w-20"
          min="0"
        />
        <UButton
          @click="handleRemoveItem()"
          label="Remove"
          color="error"
          variant="ghost"
          class="cursor-pointer"
        />
      </div>
    </div>
    <div v-if="product.price" class="font-bold text-right">
      ${{ (product.price * quantityNew).toFixed(2) }}
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { CartItems } from "~/server/database/schema";

const props = defineProps<{
  item: CartItems;
}>();
const { item } = toRefs(props);

const { updateItem, totalPriceFunc, removeItem } = useCartStore();
const toast = useToast();

const quantityOld = ref(item.value.quantity);
const quantityNew = ref(item.value.quantity);

const { data: product } = await useAsyncData(
  `cart-product-${item.value.productId}`,
  () =>
    queryCollection("product")
      .select()
      .where("uuid", "=", item.value.productId)
      .first()
);

async function handleChange() {
  totalPriceFunc(
    quantityNew.value * product.value!.price -
      quantityOld.value * product.value!.price,
    item.value.id,
    quantityNew.value
  );
  quantityOld.value = quantityNew.value;

  await updateItem(item.value.id, quantityNew.value);
}

async function handleRemoveItem() {
  totalPriceFunc(-quantityOld.value * product.value!.price);
  await removeItem(item.value.id);
  toast.add({
    title: "Removed from Cart",
    description: `Product "${
      product.value!.uuid
    }" has been removed from your cart.`,
    color: "error",
    icon: "lucide:trash-2",
  });
}

watch(
  product,
  (newVal) => {
    if (newVal) {
      totalPriceFunc(quantityNew.value * product.value!.price);
    }
  },
  { immediate: true }
);
</script>
