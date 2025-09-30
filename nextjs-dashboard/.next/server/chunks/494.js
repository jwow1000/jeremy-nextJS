exports.id=494,exports.ids=[494],exports.modules={5335:(e,t,r)=>{Promise.resolve().then(r.bind(r,8005))},8479:(e,t,r)=>{Promise.resolve().then(r.bind(r,9714))},8768:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,6093,23)),Promise.resolve().then(r.t.bind(r,1101,23)),Promise.resolve().then(r.t.bind(r,6437,23)),Promise.resolve().then(r.t.bind(r,5364,23)),Promise.resolve().then(r.t.bind(r,956,23)),Promise.resolve().then(r.t.bind(r,3896,23)),Promise.resolve().then(r.t.bind(r,5567,23))},3616:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,6417,23)),Promise.resolve().then(r.t.bind(r,3609,23)),Promise.resolve().then(r.t.bind(r,5678,23)),Promise.resolve().then(r.t.bind(r,7312,23)),Promise.resolve().then(r.t.bind(r,2608,23)),Promise.resolve().then(r.t.bind(r,7204,23)),Promise.resolve().then(r.t.bind(r,2019,23))},9714:(e,t,r)=>{"use strict";r.d(t,{default:()=>p});var a=r(5422),s=r(733),i=r(629),o=r.n(i),n=r(8312);function l({href:e,className:t,activeClassName:r,children:s}){let i=(0,n.usePathname)()===e?`${t} ${r}`:`${t}`;return(0,a.jsx)(o(),{href:e,className:i,children:s})}var d=r(719),c=r(6791),h=r(9541),u=r.n(h);let m=({width:e=800,height:t=600,wAmount:r=10,hAmount:s=10})=>{let i=(0,d.useRef)(null),[o,n]=(0,d.useState)(!1);return(0,d.useEffect)(()=>{let a=c.Ltv(i.current);a.selectAll("*").remove();let o=Math.floor(e/r),l=Math.floor(t/s),d=`rgb(${Math.floor(135*Math.random()+120)}, ${Math.floor(255*Math.random())}, ${Math.floor(135*Math.random()+120)})`,h=[];for(let e=0;e<=s;e++)for(let t=0;t<=r;t++){let r=t*o,a=e*l,s=Math.floor(6*Math.random()),i=r+o/2+(20*Math.random()-10),n=a+l/2+(20*Math.random()-10),d="";0===s?d=`M${r},${a} Q${i},${n} ${r+o},${a}`:1===s?d=`M${r+o},${a} Q${i},${n} ${r+o},${a+l}`:2===s?d=`M${r},${a+l} Q${i},${n} ${r+o},${a+l}`:3===s?d=`M${r},${a} Q${i},${n} ${r},${a+l}`:4===s?d=`M${r},${a} Q${i},${n} ${r+o},${a+l}`:5===s&&(d=`M${r},${a+l} Q${i},${n} ${r+o},${a}`),h.push({d:d})}a.attr("width",e).attr("height",t).style("opacity",0).transition().duration(500).style("opacity",1),a.selectAll("path").data(h).enter().append("path").attr("d",e=>e.d).attr("stroke",d).attr("stroke-width",1).attr("fill","none").attr("stroke-dasharray",function(){return this.getTotalLength()}).attr("stroke-dashoffset",function(){return this.getTotalLength()}).transition().delay((e,t)=>4*t).duration(800).ease(c.TD8).attr("stroke-dashoffset",0),setTimeout(()=>n(!0),100)},[e,t,r,s]),(0,a.jsx)("div",{id:u().animationWrapper,className:`${u().animationWrapper} ${o?u().visible:""}`,style:{width:e,height:t},children:(0,a.jsx)("svg",{ref:i})})};function p(){(0,d.useRef)(null);let[e,t]=(0,d.useState)({width:800,height:100});return(0,a.jsxs)("header",{className:u().wrapper,children:[(0,a.jsx)(m,{width:e.width,height:200,wAmount:20,hAmount:5}),(0,a.jsx)(o(),{href:"/",className:u().logoWrapper,children:(0,a.jsx)(s.default,{className:u().logo,src:"/jwy_logo_24.svg",alt:"handwritten style logo Jeremy Wiles-Young",width:150,height:150,priority:!0})}),(0,a.jsxs)("ul",{className:u().navWrapper,children:[(0,a.jsx)("li",{children:(0,a.jsx)(l,{href:"/",className:u().link,activeClassName:u().activeLink,children:"home"})}),(0,a.jsx)("li",{children:(0,a.jsx)(l,{href:"/objects",className:u().link,activeClassName:u().activeLink,children:"objects"})}),(0,a.jsx)("li",{children:(0,a.jsx)(l,{href:"/sounds",className:u().link,activeClassName:u().activeLink,children:"sounds"})}),(0,a.jsx)("li",{children:(0,a.jsx)(l,{href:"/videos",className:u().link,activeClassName:u().activeLink,children:"videos"})}),(0,a.jsx)("li",{children:(0,a.jsx)(l,{href:"/webprojects",className:u().link,activeClassName:u().activeLink,children:"web projects"})}),(0,a.jsx)("li",{children:(0,a.jsx)(l,{href:"/cv",className:u().link,activeClassName:u().activeLink,children:"cv"})}),(0,a.jsx)("li",{children:(0,a.jsx)(l,{href:"/shop",className:u().link,activeClassName:u().activeLink,children:"shop"})})]})]})}},9541:e=>{e.exports={wrapper:"header_wrapper__vLKwR",animationWrapper:"header_animationWrapper__sAUsb",visible:"header_visible___Bd_N",navWrapper:"header_navWrapper__2rvKb",link:"header_link__NxGjK",activeLink:"header_activeLink__ZsoB6",logoWrapper:"header_logoWrapper__J97iA",logo:"header_logo__Oouxh"}},483:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l,metadata:()=>n});var a=r(3002),s=r(3466),i=r.n(s),o=r(8005);r(2716);let n={title:"Jeremy Wiles-Young",description:"online portfolio of artworks by Jeremy Wiles-Young"};function l({children:e}){return(0,a.jsx)("html",{lang:"en",children:(0,a.jsxs)("body",{className:`${i().className} antialiased`,children:[(0,a.jsx)(o.default,{}),e]})})}},879:(e,t,r)=>{"use strict";r.d(t,{M$:()=>c,N7:()=>n,bG:()=>o,d$:()=>d,dG:()=>i,eH:()=>l});var a=r(6638);let s=process.env.WORDPRESS_GRAPHQL_ENDPOINT||"https://wp.jeremywy.com/graphql";async function i(){let e=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`
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
      `}),next:{revalidate:60}});return(await e.json()).data.posts.nodes.sort((e,t)=>{let r=new Date(e.acfPosts.date||"1970-01-01");return new Date(t.acfPosts.date||"1970-01-01").getTime()-r.getTime()})}async function o(e){let t=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`
        query GetPostsByCategory {
          posts(
            where: { categoryName: "${e}" }
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
      `}),next:{revalidate:60}});return(await t.json()).data.posts.nodes.sort((e,t)=>{let r=new Date(e.acfPosts.date||"1970-01-01");return new Date(t.acfPosts.date||"1970-01-01").getTime()-r.getTime()})}async function n(e){let t=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`
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
      `,variables:{slug:e}}),next:{revalidate:60}}),r=await t.json();return console.log("lkfds",r),r.data.postBy||null}async function l(){let e=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`
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
      `}),next:{revalidate:60}});return(await e.json()).data.cvEntries.nodes.map(e=>({title:e.title,type:e.cvEntryFields.type[0]??"undefined",date:e.cvEntryFields.date,location:e.cvEntryFields.location,description:e.cvEntryFields.description,renderDate:e.cvEntryFields.renderDate,link:e.cvEntryFields.link}))}async function d(){let e=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`
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
      `}),next:{revalidate:60}});return(await e.json()).data.products.nodes}async function c(e){let t;let r=(0,a.Ho)(e),i=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`
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
      `,variables:{slug:r}}),next:{revalidate:60}}),o=await i.text();try{t=JSON.parse(o)}catch(e){throw Error("Failed to parse JSON. Raw response:\n"+o+e)}return t.data.products?.nodes?.at(0)??null}},8005:(e,t,r)=>{"use strict";r.d(t,{default:()=>a});let a=(0,r(5002).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/jerrijung/Documents/jeremy-nextJS/nextjs-dashboard/app/lib/header.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/jerrijung/Documents/jeremy-nextJS/nextjs-dashboard/app/lib/header.tsx","default")},6638:(e,t,r)=>{"use strict";r.d(t,{Ho:()=>s,mN:()=>a});let a=e=>{console.log("the post look for the images: ",e);let t=[];for(let r=1;r<=4;r++){let a=e[`imageGallery${r}`];a&&t.push(a)}return t};function s(e){let t;switch(e){case"objects":t="things";break;case"sounds":t="sound";break;case"videos":t="video";break;case"webprojects":t="webportfolio";break;default:t=e}return t}},2716:()=>{}};