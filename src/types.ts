import type { CropperResult } from 'vue-advanced-cropper'

export interface FormFields {
  f?: string,
  i?: string,
  post?: string,
  inGild: boolean,
  phone: string,
  email?: string,
  photo?: CropperResult
  qr: {
    type?: QrTypes,
    value?: string
  }
}

export enum QrTypes {
  tel = 'tel',
  mail = 'mail',
  tg = 'tg',
  wtsp = 'wtsp',
  viber = 'viber',
  text = 'text',
}