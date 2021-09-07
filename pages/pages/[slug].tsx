import { getAllPageIds, getPageData } from "../../lib/staticPages";

const StaticPage = (props: any) => {
  return <h1>{props.page.title.rendered}</h1>;
};
export default StaticPage;

export async function getStaticPaths() {
  const slugs = await getAllPageIds();

  return {
    paths: slugs,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  console.log("params= " + params.slug);
  const page: any = await getPageData(params.slug);
  return {
    props: { page: page[0] },
    revalidate: 3,
  };
}
