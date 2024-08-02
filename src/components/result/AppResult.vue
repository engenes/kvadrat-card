<script setup lang="ts">
import { type FormFields } from '@/types'
import { Preview } from 'vue-advanced-cropper'
import QrcodeVue from 'qrcode.vue'
import { ref, watch } from 'vue';

const emits = defineEmits<{
  (e: 'ready', value: HTMLDialogElement): void
}>()

defineProps<{
  formData: FormFields
  imageSource?: string
}>()

const capture = ref<HTMLDialogElement>(); 


watch(capture, (value) => {
  if(!value) return;

  emits('ready', value);
})
</script>

<template>
  <div>
    <div class="wrapper" ref="capture">
      <div class="front card">
        <div class="top">
          <img src="@/assets/images/logo.svg" alt="" class="logo" />
          
          <div class="avatar">
            <Preview
              class="preview"
              width="124"
              height="124"
              :image="formData.photo?.image"
              :coordinates="formData.photo?.coordinates"
            />
          </div>

          <img v-if="formData.inGild" src="@/assets/images/gild.png" alt="" class="gild" />
        </div>


        <div class="name" v-if="formData.f || formData.i">
            {{ formData.i }}  {{ formData.f }}
        </div>

        <div v-if="formData.post" class="post">{{ formData.post }}</div>

        <QrcodeVue 
          v-if="formData.qr.value" 
          :value="formData.qr.value" 
          :size="88" 
          level="H"
          background="transparent" 
          foreground="#fff"
          class="qr"
         />

         <div class="contacts">
          <div v-if="formData.phone">
            <i class="fa fa-phone" />
            {{ formData.phone }}
          </div>
          <div v-if="formData.email">
            <i class="fa fa-envelope"></i>
            {{ formData.email }}
          </div>
        </div>

        <div class="footer">
          пр-т Гагарина15/1, БЦ "Евразия", 1 этаж
        </div>
      </div>

      <div class="back card">
        <img src="@/assets/images/24-7.svg" alt="" class="all-time"/>

        <ul class="list">
          <li>Помогу продать/купить недвижимость выгодно и за короткий срок</li>
          <li>Подберу новостройку в Оренбурге, Москве, Краснодаре, Калининграде, Сочи, Санкт-Петербурге. Напрямую от топовых застройщиков</li>
          <li>Помогу одобрить ипотеку в 75 банках РФ, подберу самую выгодную ставку</li>
          <li>Рефинансирование действующей ипотеки под более выгодные условия</li>
          <li>Проконсультирую по подбору участка и строительству частного дома</li>
          <li>Полное юридическое сопровождение сделок с гарантией </li>
          <li>Сделки с нами застрахованы <nobr>на 1 000 000 руб.</nobr></li>
        </ul>

        <div class="contacts">
          <div v-if="formData.phone">
            <i class="fa fa-phone" />
            {{ formData.phone }}
          </div>
          <div v-if="formData.email">
            <i class="fa fa-envelope"></i>
            {{ formData.email }}
          </div>
        </div>

        <div class="watermark" />
      </div> 
    </div>

    <div class="image">
      <img :src="imageSource" alt="" width="390" height="351" class=""/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  background: #fff;
  flex-grow: 1;
  color: #fff;
  display: flex;
  gap: 2px;
}


.card {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 194px;
  height: 351px;
  font-size: 14px;
  overflow: hidden;
  border: 1px solid #000;
}

.front {
  background-image: url(@/assets/images/bg1.png);
}


.top {
  width: 130px;
  height: 166px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  background: #3576A8;
}

.logo {
  display: block;
  position: relative;
  margin: 2px auto 0;
}

.avatar {
  position: absolute;
  width: 124px;
  height: 124px;
  border: 1px solid #fff;
  left: 50%;
  bottom: -5px;
  border-radius: 50%;
  overflow: hidden;
  transform: translateX(-50%);
  background-color: #fff;
}

.preview {
  position: absolute;
  top: 0;
  left: 0;
}

.gild {
  display: block;
  position: absolute;
  right: 10px;
  bottom: 5px;
}

.name {
  background: #fff;
  border-radius: 3px;
  color: #008DD2;
  font-size: 15px;
  text-align: center;
  width: fit-content;
  z-index: 1;
  margin: -5px auto 0;
  position: relative;
    padding: 2px 10px;
    font-weight: 700;
    max-width: calc(100% - 20px);
    line-height: 100%;
}

.post {
  position: relative;
  text-align: center;
  margin-top: 6px;
  font-size: 10px;
}

.qr {
  margin: auto;
  display: block;
  margin-top: 4px;
  margin-bottom: 4px;
}

.contacts {
  display: block;
  position: relative;
  margin-top: auto;
  text-align: center;
  font-size: 10px;

  i {
    font-size: 0.8em;
  }
}

.footer {
  font-size: 8px;
  color: #CEE6F8;
  font-weight: 300;
  margin-top: 4px;
  padding-bottom: 4px;
  text-align: center;

  &::before {
    content: "";
    display: block;
    position: relative;
    height: 1px;
    width: 80%;
    background: #CEE6F8;
    margin: 0 auto 4px;
  }
}

.image {
  display: none;
}

.back {
  background: linear-gradient(#4CAAE0 0%, #3A83C3 33%, #285DA7 100%);
  padding-top: 20px;
  padding-left: 11px;
  padding-right: 11px;
  padding-bottom: 15px;

  .contacts {
    font-size: 12px;
  }
}

.all-time {
  width: 72px;
  display: block;
  margin: 0 auto;
}

.list {
  margin: 0;
  padding: 0;
  font-size: 8.5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 17px;
  position: relative;
  z-index: 1;
  > li {
    padding: 0;
    padding-left: 12px;
    list-style: none;
    position: relative;
    line-height: 125%;

    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 5px;
      height: 5px;
      background: currentColor;
      left: 0;
      top: 3px;
    }
  }
}

.watermark {
  display: block;
  position: absolute;
  right: -20px;
  bottom: 0;
  width: 142px;
  height: 128px;
  background: url(@/assets/images/watermark.svg) center/contain no-repeat;
  opacity: 0.17;
  z-index: 0;
}

@media print {
  .wrapper {
    display: none;
  }

  .image {
    display: block
  }
}


</style>
