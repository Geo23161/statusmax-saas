<template>
    <ion-page id="page_io" >
        <ion-content  :scroll-y="false" :scroll-x="false">
            <div v-if="room" class="body_all_r">
                <div class="first_tool">
                    <button @click="router.back()" class="backbut">
                        <ion-icon :icon="arrowBack
                            " style="position: relative; top: .1rem;" />
                    </button>
                    <div class="yprofil">
                        <div @click="router.push('/profil/' + get_room_you(room).id)"  class="imgtop" :style="{
                            backgroundImage: `url('${f_url(get_room_you(room).get_picture)}')`
                        }">
                            <button v-if="is_online(toDate(get_room_you(room).last).getTime())" class="online">
                            </button>
                        </div>
                        <div class="namm">
                            <div> {{ get_room_you(room).prenom }} <user-badge :class="{
                                is_vip: get_room_you(room).get_status == 'vip'
                            }" :status="get_room_you(room).get_status" :width="'4.416vw'" :height="'4.416vw'"
                                    :size="get_room_you(room).get_status == 'vip' ? '2.3920000000000003vw' : '3.128vw'" /> </div>
                            <div style="font-size: 2.576vw !important; font-weight: 500;">
                                {{ formatOnline(get_room_you(room).last) }}
                            </div>
                        </div>
                    </div>

                    <button @click="warn_delete()" class="backbut">
                        <ion-icon :icon="trash" style="position: relative; top: .1rem;" />
                    </button>
                </div>
                <div class="ai_tool">
                    <div class="ai_cont">
                        <div class="header_ai"  >
                            <div class="title_ai" @click="hidden = !hidden" >
                                <ion-icon :icon="room.niveau.level <= 10 ? heart : diamond"
                                    style="color: #fc1955; font-size: 4.6000000000000005vw; position: relative; top: 0.92vw;"></ion-icon>
                                {{ room.niveau.level <= 10 ? `Niveau ${room.niveau.level}` : "Match parfait" }} </div>
                                    <div>
                                        <button @click.stop="hOpen = true" class="backbut">
                                            <ion-icon :icon="help"
                                                style="position: relative; top: .1rem; font-size: 5.152vw;" />
                                        </button>
                                        <button @click.stop="hidden = !hidden" class="backbut">
                                            <ion-icon :icon="!hidden ? caretUp : caretDown"
                                                style="position: relative; top: .1rem; font-size: 5.152vw;" />
                                        </button>
                                    </div>
                            </div>
                            <div class="niv_text" :class="{ hide: hidden }">
                                <div v-if="!launcher || launcher?.author == user?.id" class="bdy_ai" id="niv_text">

                                </div>
                                <div style="color: rgb(199, 199, 199) !important; text-align: center !important;"
                                    class="bdy_ai" v-else>
                                    Voulez-vous {{ room.niveau.level ? ' passer au suivant?' : ' demarrez l\'assistant de conversations ? ' }}
                                </div>
                                <div v-if="room.niveau.level <= 10">
                                    <button @click="charg_launcher()" v-if="(!launcher)" class="fancybut princ"
                                        style="margin-top: 1.104vw;">
                                        {{ !(room.niveau.level) ? 'Commencer' : 'Suivant' }} <ion-icon
                                            v-if="room.niveau.level" :icon="arrowForward"
                                            style="position: relative; top: .82.8vw; font-size: 4.232vw;" />
                                    </button>
                                    <div v-else-if="launcher?.author != user?.id"
                                        style="display: flex; justify-content: space-between;">
                                        <button v-if="!l_refused" @click="forget_launch()" class="backbuto princ">
                                            <ion-icon :icon="close"
                                                style="position: relative; top: .1rem; font-size: 4.232vw;" />
                                        </button>
                                        <button v-else class="backbuto ">
                                            <ion-spinner :name="'crescent'" :color="'light'" />
                                        </button>
                                        <button v-if="!l_accepted" @click="accept_launcher()" class="backbuto success">
                                            <ion-icon :icon="checkmark"
                                                style="position: relative; top: .1rem; font-size: 4.232vw;" />
                                        </button>
                                        <button v-else class="backbuto ">
                                            <ion-spinner :name="'crescent'" :color="'light'" />
                                        </button>
                                    </div>
                                    <button v-else class="fancybut princ" style="margin-top: 1.104vw;">
                                        <ion-spinner :name="'dots'" :color="'light'"></ion-spinner>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="messages_cont" id="messages_container">
                        <button v-if="show_rep" class="respond_but princ" >
                            <ion-icon :icon="arrowUndo"  />
                        </button>
                        <div v-if="!messages.length">
                            <div class="circle_cont">
                                <div class="circle_b fcir">

                                </div>
                                <div class="circle_b scir">

                                </div>
                            </div>
                            <div class="phots_cont">
                                <div class="phot fphot" :style="{
                                    backgroundImage: `url('${f_url(user?.get_profil.get_picture as string)}')`
                                }">

                                </div>
                                <div class="phot sphot" :style="{
                                    backgroundImage: `url('${f_url(get_room_you(room).get_picture)}')`
                                }">

                                </div>
                            </div>
                            <div class="text_all">
                                <div class="text_m">
                                    C'est un match!
                                </div>
                                <div class="des_m">
                                    {{ room.why }}
                                </div>
                            </div>
                        </div>
                        <div v-else class="great_messages">
                            <div v-if="loadin" class="sp_cont">
                                <div>
                                    <ion-spinner color="primary" name="crescent">

                                    </ion-spinner>
                                </div>
                            </div>
                            <div v-for="message in messages" :key="message.id">
                                <div v-if="messages.length"
                                    :class="{ hide: !(is_first(message) || shows.includes(message.id)), date_b: has_prev(message) }"
                                    class="date_r">
                                    {{ format_date(toDate(message.created_at)) }}
                                </div>
                                <div v-if="message.get_reply" class="message_cont" :class="{ _mee: message.user == user?.id, is_prec: has_prev(message) }" style="margin-bottom: -3.5vw; font-size: 3vw;" >
                                    <div style="margin-right: 3.3vw;" >
                                        <ion-icon :icon="arrowUndo" />  Réponse à {{ rep_author(user_from_id((message.get_reply as ReplyMess).author as number) as string) }}
                                    </div>
                                </div>
                                <div  v-if="message.get_reply" class="message_cont" :class="{ _mee: message.user == user?.id, is_prec: has_prev(message) }" style="margin-bottom: -5.4vw;" >
                                    <div v-if="(message.get_reply as ReplyMess).typ == 'text'" class="message no_two" 
                                        :class="{ me_mess_r: message.user == user?.id, mhas_next: has_next(message) && message.user == user?.id, mhas_prev: has_prev(message) && message.user == user?.id, you_mess_r: message.user != user?.id, yhas_next: has_next(message) && message.user != user?.id, yhas_prev: has_prev(message) && message.user != user?.id }">
                                        {{ (message.get_reply as ReplyMess).content }}
                                    </div>
                                    <div v-else-if="(message.get_reply as ReplyMess).typ == 'image'" class="message" style="display: flex; align-items: center; padding-top: 0vw !important; padding-left: 0vw !important;" :class="{ me_mess_r: message.user == user?.id, mhas_next: has_next(message) && message.user == user?.id, mhas_prev: has_prev(message) && message.user == user?.id, you_mess_r: message.user != user?.id, yhas_next: has_next(message) && message.user != user?.id, yhas_prev: has_prev(message) && message.user != user?.id }" >
                                        <div class="bg-img" :style="{
                                            backgroundImage: `url('${f_url((message.get_reply as ReplyMess).content)}')` 
                                        }" >

                                        </div> Image
                                    </div>
                                    <div v-else-if="(message.get_reply as ReplyMess).typ == 'video'" class="message" style="display: flex; align-items: center; padding-top: 0vw !important; padding-left: 0vw !important;" :class="{ me_mess_r: message.user == user?.id, mhas_next: has_next(message) && message.user == user?.id, mhas_prev: has_prev(message) && message.user == user?.id, you_mess_r: message.user != user?.id, yhas_next: has_next(message) && message.user != user?.id, yhas_prev: has_prev(message) && message.user != user?.id }" >
                                        <div class="bg-img" :style="{
                                            backgroundImage: `url('${f_url((message.get_reply as ReplyMess).content)}')` 
                                        }" >

                                        </div> Video
                                    </div>
                                    <div v-if="(message.get_reply as ReplyMess).typ == 'audio'" class="message" 
                                        :class="{ me_mess_r: message.user == user?.id, mhas_next: has_next(message) && message.user == user?.id, mhas_prev: has_prev(message) && message.user == user?.id, you_mess_r: message.user != user?.id, yhas_next: has_next(message) && message.user != user?.id, yhas_prev: has_prev(message) && message.user != user?.id }">
                                        <ion-icon :icon="mic"  /> Message audio ({{ (message.get_reply as ReplyMess).content }})
                                    </div>
                                </div>
                                <div class="message_cont can_moov" :id="'cmess:' + message.id" style="z-index: 100;"
                                    :class="{ _mee: message.user == user?.id, is_prec: has_prev(message) }">
                                    <div v-if="message.image" @click="show_details(message.id)" :id="`mess:${message.id}`"
                                        :class="{ immg: message.user == user?.id, immg_: message.user != user?.id, mhas_next: has_next(message) && message.user == user?.id, mhas_prev: has_prev(message) && message.user == user?.id, yhas_next: has_next(message) && message.user != user?.id, yhas_prev: has_prev(message) && message.user != user?.id }">
                                        <img @click="click_id(message.id + ':img')" :src="get_image_url(message)" :style="{
                                            width: loadeds.includes(message.id) ? 'auto' : '36.800000000000004vw',
                                            height: loadeds.includes(message.id) ? '100%' : '73.60000000000001vw',
                                        }" @load="loadeds.push(message.id)" class="message_img" :class="{
    blur: get_storeF(message.id)?.src == ''
}" />

                                        <button v-if="!get_storeF(message.id).downloaded"
                                            @click="start_downloading(message)" class="backbuts is_down"
                                            :class="{ princ: message.user == user?.id, secon: message.user != user?.id }">
                                            <ion-icon :icon="download"
                                                style="position: relative; top: .1rem; font-size: 5.336vw;" />
                                        </button>
                                        <button
                                            v-if="get_storeF(message.id).downloaded && get_storeF(message.id)?.src == ''"
                                            class="backbuts is_down"
                                            :class="{ princ: message.user == user?.id, secon: message.user != user?.id }">
                                            <ion-spinner name="crescent" :color="'light'"
                                                style="position: relative; top: 0.552vw;"></ion-spinner>
                                        </button>
                                        <div v-if="get_storeF(message.id)?.src == ''"
                                            :class="{ idic: message.user == user?.id, idic_s: message.user != user?.id }">
                                            {{ get_size(message, 'image') }}
                                        </div>
                                    </div>
                                    <div v-else-if="message.video" @click="show_details(message.id)"
                                        :id="`mess:${message.id}`"
                                        :class="{ immg: message.user == user?.id, immg_: message.user != user?.id, mhas_next: has_next(message) && message.user == user?.id, mhas_prev: has_prev(message) && message.user == user?.id, yhas_next: has_next(message) && message.user != user?.id, yhas_prev: has_prev(message) && message.user != user?.id }">
                                        <img :src="get_video_url(message)" :style="{
                                            width: loadeds.includes(message.id) ? 'auto' : '36.800000000000004vw',
                                            height: loadeds.includes(message.id) ? '100%' : '73.60000000000001vw',
                                        }" @load="loadeds.push(message.id)" class="message_img" />

                                        <button v-if="!get_storeF(message.id).downloaded"
                                            @click="start_downloading(message)" class="backbuts is_down"
                                            :class="{ princ: message.user == user?.id, secon: message.user != user?.id }">
                                            <ion-icon :icon="download"
                                                style="position: relative; top: .1rem; font-size: 5.336vw;" />
                                        </button>
                                        <button
                                            v-if="get_storeF(message.id).downloaded && get_storeF(message.id)?.src == ''"
                                            class="backbuts is_down"
                                            :class="{ princ: message.user == user?.id, secon: message.user != user?.id }">
                                            <ion-spinner name="crescent" :color="'light'"
                                                style="position: relative; top: 0.552vw;"></ion-spinner>
                                        </button>
                                        <div v-if="get_storeF(message.id)?.src == ''"
                                            :class="{ idic: message.user == user?.id, idic_s: message.user != user?.id }">
                                            {{ get_size(message, 'video') }}
                                        </div>
                                        <button v-if="get_storeF(message.id)?.src != ''"
                                            @click="vOpen = true, urlP = get_storeF(message.id)?.src"
                                            class="backbuts is_down"
                                            :class="{ princ: message.user == user?.id, secon: message.user != user?.id }">
                                            <ion-icon :icon="play"
                                                style="position: relative; top: .1rem; font-size: 5.336vw;" />
                                        </button>
                                    </div>
                                    <div v-else-if="message.audio" class="message_aud" @click="show_details(message.id)"
                                        :key="get_audio_url(message)" :id="`mess:${message.id}`"
                                        :class="{ me_mess: message.user == user?.id, mhas_next: has_next(message) && message.user == user?.id, mhas_prev: has_prev(message) && message.user == user?.id, you_mess: message.user != user?.id, yhas_next: has_next(message) && message.user != user?.id, yhas_prev: has_prev(message) && message.user != user?.id }">

                                        <button class="play_but"
                                            v-if="!get_storeF(message.id) || !get_storeF(message.id)?.downloaded"
                                            :class="{ me_playb: message.user == user?.id, you_playb: message.user != user?.id }"
                                            @click="start_downloading(message)">
                                            <ion-icon :icon="download"
                                                style="position: relative; top: .3.68vw; left: 0.09rem; font-size: 6.44vw; " />
                                        </button>
                                        <button class="play_but "
                                            v-else-if="get_storeF(message.id)?.src == '' && get_storeF(message.id).downloaded"
                                            :class="{ me_playb: message.user == user?.id, you_playb: message.user != user?.id }">
                                            <ion-spinner name="crescent"
                                                :color="message.user == user?.id ? 'primary' : 'light'"
                                                style="position: relative; top: 0.552vw;"></ion-spinner>
                                        </button>
                                        <button class="play_but "
                                            @click.stop="get_audios(message.id)[0]?.player.obj.toogle_playing()"
                                            v-else-if="get_storeF(message.id)?.src != ''"
                                            :class="{ me_playb: message.user == user?.id, you_playb: message.user != user?.id }">
                                            <ion-icon :icon="get_audios(message.id)[0]?.player.is_playing ? pause : play"
                                                style="position: relative; top: .3.68vw; left: 0.09rem; font-size: 6.992vw;" />
                                        </button>
                                        <div @touchstart.stop @touchend.stop class="play_det">
                                            <ion-range @click.stop @ion-knob-move-start="moov_audio.push(message.id)" @ion-knob-move-end="remove_audio_moov(message.id)"       
                                                :value="parseInt(get_audios(message.id)[0] ? get_audios(message.id)[0]?.player.myVal : '0')"
                                                @ion-change.stop="(e) => get_audios(message.id)[0] ? get_audios(message.id)[0]?.player.obj.set_current(e.target.value) : '0'"
                                                :class="{ my_range: message.user == user?.id, your_range: message.user != user?.id }"
                                                mode="md"></ion-range>
                                            <div class="detailss "
                                                :class="{ dme: message.user == user?.id, dyou: message.user != user?.id }">
                                                <div>
                                                    {{ get_audios(message.id)[0]?.player.current_a }}
                                                </div>
                                                <div>
                                                    {{ get_audios(message.id)[0] ? get_audios(message.id)[0]?.player.total_a
                                                        :
                                                        get_size(message, 'audio') }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="message" :id="`mess:${message.id}`" @click="show_details(message.id)"
                                        :class="{ me_mess: message.user == user?.id, mhas_next: has_next(message) && message.user == user?.id, mhas_prev: has_prev(message) && message.user == user?.id, you_mess: message.user != user?.id, yhas_next: has_next(message) && message.user != user?.id, yhas_prev: has_prev(message) && message.user != user?.id }">
                                        {{ message.text }}
                                    </div>
                                </div>
                                <div
                                    :class="{ seen_r: message.user == user?.id, seen_y: message.user != user?.id, hide: !shows.includes(message.id) && message.step != 'waiting', is_seen: message.step == 'seen' }">
                                    {{ get_step(message) }}
                                </div>
                            </div>
                            <!-- <div style="width: 100%;">
                            <div>
                                <div class="date_r">
                                    11 sept. 15:25
                                </div>
                                <div class="message_cont _mee">

                                    <div class="message me_mess mhas_next">
                                        Salut ! Comment allez-vous?
                                    </div>
                                </div>
                                <div class="seen_r">
                                    Vu
                                </div>
                            </div>
                            <div class="message_cont _mee is_prec ">
                                <div class="message me_mess mhas_prev">
                                    J'aimerais bien prendre de vos nouvelles
                                </div>
                            </div>
                            <div>
                                <div class="date_r">
                                    11 sept. 15:25
                                </div>
                                <div class="message_cont ">
                                    <div class="message you_mess">
                                        Ca va! Ca va! Je sens que toi et moi, on va bien s'amuser
                                    </div>
                                </div>
                                <div class="seen_y">
                                    Vu
                                </div>
                            </div>
                            <div class="message_cont _mee ">
                                <div class="immg mhas_next">
                                    <img :src="'../../imgs/test4.jpg'" class="message_img" />

                                    <button v-if="false" class="backbuts princ is_down">
                                        <ion-icon :icon="download"
                                            style="position: relative; top: .1rem; font-size: 5.336vw;" />
                                    </button>
                                    <button v-else class="backbuts princ is_down">
                                        <ion-spinner name="crescent" :color="'light'"
                                            style="position: relative; top: 0.552vw;"></ion-spinner>
                                    </button>
                                    <div class="idic">
                                        998kb
                                    </div>
                                </div>
                            </div>
                            <div class="message_cont _mee is_prec">
                                <div class="immg mhas_prev">
                                    <img :src="'../../imgs/after.jpg'" class="message_img" />

                                    <button v-if="false" class="backbuts princ is_down">
                                        <ion-icon :icon="download"
                                            style="position: relative; top: .1rem; font-size: 5.336vw;" />
                                    </button>
                                    <button v-if="false" class="backbuts princ is_down">
                                        <ion-spinner name="crescent" :color="'light'"
                                            style="position: relative; top: 0.552vw;"></ion-spinner>
                                    </button>
                                    <div v-if="false" class="idic">
                                        998kb
                                    </div>
                                    <button v-if="true" @click="vOpen = true" class="backbuts princ is_down">
                                        <ion-icon :icon="play" style="position: relative; top: .1rem; font-size: 5.336vw;" />
                                    </button>
                                </div>
                            </div>
                            <div class="message_cont ">
                                <div class="message you_mess yhas_next">
                                    You're sooo beautiful! Let me send you mine
                                </div>
                            </div>
                            <div class="message_cont is_prec">
                                <div class="immg_ yhas_prev">
                                    <img :src="'../../imgs/test2.jpg'" class="message_img" />

                                    <button class="backbuts princ_n is_down">
                                        <ion-icon :icon="download"
                                            style="position: relative; top: .1rem; font-size: 5.336vw;" />
                                    </button>
                                </div>
                            </div>
                            <div class="message_cont _mee">
                                <div class="message_aud me_mess">
                                    <button class="play_but me_playb">
                                        <ion-icon :icon="play"
                                            style="position: relative; top: .3.68vw; left: 0.09rem; font-size: 6.992vw; " />
                                    </button>

                                    <div class="play_det">
                                        <ion-range class="my_range" mode="md"></ion-range>
                                        <div class="detailss dme">
                                            <div>
                                                00:00
                                            </div>
                                            <div>
                                                00:45
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="message_cont ">
                                <div class="message_aud you_mess">
                                    <button class="play_but you_playb">
                                        <ion-icon :icon="play"
                                            style="position: relative; top: .3.68vw; left: 0.09rem; font-size: 6.992vw; " />
                                    </button>

                                    <div class="play_det">
                                        <ion-range class="your_range" mode="md"></ion-range>
                                        <div class="detailss dyou">
                                            <div>
                                                00:00
                                            </div>
                                            <div>
                                                00:45
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        </div>
                    </div>
                    <div v-if="rep_mess" class="inpt_cont" style="margin-bottom: -6.5vw ;" >
                        <div class="repl_cont" >
                            <div class="wh_cont"> 
                                <div class="titl_rep" >
                                    Répondre à {{ rep_author(user_from_id(rep_mess.user) as string) }}
                                </div>
                                <div v-if="rep_mess.image"  style="display: flex; align-items: center; "  >
                                    <div class="bg-img" :style="{
                                        backgroundImage: `url('${rep_mess.image.get_image}')` 
                                    }" >

                                    </div> Image
                                </div>
                                <div v-else-if="rep_mess.video"  style="display: flex; align-items: center; "  >
                                    <div class="bg-img" :style="{
                                        backgroundImage: `url('${rep_mess.video.get_preview}')` 
                                    }" >
                  
                                    </div> Video
                                </div>
                                <div v-else-if="rep_mess.audio" class="text_rep " >
                                    <ion-icon :icon="mic"  /> Message audio ({{ rep_mess.audio.get_details[0] }})
                                </div>
                                <div v-else class="text_rep no_two" >
                                    {{ rep_mess.text }}
                                </div>
                            </div>
                        </div>
                        <div class="clos_rep" >
                        	<button @click="cancel_rep()" class="closbuts clos_col transit" >
				    <ion-icon :icon="close" style="position: relative; top: .1rem; font-size: 5.336vw;" />
				</button>
                        </div>
                    </div>
                    <div class="inpt_cont"  >
                        <div id="full_inpt" class="finput">
                            <button @click="mOpen = true" class="backbuti">
                                <ion-icon :icon="addCircle" style="position: relative; top: .1rem; font-size: 5.888000000000001vw; " />
                            </button>
                            <div @input="set_text" contenteditable class="rinput" id="champ"
                                data-placeholder="Ecrivez ici...">

                            </div>
                        </div>
                        <button @click="rOpen = true" class="backbuts princ transit" :class="{ hide: text != '' }">
                            <ion-icon :icon="mic" style="position: relative; top: .1rem; font-size: 5.336vw;" />
                        </button>
                        <button
                            @click="create_message(text, undefined, 'txt', undefined, undefined), text = '', clean_text()"
                            class="backbuts princ transit" :class="{ hide: text == '' }">
                            <ion-icon :icon="paperPlane" style="position: relative; top: .1rem; font-size: 5.336vw;" />
                        </button>
                    </div>
                    <button v-if="new_but" @click="scroll_bot('messages_container')" class="new_but">
                        <ion-icon :icon="chevronDown" style="font-size: 20px; position : relative; top: 2px;" />
                    </button>
                    <div v-show="false">
                        <photo-provider>
                            <photo-consumer v-for="img in all_images.concat(get_room_you(room).get_picture)" :key="img.id" :intro="'Celibapps'" :src="img.url">
                                <img :src="img.url" :id="img.id + ':img'" style="width: 40vw;" class="view-box" />
                                <img :id="'prof:' + get_room_you(room).id" :src="get_room_you(room).get_picture" style="width: 40vw;" />
                            </photo-consumer>
                        </photo-provider>
                    </div>
                </div>
                <div v-else class="global_spinner">
                    <div>
                        <ion-spinner name="crescent">

                        </ion-spinner>
                    </div>
                </div>
                <video-player :is-open="vOpen" :url-p="urlP" @close="vOpen = false" />
                
                <more-message :is-open="mOpen" @close="mOpen = false"
                    @done="(e : any) => (mOpen = false, click_id(e + ':inpt'))"></more-message>
                <recorder-comp :is-open="rOpen" @close="rOpen = false" @done="(e : any) => handle_sound(e)" />

                <ion-action-sheet :is-open="aOpen" header="Menu" :buttons="actionSheetButtons"
                    @didDismiss="aOpen = false"></ion-action-sheet>
                <div v-show="false">
                    <input type="file" accept="image/*" id="img:inpt"
                        @change="e => handle_more('img', (e.target as any).files[0])">
                    <input type="file" accept="video/*" id="vid:inpt"
                        @change="e => handle_more('vid', (e.target as any).files[0])">
                    <input type="file" accept="audio/*" id="aud:inpt"
                        @change="e => handle_more('aud', (e.target as any).files[0])">
                </div>
                <ion-toast :isOpen="has_sen" :mode="'ios'" :buttons="toats_buts"
                    :message="'Pour vérifier si un message est vu ou lu, vous pouvez cliquer dessus.'"
                    layout="stacked"></ion-toast>
                <deleted-room v-if="room" :is-open="dOpen" @close="dOpen = false" :you="get_room_you(room)"></deleted-room>
                <abon-limited :is-open="bOpen" @close="bOpen = false"
                    :text="'Vous avez atteint la limite de discussion par jour offerte par votre ticket. Vous ne pouvez entamer une autre discussion.'"></abon-limited>
                <only-verified v-if="room" :is-open="oOpen" @close="oOpen = false"
                    :you="get_room_you(room)"></only-verified>

        </ion-content>
    </ion-page>
</template>

<style scoped>
.no_two {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.bg-img {
    background-position: top center;
    background-size: cover;
    width: 12vw;
    height: 12vw;
    border-radius: 10px;
    margin-right: 2vw;
}
.closbuts {
    width: 9vw;
    height: 9vw;
    min-width: 9vw;
    min-height: 9vw;
    font-size: 6.072vw;
    border-radius: 100%;
    color: white;
    box-shadow: 0 10px 25px -3px #fc1955, 0 4px 6px -2px #f2824129;
}

.clos_col {

  background-color: #ff5959;
  color: white;
  box-shadow: 0 10px 15px -3px #ff595965, 0 4px 6px -2px #17a74929;
}

.clos_rep {
    padding: 0vw 2.5vw;
}

.text_rep {
    padding: .5vw 0vw;
    font-size: 3vw;
}
.titl_rep {
    font-size: 3.2vw;
    font-weight: bold;
    color : #fc1955;
    
}
.wh_cont {
    padding: 2.5vw 3vw;
    background-color: white;
    color: rgb(29, 29, 29);
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
}
.repl_cont {
    padding: 1vw 5vw;
    flex-grow: 1;
}

.can_moov {
    transition: all ease-in-out 0.2s;

}

.respond_but {
    width: 8vw;
    height: 8vw;
    border-radius: 100%;
    font-size: 4vw;
    position: absolute;
    top: calc(50% - 4vw);
    left: 2vw;
}

.butt {
    padding-top: 9.200000000000001vw;
}


*:focus {
    outline: none;
}

.icon_f {
    font-size: 1.2rem;
    margin-right: 1.2rem;
    color: rgb(54, 54, 54);
}

.minput {
    padding: 1.2rem 0.4rem;
    display: flex;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: rgb(179, 179, 179);
    border-bottom-style: solid;
}

.forms {
    padding-top: 7.36vw;
}

.is_vip {
    position: relative;
    bottom: .3.68vw;
}

.success {
    background-color: rgb(19, 182, 19) !important;
    color: white;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
}

.secon {
    background-color: rgb(29, 29, 29) !important;
    color: white !important;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    box-shadow: 0 10px 25px -3px rgb(29, 29, 29), 0 4px 6px -2px #f2824129 !important;
}

.sp_cont {
    display: flex;
    padding: 3.68vw 3.68vw;
    justify-content: space-around;
}

.new_but:active {
    box-shadow: none;
}

.new_but {
    width: 35px;
    height: 35px;
    border-radius: 100%;
    position: absolute;
    bottom: 25.76vw;
    right: 7.36vw;
    color: white;
    background-color: green;
    box-shadow: 0 10px 25px -3px green, 0 4px 6px -2px #f2824129;
}

.date_b {
    padding-bottom: 2.208vw !important;
}

.hide {
    display: none;
}

.niv_text {
    transition: all 0.2s ease-in-out;
}

.global_spinner {
    padding-top: 84.64vw;
    display: flex;
    justify-content: space-around;
}

.princ_n:active {
    background: linear-gradient(to left, rgba(29, 29, 29, 0.527), transparent);
    background-color: rgb(29, 29, 29);
}

.princ_n {
    background: linear-gradient(to left, rgba(29, 29, 29, 0.521), transparent);
    background-color: rgb(29, 29, 29);
    color: white;
}

.idic_s {
    position: absolute;
    bottom: -0.36800000000000005vw;
    right: -0.92vw;
    font-size: 3.3120000000000003vw;
    padding: 1.104vw 1.84vw;
    border-radius: 10px;
    background-color: rgb(29, 29, 29);
    color: white;
}

.idic {
    position: absolute;
    bottom: -0.36800000000000005vw;
    right: -0.92vw;
    font-size: 3.3120000000000003vw;
    padding: 1.104vw 1.84vw;
    border-radius: 10px;
    background-color: #fc1955;
    color: white;
}

.immg_ {
    border-width: 6px;
    border-radius: 10px;
    border-style: solid;
    position: relative;
    border-color: rgb(29, 29, 29);
}

.immg {
    border-width: 6px;
    border-color: #fc1955;
    border-radius: 10px;
    border-style: solid;
    position: relative;
}

.img_mes {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
    width: 100%;
    height: 100%;
    max-width: 70vw;

}

.transit {
    transition: all 0.5s ease-in-out;
}

.is_seen {
    color: green !important;
}

.seen_y {
    padding-left: 3.68vw;
    font-size: 3.3120000000000003vw;
    color: gray;
    padding-bottom: 2.7600000000000002vw;


}

.seen_r {
    padding-right: 3.68vw;
    font-size: 3.3120000000000003vw;
    color: gray;
    text-align: right;
    padding-bottom: 2.7600000000000002vw;
}

.date_r {
    padding: 0.36800000000000005vw 1.84vw;
    text-align: center;
    font-size: 3.68vw;
    color: gray;
}

.mhas_next {
    border-bottom-right-radius: 0px !important;
}

.yhas_next {
    border-bottom-left-radius: 0px !important;
}

.mhas_prev {
    border-top-right-radius: 0px !important;
}

.yhas_prev {
    border-top-left-radius: 0px !important;
}

.dyou {
    color: rgb(29, 29, 29);
}

.dme {

    color: white;
}

.detailss {
    margin-top: -2.208vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 3.3120000000000003vw;
}

.your_range {
    --bar-background: rgba(29, 29, 29, 0.377);
    --bar-background-active: rgb(29, 29, 29);
    --knob-background: rgb(29, 29, 29);
}

.my_range {
    --bar-background: rgba(255, 255, 255, 0.377);
    --bar-background-active: white;
    --knob-background: white;
}

.you_playb {
    background-color: rgb(29, 29, 29);
    color: white;
}

.me_playb {
    background-color: white;
    color: #fc1955;
}

.play_det {
    flex-grow: 1;
    padding-left: 3.68vw;
}

.play_but {
    width: 11.040000000000001vw;
    height: 11.040000000000001vw;
    min-width: 11.040000000000001vw;
    min-height: 11.040000000000001vw;
    border-radius: 50%;
}

.message_aud {
    padding: 1.84vw 2.3920000000000003vw;
    display: flex;
    align-items: center;
    border-radius: 15px;
    width: 60vw;
}

.message_img {
    max-width: 50vw;
    max-height: 92.0vw;
}

.you_mess_r {
    color: rgb(29, 29, 29);
    background-color: rgb(245, 243, 243);
    padding-bottom: 1.3vw !important;
}

.me_mess_r {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.322), transparent);
    background-color: #fdbecf;
    color: rgb(100, 100, 100);
    padding-bottom: 1.3vw !important;
}

.you_mess:active {
    background-color: rgb(184, 184, 184);
}

.you_mess {
    color: rgb(29, 29, 29);
    background-color: rgb(230, 230, 230);
}

.is_prec {
    margin-top: -2.9440000000000004vw !important;
}

.me_mess:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.527), transparent);
    background-color: #fc1955;
    color: white;
}

.me_mess {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.322), transparent);
    background-color: #fc1955;
    color: white;
}

.message {
    padding: 1.84vw 2.3920000000000003vw;
    border-radius: 15px;
    min-width: 10vw;
    width: max-content;
    max-width: 79vw;
    font-size: 3.68vw;
}

._mee {
    justify-content: flex-end;
}

.great_messages {
    margin-right: -5.5200000000000005vw;
    margin-left: -5.5200000000000005vw;
}


.message_cont {
    display: flex;
    padding: 1.84vw 2.7600000000000002vw;

}

*::-webkit-scrollbar {
    display: none;
}

*:focus {
    outline: none;
}

.rinput:empty::before {
    content: attr(data-placeholder);
    color: rgba(29, 29, 29, 0.616);
}

.rinput {
    flex-grow: 1;
    width: 100%;
    max-width: 65vw;
    max-height: 22.080000000000002vw;
    height: max-content;
    font-size: 3.68vw;
    padding-top: 2.9440000000000004vw;
    padding-bottom: 2.9440000000000004vw;
    padding-right: 1.4720000000000002vw;
    overflow-y: scroll;
}

.finput {
    flex-grow: 1;
    display: flex;
    border-radius: 40px;
    background-color: white;
    color: rgb(29, 29, 29);
    margin-right: 0.6rem;
}

.inpt_cont {
    padding: 3.3120000000000003vw 2.7600000000000002vw;
    display: flex;
    align-items: center;
    max-width: 100%;
}

.des_m {
    text-align: center;
    font-size: 4.6000000000000005vw;
    line-height: 5.98vw;
    padding-top: 0.0vw;
    color: rgb(29, 29, 29);
}

.text_all {
    transform: translateY(-23.92vw);
}

.text_m {
    text-align: center;
    font-size: 8.648000000000001vw;
    font-weight: bold;
    color: #fc1955;
}

.sphot {
    transform: translateX(-0.92vw);
}

.fphot {
    transform: translateX(0.92vw);
}

.phot {
    width: 27.6vw;
    height: 27.6vw;
    min-width: 27.6vw;
    min-height: 27.6vw;
    border-radius: 100%;
    background-size: cover;
    background-position: top center;
}

.phots_cont {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-30.268vw);
}

.scir {
    transform: translateX(-3.68vw);
}

.fcir {
    transform: translateX(3.68vw);
}

.circle_b {
    width: 27.6vw;
    height: 27.6vw;
    min-height: 27.6vw;
    min-width: 27.6vw;
    border-width: 2.7600000000000002vw;
    border-style: solid;
    border-color: #fc1955;
    border-radius: 100%;
    box-sizing: content-box;
}

.circle_cont {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 16.560000000000002vw;
}

.messages_cont {
    width: 100%;
    padding: 6.44vw 5.5200000000000005vw;
    background-color: white;
    color: rgb(51, 51, 51);
    border-radius: 25px;
    flex-grow: 1;
    overflow-y: scroll;
    transition: all 0.8ms ease-in-out;
    position: relative;
}

.princ:active {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.527), transparent);
    background-color: #fc1955;
}

.princ {
    background: linear-gradient(to left, rgba(255, 255, 255, 0.336), transparent);
    background-color: #fc1955;
    color: white;
}

.fancybut {
    margin-right: 0.6rem;
    padding: 1.84vw 1.84vw;
    font-family: 'PT Serif', serif;
    border-radius: 7px;
    width: 100%;
    font-size: 3.68vw;
    font-weight: bold;
}

.bdy_ai {
    padding-top: .9.200000000000001vw;
    padding-bottom: 1.84vw;
    font-size: 3.8640000000000003vw;
    font-weight: bold;
    color: white;
}

.title_ai {
    font-size: 3.3120000000000003vw;
    font-weight: bold;
    color: white;
}

.header_ai {
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.ai_cont {
    padding: 1.84vw 3.68vw;
    background-color: rgb(51, 51, 51);
    border-radius: 15px;
}

.ai_tool {
    padding: 1.84vw 2.7600000000000002vw;
}

.namm {
    font-weight: bold;
    color: white;
    font-size: 4.048000000000001vw;
    font-family: 'PT Serif', serif;
}

.online {
    width: 3.68vw;
    height: 3.68vw;
    min-width: 3.68vw;
    min-height: 3.68vw;
    border-radius: 100%;
    background-color: rgb(36, 221, 36);
    color: white;
    position: absolute;
    bottom: 0%;
    right: 0%;
    border-width: 3px;
    border-color: rgb(29, 29, 29);
    border-style: solid;
}

.imgtop {
    width: 8.280000000000001vw;
    height: 8.280000000000001vw;
    min-width: 8.280000000000001vw;
    min-height: 8.280000000000001vw;
    border-radius: 100%;
    background-size: cover;
    background-position: top center;
    margin-right: 0.5rem;
    position: relative;
}

.yprofil {
    display: flex;
    align-items: center;
}

.backbut:active {
    background-color: rgba(255, 255, 255, 0.24);
}

.backbuto {
    width: 7.36vw;
    height: 7.36vw;
    min-width: 7.36vw;
    min-height: 7.36vw;
    font-size: 4.048000000000001vw;
    border-radius: 100%;
}

.is_down {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -5.5200000000000005vw;
    margin-left: -5.5200000000000005vw;
}

.backbuts {
    width: 11.040000000000001vw;
    height: 11.040000000000001vw;
    min-width: 11.040000000000001vw;
    min-height: 11.040000000000001vw;
    font-size: 6.072vw;
    border-radius: 100%;
    color: white;
    box-shadow: 0 10px 25px -3px #fc1955, 0 4px 6px -2px #f2824129;
}

.backbuti:active {
    background-color: rgb(29, 29, 29);
    color: white;
}

.backbuti {
    width: 11.040000000000001vw;
    height: 11.040000000000001vw;
    min-width: 11.040000000000001vw;
    min-height: 11.040000000000001vw;
    font-size: 6.072vw;
    border-radius: 100%;
    background-color: transparent;
    color: rgb(29, 29, 29);
}

.backbut {
    width: 11.040000000000001vw;
    height: 11.040000000000001vw;
    min-width: 11.040000000000001vw;
    min-height: 11.040000000000001vw;
    font-size: 6.072vw;
    border-radius: 100%;
    background-color: transparent;
    color: white;
}

.first_tool {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.84vw 4.6000000000000005vw;

}

.body_all_r {
    width: 100%;
    height: 100vh;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: rgb(29, 29, 29);
    font-family: 'Poppins', serif;
}
</style>

<script setup lang="ts" >

import VideoPlayer from "@/VideoPlayer.vue";
import { useUserStore } from "@/global/pinia";
import { Message, Room, AudioPlaying, AudioPlayer, Image, Audi, Video, Launcher, ReplyMess } from "@/global/types";
import { format_date, is_online, show_warn, toDate, generateUniqueFileName, show_alert, generateNegativeRandomNumber, formatBlobSize, extract_frames, access_tok, copierTexteDansPressePapiers, presentToast, scroll_bot, isScrolled, formatOnline, store_obj, remove_obj, get_obj } from "@/global/utils";
import { IonPage, IonContent, IonIcon, IonRange, IonSpinner, ActionSheetButton, onIonViewWillEnter, IonToast, ToastButton, IonPopover, IonActionSheet } from "@ionic/vue"
import { add, addCircle, arrowBack, camera, caretDown, filter, heart, help, information, mic, paperPlane, play, reload, trash, download, pause, caretUp, copy, close, chevronDown, checkmark, arrowForward, diamond, arrowUndo, image } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { computed, ref, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Capacitor } from "@capacitor/core"
import { Filesystem, Directory } from "@capacitor/filesystem"
import writer_blob from "capacitor-blob-writer"
import axios from "axios";
import MoreMessage from "@/components/MoreMessage.vue";
import { showLoading } from "@/global/utils";
import { StoreFiles, get_time_format } from "@/global/types";
import RecorderComp from "@/components/RecorderComp.vue";
import Typed from 'typed.js'
import DeletedRoom from "@/components/DeletedRoom.vue";
import OnlyVerified from "@/components/OnlyVerified.vue";
import AbonLimited from "@/components/AbonLimited.vue";
import UserBadge from "@/components/UserBadge.vue";
import { StatusBar } from "@capacitor/status-bar";
import { Keyboard } from "@capacitor/keyboard"
import Hammer from "hammerjs"

const dOpen = ref(false)
const oOpen = ref(false)
const bOpen = ref(false)
const rOpen = ref(false)
const mOpen = ref(false)
const vOpen = ref(false)
const slug = ref('')
const loadin = ref(false)
const is_over = ref(false)
const lvl = ref(0)
watch(lvl, (newl, oldl) => {
    loadin.value = true
    set_messages()
    loadin.value = false
})
const route = useRoute()
const _userStore = useUserStore()
const userStore = storeToRefs(_userStore)
const { get_room_messages, get_room_, delete_room, next_niveau, add_store, send, delete_message, find_next, f_url, send_state } = _userStore
const { user, storeFs, all_mess, charged_files, audios, launchers, l_accepted, l_refused, has_sen, state_obj, only_verified, day_discuss, day_mess, rooms } = userStore
const new_but = ref(false)
const oldM = ref<Message>()
const messages = ref<Message[]>([])
watch(messages, (newm, oldm) => {
    console.log('changed....')
    if (oldM.value && newm.length) if (newm[newm.length - 1].old_pk != oldM.value.old_pk) setTimeout(() => {
        console.log('resizing...')
        if (isScrolled("messages_container")) {
            nextTick(() => {
                scroll_bot("messages_container")
            })
        }
        else {
            new_but.value = true
        }
    }, 300)
    setTimeout(() => {
        for (const m of newm) {
            if (!del_enable.value.includes(m.id)) enable_message(m)
        }
    }, 700)
    const mnot_seens = newm.filter(e => e.user != user.value?.id).filter(e => e.step != 'seen')
    for (const m of mnot_seens) {
        send(JSON.stringify({
            type: 's_s',
            result: m.id
        }))
    }
    oldM.value = newm[newm.length - 1]
}, { deep: true })
const room_ = ref<Room>()
const room = computed(() => {
    if(slug.value) return rooms.value.filter(e => e.slug == slug.value)[0]
})
const router = useRouter()
const hOpen = ref(false)
const hidden = ref(false)
watch(hidden, (newh, oldh) => {
    if (newh) store_obj('hidden:ai:' + slug.value, 'yes')
    else remove_obj('hidden:ai:' + slug.value)
})

const shows = ref<number[]>([])

const messages_id = computed(() => {
    const pks = [] as number[]
    for (const mess of messages.value) {
        pks.push(mess.id)
    }
    return pks
})
const wait = ref(false)

const storeF = computed(() => {

    return storeFs.value.filter(e => messages_id.value.includes(e.id))
})
watch(storeF, (newf, oldf) => {
    for (const stF of newf)
        if (stF.path != '' && !charged_files.value.includes(stF.path)) {
            if (Capacitor.getPlatform() === "web") {

                // On the web platform, begin by reading the file.

                Filesystem.readFile({
                    path: stF.path,
                    directory: Directory.Data
                }).then(function ({ data }) {

                    // For files written in Fast mode, the data is retrieved as a Blob. This is not
                    // true of files written using Filesystem.writeFile, where the data is
                    // retrieved as a string. A URL is created from the Blob.

                    const url = URL.createObjectURL(data as Blob);
                    stF.src = url;
                    charged_files.value.push(stF.path)
                    if (stF.obj) {
                        if (stF.obj.typ == 'audio') {
                            const audP = get_audio(stF.id)
                            if (!audP) {
                                const audio: { id: number, player: AudioComp } = {
                                    id: stF.id,
                                    player: {
                                        is_playing: false,
                                        current_a: '00:00',
                                        total_a: '00:00',
                                        myVal: '0',
                                        audio: new Audio(),
                                        obj: null
                                    }
                                }

                                audios.value.push(audio)
                                const index = get_audio_index(audio.id)
                                audios.value[index].player.obj = new AudPlayer2(stF.src, stF.obj.size, index)
                            }
                        }
                    }

                });
            } else {

                // It is much easier to get a URL on iOS and Android.

                Filesystem.getUri({
                    path: stF.path,
                    directory: Directory.Data
                }).then(function ({ uri }) {
                    stF.src = Capacitor.convertFileSrc(uri);
                    charged_files.value.push(stF.path)
                    if (stF.obj) {
                        if (stF.obj.typ == 'audio') {
                            const audP = get_audio(stF.id)
                            if (!audP) {
                                const audio: { id: number, player: AudioComp } = {
                                    id: stF.id,
                                    player: {
                                        is_playing: false,
                                        current_a: '00:00',
                                        total_a: '00:00',
                                        myVal: '0',
                                        audio: new Audio(),
                                        obj: null
                                    }
                                }

                                audios.value.push(audio)
                                const index = get_audio_index(audio.id)
                                audios.value[index].player.obj = new AudPlayer2(stF.src, stF.obj.size, index)
                            }
                        }
                    }
                });
            }
            if (stF.obj) {

                if (stF.obj) {
                    if (stF.obj.typ == 'video' && stF.obj.path != '' && !charged_files.value.includes(stF.obj.path)) {
                        if (Capacitor.getPlatform() === "web") {

                            // On the web platform, begin by reading the file.

                            Filesystem.readFile({
                                path: stF.obj.path,
                                directory: Directory.Data
                            }).then(function ({ data }) {

                                // For files written in Fast mode, the data is retrieved as a Blob. This is not
                                // true of files written using Filesystem.writeFile, where the data is
                                // retrieved as a string. A URL is created from the Blob.

                                const url = URL.createObjectURL(data as Blob);
                                stF.obj.src = url;
                                charged_files.value.push(stF.obj.path)

                            });
                        } else {

                            // It is much easier to get a URL on iOS and Android.

                            Filesystem.getUri({
                                path: stF.obj.path,
                                directory: Directory.Data
                            }).then(function ({ uri }) {
                                stF.obj.src = Capacitor.convertFileSrc(uri);
                                charged_files.value.push(stF.obj.path)
                            });
                        }
                    }
                }
            }

        }
}, { deep: true })
const downloadPer = ref<{
    id: number,
    percent: number
}[]>([])
const urlP = ref('')



const text = ref('')

const set_text = (e: any) => {
    text.value = e.target.innerText;
}

const get_audio = (id: number) => {
    if (audios.value.filter(e => e.id == id)[0]) return audios.value.filter(e => e.id == id)[0]
    else {
        const mes = messages.value.filter(e => e.id == id)[0]
        return audios.value.filter(e => e.id == mes.old_pk)[0]
    }
}

const get_audios = (id: number) => {
    if (audios.value.filter(e => e.id == id)[0]) return audios.value.filter(e => e.id == id)
    else {
        const mes = messages.value.filter(e => e.id == id)[0]
        return audios.value.filter(e => e.id == mes.old_pk)
    }
}


const get_downPer = (id: number) => {
    return downloadPer.value.filter(e => e.id == id)[0]
}

const get_storeF = (id: number) => {
    return storeF.value.filter(e => e.id == id)[0]
}

const get_room_you = (room: Room) => {
    return room.users.filter(e => e.id != user.value?.id)[0]
}
const set_messages = () => {
    messages.value = messages.value.concat(get_room_messages(slug.value, lvl.value))


}

const set_slug = () => {
    const slug_ = route.params['id'] as string
    slug.value = slug_ as string
}

nextTick(() => {
    setTimeout(() => {
        scroll_bot("messages_container")
        enable_scroll("messages_container")
    }, 100)

    setTimeout(() => {
        const elt = document.getElementById('niv_text')
        if (elt) {
            const typed = new Typed(elt, {
                strings: [conversation_text.value],
                typeSpeed: 80,
            })
        }
    }, 900)
})

set_slug()
set_messages()

const warn_delete = () => {
    show_warn('Confirmer la suppression', "Voulez-vous vraiment supprimer cette discussion. Cette action est irréversible", "Oui", delete_room, room.value?.id)
}

const find_index = (messag: Message) => {
    let i = 0;
    for (const m of messages.value) {
        if (m.id == messag.id) break;
        i++;
    }
    return i
}

const has_prev = (messag: Message) => {
    const i = find_index(messag)
    return messages.value[i - 1] ? (messages.value[i - 1].user == messag.user ? true : false) : false
}

const has_next = (messag: Message) => {
    const i = find_index(messag)
    return messages.value[i + 1] ? (messages.value[i + 1].user == messag.user ? true : false) : false
}

const get_image_url = (mess: Message) => {
    let stored = get_storeF(mess.id)
    if (!stored) stored = add_store(mess.id)
    if (stored.src == '') return mess.image?.get_preview;
    else return stored.src
}

const get_audio_url = (mess: Message) => {
    let stored = get_storeF(mess.id)
    if (!stored) stored = add_store(mess.id)
    return 0
}

const get_download_url = (m: Message) => {
    if (m.image) return m.image.get_image
    else if (m.audio) return m.audio.get_audio
    else if (m.video) return m.video.get_video
}

const get_mtyp = (m: Message) => {
    if (m.image) return 'image'
    else if (m.audio) return 'audio'
    else if (m.video) return 'video'
}

const start_downloading = async (messag: Message) => {
    get_storeF(messag.id).downloaded = true
    let dP = get_downPer(messag.id)
    if (!dP) downloadPer.value.push({
        id: messag.id,
        percent: 0
    })

    const url = get_download_url(messag)

    const resp = await axios({
        url,
        method: "GET",
        responseType: "blob",
        onDownloadProgress: (ev) => {
            if (ev.total)
                get_downPer(messag.id).percent = Math.round(
                    (ev.loaded * 100) / ev.total
                );
        },
    });
    const blob = resp.data as Blob
    const path = 'medias/' + get_mtyp(messag) + 's/' + generateUniqueFileName()

    try {
        const writer = await writer_blob({
            path,
            directory: Directory.Data,
            blob,
            fast_mode: true,
            recursive: true,
        })
        if (messag.audio) {
            get_storeF(messag.id).obj = {
                typ: 'audio',
                size: messag.audio.get_details[1]
            }
        }
        if (messag.video) {
            const vid_obj = {
                typ: 'video',
                path: '',
                src: ''
            }
            const vpath = 'medias/videos/preview/' + generateUniqueFileName()

            const blob: Blob = (await axios({
                url: messag.video.get_preview,
                method: "GET",
                responseType: "blob",
            })).data
            await writer_blob({
                path: vpath,
                directory: Directory.Data,
                blob,
                fast_mode: true,
                recursive: true,
            })
            vid_obj.path = vpath
            get_storeF(messag.id).obj = vid_obj
        }
        get_storeF(messag.id).path = path
    } catch (e) {
        console.log(e)
        show_alert('', "Une erreur est survenue lors de l'ecriture du fichier, Veuillez réessayer")
        get_storeF(messag.id).downloaded = false
    }
}

const get_size = (m: Message, typ: 'image' | 'video' | 'audio') => {
    if (!get_storeF(m.id)?.downloaded) return m[typ]?.get_details[0]
    else {
        if (get_downPer(m.id))
            return get_downPer(m.id).percent + '%';
        else typ
    }
}

const is_first = (m: Message) => {

    return m.id == messages.value[0].id

    /* return messages.value.filter(e => {
        const dt = toDate(e.created_at)
        const mdt = toDate(mess_all.value[0].created_at)
        return dt.getFullYear() == mdt.getFullYear() && dt.getMonth() == mdt.getMonth() && dt.getDate() == mdt.getDate()
    }).sort((a, b) => (toDate(a.created_at).getTime() - toDate(b.created_at).getTime()))[0].id == m.id */
}

const get_step = (m: Message) => {
    if (m.step == 'sent') return 'Envoyé'
    else if (m.step == 'delivered') return 'Reçu'
    else if (m.step == 'seen') return 'Vu'
    else return 'En attente...' + (percent.value == '100%' ? '99%' : percent.value)
}

const get_video_url = (m: Message) => {
    let stored = get_storeF(m.id)
    if (!stored) stored = add_store(m.id)
    if (stored.obj.src == '') return m.video?.get_preview
    else return get_storeF(m.id).obj.src
}

const handle_more = (typ: string, file: File, size?: string) => {
    if (typ == 'img') {
        create_message(undefined, file, 'img', undefined, undefined)
    } else if (typ == 'aud') {
        create_message(undefined, file, 'aud', undefined, size ? size : "00:00")
    } else if (typ == 'vid') {
        const start_creating = (b: Blob | null) => {
            create_message(undefined, file, 'vid', b as Blob, undefined)
        }
        extract_frames(file, start_creating, 5, false)
    }
}

const click_id = (id: string) => {
    document.getElementById(id)?.click()
}

const write_file = async (path: string, blob: Blob) => {
    await writer_blob({
        path,
        directory: Directory.Data,
        blob,
        fast_mode: true,
        recursive: true,
    })
}
const percent = ref("0%")

const get_day_string = (dt: Date) => {
    return `${dt.getFullYear()}:${dt.getMonth() + 1}:${dt.getDate()}`
}
const check_state = () => {
    if (!user.value) return 'on'
    if (user.value.get_status == 'free' && only_verified.value.includes(get_room_you(room.value as Room).id)) {
        return 'verified'
    }
    if (!day_mess.value[get_day_string(new Date())]) {
        day_mess.value[get_day_string(new Date())] = []
    }
    if (day_mess.value[get_day_string(new Date())].length >= day_discuss.value[user.value.get_status]) return 'limited'
    return 'on'

}

const send_message = async (typ: string, m: Message, blob?: Blob, preview?: Blob) => {
    percent.value = "0%"
    state_obj.value = {
        state: 'on',
        target: 0,
        old_pk: 0
    }
    
    if (typ == 'txt') {
        send(JSON.stringify({
            type: 'c_m',
            result: m,
            state: state_obj.value.state
        }))
        percent.value = "100%"
    } else {
        const form = new FormData()
        if (blob) form.append('blob', blob)
        if (preview) form.append('preview', preview)
        form.append('message', JSON.stringify(m))
        form.append('typ', typ)
        form.append('state', state_obj.value.state)

        const resp = await axios.post('api/create_message/', form, {
            headers: {
                Authorization: `Bearer ${await access_tok(router, undefined)}`,
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (ev) => {
                if (ev.total) percent.value = Math.round(ev.loaded / ev.total * 100) + "%";
            },
        })
    }
}

const create_message = async (text?: string, blob?: Blob, typ?: string, preview?: Blob, tim?: string) => {
    
    const state = send_state(undefined, room.value?.slug as string)
    if(state == 'limited') {
        return bOpen.value = true
    }

    const load = typ == 'txt' ? undefined : (await showLoading('Enregistrement...'))
    const old_pk = Math.floor(generateNegativeRandomNumber(10000000000))
    const message: Message = {
        id: old_pk,
        get_room: room.value?.id as number,
        created_at: (new Date()).toISOString(),
        step: 'waiting',
        user: user.value?.id as number,
        text: null,
        audio: null,
        image: null,
        video: null,
        old_pk,
    }
    if(rep_mess.value) {
        message.get_reply = JSON.stringify({
            author : rep_mess.value.user,
            typ : get_mtyp(rep_mess.value) ? get_mtyp(rep_mess.value) : 'text',
            content : rep_content(rep_mess.value)
        })
    }
    if (typ == 'txt') {
        message.text = text as string

        try {
            send_message('txt', message)
            messages.value.push(message)
        } catch (e) {

        }

    } else if (typ == 'img') {
        const url = URL.createObjectURL(blob as Blob)
        const imag: Image = {
            id: old_pk,
            name: 'img',
            get_image: url,
            get_preview: url,
            get_details: [formatBlobSize(blob as Blob)]
        }
        message.image = imag
        const path = 'medias/me/image/' + generateUniqueFileName()
        try {
            await write_file(path, blob as Blob)
            const stF: StoreFiles = {
                id: old_pk,
                path,
                src: '',
                downloaded: true,
                obj: null
            }
            storeFs.value.push(stF)
            send_message('img', message, blob)
            messages.value.push(message)
        } catch (e) {
            show_alert('', "Une erreur est survenue lors de l'envoi du message veuillez reéssayer.")
        }
    } else if (typ == 'aud') {
        const url = URL.createObjectURL(blob as Blob)
        const audi: Audi = {
            id: old_pk,
            name: 'aud',
            get_audio: url,
            get_details: [formatBlobSize(blob as Blob), tim]
        }
        message.audio = audi
        const path = 'medias/me/audio/' + generateUniqueFileName()
        try {
            await write_file(path, blob as Blob)
            const stF: StoreFiles = {
                id: old_pk,
                path,
                src: '',
                downloaded: true,
                obj: {
                    typ: 'audio',
                    size: (tim != '00:00' && (!!tim)) ? tim : formatBlobSize(blob as Blob)
                }
            }
            storeFs.value.push(stF)
            send_message('aud', message, blob)
            messages.value.push(message)
        } catch (e) {
            show_alert('', "Une erreur est survenue lors de l'envoi du message veuillez reéssayer.")
        }
    } else if (typ == 'vid') {
        const url = URL.createObjectURL(blob as Blob)
        const p_url = URL.createObjectURL(preview as Blob)
        const vid: Video = {
            id: old_pk,
            name: typ,
            get_video: url,
            get_details: [formatBlobSize(blob as Blob)],
            get_preview: p_url
        }
        message.video = vid
        const path = 'medias/me/video/' + generateUniqueFileName()
        const vpath = 'medias/me/video/preview/' + generateUniqueFileName()
        try {
            await write_file(path, blob as Blob)
            await write_file(vpath, preview as Blob)
            const stF: StoreFiles = {
                id: old_pk,
                path,
                src: '',
                downloaded: true,
                obj: {
                    typ: 'video',
                    path: vpath,
                    src: ''
                }
            }
            storeFs.value.push(stF)
            send_message('vid', message, blob, preview)
            messages.value.push(message)
        } catch (e) {
            show_alert('', "Une erreur est survenue lors de l'envoi du message veuillez reéssayer.")
        }
    }
    load?.dismiss()

}

const show_details = (id: number) => {
    if (shows.value.includes(id)) shows.value = shows.value.filter(e => e != id)
    else {

        shows.value.push(id)
        setTimeout(() => {
            shows.value = shows.value.filter(e => e != id)
        }, 5000)
    }
}

const cur_mess = ref()
const aOpen = ref(false)

const del_enable = ref<number[]>([])
const actionSheetButtons: ActionSheetButton[] = [
    {
        text: 'Supprimer pour moi',
        icon: trash,
        handler: () => {
            delete_message(cur_mess.value, 'me')
            const aud = get_audio(cur_mess.value)
            if (aud) {
                if (aud.player.is_playing) aud.player.obj?.toogle_playing()
            }
        }
    },
    {
        text: 'Supprimer pour tous',
        icon: close,
        handler: () => {
            const mes = messages.value.filter(e => e.id == cur_mess.value)[0]
            if (mes.user != user.value?.id) return show_alert('Impossible de supprimer', 'Vous ne pouvez que supprimer les messages que vous avez ecrit pour tout le monde.')
            delete_message(cur_mess.value, 'all')
            const aud = get_audio(cur_mess.value)
            if (aud) {
                if (aud.player.is_playing) aud.player.obj?.toogle_playing()
            }
        }
    },
    {
        text: 'Copier le texte',
        icon: copy,
        handler: () => {
            const mess = messages.value.filter(e => e.id == cur_mess.value)[0]
            if (mess.text) {
                copierTexteDansPressePapiers(mess.text)
                presentToast("bottom", 'Texte copié avec succès.', 'success', 2000)
            }
        }
    },
];

const show_rep = ref(false)
const is_mooving = ref(false)
const replying = ref(true)
const rep_mess = ref<Message>()
const moov_audio = ref<number[]>([])

const enable_message = (mess: Message, time = 1) => {
    const cont_mess = document.getElementById(`cmess:${mess.id}`)
    const mess_d = document.getElementById(`mess:${mess.id}`)
    let has_ended = false
    if (!mess_d || !cont_mess) {
        if (time <= 10) setTimeout(() => {
            enable_message(mess, time + 1)
        }, 300)
    }
    else {
        mess_d.addEventListener('touchstart', (e) => {
            setTimeout(() => {
                if (has_ended ) return;
                if(!is_mooving.value) {
                	cur_mess.value = mess.id
		        aOpen.value = true
		        has_ended = false
                }
            }, 900)
        })
        mess_d.addEventListener('touchend', (e) => {
            has_ended = true
            setTimeout(() => {
                has_ended = false
            }, 1000)
        })
        const contObj = new Hammer(cont_mess)
        contObj.on('pan', (ev) => {
            cont_mess.classList.remove('can_moov')
            const dx = ev.deltaX
            if(!moov_audio.value.includes(mess.id)) {
                show_rep.value = Math.abs(dx) > 30
            is_mooving.value = true;

            if(Math.abs(dx) < 60 ) cont_mess.style.transform = 'translateX(' + dx + 'px' + ')';
            }
            

            if(ev.isFinal && !moov_audio.value.includes(mess.id)) {
                if(show_rep.value) replying.value = true, show_rep.value = false, rep_mess.value = mess
                is_mooving.value = false
                cont_mess.classList.add('can_moov');
                cont_mess.style.transform = 'translateX(' + 0 + 'px' + ')';
            }
        })

    }
    del_enable.value.push(mess.id)
}
const mess_all = computed(() => {
    return all_mess.value.filter(e => e.get_room == room.value?.id).sort((a, b) => toDate(b.created_at).getTime() - toDate(a.created_at).getTime()).reverse()
})

watch(mess_all, (newa, olda) => {

    messages.value = newa.slice(lvl.value * 60 + (lvl.value ? 1 : 0), (lvl.value + 1) * 60)
}, {
    deep: true
})

const clean_text = () => {
    const champ = document.getElementById('champ')
    if (champ) {
        champ.innerText = ''
    }
}

const enable_scroll = (id: string) => {
    const elt = document.getElementById(id)
    if (elt) {
        elt.addEventListener('scroll', (e) => {

            if ((elt.scrollHeight - elt.scrollTop - elt.clientHeight) <= 20) {
                new_but.value = false
            }

            if (elt.scrollTop <= 5) {
                if (!is_over.value) add_new_messages()
            }
        })
    }
}

const add_new_messages = () => {
    loadin.value = true
    const mess = find_next(slug.value, messages.value[0].id)
    if (mess.length < 10) is_over.value = true
    messages.value = mess.reverse().concat(messages.value)
    loadin.value = false

}

const all_images = computed(() => {
    const images_mes = messages.value.filter(e => e.image)
    const ls = [] as any[]
    for (const m of images_mes) {
        ls.push({
            id: m.id,
            url: get_image_url(m)
        })
    }
    return ls
})

const loadeds = ref<number[]>([])

const get_audio_index = (id: number) => {
    let i = 0;
    for (const aud of audios.value) {
        if (aud.id == id) return i;
        i++;
    }
    return i;
}

interface AudioComp {
    is_playing: boolean,
    current_a: string,
    total_a: string,
    myVal: string,
    audio: HTMLAudioElement,
    obj: any
}

class AudPlayer2 {

    private audio_interval: any = 0;
    private duration = 0;
    private index = 0
    public constructor(src: string, size: string, index: number) {
        this.index = index;
        if (audios.value[index]) {
            audios.value[index].player.audio = new Audio(src);
            audios.value[index].player.total_a = size;
            audios.value[index].player.audio.addEventListener("pause", () => {
                audios.value[index].player.is_playing = false;
            });
            audios.value[index].player.audio.addEventListener("ended", () => {
                audios.value[index].player.is_playing = false;
                audios.value[index].player.current_a = "00:00";
            });
            audios.value[index].player.audio.addEventListener("play", () => {
                audios.value[index].player.is_playing = true;
            });
            audios.value[index].player.audio.addEventListener("playing", () => {
                audios.value[index].player.is_playing = true;
            });
            audios.value[index].player.audio.addEventListener("durationchange", (e) => {
                if (audios.value[index].player.audio.duration != Infinity) {
                    audios.value[index].player.total_a = get_time_format(audios.value[index].player.audio.duration as number);
                    this.duration = audios.value[index].player.audio.duration
                }

            })

            const tab = size.split(":");
            this.duration = parseInt(tab[0]) * 60 + parseInt(tab[1]);

            this.audio_interval = setInterval(() => {
                if (audios.value[index].player.is_playing) {
                    audios.value[index].player.current_a = get_time_format(audios.value[index].player.audio.currentTime as number);
                    audios.value[index].player.myVal = (
                        (audios.value[index].player.audio.currentTime * 100) /
                        this.duration
                    ).toString();
                }
            });
        }
    }

    public set_current(val: string) {
        audios.value[this.index].player.audio.currentTime = (parseInt(val) / 100) * this.duration;
    }

    public toogle_playing() {
        if (!audios.value[this.index].player.is_playing) audios.value[this.index].player.audio.play();
        else audios.value[this.index].player.audio.pause();
    }
}

const handle_sound = (obj: { blob: Blob, size: string }) => {
    rOpen.value = false
    create_message(undefined, obj.blob, 'aud', undefined, obj.size)
}

const launcher = computed(() => {
    const laun = launchers.value.filter(e => e.slug == slug.value)[0]
    if (!laun) launchers.value.push({ slug: room.value?.slug as string, launcher: null })
    return launchers.value.filter(e => e.slug == slug.value)[0].launcher
})
watch(launcher, (newl, oldl) => {
    if (newl == null) {
        setTimeout(() => {
            const elt = document.getElementById('niv_text')
            if (elt) {
                const typed = new Typed(elt, {
                    strings: [conversation_text.value],
                    typeSpeed: 80,
                })
            }
        }, 900)
    }
})

const charg_launcher = () => {
    const you_ = get_room_you(room.value as Room)
    if(!is_online(toDate(you_.last).getTime())) {
        return show_alert("Impossible de continuer", you_.prenom + " doit être aussi en ligne pour pouvoir continuer") 
    }
    if (room.value && user.value) {
        const launcher: Launcher = {
            id: room.value.id,
            author: user.value.id,
            validator: 0
        }
        send(JSON.stringify({
            type: 'l_m',
            result: launcher
        }))
        launchers.value.filter(e => e.slug == room.value?.slug)[0].launcher = launcher
    }

}

const accept_launcher = () => {
    if (room.value && user.value) {
        (launchers.value.filter(e => e.slug == room.value?.slug)[0].launcher as Launcher).validator = user.value.id
        send(JSON.stringify({
            type: 'v_l',
            result: launcher.value
        }))
        l_accepted.value = true
    }
}

const forget_launch = () => {
    if (!launchers.value.filter(e => e.slug == room.value?.slug)[0].launcher) return;
    if (room.value && user.value) {
        (launchers.value.filter(e => e.slug == room.value?.slug)[0].launcher as Launcher).validator = -user.value.id
        send(JSON.stringify({
            type: 'v_l',
            result: launcher.value
        }))
        launchers.value.filter(e => e.slug == room.value?.slug)[0].launcher = null
        l_refused.value = true
    }
}

const toats_buts = ref<ToastButton[]>([
    {
        text: "J'ai compris",
        handler: () => {
            has_sen.value = 0
            store_obj('has_sen', has_sen.value)
        }
    }
])

const conversation_text = computed(() => {
    if (!room.value) return ''
    else return room.value.niveau.get_task.content
})
const typing = ref(false)
watch(conversation_text, (newc, oldc) => {
    if (newc != '') {
        setTimeout(() => {
            const elt = document.getElementById('niv_text')
            if (elt) {
                const typed = new Typed(elt, {
                    strings: [newc],
                    typeSpeed: 60,
                })
            }
        }, 500)
    }
})


watch(state_obj, (news, olds) => {
    if (news.state != olds.state) {
        if (news.state == 'deleted') dOpen.value = true;
        else if (news.state == 'verified') oOpen.value = true;
        else if (news.state == 'limited') bOpen.value = true
    }
}, { deep: true })

onIonViewWillEnter(async () => {
    s_hidden()
    const set_bar = () => {
        StatusBar.setBackgroundColor({ color: "#1d1d1d" })
    }

    set_bar()
})
const s_hidden = async () => {
    const hidden_ = await get_obj('hidden:ai:' + slug.value)
    if (hidden_) hidden.value = true
}
s_hidden()

const enable_adjustations = () => {
    const mess = document.getElementById("messages_container")
    if (mess) {
        new ResizeObserver(() => {
            console.log('resizeeee')
        }).observe(mess)
    }


    /* const mess = document.getElementById("messages_container")
    if (mess) {
        mess.addEventListener('resize', (ev) => {
            if (isScrolled("messages_container")) {
                nextTick(() => {
                    scroll_bot("messages_container")
                })
            }
            else {
                new_but.value = true
            }
        })
    } */
}

const set_keyboard = () => {
    
    Keyboard.addListener("keyboardDidShow", info => {
        console.log(document.getElementById('page_io'))
        console.log(info.keyboardHeight)
    })  
}
set_keyboard()

const user_from_id = (id : number) => {
    if(!room.value) return user.value?.prenom
    for(const use of room.value.users) {
        if( use.id == id) return use.prenom
    }
    return user.value?.prenom
}

const rep_author = (name : string) => {
    return name == user.value?.prenom ? 'moi-même' : name 
}

const cancel_rep = () => {
    rep_mess.value = undefined
    replying.value = false
}

const rep_content = (rep : Message) => {
    const typ = get_mtyp(rep) ? get_mtyp(rep) : 'text'
    if(typ == 'video') return rep.video?.get_preview
    else if (typ == 'image') return rep.image?.get_preview
    else if (typ == 'audio') return rep.audio?.get_details[0]
    else return rep.text
}

const remove_audio_moov = (id : number) => {
    setTimeout(() => {
        moov_audio.value = moov_audio.value.filter(e => e != id)
    }, 100)
}

</script>
