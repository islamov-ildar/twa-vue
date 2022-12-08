<template>
  <div class="mainContainer">
    <Header />
    <h2>Мои заказы</h2>
    <div class="btnWrapper">
      <div class="btnContainer">
        <div v-for="(oneOrder, idx) in ordersFromDB" :key="idx">
          <Button
            :label="`Заказ #${oneOrder.id} от ${buildDate(oneOrder.createdAt)}`"
            class="p-button-secondary"
            icon="pi pi-file"
            @click="redirectTo(`orderDetails/${oneOrder.id}`)"
          />
        </div>
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
import Header from "../Header.vue";
// // import { dataSource } from "../../../../src/bot";
// import { dataSource } from "../../db";
// // import { Order } from "../../../../entity/order.entity";
// import { Order } from "../../entity/order.entity";

export default {
  name: "MyOrders",
  components: { Button, Header },

  setup() {
    // async function getMyOrders() {
    //   const orders = await dataSource
    //     .getRepository(Order)
    //     .findBy({ userId: 1, status: "processing" });
    //   console.log(orders);
    // }

    // getMyOrders();

    const ordersFromDB = [
      {
        id: 10,
        createdAt: "2022-11-16T10:01:06.593Z",
        updatedAt: "2022-11-16T10:01:06.593Z",
        product: "Блины без начинки>",
        quantity: 6,
        contactPhone: "+79787897878",
        deliveryAddress: "ул. Ленина 18",
        status: "processing",
        userId: 1,
      },
      {
        id: 7,
        createdAt: "2022-11-16T09:11:29.548Z",
        updatedAt: "2022-11-22T13:04:04.670Z",
        product: "Пончик Малиновый",
        quantity: 6,
        contactPhone: "+79454564545",
        deliveryAddress: "ул. Строителей 22",
        status: "processing",
        userId: 1,
      },
    ];

    const router = useRouter();
    function redirectTo(path) {
      console.log(path);
      router.push(path);
    }

    return {
      redirectTo,
      ordersFromDB,
      buildDate,
    };
  },
};
</script>

<style></style>
