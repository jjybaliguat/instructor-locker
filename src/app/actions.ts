"use server"

import { decrypt } from "@/utils/secure-key"

export async function getMessages(apikey: string){
    try {
        const decryptedKey = decrypt(apikey)
        const response = await fetch(`https://api.semaphore.co/api/v4/messages?apikey=${decryptedKey}`)
        const messages = await response.json()

        return messages
    } catch (error) {
        console.log(error)
        return null
    }
}