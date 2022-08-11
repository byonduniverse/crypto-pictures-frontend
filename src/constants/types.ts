export type Picture = {
  id?: number;
  uri?: string;
  author?: string;
  createAt?: string;
};

export type PictureDetail = {
  uri?: string;
  author?: string;
  createAt?: string;
  description?: string;
  name?: string;
  file?: File;
};
