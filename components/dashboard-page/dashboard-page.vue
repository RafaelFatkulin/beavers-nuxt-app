<template>
  <header v-if="$slots.header"
          class="h-16 px-4 py-2 flex flex-row items-center justify-between border-b border-[var(--ui-border)]">
    <slot name="header"/>
  </header>

  <div v-if="$slots.subheader"
       class="px-4 py-2 h-12 flex flex-row items-center justify-between border-b border-[var(--ui-border)]">
    <slot name="subheader"/>
  </div>

  <div class="flex-1 overflow-auto">
    <slot/>
  </div>
</template>
<script lang="ts" setup>
</script>