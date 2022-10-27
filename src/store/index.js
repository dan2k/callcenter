import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import SecureLS from "secure-ls";
var ls = new SecureLS({ encodingType: 'aes',encryptionSecret: 'tongdang' });
export const plugin = (app) => {
  const pinia = createPinia()
  pinia.use(createPersistedStatePlugin(
    {
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key)
          }
    }
  ))

  app.use(pinia)
}
export * from "./auth"
export * from "./prepare"