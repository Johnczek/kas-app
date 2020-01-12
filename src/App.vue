<template>
  <div id="app">
    <KasMain/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import KasMain from './components/KasMain.vue';
import AlgorithmRecord from "@/components/AlgorithmRecord.vue";


@Component({
  components: {
    KasMain: KasMain,
    AlgorithmRecord: AlgorithmRecord
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 20px;
  min-height: 100vh;

  background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
}

@media (max-width: 990px) {
  .container {
    max-width: none !important;
  }
}
</style>
