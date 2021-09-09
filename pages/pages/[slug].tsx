import Image from "next/image";
import { getAllPageIds, getPageData } from "../../lib/staticPages";
import { wpContent } from "../../types/wpContent";

// TODO: implement layout
const StaticPage = ({ data }: { data: wpContent }) => {
  return (
    <>
      <p>{data.id}</p>
      <p>{data.created_at}</p>
      <p>{data.updated_at}</p>
      <p>{data.slug}</p>
      <p>{data.type}</p>
      <p>{data.status}</p>
      <p>{data.title}</p>
      <div>dangerouslySetInnerHTML={{ __html: data.content }}</div>
      <div>
        <Image src={data.thumbnail} alt={data.title} height={350} width={350} />
      </div>
    </>
  );
};
export default StaticPage;

export async function getStaticPaths() {
  const slugs: any = await getAllPageIds();
  return {
    paths: slugs,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const page: wpContent = await getPageData(params.slug);
  const data = JSON.parse(JSON.stringify(page));
  return {
    props: { data },
    revalidate: 3,
  };
}
