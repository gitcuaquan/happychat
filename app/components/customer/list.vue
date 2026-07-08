<template>
  <UScrollArea class="flex-1 min-h-0 w-full [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors">
    <div class="flex flex-col">
      <CustomerItem 
        v-for="(customer, index) in customers" 
        :key="customer.id" 
        :customer="customer"
        :active="customer.active"
      />
    </div>
  </UScrollArea>
</template>

<script setup>
defineProps({
  customers: {
    type: Array,
    default: () => []
  }
})
</script>
