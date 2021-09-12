import Image from "next/image";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { wpContent } from "../../types/wpContent";
import { authParam } from "../../lib/authParam";
import useSWR from "swr";
import { useEffect } from "react";

const fetcher = (url: string) =>
  fetch(url, { headers: authParam }).then((res) => res.json());

const Post = ({ data }: { data: wpContent }) => {
  const { data: post, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}${process.env.NEXT_PUBLIC_RESTAPI_WP_NAMESPACE}pages/?slug=${data.slug}&_embed`,
    fetcher
  );

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <>
      <p>{data.id}</p>
      <p>{data.created_at}</p>
      <p>{data.updated_at}</p>
      <p>{data.slug}</p>
      <p>{data.type}</p>
      <p>{data.status}</p>
      <p>{data.title}</p>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
      <div>
        <Image
          src={data.thumbnail.src_url}
          alt={data.title}
          height={data.thumbnail.height}
          width={data.thumbnail.width}
        />
      </div>
    </>
  );
};
export default Post;

export async function getStaticPaths() {
  const slugs: any = await getAllPostIds();
  return {
    paths: slugs,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const post: wpContent = await getPostData(params.slug);
  const data = JSON.parse(JSON.stringify(post));
  return {
    props: { data },
    revalidate: 3,
  };
}
