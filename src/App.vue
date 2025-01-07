<script setup lang="ts">
import AppForm from '@/components/form/AppForm.vue'
import AppResult from '@/components/result/AppResult.vue'
import { reactive, ref, nextTick, watch } from 'vue'
import type { FormFields } from '@/types'

const model = reactive<FormFields>({
  f: undefined,
  i: undefined,
  email: undefined,
  phoneFront: '',
  phoneBack: '',
  inGild: false,
  qr: {
    type: undefined,
    value: undefined
  }
})

</script>

<template>
  <main class="wrapper">
    <AppForm v-model="model"/>

    <AppResult :form-data="model" />
  </main>
</template>

<style lang="scss" scoped>

.wrapper {
  display: flex;
  gap: 20px;
}



@media print {
  body, html {
    padding: 0;
    margin: 0;
  }

  @page {
    margin: 0;
    padding: 0;
    size: 53mm 93mm;
    background: #285da7;
  }
}
</style>
