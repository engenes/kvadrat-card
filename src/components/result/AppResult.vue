<script setup lang="ts">
import { type FormFields } from '@/types'
import { Preview } from 'vue-advanced-cropper'
import QrcodeVue from 'qrcode.vue'

defineEmits<{
  (e: 'ready', value: HTMLDialogElement): void
}>()

defineProps<{
  formData: FormFields
}>()
</script>

<template>
  <div>
    <div class="side front">
      <div class="card">
        <div class="top">
          <img src="@/assets/images/logo.svg" alt="" class="logo" />

          <div class="avatar">
            <Preview
              class="preview"
              :width="124"
              :height="124"
              :image="formData.photo?.image"
              :coordinates="formData.photo?.coordinates"
            />
          </div>

          <img v-if="formData.inGild" src="@/assets/images/gild.png" alt="" class="gild" />
        </div>

        <div class="name" v-if="formData.f || formData.i">{{ formData.i }} {{ formData.f }}</div>

        <div v-if="formData.post" class="post">{{ formData.post }}</div>

        <QrcodeVue
          v-if="formData.qr.value"
          :value="formData.qr.value"
          :size="200"
          level="H"
          background="transparent"
          foreground="#fff"
          class="qr"
        />

        <div class="contacts">
          <div v-if="formData.phoneFront">
            <i class="fa fa-phone" />
            {{ formData.phoneFront }}
          </div>
          <div v-if="formData.email" class="mail">
            <i class="fa fa-envelope"></i>
            {{ formData.email }}
          </div>
        </div>

        <div class="footer">пр-т Гагарина15/1, БЦ "Евразия", 1 этаж</div>
      </div>
    </div>
    <div class="side back">
      <div class="card">
        <img src="@/assets/images/24-7.svg" alt="" class="all-time" />

        <ul class="list">
          <li>Помогу продать/купить недвижимость выгодно и за короткий срок</li>
          <li>
            Подберу новостройку в Оренбурге, Москве, Краснодаре, Калининграде, Сочи,
            Санкт-Петербурге. Напрямую от топовых застройщиков
          </li>
          <li>Помогу одобрить ипотеку в 75 банках РФ, подберу самую выгодную ставку</li>
          <li>Рефинансирование действующей ипотеки под более выгодные условия</li>
          <li>Проконсультирую по подбору участка и строительству частного дома</li>
          <li>Полное юридическое сопровождение сделок с гарантией</li>
          <li>
            Сделки с нами застрахованы
            <nobr>на 1 000 000 руб.</nobr>
          </li>
        </ul>

        <div class="contacts">
          <div v-if="formData.phoneBack">
            <i class="fa fa-phone" />
            {{ formData.phoneBack }}
          </div>
        </div>

        <div class="watermark" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview {
  background: #fff;
  text-align: center;
  border-radius: 50% 50% 50% 50%;
  overflow: hidden;
}

.side {
  padding: 1.5mm;
  width: 53mm;
  height: 93mm;
  overflow: hidden;

  &.front {
    background-image: url(@/assets/images/bg1.png);
    background-size: cover;
  }

  &.back {
    background: linear-gradient(#4caae0 0%, #3a83c3 33%, #285da7 100%);

    .card {
      padding-top: 20px;
      padding-left: 11px;
      padding-right: 11px;
      padding-bottom: 15px;
    }

    .contacts {
      font-size: 17px;
      font-weight: bold;
    }
  }
}


.card {
  width: 50mm;
  height: 90mm;
  color: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 14px;
}


.top {
  width: 130px;
  height: calc(166px + 1.5mm);
  position: relative;
  margin-top: -1.5mm;
  margin-left: auto;
  margin-right: auto;
  background: #3576a8;
  padding-top: 1.5mm;
}

.logo {
  display: block;
  position: relative;
  margin: 2px auto 0;
}

.avatar {
  position: relative;
  width: 124px;
  height: 124px;
  border: 1px solid #fff;
  left: 50%;
  margin-top: 5px;
  border-radius: 100px;
  overflow: hidden;
  transform: translateX(-50%);
  background-color: #fff;
}

.gild {
  display: block;
  position: absolute;
  right: 10px;
  bottom: 5px;
}

.name {
  font-family: 'Bebas Neue';
  background: #fff;
  border-radius: 3px;
  color: #008dd2;
  font-size: 15px;
  text-align: center;
  width: fit-content;
  z-index: 1;
  margin: -5px auto 0;
  position: relative;
  padding: 2px 10px;
  max-width: calc(100% - 20px);
  line-height: 100%;
  text-transform: uppercase;
}

.post {
  position: relative;
  text-align: center;
  margin-top: 6px;
  font-size: 10px;
}

.qr {
  max-width: 70px;
  max-height: 70px;
  margin: auto;
  display: block;
}

.contacts {
  display: block;
  position: relative;
  margin-top: auto;
  text-align: center;
  font-size: 15px;

  i {
    font-size: 0.8em;
    transform: scale(0.8);
  }

  .mail {
    font-weight: 300;
    font-size: 12px;
  }
}

.footer {
  font-size: 8px;
  color: #cee6f8;
  font-weight: 300;
  margin-top: 4px;
  padding-bottom: 4px;
  text-align: center;

  &::before {
    content: '';
    display: block;
    position: relative;
    height: 1px;
    width: 80%;
    background: #cee6f8;
    margin: 0 auto 4px;
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
      content: '';
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

.image {
  text-align: center;

  img {
    width: 53mm;
    height: 186mm;
    display: block;
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

.btn {
  margin-top: 10px;
}

@media print {
  .page-break {
    page-break-before: always;
    break-before: page;
  }

  .side {
    margin-bottom: -1px;
    margin-left: -2mm;
  }

  .front {
    margin-top: -2mm;
    margin-bottom: -3px;
  }

  .image {
    margin: -7px 0px 0px -7px;

    .button-wrapper {
      display: none;
    }
  }
}
</style>
