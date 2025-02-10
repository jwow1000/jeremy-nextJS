const API_URL = process.env.WORDPRESS_GRAPHQL_ENDPOINT || "https://jeremywy.com/graphql";
// const API_URL = process.env.WORDPRESS_REST_API_ENDPOINT || "https://jeremywy.com/wp-json/wp/v2";

// export async function getPosts() {
//   const res = await fetch(`${API_URL}/posts?_fields=id,title,excerpt,slug,date`, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//     next: { revalidate: 60 }, // ISR (Incremental Static Regeneration)
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch posts");
//   }

//   const posts = await res.json();
//   return posts;
// }

// export async function getVideoPosts() {
//   // First, get the category ID for "video"
//   const categoryRes = await fetch(`${API_URL}/categories?slug=video`, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   });

//   if (!categoryRes.ok) {
//     throw new Error("Failed to fetch category ID");
//   }

//   const categoryData = await categoryRes.json();
//   const videoCategoryId = categoryData[0]?.id;

//   if (!videoCategoryId) {
//     throw new Error("Category 'video' not found");
//   }

//   // Fetch posts in the "video" category
//   const res = await fetch(
//     `${API_URL}/posts?categories=${videoCategoryId}&_fields=id,title,excerpt,slug,date`,
//     {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//       next: { revalidate: 60 }, // ISR (Incremental Static Regeneration)
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch video posts");
//   }

//   const posts = await res.json();
//   return posts;
// }





export async function getPosts() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
      `,
    }),
    next: { revalidate: 60 }, // ISR (Incremental Static Regeneration)
  });

  const json = await res.json();
  // console.log("did we content", json.data.posts.nodes)
  return json.data.posts.nodes;
}

export async function getVideoPosts() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query GetVideoPosts {
          posts(
            where: { categoryName: "video" }
          ) {
            nodes {
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
              acfPosts{
               date
              }
            }
          }
        }
      `,
    }),
    next: { revalidate: 60 },
  });

  const json = await res.json();
  // Ensure acfPosts.date exists before sorting
  return json.data.posts.nodes.sort((a: any, b: any) => {
    const dateA = new Date(a.acfPosts?.date || "1970-01-01");
    const dateB = new Date(b.acfPosts?.date || "1970-01-01");
  
    return dateB.getTime() - dateA.getTime();
  });
  
}

export async function getCVEntries() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
              }
 
            }
          }
        }
      `,
    }),
    next: { revalidate: 60 }, // ISR (Incremental Static Regeneration)
  });

  const json = await res.json();
  console.log("did we content", json.data)
  return json.data;
}