<template>
    <ion-page>
      <ion-content>
        <div class="body_all">
          <form @submit.prevent="connect()">
            <div class="header">
              <div class="title_m">
                <div class="img_cont">
                  <img :src="'../../imgs/icon.png'" class="img_m" />
                </div>
                <div class="text_m">StatusMax</div>
              </div>
            </div>
            <div class="title_b">Connectez-vous pour continuer</div>
            <div class="body_i">
              <img :src="'../../img/login.svg'" class="img_b" />
            </div>
            <div class="form_b">
              <div class="d_sp">
                <ion-item fill="outline" mode="md" color="primary">
                  <ion-label position="floating">Email</ion-label>
                  <ion-input
                    required
                    :value="email"
                    class="custom"
                    type="email"
                    @ionInput="(e) => (email = e.target.value as string)"
                  ></ion-input>
                </ion-item>
              </div>
              <div class="d_sp">
                <ion-item fill="outline" mode="md" color="primary">
                  <ion-label position="floating"> Mot de passe </ion-label>
                  <ion-input
                    type="password"
                    class="custom"
                    required
                    :value="password"
                    @ionInput="(e) => (password = e.target.value as string)"
                  ></ion-input>
                </ion-item>
              </div>
              <div v-if="!is_connecting" style="padding-top: 0.4rem">
                <ion-button type="submit" color="primary" expand="full"
                  >Connexion</ion-button
                >
              </div>
              <div v-else>
                <ion-spinner color="primary" name="dots"></ion-spinner>
              </div>
              <div
                class="d_sp"
                style="text-align: center; color: rgb(41, 41, 41)"
              >
                Pas encore membre ?
                <a @click="router.push('/register')" style="color: #3880ff">Inscrivez-vous ici</a>
              </div>
            </div>
          </form>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <style scoped>
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
    justify-content: space-around;
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
  
  <script setup lang="ts" >
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
    IonAvatar
  } from "@ionic/vue";
  import { menu, accessibility } from "ionicons/icons";
  import { ref, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { check_connect } from "../global/utils";
  import { show_alert, showLoading, access_tok } from "../global/utils";
  import { Storage } from "@ionic/storage";
  import axios from "axios";
  
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const is_connecting = ref(false);
  const route = useRoute();
  
  const now_connected = ref(false);
  watch(now_connected, async (newc, oldc) => {
    router.push('/tabs/');
  })
  
  const connect = async () => {
    const load = await showLoading("Connexion...");
    
    axios({
      url: "token/",
      method: "POST",
      data: {
        email :  email.value,
        password: password.value
      },
    })
      .then((resp) => {
        load.dismiss();
        const storage = new Storage({
          name: "x_info",
        });
        storage.create();
        storage.set("tokens", JSON.stringify(resp.data));
        storage.set("idents", JSON.stringify({
        email :  email.value,
        password: password.value
      }))
  
        router.push('/tabs/');
      })
      .catch((err) => {
        load.dismiss();
        console.log(err);
        return show_alert(
          "Connexion impossible",
          "Veuillez vérifier vos identifiants."
        );
      });
  };
  
  
  onIonViewDidEnter(async () => {
    const storage = new Storage({
          name: "x_info",
        });
        storage.create();
    let idents = await storage.get('idents')
    if(idents) {
      idents = JSON.parse(idents);
      email.value = idents.email
      password.value = idents.password
      //await connect()
    } 
  });
  </script>