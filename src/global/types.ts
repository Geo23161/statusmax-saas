import { Ref } from "vue"

export interface Photo {
    id: number,
    name: string,
    get_picture: string,
    is_profil: string,
    color: string
}

export interface Verif {
    id : number,
    get_piece : string,
    created_at : string,
    status : string
}

export interface Cats {
    id : number,
    name : string
}

export interface TypAbon {
    name: string,
    limit: number,
    level? : number,
    amount?: string,
    features?: string[],
}

export interface Abon {
    id: number,
    get_typ: TypAbon,
    debut: string,
    is_on: boolean,
    for_days: number,
    status : string,
    verif? : Verif,
    created_at : string
}

export interface User {
    id: number,
    prenom: string,
    email: string,
    birth: string,
    searching: string,
    photos: Photo[],
    get_profil: Photo,
    quart: string,
    cur_abn: Abon,
    get_sign: string,
    get_likes: number[],
    sex : string,
    cats? : Cats[],
    only_verified : boolean,
    get_status : string,
    get_des? : string[]
}

export interface Reaction {
    id : number,
    get_emoji : string,
    get_word : string
}

export interface Profil {
    id: number,
    prenom: string,
    photos: Photo[],
    get_profil: Photo,
    get_sign: string,
    get_status : string,
    last? : string,
    get_age? : string,
    get_des? : string[],
    i_like : boolean,
    commons : {
        id : number,
        name : string
    }[],
    reaction? : { id : number, name : string },
    has_room? : number
}

export interface Card {
    url: string,
    color: string,
    name: string,
    sign: string,
    pk: number,
    status : string,
    photos : number,
    get_age : string,
    i_like : boolean,
    commons : {
        id : number,
        name : string
    }[],
    reaction? : { id : number, name : string },
    has_room? : number
}

export interface ProfilSeen {
    id: number,
    since: string
}

export interface DaySwipe {
    [key: string]: number,
}

export interface Tache {
    id: number,
    niveau: number,
    content: string
}

export interface Niveau {
    id: number,
    level: number,
    get_task: Tache,
    get_help: string[]
}

export interface ChatProfil {
    id: number,
    prenom: string,
    get_picture: string,
    last: string,
    is_online: boolean,
    get_status : string,
    get_des : string[]
}

export interface AnonymousObj {
    commons : string[],
    has_seen : boolean,
}

export interface Room {
    id: number,
    users: ChatProfil[],
    slug: string,
    created_at: string,
    niveau: Niveau,
    is_proposed: boolean,
    why: string,
    get_anonymous? : AnonymousObj,
    get_groups? : number[],
    is_match? : boolean
}

export interface Image {
    id: number,
    name: string,
    get_image: string,
    get_preview: string,
    get_details: any
}

export interface Audi {
    id: number,
    name: string,
    get_audio: string,
    get_details: any
}

export interface Video {
    id: number,
    name: string,
    get_video: string,
    get_details: any,
    get_preview: string
}

export interface ReplyMess {
    author : string | number,
    typ : string, 
    content : string
}

export interface Message {
    id: number,
    get_room: number,
    created_at: string,
    step: string,
    text: string | null,
    image: Image | null,
    audio: Audi | null,
    video: Video | null,
    user: number,
    old_pk?: number,
    get_reply? : ReplyMess | string,
    functional? : string
}

export interface Essential {
    all_swipe: DaySwipe,
    seen_tofs: number[],
    already_seens: ProfilSeen[],
    all_slikes : DaySwipe,
    gr_swipe : DaySwipe
}

export interface SocketMessage {
    type: string,
    result: any,
    other?: any
}

export interface StoreFiles {
    id: number,
    path: string,
    src: string,
    downloaded: boolean,
    obj: any
}

export const get_time_format = (time: number) => {
    let minutes: string | number = Math.floor(time / 60);
    let seconds: string | number = Math.floor(time - minutes * 60);
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
};

export class AudioPlayer {
    private is_playing = false;
    private current_a = "00:00";
    private total_a = "00:00"
    private myVal = "0";
    private audio: HTMLAudioElement = new Audio();
    private audio_interval: any = 0;
    private duration = 0;

    public constructor(src: string, size: string) {
        this.audio = new Audio(src);
        this.total_a = size;
        this.audio.addEventListener("pause", () => {
            this.is_playing = false;
        });
        this.audio.addEventListener("ended", () => {
            this.is_playing = false;
            this.current_a = "00:00";
        });
        this.audio.addEventListener("play", () => {
            this.is_playing = true;
        });
        this.audio.addEventListener("playing", () => {
            this.is_playing = true;
        });
        this.audio.addEventListener("durationchange", (e) => {
            if (this.audio.duration != Infinity && this.total_a == "00:00") {
                this.total_a = get_time_format(this.audio.duration as number);
                this.duration = this.audio.duration
            }
        })

        const tab = size.split(":");
        this.duration = parseInt(tab[0]) * 60 + parseInt(tab[1]);

        this.audio_interval = setInterval(() => {
            if (this.is_playing) {
                this.current_a = get_time_format(this.audio.currentTime as number);
                this.myVal = (
                    (this.audio.currentTime * 100) /
                    this.duration
                ).toString();
            }
        });
    }

    public set_current(val: string) {
        this.audio.currentTime = (parseInt(val) / 100) * this.duration;
    }

    public toogle_playing() {
        if (!this.is_playing) this.audio.play();
        else this.audio.pause();
    }
}

export interface AudioPlaying {
    id: number;
    player: any;
}

export interface ProfilStore {
    id: number,
    path : string,
    src : string
}

export interface Launcher {
    id : number,
    author : number,
    validator : number
}

export interface ProfilStores {
    url : string,
    path : string,
}

export interface PSUrl {
    store : ProfilStores,
    src : string
}

export interface Notif {
    id : number,
    typ : string,
    text : string,
    get_photo : string,
    created_at : string,
    get_urls : string[]
}

export interface UserGroup {
    id : number,
    get_creator : number,
    users : Profil[],
    like_us : number[],
    get_name: string,
}

export interface GRLimit {
    [key: string]: {
        swipe : number,
        discuss : number
    },
}

export interface Group {
    id : number,
    get_creator : number,
    users : ChatProfil[],
    get_name: string,
    code : string,
    rooms : Room[]
}

export interface QosicObj {
    transref : string,
    number : string,
    typ : string,
    amount : string,
    abn : string,
    code : number
}