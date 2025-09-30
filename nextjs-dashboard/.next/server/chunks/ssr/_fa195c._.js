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
    const json = await res.json();
    console.log("json: ", json.data.products);
    return json.data.products.nodes[0] || null;
}
}}),
"[project]/app/lib/youtube.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
const YouTubeEmbed = ({ videoId })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            paddingBottom: "56.25%",
            height: 0
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
            src: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1&fs=0&disablekb=1`,
            title: "YouTube video",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true,
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none"
            }
        }, void 0, false, {
            fileName: "[project]/app/lib/youtube.tsx",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/lib/youtube.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = YouTubeEmbed;
}}),
"[project]/app/lib/customVideo.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
const CustomVideoPlayer = ({ src, autoplay = false, loop = false })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width: "100%"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
            src: src,
            autoPlay: autoplay,
            loop: loop,
            style: {
                width: "100%",
                height: "auto",
                borderRadius: "none",
                display: "block"
            },
            children: "Your browser does not support the video tag."
        }, void 0, false, {
            fileName: "[project]/app/lib/customVideo.tsx",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/lib/customVideo.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = CustomVideoPlayer;
}}),
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
"[project]/app/lib/gallery.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/app/ui/page.module.css [app-client] (css module)");
;
;
;
const Gallery = ({ images })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageGalleryWrapper,
        children: images.map((image)=>{
            // Handle cases where mediaDetails.sizes may be an array
            const mediaDetails = image.node.mediaDetails;
            const size = Array.isArray(mediaDetails.sizes) ? mediaDetails.sizes[0] : mediaDetails.sizes;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageGalleryItem,
                src: image.node.sourceUrl,
                alt: image.node.altText || "Image",
                width: size?.width || 300,
                height: size?.height || 300
            }, image.node.altText || image.node.sourceUrl, false, {
                fileName: "[project]/app/lib/gallery.tsx",
                lineNumber: 19,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/app/lib/gallery.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = Gallery;
}}),
"[project]/app/lib/embedSound.tsx (client proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/lib/embedSound.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/lib/embedSound.tsx <module evaluation>", "default");
}}),
"[project]/app/lib/embedSound.tsx (client proxy)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/lib/embedSound.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/lib/embedSound.tsx", "default");
}}),
"[project]/app/lib/embedSound.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$embedSound$2e$tsx__$28$client__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/app/lib/embedSound.tsx (client proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$embedSound$2e$tsx__$28$client__proxy$29$__ = __turbopack_import__("[project]/app/lib/embedSound.tsx (client proxy)");
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$embedSound$2e$tsx__$28$client__proxy$29$__);
}}),
"[project]/app/ui/detailPage.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__({
  "infoWrapper": "detailPage-module__KjLi-a__infoWrapper",
  "main": "detailPage-module__KjLi-a__main",
  "mixcloudWrapper": "detailPage-module__KjLi-a__mixcloudWrapper",
  "page": "detailPage-module__KjLi-a__page",
  "webPreview": "detailPage-module__KjLi-a__webPreview",
  "webPreviewWrapper": "detailPage-module__KjLi-a__webPreviewWrapper",
});
}}),
"[project]/app/[category]/[post]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>PostDetailPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$api$2f$fetch$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/lib/api/fetch.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$youtube$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/lib/youtube.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$customVideo$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/lib/customVideo.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$gallery$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/lib/gallery.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$embedSound$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/lib/embedSound.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$helperFunctions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/lib/helperFunctions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$detailPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/app/ui/detailPage.module.css [app-client] (css module)");
;
;
;
;
;
;
;
;
async function PostDetailPage({ params }) {
    const getPost = await params;
    const post = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$api$2f$fetch$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPostBySlug"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$helperFunctions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["translateSlugs"])(getPost.post));
    const videoId = post.acfPosts.youtubeId !== "null" ? post.acfPosts.youtubeId : null;
    const customVidSrc = post.acfPosts.customVideoSource !== "null" ? post.acfPosts.customVideoSource : null;
    const webLink = post.acfPosts.webportfolioLink !== "null" ? post.acfPosts.webportfolioLink : null;
    const sounds = post.acfPosts.soundUrl !== null ? post.acfPosts.soundUrl.split(", ") : null;
    const imageGallery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$helperFunctions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getImageGallery"])(post.acfPosts);
    // an array of featured images
    // console.log("image gallery get", imageGallery, sounds)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$detailPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].main,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$detailPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoWrapper,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$detailPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                        children: post.title
                    }, void 0, false, {
                        fileName: "[project]/app/[category]/[post]/page.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$detailPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].date,
                        children: post.acfPosts.date
                    }, void 0, false, {
                        fileName: "[project]/app/[category]/[post]/page.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$detailPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].description,
                        children: post.acfPosts.description
                    }, void 0, false, {
                        fileName: "[project]/app/[category]/[post]/page.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    webLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$detailPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].customLink,
                        href: webLink,
                        target: "_blank",
                        rel: "noopener norefferer ",
                        children: "link to website"
                    }, void 0, false, {
                        fileName: "[project]/app/[category]/[post]/page.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/[category]/[post]/page.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$detailPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageSection,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$gallery$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        images: imageGallery
                    }, void 0, false, {
                        fileName: "[project]/app/[category]/[post]/page.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    sounds && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$detailPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mixcloudWrapper,
                        children: sounds.map((sound, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$embedSound$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                url: sound
                            }, `embed-${idx}`, false, {
                                fileName: "[project]/app/[category]/[post]/page.tsx",
                                lineNumber: 68,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/[category]/[post]/page.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this),
                    customVidSrc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$detailPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].customVidWrapper,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$customVideo$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            src: customVidSrc,
                            autoplay: true,
                            loop: true
                        }, void 0, false, {
                            fileName: "[project]/app/[category]/[post]/page.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/[category]/[post]/page.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    videoId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$detailPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].videoWrapper,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$youtube$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            videoId: videoId
                        }, void 0, false, {
                            fileName: "[project]/app/[category]/[post]/page.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/[category]/[post]/page.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/[category]/[post]/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/[category]/[post]/page.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
}}),
"[project]/app/[category]/[post]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_namespace__(__turbopack_import__("[project]/app/[category]/[post]/page.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/.next-internal/server/app/[category]/[post]/page/actions.js [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=_fa195c._.js.map