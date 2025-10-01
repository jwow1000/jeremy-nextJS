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
        throw new Error("Failed to parse JSON. Raw response:\n" + raw + err);
    }
    return json.data.products?.nodes?.at(0) ?? null;
}
}}),
"[project]/app/ui/subPage.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__({
  "imageContainer": "subPage-module__p9wvuG__imageContainer",
  "label": "subPage-module__p9wvuG__label",
  "page": "subPage-module__p9wvuG__page",
  "postContainer": "subPage-module__p9wvuG__postContainer",
  "postDate": "subPage-module__p9wvuG__postDate",
  "postDescription": "subPage-module__p9wvuG__postDescription",
  "postTagWrapper": "subPage-module__p9wvuG__postTagWrapper",
  "thumb": "subPage-module__p9wvuG__thumb",
});
}}),
"[project]/app/[category]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>CategoryPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$api$2f$fetch$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/lib/api/fetch.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$helperFunctions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/lib/helperFunctions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$subPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_import__("[project]/app/ui/subPage.module.css [app-client] (css module)");
;
;
;
;
;
;
async function CategoryPage({ params }) {
    const pageParams = await params;
    const categoryTrans = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$helperFunctions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["translateSlugs"])(pageParams.category);
    const posts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$api$2f$fetch$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPostsByCategory"])(categoryTrans); // Fetch data in an async component 
    // console.log("the posts", posts)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$subPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$subPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                children: categoryTrans
            }, void 0, false, {
                fileName: "[project]/app/[category]/page.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            posts.map((post)=>{
                console.log("tjhe post", post);
                const img = post.featuredImage.node ? post.featuredImage.node : null;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$subPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].postContainer,
                    href: `/objects/${post.slug}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: post.title
                        }, void 0, false, {
                            fileName: "[project]/app/[category]/page.tsx",
                            lineNumber: 31,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$subPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].postDate,
                            children: post.acfPosts.date
                        }, void 0, false, {
                            fileName: "[project]/app/[category]/page.tsx",
                            lineNumber: 32,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$subPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].postTagWrapper,
                            children: post.tags.nodes && post.tags.nodes.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$subPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].postTag,
                                    children: tag.name
                                }, tag.name, false, {
                                    fileName: "[project]/app/[category]/page.tsx",
                                    lineNumber: 37,
                                    columnNumber: 23
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/[category]/page.tsx",
                            lineNumber: 33,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$subPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageContainer,
                            children: img && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$subPage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thumb,
                                src: img.sourceUrl,
                                alt: img.altText ? img.altText : `${post.slug} thumbnail`,
                                width: Array.isArray(img.mediaDetails.sizes) ? img.mediaDetails.sizes[2]?.width : img.mediaDetails.sizes?.width,
                                height: Array.isArray(img.mediaDetails.sizes) ? img.mediaDetails.sizes[2]?.height : img.mediaDetails.sizes?.height
                            }, void 0, false, {
                                fileName: "[project]/app/[category]/page.tsx",
                                lineNumber: 44,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/[category]/page.tsx",
                            lineNumber: 41,
                            columnNumber: 15
                        }, this)
                    ]
                }, post.id, true, {
                    fileName: "[project]/app/[category]/page.tsx",
                    lineNumber: 26,
                    columnNumber: 13
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/app/[category]/page.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}}),
"[project]/app/[category]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_namespace__(__turbopack_import__("[project]/app/[category]/page.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/.next-internal/server/app/[category]/page/actions.js [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=_b7b72c._.js.map