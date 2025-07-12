import React from "react";
import { Button } from "../ui/button";
import SkillTag from "../UserProfile/SkillTag";
import Badge from "../UserProfile/Badge";
import ProfileHeader from "../UserProfile/ProfileHeader";
import type { User } from "../../types";
import { useParams } from "react-router";

interface UserProfileProps {
  user: User | null;
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onBack }) => {
  const { id } = useParams();

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-10 text-center">
        <h2 className="text-xl font-bold mb-2">User not found</h2>
        {onBack ? (
          <button onClick={onBack} className="text-blue-600 underline">
            Go Back
          </button>
        ) : (
          <p>Please provide user data.</p>
        )}
      </div>
    );
  }

  const averageRating = user.reviews != null ? user.reviews.reduce((sum, review) => sum + review.score, 0) / user.reviews.length : 2;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-background">
      <Button onClick={onBack} variant="ghost" className="mb-6 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Community
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-1">
          <div className="bg-card border border-muted rounded-xl shadow-sm p-6 flex flex-col items-center sticky top-6">
            <ProfileHeader
              name={user.name}
              email={user.email}
              profilePic={user.profile_pic}
            />

            <div className="mt-4 w-full space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-muted">
                <span className="text-muted-foreground">Location</span>
                <span>{user.location}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-muted">
                <span className="text-muted-foreground">Rating</span>
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {averageRating.toFixed(1)} ({user.reviews != null ? user.reviews.length : 0} reviews)
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-muted">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  text={user.availability}
                  variant={user.availability === "Unavailable" ? "danger" : "success"}
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Profile</span>
                <Badge
                  text={user.is_public ? "Public" : "Private"}
                  variant={user.is_public ? "info" : "neutral"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-muted rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-muted">
              <h2 className="text-xl font-semibold">Skills</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-lg mb-3 text-green-600">Skills Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills_offered.map((skill, idx) => (
                    <SkillTag key={idx} skill={skill} variant="offered" />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-3 text-blue-600">Skills Wanted</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills_wanted.map((skill, idx) => (
                    <SkillTag key={idx} skill={skill} variant="wanted" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-muted rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-muted">
              <h2 className="text-xl font-semibold">Reviews & Feedback</h2>
              <p className="text-muted-foreground text-sm mt-1">
                {user.reviews != null ? user.reviews.length : 0} reviews with an average rating of{" "}
                {averageRating.toFixed(1)}
              </p>
            </div>

            <div className="p-6 space-y-6">
              {user.reviews != null && user.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-muted pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{review.reviewer}</h3>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-medium">{review.score.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="mt-3 text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
