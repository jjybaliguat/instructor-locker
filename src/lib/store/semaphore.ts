import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export interface SemaphoreAccountProps {
    key: string,
    account_name: string,
    status: string,
    credit_balance: number | null | undefined
}

interface SemaphoreAccountState {
    account: SemaphoreAccountProps;
    setAccount: (account: SemaphoreAccountProps) => void,
}

const useSemaphoreAccountStore = create<SemaphoreAccountState>()(
    persist(
        (set, get) => ({
            account: {
                key: "",
                account_name: "",
                status: "",
                credit_balance: null
            },
            setAccount: (acc) => set(() => ({
                account: acc
            }))
        }),
        {
            name: "semaphore-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export { useSemaphoreAccountStore }