(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_b6f5e8._.js", {

"[project]/app/ui/page.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__({
  "animateLogo": "page-module__1Criqa__animateLogo",
  "customLink": "page-module__1Criqa__customLink",
  "customVidWrapper": "page-module__1Criqa__customVidWrapper",
  "embedIframe": "page-module__1Criqa__embedIframe",
  "imageGalleryItem": "page-module__1Criqa__imageGalleryItem",
  "imageGalleryWrapper": "page-module__1Criqa__imageGalleryWrapper",
  "imageSection": "page-module__1Criqa__imageSection",
  "infoWrapper": "page-module__1Criqa__infoWrapper",
  "logoWrapper": "page-module__1Criqa__logoWrapper",
  "main": "page-module__1Criqa__main",
  "mixcloudWrapper": "page-module__1Criqa__mixcloudWrapper",
  "page": "page-module__1Criqa__page",
  "spinY": "page-module__1Criqa__spinY",
  "stillLogo": "page-module__1Criqa__stillLogo",
  "videoWrapper": "page-module__1Criqa__videoWrapper",
});
}}),
"[project]/app/lib/embedSound.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/app/ui/page.module.css [app-client] (css module)");
"use client";
;
;
const SoundEmbed = ({ url, width = "100%", height = "180px" })=>{
    const getEmbedUrl = (url)=>{
        if (url.includes("mixcloud.com")) {
            const mixcloudPath = url.replace("https://www.mixcloud.com/", "");
            return `https://www.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2F${encodeURIComponent(mixcloudPath)}`;
        } else if (url.includes("soundcloud.com")) {
            return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}`;
        }
        return null;
    };
    const embedUrl = getEmbedUrl(url);
    if (!embedUrl) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: "Unsupported URL. Please provide a Mixcloud or SoundCloud link."
        }, void 0, false, {
            fileName: "[project]/app/lib/embedSound.tsx",
            lineNumber: 30,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width,
            height
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].embedIframe,
            style: {
                border: 'none'
            },
            width: "100%",
            height: "100%",
            allow: "autoplay",
            src: embedUrl
        }, void 0, false, {
            fileName: "[project]/app/lib/embedSound.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, url, false, {
        fileName: "[project]/app/lib/embedSound.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
};
_c = SoundEmbed;
const __TURBOPACK__default__export__ = SoundEmbed;
var _c;
__turbopack_refresh__.register(_c, "SoundEmbed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/[category]/[post]/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_b6f5e8._.js.map