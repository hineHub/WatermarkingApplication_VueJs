import Vue from 'vue'
import Router from 'vue-router'
import Watermarking from '@/components/WatermarkingText'
import StampingImage from '@/components/StampingImage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Watermarking',
      component: Watermarking
    },
    {
      path: '/images',
      name: 'Image layering',
      component: StampingImage
    },
  ]
})
