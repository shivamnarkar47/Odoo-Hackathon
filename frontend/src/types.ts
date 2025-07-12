export type Review = {
  id: number;
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  location: string;
  skills_offered: string[];
  skills_wanted: string[];
  profile_pic: string;
  is_public: boolean;
  availability: "Weekends" | "Daily" | "Evenings" | "Unavailable";
  rating: number;
  reviews: {
    reviewer: string;
    comment: string;
    score: number;
    date: string;
    id?: string | number;
  }[];
};
