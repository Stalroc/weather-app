<template>
  <MglMap
    :accessToken="token"
    :mapStyle.sync="mapStyle"
    :center="getPosition"
    :zoom="zoom"
    :minZoom="minZoom"
    :maxZoom="maxZoom"
    logoPosition="bottom-right"
  >
    <MglMarker :coordinates="getPosition" color="#1e3799"></MglMarker>
  </MglMap>
</template>

<script>
import { MglMap, MglMarker } from "vue-mapbox";
import api from "../config/api.js";

export default {
  name: "Map",
  components: {
    MglMap,
    MglMarker
  },
  props: {
    lat: Number,
    lng: Number
  },
  data() {
    return {
      token: api.apiMapBox.apiKey,
      mapStyle: "mapbox://styles/mapbox/outdoors-v10",
      zoom: 6,
      minZoom: 3,
      maxZoom: 12
    };
  },
  computed: {
    //Return position
    getPosition() {
      return [this.lng, this.lat];
    }
  }
};
</script>

<style scoped>
</style>