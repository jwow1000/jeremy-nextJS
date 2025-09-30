module.exports = {

"[project]/app/lib/helperFunctions.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "formatDate": (()=>formatDate),
    "getImageGallery": (()=>getImageGallery),
    "translateSlugs": (()=>translateSlugs)
});
const getImageGallery = (post)=>{
    console.log("the post look for the images: ", post);
    const images = [];
    for(let i = 1; i <= 4; i++){
        const key = `imageGallery${i}`;
        const image = post[key];
        if (image) {
            images.push(image);
        }
    }
    return images;
};
const formatDate = (dateString)=>{
    if (!dateString) return "";
    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "long"
    }).format(new Date(dateString));
};
function translateSlugs(slug) {
    let newSlug;
    switch(slug){
        case 'objects':
            newSlug = 'things';
            break;
        case 'sounds':
            newSlug = 'sound';
            break;
        case 'videos':
            newSlug = 'video';
            break;
        case 'webprojects':
            newSlug = 'webportfolio';
            break;
        default:
            newSlug = slug;
    }
    return newSlug;
}
}}),
"[project]/app/lib/api/fetch.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "getCVEntries": (()=>getCVEntries),
    "getCategoryBySlug": (()=>getCategoryBySlug),
    "getImmixTracks": (()=>getImmixTracks),
    "getPostBySlug": (()=>getPostBySlug),
    "getPosts": (()=>getPosts),
    "getPostsByCategory": (()=>getPostsByCategory),
    "getProductBySlug": (()=>getProductBySlug),
    "getProducts": (()=>getProducts)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$helperFunctions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/lib/helperFunctions.ts [app-rsc] (ecmascript)");
;
const API_URL = process.env.WORDPRESS_GRAPHQL_ENDPOINT || "https://wp.jeremywy.com/graphql";
// local use functions
function transformExpoData(json) {
    return json.data.cvEntries.nodes.map((item)=>({
            title: item.title,
            type: item.cvEntryFields.type[0] ?? "undefined",
            date: item.cvEntryFields.date,
            location: item.cvEntryFields.location,
            description: item.cvEntryFields.description,
            renderDate: item.cvEntryFields.renderDate,
            link: item.cvEntryFields.link
        }));
}
async function getPosts() {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
        query {
          posts {
            nodes {
              id
              title
              excerpt
              slug
              date
              
            }
          }
        }
      `
        }),
        next: {
            revalidate: 60
        }
    });
    const json = await res.json();
    // console.log("did we content", json.data.posts.nodes)
    return json.data.posts.nodes;
}
async function getImmixTracks() {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
        query GetPostsByCategory {
          posts(
            where: { categoryName: "immix-tracks" }
          ) {
            nodes {
              id
              title
              excerpt
              slug
              date
              tags {
                nodes {
                  id
                  name
                  slug
                }
              }
              featuredImage {
                node {
                  sourceUrl
                  altText
                  mediaDetails {
                    sizes {
                      width
                      height
                    }
                  }
                }
              }
              acfPosts {
                date
                description
                immixInternalLink
              }
              
            }
          }
        }
      `
        }),
        next: {
            revalidate: 60
        }
    });
    const json = await res.json();
    // Ensure acfPosts.date exists before sorting
    return json.data.posts.nodes.sort((a, b)=>{
        const dateA = new Date(a.acfPosts.date || "1970-01-01");
        const dateB = new Date(b.acfPosts.date || "1970-01-01");
        return dateB.getTime() - dateA.getTime();
    });
}
async function getPostsByCategory(category) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
        query GetPostsByCategory {
          posts(
            where: { categoryName: "${category}" }
          ) {
            nodes {
              id
              title
              excerpt
              slug
              date
              tags {
                nodes {
                  id
                  name
                  slug
                }
              }
              featuredImage {
                node {
                  sourceUrl
                  altText
                  mediaDetails {
                    sizes {
                      width
                      height
                    }
                  }
                }
              }
              acfPosts {
                date
                description
              }
            }
          }
        }
      `
        }),
        next: {
            revalidate: 60
        }
    });
    const json = await res.json();
    // Ensure acfPosts.date exists before sorting
    return json.data.posts.nodes.sort((a, b)=>{
        const dateA = new Date(a.acfPosts.date || "1970-01-01");
        const dateB = new Date(b.acfPosts.date || "1970-01-01");
        return dateB.getTime() - dateA.getTime();
    });
}
async function getPostBySlug(slug) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
        query GetPostBySlug($slug: String!) {
          postBy(slug: $slug) {
            id
            title
            excerpt 
            slug
            date
            featuredImage {
              node {
                sourceUrl
                altText
                mediaDetails {
                  sizes {
                    width
                    height
                  }
                }
              }
            }
            acfPosts {
              date
              youtubeId
              description
              soundcloudId
              webportfolioLink
              customVideoSource  
              soundUrl
              imageGallery1 {
                node {
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }  
              }
              imageGallery2 {
                node {
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }  
              }
              imageGallery3 {
                node {
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }  
              }
              imageGallery4 {
                node {
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }  
              }
            }
          }
        }
      `,
            variables: {
                slug
            }
        }),
        next: {
            revalidate: 60
        }
    });
    const json = await res.json();
    console.log("lkfds", json);
    return json.data.postBy || null;
}
async function getCVEntries() {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
        query GetCVEntries {
          cvEntries {
            nodes {
              id
              title
              cvEntryFields{
                date
                type
                renderDate
                location
                description
                link
              }
 
            }
          }
        }
      `
        }),
        next: {
            revalidate: 60
        }
    });
    const json = await res.json();
    // console.log("did we content", json.data.cvEntries.nodes);
    const expoData = transformExpoData(json);
    return expoData;
}
async function getCategoryBySlug(slug) {
    const newSlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$helperFunctions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["translateSlugs"])(slug);
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
        query GetCategoryBySlug($newSlug: ID!) {
          category(id: $newSlug, idType: SLUG) {
            id
            name
            slug
            description
          }
        }
      `,
            variables: {
                newSlug
            }
        }),
        next: {
            revalidate: 60
        }
    });
    const json = await res.json();
    return json.data;
}
async function getProducts() {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
        query GetProducts {
          products( where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
              id
              slug
              name
              ... on SimpleProduct {
                price(format: RAW)
                regularPrice(format: RAW)
                salePrice(format: RAW)
                
              }
              date
              description
              featuredImage {
                cursor
                node {
                  altText
                  caption
                  file
                  filePath
                  sourceUrl
                }
              }
            }
          }
        }
      `
        }),
        next: {
            revalidate: 60
        }
    });
    const json = await res.json();
    return json.data.products.nodes;
}
async function getProductBySlug(slug) {
    const newSlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$helperFunctions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["translateSlugs"])(slug);
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
        query GetProduct($slug: [String!]) {
          products(
            where: { slugIn: $slug, orderby: { field: DATE, order: DESC } }
          ) {
            nodes {
              id
              slug
              name
              ... on SimpleProduct {
                price(format: RAW)
                regularPrice(format: RAW)
                salePrice(format: RAW)
              }
              date
              description
              featuredImage {
                node {
                  altText
                  caption
                  sourceUrl
                }
              }
              galleryImages {
                nodes {
                  altText
                  caption
                  sourceUrl
                }
              }
              shortDescription
            }
          }
        }
      `,
            variables: {
                slug: newSlug
            }
        }),
        next: {
            revalidate: 60
        }
    });
    const raw = await res.text(); // log raw text
    // console.log("RAW response:", raw);
    let json;
    try {
        json = JSON.parse(raw);
    } catch (err) {
        throw new Error("Failed to parse JSON. Raw response:\n" + raw);
    }
    return json.data.products?.nodes?.at(0) ?? null;
}
}}),
"[project]/app/lib/Cart.tsx (client proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/lib/Cart.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/lib/Cart.tsx <module evaluation>", "default");
}}),
"[project]/app/lib/Cart.tsx (client proxy)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/lib/Cart.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/lib/Cart.tsx", "default");
}}),
"[project]/app/lib/Cart.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$Cart$2e$tsx__$28$client__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/app/lib/Cart.tsx (client proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$Cart$2e$tsx__$28$client__proxy$29$__ = __turbopack_import__("[project]/app/lib/Cart.tsx (client proxy)");
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$Cart$2e$tsx__$28$client__proxy$29$__);
}}),
"[project]/app/lib/HtmlParse.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>HTMLParse)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$html$2d$react$2d$parser$40$5$2e$2$2e$6_$40$types$2b$react$40$19$2e$0$2e$8_react$40$19$2e$0$2e$0$2f$node_modules$2f$html$2d$react$2d$parser$2f$esm$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/html-react-parser@5.2.6_@types+react@19.0.8_react@19.0.0/node_modules/html-react-parser/esm/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$html$2d$react$2d$parser$40$5$2e$2$2e$6_$40$types$2b$react$40$19$2e$0$2e$8_react$40$19$2e$0$2e$0$2f$node_modules$2f$html$2d$react$2d$parser$2f$esm$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/html-react-parser@5.2.6_@types+react@19.0.8_react@19.0.0/node_modules/html-react-parser/esm/index.mjs [app-rsc] (ecmascript) <locals>");
;
;
function HTMLParse({ html }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$html$2d$react$2d$parser$40$5$2e$2$2e$6_$40$types$2b$react$40$19$2e$0$2e$8_react$40$19$2e$0$2e$0$2f$node_modules$2f$html$2d$react$2d$parser$2f$esm$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(html)
    }, void 0, false, {
        fileName: "[project]/app/lib/HtmlParse.tsx",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
}}),
"[project]/app/ui/shop.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__({
  "buyButton": "shop-module__GtLAIq__buyButton",
  "galleryWrapper": "shop-module__GtLAIq__galleryWrapper",
  "header": "shop-module__GtLAIq__header",
  "imageWrapper": "shop-module__GtLAIq__imageWrapper",
  "main": "shop-module__GtLAIq__main",
  "price": "shop-module__GtLAIq__price",
  "productContainer": "shop-module__GtLAIq__productContainer",
  "productsWrapper": "shop-module__GtLAIq__productsWrapper",
});
}}),
"[project]/app/shop/[slug]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ProductDetail),
    "generateMetadata": (()=>generateMetadata)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$api$2f$fetch$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/lib/api/fetch.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$Cart$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/lib/Cart.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$HtmlParse$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/lib/HtmlParse.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$shop$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/app/ui/shop.module.css [app-client] (css module)");
;
;
;
;
;
;
async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$api$2f$fetch$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductBySlug"])(slug);
    return {
        title: product.name,
        description: product.shortDescription || product.description?.slice(0, 160),
        openGraph: {
            title: product.name,
            description: product.shortDescription || product.description?.slice(0, 160),
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/${slug}`,
            images: [
                {
                    url: product.images?.[0]?.node.sourceUrl || "/default-og.png",
                    alt: product.name
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: product.name,
            description: product.shortDescription || product.description?.slice(0, 160),
            images: [
                product.images?.[0]?.node.sourceUrl || "/default-og.png"
            ]
        }
    };
}
async function ProductDetail({ params }) {
    const { slug } = await params;
    const product = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$api$2f$fetch$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductBySlug"])(slug);
    console.log("product: ", product);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$shop$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].main,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$shop$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: product.name
            }, void 0, false, {
                fileName: "[project]/app/shop/[slug]/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$HtmlParse$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                html: product.description
            }, void 0, false, {
                fileName: "[project]/app/shop/[slug]/page.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: `$${product.price}`
            }, void 0, false, {
                fileName: "[project]/app/shop/[slug]/page.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$shop$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].galleryWrapper,
                children: product.galleryImages && product.galleryImages.nodes.map((image, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$shop$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageWrapper,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            src: image.sourceUrl,
                            fill: true,
                            alt: image.altText || `${product.name}-image-${idx}`,
                            style: {
                                objectFit: "contain",
                                height: "100%",
                                width: "100%"
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/shop/[slug]/page.tsx",
                            lineNumber: 56,
                            columnNumber: 15
                        }, this)
                    }, `${product.name}-image-${idx}`, false, {
                        fileName: "[project]/app/shop/[slug]/page.tsx",
                        lineNumber: 52,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/shop/[slug]/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            product.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$Cart$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                productId: product.id
            }, void 0, false, {
                fileName: "[project]/app/shop/[slug]/page.tsx",
                lineNumber: 66,
                columnNumber: 22
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/shop/[slug]/page.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
}}),
"[project]/app/shop/[slug]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_namespace__(__turbopack_import__("[project]/app/shop/[slug]/page.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/.next-internal/server/app/shop/[slug]/page/actions.js [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=_4fe2b2._.js.map