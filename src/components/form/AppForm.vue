<script setup lang="ts">
import { QrTypes, type FormFields } from '@/types'
import AppImage from '@/components/form/AppImage.vue'
import ToggleButton from 'primevue/togglebutton'
import InputMask from 'primevue/inputmask'
import Select from 'primevue/select'
import { computed, ref, watch } from 'vue'
import InputText from 'primevue/inputtext'
import Divider from 'primevue/divider'

defineEmits<{
  (e: 'export'): void
}>()

const formData = defineModel<FormFields>({ required: true })

const phonesIsisEqual = ref(true)

watch(() => formData.value.phoneFront,  (value) => {
    if (!phonesIsisEqual.value) return

    formData.value.phoneBack = value
  },
  {
    immediate: true
  }
)

watch(phonesIsisEqual, (isEqual) => {
  if(!isEqual) return;

  formData.value.phoneBack = formData.value.phoneFront
})

const qrFields = [
  {
    id: QrTypes.tel,
    label: 'Телефон'
  },
  {
    id: QrTypes.mail,
    label: 'Email'
  },
  {
    id: QrTypes.tg,
    label: 'Телеграм'
  },
  {
    id: QrTypes.wtsp,
    label: 'WhatApp'
  },
  {
    id: QrTypes.viber,
    label: 'Viber'
  },
  {
    id: QrTypes.text,
    label: 'Ссылка'
  }
]

const currentMask = computed(() => {
  const t = formData.value.qr.type
  if (t === QrTypes.tg) {
    return {
      ph: 'ник телеграм без @'
    }
  }

  if (t === QrTypes.mail) {
    return {
      ph: 'ivan.ivanov@mail.ru'
    }
  }

  if (t === QrTypes.wtsp || t === QrTypes.viber || t === QrTypes.tel) {
    return {
      ph: '+7 (999) 999-99-99',
      mask: '+7 (999) 999-99-99'
    }
  }

  return {
    ph: 'https://example.com'
  }
})

watch(
  () => formData.value.qr.type,
  () => {
    formData.value.qr.inputValue = undefined
  }
)

watch(
  () => formData.value.qr.inputValue,
  (value) => {
    const t = formData.value.qr.type

    let v: string | undefined

    if (!value) {
      formData.value.qr.value = undefined
      return
    }

    if (t === QrTypes.wtsp || t === QrTypes.viber || t === QrTypes.tel) {
      v = value?.replace(/\D+/g, '')
    } else {
      v = value
    }

    switch (formData.value.qr.type) {
      case QrTypes.tel:
        formData.value.qr.value = `+${v}`
        break
      case QrTypes.tg:
        formData.value.qr.value = `https://t.me/${v}`
        break
      case QrTypes.mail:
        formData.value.qr.value = `mailto:${v}`
        break
      case QrTypes.wtsp:
        formData.value.qr.value = `https://wa.me/+${v}`
        break
      case QrTypes.text:
        formData.value.qr.value = v
        break
      case QrTypes.viber:
        formData.value.qr.value = `https://viber.click/${v}`
        break
    }
  }
)
</script>

<template>
  <form class="form">
    <div class="inputs">
      <label class="form-item">
        Имя
        <InputText v-model="formData.i" />
      </label>

      <label class="form-item">
        Фамилия
        <InputText v-model="formData.f" />
      </label>

      <label class="form-item">
        В гильдии риелторов
        <ToggleButton v-model="formData.inGild" onLabel="Да" offLabel="Нет" />
      </label>
      <label class="form-item">
        Должность
        <InputText v-model="formData.post" />
      </label>
      <label class="form-item">
        Телефон спереди
        <InputText v-model="formData.phoneFront" />
      </label>
      <div class="form-item">
        Телефон сзади

        <label class="sameWrapper">Совпадает с телефоном спереди
         <ToggleButton onLabel="Да" offLabel="Нет" v-model="phonesIsisEqual" class="samePhones"/>
        </label>

        <InputText v-model="formData.phoneBack" :disabled="phonesIsisEqual" />
      </div>
      <label class="form-item">
        E-mail
        <InputText v-model="formData.email" placeholder="E-mail" />
      </label>

      <div class="qr">
        <label class="form-item">
          QR-код
          <Select
            v-model="formData.qr.type"
            :options="qrFields"
            optionValue="id"
            optionLabel="label"
            placeholder="Поле для QR-кода"
          />
        </label>

        <template v-if="formData.qr.type">
          <InputMask
            v-if="
              (formData.qr.type === 'wtsp' ||
                formData.qr.type === 'viber' ||
                formData.qr.type === 'tel') &&
              currentMask.mask
            "
            v-model="formData.qr.inputValue"
            :placeholder="currentMask.ph"
            :mask="currentMask.mask"
            :auto-clear="false"
            fluid
          />

          <InputText
            v-else
            v-model="formData.qr.inputValue"
            :key="formData.qr.type"
            :placeholder="currentMask.ph"
            fluid
          />

          <div v-if="formData.qr.value" class="qrCode">
            Закодированное значение: <br />
            {{ formData.qr.value }}

            <Divider />

            <small> Отсканируйте и проверьте QR-код, прежде чем печатать визитку </small>
          </div>
        </template>
      </div>
    </div>
    <div>
      <AppImage @change="formData.photo = $event" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  padding: 20px 15px;
  gap: 15px;

  .form-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 270px;
}

.sameWrapper {
  font-size: 12px;
  color: #555;
}

.samePhones {
  font-size: 12px;
  padding: 2px 15px;
}

.qr {
  position: relative;
  border: 1px solid #ccc;
  padding: 10px;
}

.qrCode {
  text-align: center;
  font-size: 12px;
  padding: 7px 0;
}

.flex {
  display: flex;
  align-items: center;
  gap: 7px;
}

.btn {
  margin-top: 10px;
}

@media print {
  .form {
    display: none;
  }
}
</style>
