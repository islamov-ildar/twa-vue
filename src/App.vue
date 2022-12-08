<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.btnContainer {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 70%;
}
.btnWrapper {
  display: flex;
  justify-content: center;
}
.p-button {
  width: 100%;
}
.orderDetails {
  text-align: left;
  margin-bottom: 15px;
}

.productViewInputWrapper .p-inputtext {
  width: 40%;
}
.productViewInputWrapper .p-inputnumber-buttons-horizontal {
  width: 40%;
}

.orderCartInputWrapper .p-inputtext {
  width: 55%;
}
.orderCartInputWrapper .p-inputnumber-buttons-horizontal {
  width: 55%;
}
.p-dropdown {
  width: 100% !important;
}
.p-card-content {
  padding: 0 !important;
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
