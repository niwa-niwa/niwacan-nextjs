import fetch from "node-fetch";

// TODO: makes entity(type) of static page
// TODO: assign types to each functions

export async function geAllStaticPages() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}${process.env.NEXT_PUBLIC_RESTAPI_WP_NAMESPACE}pages?_embed/`
  );
  const pages = await response.json();
  return pages;
}

export async function getAllPageIds() {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}${process.env.NEXT_PUBLIC_RESTAPI_WP_NAMESPACE}pages/`
  );
  const pages: any = await response.json();

  return pages.map((post: any) => {
    return {
      params: {
        slug: String(post.slug),
      },
    };
  });
}

export async function getPageData(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}${process.env.NEXT_PUBLIC_RESTAPI_WP_NAMESPACE}pages/?slug=${slug}`
  );
  const page = await response.json();
  return page;
}
