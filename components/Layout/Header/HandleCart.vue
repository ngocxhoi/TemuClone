<template>
  <UPopover
    :open="open"
    @update:open="open = !open"
    arrow
    :content="{ align: 'end', sideOffset: 20 }"
  >
    <UChip :text="cartItems.length" size="3xl" color="success">
      <Icon
        name="lucide:shopping-cart"
        size="20"
        class="text-red-400 cursor-pointer"
      />
    </UChip>

    <template #content>
      <div class="w-96">
        <div
          v-if="cartItems.length === 0"
          class="p-6 text-center text-gray-400"
        >
          <div class="flex flex-col items-center p-4 text-gray-600">
            <Icon
              name="lucide:shopping-cart"
              size="40"
              class="mb-4 text-red-400"
            />
            <p class="text-center">Your cart is empty</p>
            <UButton
              label="Start Shopping"
              to="/"
              @click="open = false"
              variant="outline"
              color="error"
              class="mt-4"
            />
          </div>
        </div>
        <div v-else>
          <ul class="divide-y divide-gray-200 max-h-64 overflow-y-auto">
            <LayoutHeaderCartItem
              v-for="item in cartItems"
              :key="item.id"
              :item="item"
            />
          </ul>
          <div class="flex justify-between items-center p-4 border-t mt-2">
            <span class="font-semibold">Total</span>
            <span class="font-bold text-lg">${{ totalPrice.toFixed(2) }}</span>
          </div>
          <div class="p-4">
            <UButton block color="error" label="View Cart" />
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<script lang="ts" setup>
const { cartItems, totalPrice, getItems } = useCartStore();

const open = ref(false);

onMounted(async () => {
  await getItems();
});

watch(open, (val) => {
  if (!val) totalPrice.value = 0;
});
</script>
