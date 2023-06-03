import { createRouter, createWebHistory } from 'vue-router'
import MealsList from '../components/MealsList.vue'
import MealDetail from '../components/MealDetail.vue'
import FavoriteMeals from '../components/FavoriteMeals.vue'

function isLoggedIn() {
  return localStorage.getItem('user') !== null;
}

const routes = [
  {
    path: '/',
    name: 'Meals',
    component: MealsList,
    meta: { requiresAuth: true }
  },
  {
    path: '/meal/:id',
    name: 'MealDetail',
    component: MealDetail,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/favoriteMeals',
    name: 'FavoriteMeals',
    component: FavoriteMeals,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue'),
  },
  {
    path: '/userRegister',
    name: 'UserRegister',
    component: () => import('@/components/UserRegister.vue')
  },
  {
    path: '/registerRecipe',
    name: 'RegisterRecipe',
    component: () => import('@/components/RegisterRecipe.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/myRecipes',
    name: 'MyRecipes',
    component: () => import('@/components/MyRecipes.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/editRecipe',
    name: 'EditRecipe',
    component: () => import('@/components/EditRecipe.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // Check if the route requires the user to be logged in
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if user is not logged in
    if (!isLoggedIn()) {
      // Redirect to login page
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
