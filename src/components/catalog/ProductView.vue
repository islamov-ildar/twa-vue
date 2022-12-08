<template>
  <div class="mainContainer">
    <Header />
    <h2>{{ subMenuTitle }}</h2>
    <div class="orderDetails">Описание товара</div>
    <div class="inputWrapper productViewInputWrapper">
      <InputNumber
        v-model="quantity"
        showButtons
        buttonLayout="horizontal"
        :step="1"
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
        mode="decimal"
        locale="ru-RU"
        :min="1"
        @input="checkInputValue()"
        placeholder="Введите кол-во"
      />
    </div>
    <div class="btnWrapper">
      <div class="btnContainer">
        <Button
          label="Добавить в заказ"
          class="p-button-success"
          icon="pi pi-cart-plus"
          @click="addToCart()"
        />
        <Button
          label="Назад"
          class="p-button-warning"
          icon="pi pi-arrow-left"
          @click="redirectTo('/mainCatalogMenu')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import Button from "primevue/button";
import { computed } from "vue";
import { mainMenuCatalog } from "./structure.js";
import InputNumber from "primevue/inputnumber";
import { ref } from "vue";
import Header from "../Header.vue";
import { useStore } from "vuex";

export default {
  name: "OrderDetails",
  components: { Button, InputNumber, Header },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const quantity = ref(1);

    const currentSubMenuType = computed(() => route.params.type);
    const currentProductFromSubMenu = computed(() => route.params.product);

    let subMenuCatalog;
    let subMenuTitle;
    function choiseCurrentSubMeny() {
      mainMenuCatalog.forEach((oneSubMenu) => {
        console.log(oneSubMenu.type, currentSubMenuType.value);
        if (oneSubMenu.type === currentSubMenuType.value) {
          subMenuTitle = oneSubMenu.items[currentProductFromSubMenu.value];
          subMenuCatalog = oneSubMenu.items;
        }
      });
    }

    choiseCurrentSubMeny();

    function redirectTo(path) {
      router.push(path);
    }

    function addToCart() {
      let product = { product: subMenuTitle, quantity: quantity.value };

      const productArrFromStore = structuredClone(store.state.productsArr);
      let productInStateIdx = -1;
      for (let idx in productArrFromStore) {
        if (productArrFromStore[idx].product === product.product) {
          productInStateIdx = idx;
        }
      }
      if (productInStateIdx !== -1) {
        productArrFromStore[productInStateIdx].quantity += product.quantity;
      } else {
        productArrFromStore.push(product);
      }
      store.dispatch("saveProductArr", productArrFromStore);
    }

    function checkInputValue() {
      console.log(quantity.value);
      if (!quantity.value) {
        quantity.value = 1;
      }
    }

    return {
      checkInputValue,
      quantity,
      addToCart,
      subMenuCatalog,
      redirectTo,
      subMenuTitle,
    };
  },
};
</script>

<style scoped>
.inputWrapper {
  margin-bottom: 20px;
}
</style>
