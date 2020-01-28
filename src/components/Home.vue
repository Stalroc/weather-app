<template>
  <div>
    <!--Loading content-->
    <Loader v-if="loading" class="screen__loading"></Loader>
    <div v-else class="app__container">
      <div class="weather__container pad25">
        <div class="weather__layout">
          <!--Searchbar-->
          <div class="searchbar">
            <form
              @submit.prevent="search()"
              method="post"
              class="form__search"
              :class="{error__form: error}"
            >
              <input
                type="text"
                class="input__search"
                name="city"
                id="city"
                placeholder="Choose city..."
                autocomplete="off"
                v-model="citySearch"
                @input="resetError()"
              ><!--
              --><button type="submit" class="btn__search" title="search">
                <i class="fas fa-search"></i>
              </button>
            </form>
            <a
              href="#"
              v-if="location"
              @click="searchLocation()"
              title="my position"
              class="location"
            >
              <span>
                <i class="far fa-compass"></i>
              </span>
            </a>
            <span v-if="error" class="error error__search">{{error}}</span>
          </div>
          <!--Weather content-->
          <div v-if="dataWeather" class="weather__content">
            <h1 class="weather__location">{{dataWeather.name}}, {{dataWeather.sys.country}}</h1>
            <span class="date__today">{{new Date() | moment("dddd, MMMM Do YYYY")}}</span>
            <div class="status__container">
              <img class="weather__icon" :src="searchIcon" :alt="dataWeather.weather[0].main" />
              <h3 class="status__title">{{dataWeather.weather[0].main}}</h3>
              <span class="status__desc">{{dataWeather.weather[0].description}}</span>
            </div>
            <div class="temp__container">
              <div class="temp__actu fw50">
                <span>{{dataWeather.main.temp | celcius}}</span>
              </div>
              <div class="temp__min__max fw50">
                <span>{{dataWeather.main.temp_min | celcius}}</span>
                <span>{{dataWeather.main.temp_max | celcius}}</span>
              </div>
            </div>
          </div>
          <div v-else class="weather__content">
            <h1>Weather App</h1>
            <span class="date__today">{{new Date() | moment("dddd, MMMM Do YYYY")}}</span>
          </div>
          <!--Footer-->
          <div class="footer">
            <span class="comment">
              Made with ❤️ by
              <a href="https://github.com/Stalroc" target="_blank">Benjamin Rossin</a>
            </span>
          </div>
        </div>
      </div>
      <!--Map content-->
      <div class="map__container">
        <Map
          v-if="dataWeather"
          class="weather__map"
          :lat="dataWeather.coord.lat"
          :lng="dataWeather.coord.lon"
        ></Map>
        <img v-else class="weather__map" src="assets/img/bg-weather.jpg" alt="Background" />
      </div>
    </div>
  </div>
</template>

<script>
import Map from "./Map.vue";
import Loader from "./Loader.vue";
import api from "../config/api.js";
import weatherPicture from "../weather.picture.js";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Map,
    Loader
  },
  data() {
    return {
      citySearch: "",
      dataWeather: null,
      error: "",
      loading: true,
      location: false
    };
  },
  methods: {
    //Search weather city with weather api
    search() {
      this.resetError();
      if (this.citySearch.trim() != "") {
        axios
          .get(
            `${api.apiWeather.urlRacine}/data/2.5/weather?q=${this.citySearch}&appid=${api.apiWeather.apiKey}`
          )
          .then(res => {
            this.dataWeather = res.data;
          })
          .catch(err => {
            console.log(`Erreur : ${err}`);
            this.error = "city ​​not found";
          });
        this.citySearch = "";
      } else {
        this.error = "a field is empty";
      }
    },
    //Search weather user geolocation
    //with navigator geolocation and weather api
    searchLocation() {
      this.resetError();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            axios
              .get(
                `${api.apiWeather.urlRacine}/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api.apiWeather.apiKey}`
              )
              .then(res => {
                this.dataWeather = res.data;
                this.location = true;
              })
              .catch(err => {
                console.log(`Erreur : ${err}`);
              })
              .finally(() => {
                this.loading = false;
              });
          },
          err => {
            console.warn(`ERREUR (${err.code}): ${err.message}`);
            this.loading = false;
          }
        );
      }
    },
    resetError() {
      this.error = "";
    }
  },
  computed: {
    //Search weather icon
    searchIcon() {
      const strWeather = this.dataWeather.weather[0].main;

      if (weatherPicture.get(strWeather)) {
        return weatherPicture.get(strWeather).icon;
      } else {
        return weatherPicture.get("Sun").icon;
      }
    }
  },
  filters: {
    celcius(t) {
      return Math.round(t - 273.15) + "°c";
    }
  },
  mounted() {
    setTimeout(() => {
      this.searchLocation();
    }, 1500);
  }
};
</script>

<style scoped>
.app__container {
  height: 100vh;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.weather__container {
  min-width: 400px;
  position: relative;
  overflow: scroll;
  overflow-x: hidden;
}

.weather__layout {
  position: relative;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

/*Searchbar*/
.searchbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
}

.form__search {
  display: flex;
}

.location {
  font-size: 1.25em;
}

.error__search {
  position: absolute;
  top: 50px;
}

.input__search,
.btn__search {
  background-color: transparent;
  color: #1a1a1a;
  border-bottom: 1px solid #1a1a1a;
  border-top: 1px solid #1a1a1a;
  outline: 0;
  padding: 12.5px 25px;
  font-family: "Roboto", sans-serif;
}

.input__search {
  border-left: 1px solid #1a1a1a;
  border-right: 0;
  padding-right: 0;
  width: 200px;
  border-radius: 50px 0 0 50px;
}

.btn__search {
  border-right: 1px solid #1a1a1a;
  border-left: 0;
  border-radius: 0 50px 50px 0;
  cursor: pointer;
}

::-webkit-input-placeholder {
  color: #bdc3c7;
}

::-moz-placeholder {
  color: #bdc3c7;
}

:-ms-input-placeholder {
  color: #bdc3c7;
}

::-ms-input-placeholder {
  color: #bdc3c7;
}

::placeholder {
  color: #bdc3c7;
}

.error__form input,
.error__form button {
  border-color: rgba(232, 18, 36);
}

/*Weather content*/
.weather__content {
  width: 100%;
  text-align: center;
}

.weather__location {
  color: #1e3799;
}

.date__today {
  color: #bdc3c7;
}

/*Status weather*/
.status__container {
  margin: 30px 0 20px 0;
}

.status__desc,
.date__today {
  font-size: 1.1em;
}

/*Temp weather*/
.temp__container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 200px;
  margin: 0 auto;
}

.temp__actu {
  font-size: 3.5em;
  color: #1e3799;
}

.temp__min__max {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 1.2em;
}

/*Weather map*/
.weather__map {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.map__container {
  width: 100%;
  position: relative;
}

/*Footer*/
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
}

.comment {
  font-size: 1.1em;
}

.comment a {
  font-weight: 600;
}

/***Responsive***/
@media screen and (max-width: 1000px) {
  .app__container {
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
    height: 100%;
  }

  .weather__container {
    height: 100vh;
    min-width: 100% !important;
    overflow-y: auto;
  }

  .map__container {
    height: 500px;
  }
}

@media screen and (max-width: 500px) {
  .searchbar {
    text-align: center;
  }
}
</style>
