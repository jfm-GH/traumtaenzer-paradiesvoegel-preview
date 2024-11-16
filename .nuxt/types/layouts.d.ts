import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "one-page-app"
declare module "../../node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}