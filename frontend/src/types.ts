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

interface Swap {
  id: number;
  requester: {
    id: number;
    name: string;
    email: string;
  };
  receiver: {
    id: number;
    name: string;
    email: string;
  };
  skill_offered: {
    id: number;
    name: string;
  };
  skill_wanted: {
    id: number;
    name: string;
  };
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  updated_at: string;
  requester_rating: number | null;
  requester_feedback: string;
  receiver_rating: number | null;
  receiver_feedback: string;
}
