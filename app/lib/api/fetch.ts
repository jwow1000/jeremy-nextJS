import { Entry, WordPressAPIResponse } from "@/app/types/cvEntryTypes";
import { Post, PostResponse, PostCategory } from "@/app/types/postTypes";
import { translateSlugs } from "../helperFunctions";

const API_URL = process.env.WORDPRESS_GRAPHQL_ENDPOINT || "https://wp.jeremywy.com/graphql";

// local use functions
function transformExpoData(json: WordPressAPIResponse): Entry[] {
  return json.data.cvEntries.nodes.map((item) => ({
    title: item.title,
    type: item.cvEntryFields.type[0] ?? "undefined", // Use ?? instead of |
    date: item.cvEntryFields.date,
    location: item.cvEntryFields.location,
    description: item.cvEntryFields.description,
    renderDate: item.cvEntryFields.renderDate,
    link: item.cvEntryFields.link,
  }));
}

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

// use to get immix-tracks
export async function getImmixTracks(): Promise<Post[]> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
      `,
    }),
    next: { revalidate: 60 },
  });

  const json: PostResponse = await res.json();

  // Ensure acfPosts.date exists before sorting
  return json.data.posts.nodes.sort((a, b) => {
    const dateA = new Date(a.acfPosts.date || "1970-01-01");
    const dateB = new Date(b.acfPosts.date || "1970-01-01");

    return dateB.getTime() - dateA.getTime();
  });
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
      `,
    }),
    next: { revalidate: 60 },
  });

  const json: PostResponse = await res.json();

  // Ensure acfPosts.date exists before sorting
  return json.data.posts.nodes.sort((a, b) => {
    const dateA = new Date(a.acfPosts.date || "1970-01-01");
    const dateB = new Date(b.acfPosts.date || "1970-01-01");

    return dateB.getTime() - dateA.getTime();
  });
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
      variables: { slug },
    }),
    next: {revalidate: 60},
  });

  const json = await res.json();
  console.log("lkfds", json)
  return json.data.postBy || null;
  
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
                link
              }
 
            }
          }
        }
      `,
    }),
    next: { revalidate: 60 }, // ISR (Incremental Static Regeneration)
  });

  const json = await res.json();
  // console.log("did we content", json.data.cvEntries.nodes);
  const expoData: Entry[] = transformExpoData(json);
  return expoData;
}

// get category info, use getPostsByCategory to get posts
export async function getCategoryBySlug(slug: string): Promise<PostCategory> {
  
  const newSlug = translateSlugs( slug );
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
      variables: { newSlug }, 
    }),
    next: { revalidate: 60 }, // ISR (Incremental Static Regeneration)
  });

  const json = await res.json();
  console.log("did we get content", json.data)
  return json.data;
}