<template>
  <div class="mainContainer">
    <Header />
    <h2>Каталог</h2>

    <div class="cardWrapper">
      <Card
        style="width: 80%"
        v-for="(oneMenuPoint, idx) in mainMenuCatalog"
        :key="idx"
        @click="redirectTo(`/subMenu/${oneMenuPoint.type}`)"
      >
        <template #header>
          <img :src="oneMenuPoint.imgLink" />
        </template>
        <template #title>{{ oneMenuPoint.name }}</template>
        <!-- <template #subtitle> Card subtitle </template>
        <template #content>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate neque quas!
          </p>
        </template>
        <template #footer>
          <Button icon="pi pi-check" label="Save" />
          <Button
            icon="pi pi-times"
            label="Cancel"
            class="p-button-secondary"
            style="margin-top: 0.5em"
          />
        </template> -->
      </Card>
    </div>
    <div class="btnWrapper">
      <div class="btnContainer">
        <!-- <div v-for="(oneMenuPoint, idx) in mainMenuCatalog" :key="idx">
          <Button
            :label="oneMenuPoint.name"
            class="p-button-secondary"
            icon="pi pi-file"
            @click="redirectTo(`/subMenu/${oneMenuPoint.type}`)"
          />
        </div> -->
        <Button
          label="Назад"
          class="p-button-warning"
          icon="pi pi-arrow-left"
          @click="redirectTo('/')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { buildDate } from "../../functions/buildDate";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { mainMenuCatalog } from "./structure.js";
import Header from "../Header.vue";
import Card from "primevue/card";

export default {
  name: "MyOrders",
  components: { Button, Header, Card },

  setup() {
    const ordersFromDB = [];

    const router = useRouter();
    function redirectTo(path) {
      router.push(path);
    }

    return {
      redirectTo,
      ordersFromDB,
      buildDate,
      mainMenuCatalog,
    };
  },
};
</script>

<style scoped>
p {
  line-height: 1.5;
  margin: 0;
}
.cardWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.p-card {
  margin-bottom: 10px;
}
</style>
