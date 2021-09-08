import fetch from "node-fetch";
import { wpContent } from "./../types/wpContent";
import { WpContent } from "../models/WpContent";

export async function geAllStaticPages() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}${process.env.NEXT_PUBLIC_RESTAPI_WP_NAMESPACE}pages?_embed/`
  );
  const pages: any = await response.json();
  return pages;
}

export async function getAllPageIds() {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}${process.env.NEXT_PUBLIC_RESTAPI_WP_NAMESPACE}pages/`
  );
  const pages: any = await response.json();
  const content_data: wpContent[] = pages.map((page: any) => {
    return new WpContent(page);
  });

  return content_data.map((data: wpContent) => {
    return {
      params: {
        slug: data.slug,
      },
    };
  });
}

export async function getPageData(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}${process.env.NEXT_PUBLIC_RESTAPI_WP_NAMESPACE}pages/?slug=${slug}&_embed`
  );
  const page: any = await response.json();
  const data: wpContent = new WpContent(page[0]);
  return data;
}
