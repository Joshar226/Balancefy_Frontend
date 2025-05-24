import {create} from 'zustand'

type Store = {
    sidebar: boolean,
    setSidebar: (sidebar: boolean) => void
}

export const useStore = create<Store>((set) => ({
    sidebar: false,
    setSidebar(sidebar) {
        set(() => ({
            sidebar
        }))
    }
}))