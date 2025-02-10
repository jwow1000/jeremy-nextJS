import { Entry, WordPressAPIResponse, WordPressCVEntry,  } from "@/app/types/cvEntryTypes";
import {MediaDetails, FeaturedImage, ACFPost, Post, PostResponse} from "@/app/types/postTypes";

const API_URL = process.env.WORDPRESS_GRAPHQL_ENDPOINT || "https://jeremywy.com/graphql";

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
  