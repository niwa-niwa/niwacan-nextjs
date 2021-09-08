import { getAllPageIds, getPageData } from "../../lib/staticPages";
import { wpContent } from "../../types/wpContent";

// TODO: implement layout
const StaticPage = ({ data }: { data: wpContent }) => {
  return <h1>{data.title}</h1>;
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
