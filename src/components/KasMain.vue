<template>
    <div class="kas">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="heading mb-4">
                        <h1 class="mt-1">Komprimace dat a kryptografie</h1>
                        <hr>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="form-group d-flex">
                        <input v-model="message" placeholder="Vepište hodnotu" class="form-control form-control-lg" :disabled="this.records.length > 0">
                        <button type="submit" class="btn btn-primary btn-lg ml-2" @click="sendMessage" v-if="this.records.length <= 0">Odeslat</button>
                        <button type="submit" class="btn btn-danger btn-lg ml-2" @click="removeMessage" v-else>Resetovat</button>
                    </div>
                </div>
            </div>
            <div id="records" class="row" v-if="this.contentLoading">
                <div class="col-12">
                    <div class="spinner-grow text-info" role="status"></div>
                    <div class="mt-1">Načítám</div>
                </div>
            </div>
            <div id="message" class="row mb-3" v-if="this.message && this.records.length > 0">
                <div class="col-12">
                    <h4><b>Zpráva:</b> {{message}}</h4>
                    <div v-if="this.messageSize">
                        <h4><b>Velikost zprávy:</b> {{messageSize}} B</h4>
                        <small>Velikost zprávy je počet znaků * 1 (na uložení každého znaku je třeba 1B)</small>
                    </div>
                </div>
                <div class="col-12 mt-2">
                    <div class="alert alert-info">
                        Zpráva je předána každému z níže uvedených algoritmů. Nejdříve se algoritmem zkomprimuje a poté se výsledek pošle stejnému algoritmu k dekomprimaci. V každém tomto kroku je zaznamenávám <strong>výstup, velikost dané zprávy a čas potřebný k úkonu</strong>.
                    </div>
                </div>
            </div>
            <div class="row" v-if="this.records.length > 0">
                <div class="col-12">
                        <algorithm-record v-for="(record, index) in this.records" :record="record" :key="index"></algorithm-record>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import axios from 'axios'
    import {AlgorithmRecordModel} from "@/model/algorithmRecordModel";
    import AlgorithmRecord from "@/components/AlgorithmRecord.vue";
    @Component({
        components: {AlgorithmRecord}
    })
    export default class KasMain extends Vue {
        http = axios.create({
            baseURL: `http://johnczek.eu:8080/api`,
            headers: {'Content-Type': 'application/json'}
        });

        message: string = '';

        messageSize: number = 0;

        contentLoading: boolean = false;

        records : AlgorithmRecordModel[] = [];

        /**
         * Method sends given message to api and maps response to AlgorithmRecordModels
         */
        sendMessage() {
            this.contentLoading = true;
            this.getItems().then((data) => {
                this.messageSize = data.messageSize;
                this.records = data.records.map((record: {}) => {
                    return new AlgorithmRecordModel(record);
                });

                this.contentLoading = false;
            });
        }

        /**
         * Method resets application state
         */
        removeMessage() {
            this.message = '';
            this.records = [];
        }

        /**
         * Method calls API with given message
         */
        async getItems() {
            const response = await this.http.post('/kas', {message: this.message})

            return response.data;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
