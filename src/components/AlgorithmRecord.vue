<template>
    <div class="card mb-3">
        <div class="card-header">
            <strong>{{record.algorithmName}}</strong>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-6 border-right">
                    <div class="row">
                        <div class="col-12 mb-2">
                            <h5>Komprimace</h5>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-lg-4 col-sm-6 col-12">
                                    <div>
                                        <strong>Výstup</strong>
                                        <div>{{record.encodedMessage}}</div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6 col-12 mt-sm-0 mt-2">
                                    <div>
                                        <strong>Velikost zprávy</strong>
                                        <div>{{record.encodedMessageSize}} B <span class="tooltip-hoverable" v-b-tooltip.hover :title="record.encodedMessageSizeToolTip">?</span></div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-sm-6 col-12 mt-lg-0 mt-2">
                                    <div>
                                        <strong>Čas</strong>
                                        <div>
                                            {{record.encodingTime.toString().toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                            " ")}} ns
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-6">
                    <div class="row">
                        <div class="col-12 mb-2">
                            <h5>Dekomprimace</h5>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-lg-4 col-sm-6 col-12">
                                    <div>
                                        <strong>Výstup</strong>
                                        <div>{{record.decodedMessage}}</div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6 col-12 mt-sm-0 mt-2">
                                    <div>
                                        <strong>Velikost zprávy</strong>
                                        <div>{{record.decodedMessageSize}} B</div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-sm-6 col-12 mt-lg-0 mt-2">
                                    <div>
                                        <strong>Čas</strong>
                                        <div>
                                            {{record.decodingTime.toString().toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                            " ")}} ns
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3" v-if="record.decodedMessageSize - record.encodedMessageSize > 0">
                <div class="col-12">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :aria-valuenow="record.encodedMessageSize"
                             aria-valuemin="0" :aria-valuemax="record.decodedMessageSize" :style="{width: Math.floor(record.encodedMessageSize*100 / record.decodedMessageSize) + '%'}">{{Math.round((record.encodedMessageSize*100 / record.decodedMessageSize)*100)/100}} %</div>
                    </div>
                    <div class="mt-1">
                        <small class="text-primary">Progressbar ukazuje, kolik % paměti zabírá komprimovaná zpráva. Modrá hodnota reprezentuje, kolik % místa zabírá komprimovaná zpráva oproti místu, který zabírá nekomprimovaná zpráva (celý progress bar)</small>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row" v-if="record != null && record.huffmanDictionary && true && record.huffmanDictionary.length > 0">
                <div class="col-12">
                    <h3>Slovník</h3>
                </div>
                <div class="col-12 d-flex flex-wrap">
                    <h3 v-for="(record, index) in record.huffmanDictionary" :key="index" class="mr-2">
                    <div class="badge badge-primary" v-if="record[0] !=='\0'">
                        {{record[0]}} - {{record[1]}}
                    </div>
                    </h3>
                </div>
            </div>
            <div class="row" v-if="record != null && record.lzwdictionary && true && record.lzwdictionary.length > 0">
                <div class="col-12">
                    <h3>Slovník</h3>
                </div>
                <div class="col-12 d-flex flex-wrap">
                    <h3 v-for="(record, index) in record.lzwdictionary" :key="index" class="mr-2">
                        <div class="badge badge-primary">
                            {{record[0]}} - {{record[1]}}
                        </div>
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {AlgorithmRecordModel} from "@/model/algorithmRecordModel";

    @Component
    export default class KasMain extends Vue {
        @Prop()
        record!: AlgorithmRecordModel;
    }
</script>

<style scoped>
    .tooltip-hoverable {
        display: inline-block;
        width: 23px;
        height: 23px;
        background: #000;
        color: #FFF;
        border-radius: 10rem;
        line-height: 25px;
        margin-left: .25rem;
    }
</style>