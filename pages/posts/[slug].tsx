import Image from "next/image";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { wpContent } from "../../types/wpContent";

const Post = ({ data }: { data: wpContent }) => {
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
  console.log(post);
  return {
    props: { data },
    revalidate: 3,
  };
}
