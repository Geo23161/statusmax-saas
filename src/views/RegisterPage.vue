<template>
    <ion-page>
        <ion-content>
            <div class="body_all">
                <div class="header">
                    <div @click="router.back()" class="menu">
                        <ion-icon :icon="arrowBack" />
                    </div>
                    <div class="title_m">
                        <div class="img_cont">
                            <img :src="'../../imgs/icon.png'" class="img_m" />
                        </div>
                        <div class="text_m">StatusMax</div>
                    </div>
                </div>
                <div class="title_b">Demarrez l'aventure maintenant</div>
                <div v-if="!usr">
                    <form @submit.prevent="to_step2()">
                        <div class="form_b">
                            <div class="d_sp">
                                <ion-item fill="outline" mode="md" color="primary">
                                    <ion-label position="floating">Nom et Prenom</ion-label>
                                    <ion-input required :value="name" type="text"
                                        @ionInput="(e) => (name = e.target.value as string)"> </ion-input>
                                </ion-item>
                            </div>
                            <div class="d_sp">
                                <ion-item fill="outline" mode="md" color="primary">
                                    <ion-label position="floating">Email</ion-label>
                                    <ion-input required :value="email" type="email"
                                        @ionInput="(e) => (email = e.target.value as string)"> </ion-input>
                                </ion-item>
                            </div>
                            <div class="d_sp">
                                <ion-item fill="outline" mode="md" color="primary">
                                    <ion-label position="floating">Mot de passe</ion-label>
                                    <ion-input required :value="password" type="password"
                                        @ionInput="(e) => (password = e.target.value as string)"> </ion-input>
                                </ion-item>
                            </div>
                            <div class="d_sp">
                                <ion-item fill="outline" mode="md" color="primary">
                                    <ion-label position="floating">Entreprise ou commerce</ion-label>
                                    <ion-input required :value="commerce" type="text"
                                        @ionInput="(e) => (commerce = e.target.value as string)"> </ion-input>
                                </ion-item>
                            </div>
                            <div class="d_sp">
                                <ion-textarea required @ion-input="e => description = e.target.value as string"
                                    label="Informations, Localisation et contact" labelPlacement="floating" fill="outline"
                                    placeholder="Ecrivez..."></ion-textarea>
                            </div>
                            <div class="d_sp">
                                <div style="padding-bottom: .3rem;">
                                    Votre logo
                                </div>
                                <div @click="click_id('img_i')" class="ion-activatable ripple-parent"
                                    style="display: flex; justify-content: space-between; padding: .6rem; align-items: center; background-color: rgb(238, 238, 238); color: rgb(46, 46, 46);">
                                    <ion-ripple-effect></ion-ripple-effect>
                                    <div>
                                        {{ prod_images.length ? `${prod_images.length} image${(prod_images.length > 1) ? 's' : ''}` : 'Aucune image' }}
                                    </div>
                                    <div>
                                        <ion-icon :icon="cloudUpload"
                                            style="font-size: 1.5rem; position: relative; top: .1rem; " />
                                    </div>
                                </div>
                            </div>

                            <div style="padding-top: 0.4rem">
                                <ion-button type="submit" color="primary" expand="full">Valider</ion-button>
                            </div>



                        </div>

                    </form>
                    <div v-show="false">
                        <input type="file" id="img_i" accept="image/*" @change="e => add_files(e, 'img')" />
                        <input type="file" multiple id="vid_i" accept="image/*" @change="e => add_files(e, 'vid')" />
                    </div>
                </div>
            </div>

        </ion-content>
    </ion-page>
</template>

<style scoped>
.my_inp {
    width: 100%;
    padding: .8rem;
    background-color: rgb(238, 238, 238);
    color: rgb(46, 46, 46);
    border: none;
}

*:focus {
    outline: none
}

.myinp:hover {
    border-color: #3880ff;
    color: #3880ff;
    background: transparent;
}

.menu:active,
.menu_:active {
    box-shadow: none;
    background: white;
    color: #3880ff;
}

.menu {
    padding-top: 0.4rem;
    padding-bottom: 0.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #3880ff;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 10px 15px -3px #3880ff65, 0 4px 6px -2px #f2824129;
}

.acto {
    border-color: rgb(41, 41, 41);
    color: rgb(41, 41, 41);
}

.norm {
    border-color: rgb(41, 41, 41);
    color: rgb(41, 41, 41);
}

.myinp {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form_b {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.title_b {
    font-size: 1.1rem;
    font-weight: bold;
    padding: 1rem;
    color: rgb(41, 41, 41);
    text-align: center;
}

.img_b {
    width: 100%;
    padding: 1rem;
}

.body_i {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 0.4rem;
}

.img_cont {
    margin-right: 0.3rem;
}

.text_m {
    font-size: 1.2rem;
    font-weight: bold;
    color: rgb(41, 41, 41);
}

.img_m {
    width: 40px;
    height: 40px;
    border-radius: 100%;
}

.title_m {
    display: flex;
    align-items: center;

}

.menu:active,
.menu_:active {
    box-shadow: none;
    background: white;
    color: #3880ff;
}

.menu {
    padding-top: 0.4rem;
    padding-bottom: 0.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #3880ff;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 10px 15px -3px #3880ff65, 0 4px 6px -2px #f2824129;
}

.header {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.d_sp {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.body_all {
    width: 100vw;
    min-height: 100vh;
    background: white;
}
</style>

<script setup lang="ts">

import {
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonMenu,
    IonMenuToggle,
    IonList,
    onIonViewDidEnter,
    IonSpinner,
    alertController,
    loadingController,
    IonAvatar,
    IonModal,
    IonTextarea,
    IonIcon
} from "@ionic/vue";
import { useRoute, useRouter } from "vue-router";
import { arrowBack, cloudUpload, location } from "ionicons/icons";
import { ref } from "vue";
import { show_alert, showLoading } from "@/global/utils";
import axios from "axios"

const stp = ref(1);
const usr = ref(0)
const name = ref("");
const email = ref("");
const password = ref("");
const quart = ref("");
const lOpen = ref(false);
const commerce = ref("");
const description = ref('')
const print_quart_name = (q: any) => {
    const jso = JSON.parse(q);
    return jso.name;
};

const router = useRouter()
const al = (str: string) => {
    quart.value = str;
    lOpen.value = false;
};

const to_step2 = async () => {

    if (!prod_images.value.length) return await show_alert('', 'Veuillez ajouter votre logo avant de continuer!')

    const load = await showLoading('Inscription...')
    const form = new FormData()
    form.append('name', name.value.trim())
    form.append('email', email.value.trim())
    form.append('password', password.value.trim())
    form.append("description", description.value)
    form.append('commerce', commerce.value)
    form.append('logo', prod_images.value[0])
    try {
        const resp = await axios.post("api/register/", form, {
            headers : {
                "Content-Type": "multipart/form-data"
            }
        })
        if(resp.data['done']) {
            load.dismiss();
            localStorage.setItem('new_p', JSON.stringify({ email: email.value, password: password.value }))
            router.push(`/login`);
        }
        else {
            load.dismiss()
            show_alert("Email déjà utilisé",
                "Cet email a déjà été utilisé pour un autre compte"
            )
        }
    } catch (e) {
        load.dismiss();
    }


}


const prod_images = ref<Blob[]>([])
const add_files = (e: any, typ : string) => {
     prod_images.value = [] as Blob[]
    
    for(const f of e.target.files) ( prod_images.value).push(f)
}

const click_id = (id : string) => {
    document.getElementById(id)?.click()
}

</script>
