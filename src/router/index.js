// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import NaturalAddSub from '../views/NaturalAddSub.vue';
import FractionAddSub from '../views/FractionAddSub.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes:  [
    {
      path: '/',
      name: 'Natural Add Sub',
      component: NaturalAddSub,
    },
    {
      path: '/natural-add-sub',
      name: 'Natural Add Sub',
      component: NaturalAddSub
    },
    {
      path: '/fraction-add-sub',
      name: 'Fraction Add Sub',
      component: FractionAddSub
    }
  ]
});

export default router;