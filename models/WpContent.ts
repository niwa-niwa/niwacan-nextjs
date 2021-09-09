import { wpContent } from "../types/wpContent";

export class WpContent implements wpContent {
  id = null;
  created_at = null;
  updated_at = null;
  slug = null;
  type = null;
  status = false;
  title = undefined;
  content = "";
  thumbnail =
    "https://www.gibier.or.jp/wp-content/themes/gibier.or.jp/images/noimage.gif";

  constructor(data: any) {
    this.setData(data);
  }

  setData(data: any) {
    console.log("title=", data.title);
    this.id = data.id;
    this.title = data.title.rendered || "No Title";
    this.content = data.content.rendered;
    this.type = data.type;
    this.created_at = data.date;
    this.updated_at = data.modified;
    this.slug = data.slug;
    this.status = data.status === "publish" ? true : false;
    if (data["wp:featuredmedia"]) {
      this.thumbnail =
        data["wp:featuredmedia"][0]["media_details"]["sizes"]["full"][
          "source_url"
        ];
    }
  }
}
