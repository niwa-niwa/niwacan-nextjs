type thumbnail = {
  src_url: string;
  width: number;
  height: number;
};

export type wpContent = {
  id?: string;
  created_at?: string;
  updated_at?: string;
  slug?: string;
  type?: string;
  status?: boolean;
  title: string | undefined;
  content: string;
  thumbnail: thumbnail;
};
