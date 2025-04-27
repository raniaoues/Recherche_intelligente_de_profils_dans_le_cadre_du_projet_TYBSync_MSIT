
import { ProfileCard } from "./ProfileCard";
import { Employee } from "@/types/employee";

interface ProfileListProps {
  profiles: (Employee & { similarityScore?: number })[];
  searchQuery: string;
}

export const ProfileList = ({ profiles, searchQuery }: ProfileListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.length > 0 ? (
        profiles.map((profile) => (
          <ProfileCard 
            key={profile.id} 
            profile={profile} 
            searchQuery={searchQuery} 
          />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">
            Aucun ne correspond à votre recherche
          </h3>
          <p className="text-gray-500 mt-2">
            Essayez de modifier vos termes de recherche
          </p>
        </div>
      )}
    </div>
  );
};
