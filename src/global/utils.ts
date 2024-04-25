import { Storage } from "@ionic/storage"
import { alertController, isPlatform, loadingController, toastController } from "@ionic/vue";
import axios from "axios";
import { Router, useRouter } from "vue-router";

export const check_connect = async () => {
    const storage = new Storage({
        name: "x_info",
    });
    storage.create();
    const token: string | undefined = await storage.get('tokens')
    if (!token) return false
    else {
        const json_tok = JSON.parse(token)
        try {
            const resp = await axios({
                url: 'api/ping',
                method: 'HEAD',
                headers: {
                    Authorization: `Bearer ${json_tok.access}`
                },
            })
            return true
        } catch (err: any) {
            if (err.response.status == 401) {
                const form = new FormData()
                form.append('refresh', json_tok.refresh)
                try {
                    const refresh_res = await axios({
                        url: 'token/refresh/',
                        method: 'POST',
                        data: form
                    })
                    json_tok.access = refresh_res.data['access']
                    storage.set('tokens', JSON.stringify(json_tok))
                    return true
                } catch (err: any) {
                    if (err.response.status == 401) return false
                }
            }
        }
    }
}

export const showLoading = async (mess: string) => {
    const loading = await loadingController.create({
        message: mess,
    });
    loading.present();
    return loading
};

export const show_alert = async (title: string, mess: string) => {
    const alert = await alertController.create({
        header: title,
        message: mess,
        buttons: ["OK"],
    });

    await alert.present();
};

export const access_tok = async (router: Router, load: HTMLIonLoadingElement | undefined) => {
    const storage = new Storage({
        name: "x_info",
    });
    storage.create();
    const token: string | undefined = await storage.get('tokens')
    if (!token) {
        if (load) load.dismiss();
        return router.push(`/login`)
    }
    else {
        const json_tok = JSON.parse(token)
        try {
            const resp = await axios({
                url: 'api/ping',
                method: 'HEAD',
                headers: {
                    Authorization: `Bearer ${json_tok.access}`
                },
            })
            return json_tok.access as string
        } catch (err: any) {
            if (err.response.status == 401) {
                const form = new FormData()
                form.append('refresh', json_tok.refresh)
                try {
                    const refresh_res = await axios({
                        url: 'token/refresh/',
                        method: 'POST',
                        data: form
                    })
                    json_tok.access = refresh_res.data['access']
                    storage.set('tokens', JSON.stringify(json_tok))
                    return refresh_res.data['access'] as string
                } catch (err: any) {
                    if (err.response.status == 401) {
                        load?.dismiss()
                        return router.push(`/login`)
                    }
                }
            }
        }
    }
}

export const show_warn = async (title: string, mess: string, but1: string, handler1: () => Promise<void>) => {
    const alert = await alertController.create({
        header: title,
        message: mess,
        buttons: [
            {
                text: 'Fermer',
                role: 'cancel'
            },
            {
                text: but1,
                role: 'confirm',
                handler: () => {
                    handler1()
                },
            },
        ],
    });

    await alert.present();
};

export const get_my_company = async () => {
    const resp = await axios.get('api/get_my_company/', {
        headers: {
            Authorization: `Bearer ${await access_tok(useRouter(), undefined)}`,
        }
    })
    return resp.data['result']
}

export const my_company = async () => {
    const storage = new Storage({
        name: "x_info",
    });
    storage.create();
    const company: string | undefined = await storage.get('company');
    if (company) return company;
    return await get_my_company()
}

export const extract_frames = (vid: any, callback: (b: Blob | null) => void, index: number, is_url = false) => {
    const video = document.createElement("video");
    const file = vid;
    const fileURL = is_url ? vid : URL.createObjectURL(file);
    video.src = fileURL;

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth * 3 / 4;
    video.addEventListener('loadeddata', function () {
        reloadRandomFrame();
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight
    }, false);

    video.addEventListener('seeked', function () {
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(callback);
    }, false);


    function reloadRandomFrame() {
        if (!isNaN(video.duration)) {
            const rand = Math.round(Math.random() * video.duration * 1000) + 1;
            video.currentTime = rand / 1000;
        }
    }
}

export const presentToast = async (position: 'top' | 'middle' | 'bottom', text: string, color = 'primary', duration = 3500) => {
    const toast = await toastController.create({
        mode: 'ios',
        message: text,
        position: position,
        duration: duration,
        color: color,
    });
    await toast.present();
}

export const get_day_sem = (weekD: number) => {
    let day = "";
    switch (weekD) {
        case 0:
            day = `Dim`;
            break;
        case 1:
            day = 'Lun';
            break
        case 2:
            day = 'Mar';
            break
        case 3:
            day = 'Mer';
            break
        case 4:
            day = 'Jeu';
            break
        case 5:
            day = 'Ven'
            break
        case 6:
            day = 'Sam'
            break
    }
    return day;
}

export const formatOnline = (time: string) => {
    const today = new Date();
    const last = new Date(time);
    const diff = (today.getTime() - last.getTime()) / 1000
    const diffDays = Math.round((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 70) return 'en ligne';
    else {
        if (diffDays == 0) {
            return ` à ${last.getHours() < 10 ? "0" : ""}${last.getHours()}:${last.getMinutes() < 10 ? "0" : ""}${last.getMinutes()}`
        } else if (Math.abs(diffDays) == 1) {
            return `hier à ${last.getHours() < 10 ? "0" : ""}${last.getHours()}:${last.getMinutes() < 10 ? "0" : ""}${last.getMinutes()}`
        } else if (Math.abs(diffDays) == 2) {
            return `avant-hier à ${last.getHours() < 10 ? "0" : ""}${last.getHours()}:${last.getMinutes() < 10 ? "0" : ""}${last.getMinutes()}`
        }
        else if (Math.abs(diffDays) < 7) {
            return `${get_day_sem(last.getDay())} à ${last.getHours() < 10 ? "0" : ""}${last.getHours()}:${last.getMinutes() < 10 ? "0" : ""}${last.getMinutes()}`
        } else if (Math.abs(diffDays) == 7) {
            return `il y a une semaine`
        }
        else if (Math.abs(diffDays) < 30) {
            return `il y a ${Math.abs(diffDays)} jours`
        } else {
            return `le ${last.getDate()}/${last.getMonth()}/${last.getFullYear()}`
        }
    }

}

export function copyTextToClipboard(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }