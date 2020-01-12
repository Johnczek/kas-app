
export class AlgorithmRecordModel {

    algorithmName !: string;

    decodedMessage !: string;

    decodedMessageSize !: number;

    decodingTime !: number;

    encodedMessage !: string;

    encodedMessageSize !: number;

    encodingTime !: number;

    lzwdictionary !: Object;

    huffmanDictionary !: string[][];

    encodedMessageSizeToolTip !: string;

    constructor(values: {huffmanDictionary?:Object, lzwdictionary?:Object}) {
        Object.assign(this, values);

        if (values.huffmanDictionary != null) {
            this.huffmanDictionary = Object.keys(values.huffmanDictionary).map(function (key) {
                // @ts-ignore
                return [key, values.huffmanDictionary[key]]
            })
        }

        if (values.lzwdictionary != null) {
            this.lzwdictionary = Object.keys(values.lzwdictionary).map(function (key) {
                // @ts-ignore
                return [key, values.lzwdictionary[key]]
            })
        }
    }

}