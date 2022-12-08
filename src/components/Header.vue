<template>
  <div class="headerCartWrapper">
    <Button
      @click="redirectTo('/orderCart')"
      type="button"
      label=""
      icon="pi pi-shopping-cart"
      class="p-button-warning"
      :badge="badgeCount"
      badgeClass="p-badge-danger"
    />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  name: "HeaderCart",
  components: { Button },

  setup() {
    const router = useRouter();
    function redirectTo(path) {
      router.push(path);
    }

    const store = useStore();

    const badgeCount = ref(store.state.productsArr.length);

    store.subscribe((mutation) => {
      if (mutation.type === "SAVE_PRODUCTS_ARR") {
        badgeCount.value = store.state.productsArr.length;
      }
    });

    return {
      badgeCount,
      redirectTo,
    };
  },
};
</script>

<style>
.headerCartWrapper {
  /* width: 47%; */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.headerCartWrapper button {
  padding: 0.5rem 1.6rem !important;
}
</style>
