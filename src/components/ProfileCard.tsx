
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin } from "lucide-react";
import { Employee } from "@/types/employee";
import { Progress } from "@/components/ui/progress";
import { highlightMatches } from "@/utils/similarityUtils";

interface ProfileCardProps {
  profile: Employee & { similarityScore?: number };
  searchQuery: string;
}

export const ProfileCard = ({ profile, searchQuery }: ProfileCardProps) => {
  const { nom, tags, bio, contact, similarityScore = 0 } = profile;
  const initials = nom.split(' ').map(n => n[0]).join('');
  
  // Only display percentage and progress when there's a search query
  const displayScore = searchQuery.trim() !== "" ? Math.round(similarityScore * 100) : null;
  
  // Only highlight matches when there's a search query
  const highlightedBio = searchQuery.trim() !== "" 
    ? highlightMatches(bio, searchQuery) 
    : bio;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="pb-0 pt-6 px-6 flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-gray-200">
          <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold text-xl">{nom}</h3>
          {displayScore !== null && (
            <div className="flex items-center gap-2 mt-1">
              <Progress 
                value={displayScore} 
                className={`h-2 w-24 ${displayScore > 75 ? 'bg-green-100' : displayScore > 40 ? 'bg-amber-100' : 'bg-red-100'}`}
                style={{
                  ['--progress-background']: displayScore > 75 ? 'rgb(34, 197, 94)' : displayScore > 40 ? 'rgb(245, 158, 11)' : 'rgb(239, 68, 68)'
                } as React.CSSProperties}
              />
              <span className={`text-sm font-medium ${displayScore > 75 ? 'text-green-600' : displayScore > 40 ? 'text-amber-600' : 'text-red-600'}`}>
                {displayScore}%
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-6 py-4 flex-grow flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="font-normal px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="mb-4 flex-grow">
          <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: highlightedBio }}></p>
        </div>
        
        <div className="flex items-center justify-end gap-2 mt-auto pt-2 border-t border-gray-100">
          {contact.linkedin && (
            <a 
              href={`https://${contact.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          )}
          {contact.portfolio && (
            <a 
              href={`https://${contact.portfolio}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 text-sm"
            >
              Portfolio
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
