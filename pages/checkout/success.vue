<template>
  <div class="min-h-[60vh] flex items-center justify-center">
    <div class="max-w-md w-full mx-auto p-6">
      <div class="bg-white rounded-2xl shadow-xl p-6 text-center">
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Thank you for your order!
        </h1>
        <p class="text-gray-600 mb-6">
          We have received your order, and will send you a confirmation email
          shortly!
        </p>
        <div class="text-sm text-gray-500">
          Order total:
          {{
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: session.currency || "USD",
            }).format((session.amount_total || 0) / 100)
          }}
        </div>
        <div class="text-sm text-gray-500">
          <!-- Order email: {session.customer_details?.email} -->
          Order email: {{ auth.user?.email }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuth();
const session = {
  currency: "USD",
  amount_total: 0,
};
</script>
