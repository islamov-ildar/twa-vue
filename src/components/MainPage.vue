<template>
  <div class="mainContainer">
    <h2>Выберите раздел</h2>
    <div class="btnWrapper">
      <div class="btnContainer">
        <Button
          label="Каталог"
          class="p-button-secondary"
          icon="pi pi-bars"
          @click="redirectTo('/mainCatalogMenu')"
        />
        <Button
          label="Мои заказы"
          class="p-button-secondary"
          icon="pi
        pi-history"
          @click="redirectTo('/myOrders')"
        />
        <Button
          label="Корзина"
          class="p-button-warning"
          icon="pi pi-shopping-cart"
          :disabled="false"
          @click="redirectTo('/orderCart')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import { useRouter } from "vue-router";

export default {
  name: "MainPage",
  components: { Button },

  setup() {
    const router = useRouter();
    function redirectTo(path) {
      console.log(path);
      router.push(path);
    }

    return { redirectTo };
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 20px;
}
</style>
