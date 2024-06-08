import axios from 'axios'

const BOT_TOKEN = '7232063214:AAHAUmfSd_e6xP1sufzBt_vKmxFXIIcjFGo'
const CHAT_ID = '386534559'

export const sendMessage = async (message) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      data: {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  } catch (error) {
    console.log(error.message)
  }
}
