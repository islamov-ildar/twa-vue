<template>
  <div class="mainContainer">
    <Header />
    <h2>Мои заказы</h2>
    <div class="orderDetails">
      <b>Заказ номер:</b> {{ currentOrderFromDB.id }} <br />
      <b>Товар:</b>
      {{ currentOrderFromDB.product }}<br />
      <b>Кол-во:</b>
      {{ currentOrderFromDB.quantity }}<br />
      <b>Контактный телефон:</b>
      {{ currentOrderFromDB.contactPhone }}<br />
      <b>Адрес:</b>
      {{ currentOrderFromDB.deliveryAddress }}<br />
      <b>Статус:</b>
      {{ handleStatus(currentOrderFromDB.status) }}<br />
      <b>Создан:</b>
      {{ buildDate(currentOrderFromDB.createdAt) }}
    </div>
    <div class="btnWrapper">
      <div class="btnContainer">
        <Button
          label="Подтвердить получение заказа"
          class="p-button-secondary"
          icon="pi pi-check"
          @click="confirmReciept(currentOrderFromDB.id)"
        />
        <Button
          label="Назад"
          class="p-button-warning"
          icon="pi pi-arrow-left"
          @click="redirectTo('/myOrders')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { buildDate } from "../../functions/buildDate";
import { useRouter, useRoute } from "vue-router";
import Button from "primevue/button";
import { computed } from "vue";
import Header from "../Header.vue";

export default {
  name: "OrderDetails",
  components: { Button, Header },

  setup() {
    //TODO добавить функцию получения заказа из базы по id

    const router = useRouter();
    const route = useRoute();

    const orderId = computed(() => route.params.id);

    console.log(orderId.value);

    const currentOrderFromDB = {
      id: 7,
      createdAt: "2022-11-16T09:11:29.548Z",
      updatedAt: "2022-11-22T13:04:04.670Z",
      product: "Пончик Малиновый",
      quantity: 6,
      contactPhone: "+79454564545",
      deliveryAddress: "ул. Строителей 22",
      status: "processing",
      userId: 1,
    };

    function redirectTo(path) {
      console.log(path);
      router.push(path);
    }

    function handleStatus(statusFromDB) {
      let orderStatusString = "Уточняется";
      if (statusFromDB === "processing") {
        orderStatusString = "В обработке";
      }
      return orderStatusString;
    }

    //TODO добавить функцию записи в БД о получении заказа

    function confirmReciept(order_id) {
      console.log(`confirmReciept(order_id): ${order_id}`);
    }

    return {
      confirmReciept,
      handleStatus,
      redirectTo,
      currentOrderFromDB,
      buildDate,
    };
  },
};
</script>

<style></style>
