<template>
    <ion-modal :is-open="isOpen">
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button fill="clear" @click="close()">
                    <ion-icon :icon="arrowBack" />
                </ion-button>
            </ion-buttons>
            <ion-title>
                Paiement
            </ion-title>
        </ion-toolbar>
        <ion-content>
            <div class="separator">
                
            </div>
            <div style="padding-left: 1rem; padding-right: 1rem;" >
                <div class="header">
                    Charger un montant
                </div>
                <div class="body_i">
                    <img :src="'../../img/nopay.svg'" style="width: 100%;" class="img_b" />
                </div>
                <div style="text-align: center; padding-top: 0.6rem; padding-bottom: 0.6rem">
                    Veuillez charger un montant pour eviter les interruptions.
                </div>
            </div>
            <form @submit.prevent="open_kkia()" class="inputs" >
                <div>
                    <div >
                          
                        <div >
                            <ion-item fill="outline" mode="md" color="primary">
                                <ion-input required type="number" placeholder="Montant a charger" :value="mont"
                                    @ionInput="(e : any) => (montant = parseInt(e.target.value))"></ion-input>
                            </ion-item>
                        </div>
                    </div>
                    <div style="padding-top: 0.4rem">
                        <ion-button type="submit" mode="ios" color="primary" expand="full">Payer</ion-button>
                    </div>
                </div>
            </form>
        </ion-content>
    </ion-modal>
</template>
  
<style scoped>
.inputs {
	padding: 1.8rem 1rem;
}
</style>
  
<script lang="ts">
import { defineComponent, defineEmits, ref, Ref, toRef, watch } from "vue";
import { arrowBack } from "ionicons/icons";
import { IonModal, IonContent, IonIcon, IonToolbar, IonTitle, IonButtons, IonButton, IonInput, IonList } from "@ionic/vue";
import Plyr from "plyr";
import { access_tok, show_alert, showLoading } from "@/global/utils";
import axios from "axios";
import { useRouter } from "vue-router";
import { openKkiapayWidget, addKkiapayListener } from "kkiapay"

export default defineComponent({
    props: {
        isOpen: Boolean,
        mont : Number
    },
    components: {
        IonContent,
        IonModal,
        IonIcon, IonToolbar, IonTitle, IonButtons, IonButton, IonInput
    },
    setup(props, ctx) {

        const emits = defineEmits(['close', 'done']);
        const close = () => {
            ctx.emit('close')
        }
        const open = toRef(props, "isOpen");
        watch(open, (newo, oldo) => {
            if(newo) get_min_pay(); 
            if ( props.mont) montant.value = props.mont as number
        })

        const api_key = ref("")

        const montant = ref(0)
        const min_pay = ref(0)
        const router = useRouter()
        const is_dev = ref(false)
        const get_min_pay = async () => {
            const load = await showLoading('Chargement...')
            const resp = await axios.get('api/get_min_pay/', {
                headers : {
                    Authorization : `Bearer ${await access_tok(router, load)}`
                }
            })
            if(resp.data['done']) min_pay.value = montant.value ? montant.value : resp.data['result']  , api_key.value = resp.data['key'], is_dev.value = resp.data['is_dev']
            
            load.dismiss()
        }

        const make_payment = async (transactionId : string | number) => {
            const load = await showLoading('Patientez...')
            const resp = await axios.post('api/make_payment/', {
                transactionId,
                amount : montant.value
            }, {
                headers : {
                    Authorization : `Bearer ${await access_tok(router, load)}`
                }
            })
            if(resp.data['done']) {
                load.dismiss()
                ctx.emit('done')
            }
        }
        
        const open_kkia = () => {
            if (!montant.value) return
            if(montant.value < min_pay.value) return show_alert('Montant invalide', "Le montant ne peut pas être inferieur a " + min_pay.value + " F.")
            addKkiapayListener('success', (response) => {
                make_payment(response.transactionId)
            })

            openKkiapayWidget({
                amount : montant.value,
                api_key : api_key.value,
                sandbox : is_dev.value, 
            })
        }

        

        return {
            arrowBack,
            close,
            montant,
            open_kkia
        }
    },
});
</script>
