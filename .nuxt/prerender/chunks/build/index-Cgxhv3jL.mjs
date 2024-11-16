import { mergeProps, useSSRContext } from 'file:///website-public/traumtaenzer-paradiesvoegel-public/node_modules/vue/index.mjs';
import { ssrRenderAttrs } from 'file:///website-public/traumtaenzer-paradiesvoegel-public/node_modules/vue/server-renderer/index.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card mx-auto mt-7 h-fit text-center" }, _attrs))}><p class="mt-7 text-6xl text-black">Traumt\xE4nzer und Paradiesv\xF6gel</p><p class="my-20 text-6xl text-black">Coming soon...</p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Cgxhv3jL.mjs.map
