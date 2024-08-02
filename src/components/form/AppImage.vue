<script setup lang="ts">
import { ref } from 'vue'
import { Cropper, CircleStencil, type CropperResult } from 'vue-advanced-cropper'
import AppNavigation from '@/components/form/AppNavigation.vue'

const emits = defineEmits<{
  (e: 'change', value: CropperResult): void;
}>()

const fileInput = ref<HTMLInputElement>()
const sourceImage = ref<string>()
const reader = new FileReader()

const cropperRef = ref()

const onChangeFile = (files: FileList) => {
  reader.readAsDataURL(files[0])
  reader.onloadend = (e) => {
    sourceImage.value = e.target!.result as string
  }
}

const zoom = ref(0)

const onChange = (result: CropperResult) => {
  const { coordinates, imageSize } = cropperRef.value

  if (
    imageSize.width / imageSize.height >
    coordinates.width / coordinates.height
  ) {
    // Determine the position of slider bullet
    // It's 0 if the stencil has the maximum size and it's 1 if the has the minimum size
    zoom.value =
      (cropperRef.value.imageSize.height - cropperRef.value.coordinates.height) /
      (cropperRef.value.imageSize.height - cropperRef.value.sizeRestrictions.minHeight)
  } else {
    zoom.value =
      (cropperRef.value.imageSize.width - cropperRef.value.coordinates.width) /
      (cropperRef.value.imageSize.width - cropperRef.value.sizeRestrictions.minWidth)
  }

  emits('change', result)
}

const onZoom = (value: number) => {
  if (cropperRef.value.imageSize.height < cropperRef.value.imageSize.width) {
    const minHeight = cropperRef.value.sizeRestrictions.minHeight
    const imageHeight = cropperRef.value.imageSize.height
    // Determine the current absolute zoom and the new absolute zoom
    // to calculate the sought relative zoom value
    cropperRef.value.zoom(
      (imageHeight - zoom.value * (imageHeight - minHeight)) /
      (imageHeight - value * (imageHeight - minHeight))
    )
  } else {
    const minWidth = cropperRef.value.sizeRestrictions.minWidth
    const imageWidth = cropperRef.value.imageSize.width
    cropperRef.value.zoom(
      (imageWidth - zoom.value * (imageWidth - minWidth)) /
      (imageWidth - value * (imageWidth - minWidth))
    )
  }
}
</script>

<template>
  <div class="wrapper">
    <template v-if="sourceImage">
      <Cropper
        v-if="sourceImage"
        class="twitter-cropper"
        ref="cropperRef"
        background-class="twitter-cropper__background"
        foreground-class="twitter-cropper__foreground"
        :stencil-props="{
          lines: {},
          previewClass: 'twitter-cropper__stencil',
          aspectRatio: 1/1,
        }"
        :resize-image="false"
        :transitions="false"
        :canvas="false"
        :debounce="false"
        :src="sourceImage"
        :stencil-component="CircleStencil"
        @change="onChange"
        auto-zoom
      />

      <AppNavigation :zoom="zoom" @change="onZoom" />
    </template>

    <div class="uploadArea" :class="sourceImage ? 'replaceImage': 'addImage'" @click="fileInput?.click">
      <template v-if="sourceImage">
        <i class="fa-solid fa-arrows-rotate icon" />
        Заменить фото
      </template>

      <template v-else>
        <i class="fa-regular fa-user icon" />
        Прикрепить фото
      </template>

      <input
        ref="fileInput"
        type="file"
        accept="image/jpeg, image/png"
        @change="onChangeFile(($event.target as HTMLInputElement).files!)"
      />
    </div>
  </div>

</template>

<style scoped lang="scss">
.wrapper {
  width: 270px;
}

.uploadArea {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px dashed #ccc;
  transition: color 300ms;
  color: #ccc;
  width: 100%;

  &:hover {
    color: #aaa;
  }

  input {
    display: none;
  }

  &.addImage {
    height: 270px;
  }

  &.replaceImage {
    height: 60px;
  }
}


:deep {
  .twitter-cropper {
    height: 270px;
    background: #DDD;

    &__background {
      background-color: transparent;
    }

    &__foreground {
      background-color: #000;
    }

  }
}

</style>
