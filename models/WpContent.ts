import { wpContent } from "../types/wpContent";

export class WpContent implements wpContent {
  id = "";
  created_at = "";
  updated_at = "";
  slug = "";
  type = "";
  status = false;
  title = undefined;
  content = "";
  thumbnail = {
    src_url:
      "https://www.gibier.or.jp/wp-content/themes/gibier.or.jp/images/noimage.gif",
    width: 260,
    height: 195,
  };

  constructor(data: any) {
    this.setData(data);
  }

  setData(data: any) {
    this.id = data.id;
    this.title = data.title.rendered || "No Title";
    this.content = data.content.rendered;
    this.type = data.type;
    this.created_at = data.date;
    this.updated_at = data.modified;
    this.slug = data.slug;
    this.status = data.status === "publish" ? true : false;
    if (data["wp:featuredmedia"]) {
      this.thumbnail.src_url =
        data["wp:featuredmedia"][0]["media_details"]["sizes"]["full"][
          "source_url"
        ];
      this.thumbnail.width =
        data["wp:featuredmedia"][0]["media_details"]["sizes"]["full"]["width"];
      this.thumbnail.height =
        data["wp:featuredmedia"][0]["media_details"]["sizes"]["full"]["height"];
    }
  }
}
