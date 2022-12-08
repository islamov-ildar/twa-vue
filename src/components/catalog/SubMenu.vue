<template>
  <div class="mainContainer">
    <Header />
    <h2>{{ subMenuTitle }}</h2>
    <div class="btnWrapper">
      <div class="btnContainer">
        <div v-for="(oneMenuPoint, idx) in subMenuCatalog" :key="idx">
          <Button
            :label="oneMenuPoint"
            class="p-button-secondary"
            icon="pi pi-file"
            @click="redirectTo(`/productView/${currentSubMenuType}/${idx}`)"
          />
        </div>
        <Button
          label="Назад"
          class="p-button-warning"
          icon="pi pi-arrow-left"
          @click="redirectTo(store.state.previousRoute)"
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
import { useStore } from "vuex";
import Header from "../Header.vue";

export default {
  name: "OrderDetails",
  components: { Button, Header },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const currentSubMenuType = computed(() => route.params.type);

    let subMenuCatalog;
    let subMenuTitle;
    function choiseCurrentSubMeny() {
      mainMenuCatalog.forEach((oneSubMenu) => {
        if (oneSubMenu.type === currentSubMenuType.value) {
          subMenuTitle = oneSubMenu.name;
          subMenuCatalog = oneSubMenu.items;
        }
      });
    }

    choiseCurrentSubMeny();

    function redirectTo(path) {
      router.push(path);
    }

    return {
      currentSubMenuType,
      subMenuCatalog,
      redirectTo,
      subMenuTitle,
      store,
    };
  },
};
</script>

<style></style>
