<template>
  <UPopover
    mode="hover"
    :content="{
      align: 'start',
      side: 'bottom',
      sideOffset: 8,
    }"
  >
    <div class="flex items-center justify-center gap-1">
      <ULink href="#">Category</ULink>
      <Icon name="lucide:chevron-down" />
    </div>

    <template #content>
      <div class="size-96 m-4 my-8 inline-flex">
        <ul>
          <NuxtLink to="/category/women's-clothing">Women's Clothing</NuxtLink>
          <li>Men's Clothing</li>
        </ul>
      </div>
    </template>
  </UPopover>
</template>

<script lang="ts" setup></script>
