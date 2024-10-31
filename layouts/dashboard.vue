<template>
  <div class="h-screen grid grid-cols-[240px_1fr]">
    <Sidebar/>
    <main class="flex flex-col">
      <slot/>
    </main>
  </div>
</template>