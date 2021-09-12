import fetch from "node-fetch";
import { authParam } from "./authParam";
import { wpContent } from "../types/wpContent";
import { WpContent } from "../models/WpContent";

export async function getAllPostsData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}${process.env.NEXT_PUBLIC_RESTAPI_WP_NAMESPACE}posts?_embed/`,
    { headers: authParam }
  );
  const tasks: any = await response.json();
  const wp_data: wpContent[] = tasks.map((task: any) => {
    return new WpContent(task);
  });
  return wp_data;
}

export async function getAllPostIds() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}${process.env.NEXT_PUBLIC_RESTAPI_WP_NAMESPACE}posts/`,
    { headers: authParam }
  );

  const tasks: any = await response.json();
  const wp_data: wpContent[] = tasks.map((task: any) => {
    return new WpContent(task);
  });
  return wp_data.map((data: wpContent) => {
    return {
      params: {
        slug: data.slug,
      },
    };
  });
}

export async function getPostData(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}${process.env.NEXT_PUBLIC_RESTAPI_WP_NAMESPACE}posts/?slug=${slug}&_embed`,
    { headers: authParam }
  );

  const post: any = await response.json();
  const data: wpContent = new WpContent(post[0]);
  return data;
}
