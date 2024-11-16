import { mergeProps, useSSRContext } from "vue";
import "hookable";
import { ssrRenderAttrs } from "vue/server-renderer";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card mx-auto mt-7 h-fit text-center" }, _attrs))}><p class="mt-7 text-6xl text-black">Traumtänzer und Paradiesvögel</p><p class="my-20 text-6xl text-black">Coming soon...</p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-Cgxhv3jL.js.map
