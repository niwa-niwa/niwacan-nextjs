type thumbnail = {
  src_url: string;
  width: number;
  height: number;
};

export type wpContent = {
  id: string | null;
  created_at: string | null;
  updated_at: string | null;
  slug: string | null;
  type: string | null;
  status: boolean;
  title: string | undefined;
  content: string;
  thumbnail: thumbnail;
};
