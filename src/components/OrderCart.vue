<template>
  <div class="mainContainer">
    <h2>Корзина</h2>
    <div v-if="products.length">
      <div
        class="inputWrapper orderCartInputWrapper"
        v-for="(oneProduct, idx) in products"
        :key="idx"
      >
        <div class="topProduct">
          <label class="topProductLabel" :for="`product${idx}`">{{
            oneProduct.product
          }}</label>
        </div>
        <div class="topProduct">
          <div class="spareDiv"></div>
          <div>
            <InputNumber
              :inputId="`product${idx}`"
              v-model="oneProduct.quantity"
              showButtons
              buttonLayout="horizontal"
              :step="1"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              mode="decimal"
              locale="ru-RU"
              :min="1"
              @input="checkInputValue()"
              placeholder=""
            />
          </div>
          <Button
            class="p-button-rounded p-button-danger p-button-text"
            icon="pi pi-trash"
            @click="removeProduct(idx)"
          />
        </div>
      </div>
    </div>
    <div v-else class="inputWrapper">
      <h2>пуста</h2>
      <Button
        label="В каталог"
        class="p-button-secondary"
        icon="pi pi-list"
        @click="redirectTo('/mainCatalogMenu')"
      />
    </div>
    <div class="dropDownWrapper">
      <Dropdown
        v-model="selectedCity"
        :options="groupedCities"
        optionLabel="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        placeholder="Выберите пункт доставки"
        :class="{ 'p-invalid': !isAddressSelected }"
        @change="checkAddress()"
      >
        <template #optiongroup="slotProps">
          <div class="flex align-items-center country-item regionWrapper">
            <!-- <i class="pi pi-map-marker"></i> -->
            <i class="pi pi-map"></i>
            <div>{{ slotProps.option.label }}</div>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="p-field p-col-12 p-md-6 p-fluid phoneInputWrapper">
      <InputMask
        mask="+7(999)-999-99-99"
        v-model="phoneNumber"
        placeholder="Номер телефона"
        @blur="checkPhone()"
        :class="{ 'p-invalid': !isPhoneNumberCorrect }"
      />
      <!-- <small v-if="!isPhoneNumberCorrect" class="p-error"
        >Введите корректный номер телефона</small
      > -->
    </div>
    <!-- <h5 class="alert" v-if="!phoneNumber || !selectedCity"> -->
    <h5 class="alert" v-if="showAlert">
      Укажите пункт доставки и контактный номер телефона
    </h5>
    <div class="btnWrapper">
      <div class="btnContainer">
        <Button
          label="Оформить заказ"
          class="p-button-success"
          icon="pi pi-cart-plus"
          @click="confirmOrder()"
          :disabled="!products.length"
        />
        <Button
          label="Назад"
          class="p-button-secondary"
          icon="pi pi-arrow-left"
          @click="redirectTo(store.state.previousRoute)"
        />
        <Button
          label="Главное меню"
          class="p-button-warning"
          icon="pi pi-home"
          @click="redirectTo('/')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import InputMask from "primevue/inputmask";
import { useStore } from "vuex";

export default {
  name: "OrderCart",
  components: { Button, InputNumber, Dropdown, InputMask },

  setup() {
    const store = useStore();

    const products = ref(store.state.productsArr);

    const orderStructure = ref({
      messageType: "order",
      user: "Динар",
      user_id: 280179230,
      products: [
        { product: "Бронежилет (аналог 6Б45)", quantity: 1 },
        { product: "Увеличенный магазин АК-74", quantity: 3 },
      ],
      contactPhone: 79998889988,
      deliveryAddress: "Херсон",
      status: "processung",
      order_id: 123,
      createdAt: "",
    });
    const router = useRouter();

    // function redirectTo(path) {
    //   router.push(path);
    // }

    const redirectTo = router.push;

    function confirmOrder() {
      checkAddress();
      checkPhone();
      if (phoneNumber.value && selectedCity.value) {
        showAlert.value = false;
      } else {
        showAlert.value = true;
      }
    }

    const quantity = ref(1);

    function checkInputValue() {
      if (!quantity.value) {
        quantity.value = 1;
      }
      store.dispatch("saveProductArr", products.value);
    }

    function removeProduct(idx) {
      console.log("removeProduct");
      products.value.splice(idx, 1);
      store.dispatch("saveProductArr", products.value);
    }

    const phoneNumber = ref();

    const selectedCity = ref();

    const groupedCities = ref([
      {
        label: "Germany",
        code: "DE",
        items: [
          { label: "Berlin", value: "Berlin" },
          { label: "Frankfurt", value: "Frankfurt" },
          { label: "Hamburg", value: "Hamburg" },
          { label: "Munich", value: "Munich" },
        ],
      },
      {
        label: "USA",
        code: "US",
        items: [
          { label: "Chicago", value: "Chicago" },
          { label: "Los Angeles", value: "Los Angeles" },
          { label: "New York", value: "New York" },
          { label: "San Francisco", value: "San Francisco" },
        ],
      },
      {
        label: "Japan",
        code: "JP",
        items: [
          { label: "Kyoto", value: "Kyoto" },
          { label: "Osaka", value: "Osaka" },
          { label: "Tokyo", value: "Tokyo" },
          { label: "Yokohama", value: "Yokohama" },
        ],
      },
    ]);

    const isPhoneNumberCorrect = ref(true);

    function checkPhone() {
      if (phoneNumber.value && phoneNumber.value.length === 17) {
        isPhoneNumberCorrect.value = true;
      } else {
        isPhoneNumberCorrect.value = false;
      }
    }

    const isAddressSelected = ref(true);

    function checkAddress() {
      console.log("checkAddress");
      if (selectedCity.value) {
        isAddressSelected.value = true;
      } else {
        isAddressSelected.value = false;
      }
    }

    const showAlert = ref(false);

    return {
      checkAddress,
      showAlert,
      isAddressSelected,
      store,
      products,
      isPhoneNumberCorrect,
      phoneNumber,
      checkPhone,
      groupedCities,
      selectedCity,
      removeProduct,
      orderStructure,
      checkInputValue,
      quantity,
      confirmOrder,
      redirectTo,
    };
  },
};
</script>

<style scoped>
.alert {
  color: rgb(200, 27, 27);
}
.inputWrapper {
  margin-bottom: 20px;
}
.orderCartInputWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  border: 1px solid rgb(92, 157, 227);
  padding: 3px;
  border-radius: 3px;
  margin-bottom: 10px;
}
.topProduct {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
}
.topProductLabel {
  width: 100%;
}
.spareDiv {
  width: 36px;
}
.dropDownWrapper {
  /* width: 100%; */
  margin-bottom: 15px;
}
.regionWrapper {
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 5px;
}
.phoneInputWrapper {
  margin-bottom: 15px;
}
</style>
