<template>
  <header class="w-full sticky top-0 z-50">
    <div
      class="w-full transform transition-transform duration-300 ease-in-out"
      :class="isOpen ? 'translate-y-0' : '-translate-y-full'"
    >
      <div class="w-full bg-black py-2">
        <div class="container mx-auto flex items-center justify-center px-8">
          <span class="text-center text-sm font-medium tracking-wide text-white"
            >FREE SHIPPING ON ORDERS OVER $15.00 • FREE RETURNS</span
          >
        </div>
      </div>

      <div
        class="w-full flex justify-between items-center py-3 sm:py-4 bg-white/80 shadow-sm border-b border-gray-100 backdrop-blur-sm"
      >
        <div
          class="flex justify-between items-center container mx-auto px-4 text-nowrap"
        >
          <NuxtLink to="/" class="mr-4">
            <span class="text-xl sm:text-2xl font-bold tracking-tight"
              >LOGO</span
            >
          </NuxtLink>

          <div class="flex flex-1 justify-start items-center gap-4 sm:gap-6">
            <button
              class="text-gray-700 hover:text-gray-900 md:hidden flex items-center justify-center h-full"
            >
              <Icon name="lucide:align-justify" />
            </button>

            <nav
              class="hidden md:flex gap-4 lg:gap-6 text-sm font-medium text-black"
            >
              <ULink href="#">Shop</ULink>
              <ULink href="#">New Arrivals</ULink>
              <ULink href="#">Sale</ULink>
              <LayoutHeaderCategory />
            </nav>
          </div>

          <LayoutHeaderSearch />

          <div class="flex flex-1 justify-end items-center gap-2 sm:gap-4">
            <div v-if="$auth.loggedIn" class="flex items-center gap-2 sm:gap-4">
              <span class="text-sm text-gray-700 hidden md:block">{{
                $auth.user.email
              }}</span>
              <ULink
                href="/api/logout"
                external
                class="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign Out
              </ULink>
            </div>
            <template v-else>
              <ULink
                href="/api/login"
                external
                class="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign In
              </ULink>
              <ULink
                href="/api/register"
                external
                class="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign Up
              </ULink>
            </template>

            <LayoutHeaderHandleCart />
          </div>
        </div>
      </div>
    </div>
    <LayoutSaleCampaignBanner />
  </header>
</template>

<script lang="ts" setup>
const route = useRoute();
const isOpen = ref(true);
const prevScrollY = ref(0);
const client = useKindeClient();

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  const scrolledUp = currentScrollY < prevScrollY.value;

  if (scrolledUp) {
    isOpen.value = true;
  } else if (currentScrollY > 200) {
    isOpen.value = false;
  }

  prevScrollY.value = currentScrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>
