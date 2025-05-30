<template>
  <div
    class="w-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600 py-3 relative overflow-hidden"
  >
    <div class="container mx-auto px-4">
      <div
        class="flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-6 text-white"
      >
        <div class="flex items-center gap-2">
          <span class="text-xl sm:text-2xl font-bold animate-bounce"> 🔥 </span>
          <h3 class="text-sm sm:text-base font-bold">FLASH SALE ENDS IN:</h3>
          <div class="bg-white/20 rounded px-2 py-1 font-mono font-bold">
            <span>20:34:12</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xl font-bold">⚡</span>
          <span class="font-bold text-yellow-200 animate-pulse"
            >UP TO 90% OFF!</span
          >
        </div>

        <UButton
          @click="navigateTo('/')"
          label="SHOP NOW!"
          class="rounded-full px-4 cursor-pointer hover:-translate-y-0.5 transition-transform"
          color="neutral"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
