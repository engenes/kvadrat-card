<script setup lang="ts">
import AppForm from '@/components/form/AppForm.vue'
import AppResult from '@/components/result/AppResult.vue'
import { reactive, ref, nextTick } from 'vue'
import type { FormFields } from '@/types'
import domToImg from 'dom-to-image-more'

const model = reactive<FormFields>({
  f: undefined,
  i: undefined,
  o: undefined,
  phones: [
    '',
  ],
  email: undefined,
  telegram: undefined,
  whatsapp: undefined,
  viber: undefined,
  qr: {
    type: undefined,
    value: undefined
  }
})
const capture = ref<HTMLDialogElement>();
const imageSource = ref<string>();

const createImage = async () => {
  domToImg
    .toSvg(capture.value)
    .then((dataUrl: string) => {
      imageSource.value = dataUrl
      setTimeout(print);
    })
    .catch(() => {
      alert('Ошибка создания визитки')
    })
}

</script>

<template>
  <main class="wrapper">
    <AppForm v-model="model" @export="createImage" />

    <AppResult :form-data="model" :image-source="imageSource" @ready="capture = $event" />
  </main>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  gap: 20px;
}
</style>
