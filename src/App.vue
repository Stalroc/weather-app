<template>
  <div>
    <Home></Home>
  </div>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "app",
  components: {
    Home
  }
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  color: #1a1a1a;
  font-weight: 400;
  background-color: #f8f8f8;
  font-size: 14px;
}

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

ul {
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  color: #1a1a1a;
}

li {
  list-style: none;
}

h1,
h2,
h3,
h4 {
  margin: 0;
}

.pad25 {
  padding: 25px;
}

.fw50 {
  width: 50%;
}

.error {
  color: rgba(232, 18, 36);
}
</style>
