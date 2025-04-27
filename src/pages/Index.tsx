
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { employeesData } from "@/data/employees";
import { calculateSimilarity } from "@/utils/similarityUtils";
import { Employee } from "@/types/employee";
import { ChessScene } from "@/components/ChessScene";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Employee[]>(employeesData);

  // Function to handle search queries
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults(employeesData);
      return;
    }

    const results = employeesData
      .filter(employee => {
        const matchName = employee.nom.toLowerCase().includes(query.toLowerCase());
        const matchTags = employee.tags.some(tag => 
          tag.toLowerCase().includes(query.toLowerCase())
        );
        const matchBio = employee.bio.toLowerCase().includes(query.toLowerCase());
        return matchName || matchTags || matchBio;
      });

    setSearchResults(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-200 mb-4">
              MSIT Conseil 
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto opacity-80">
            
          </p>
        </header>
        
        {/* Glowing search bar with futuristic design */}
        <div className="relative z-10 mb-16">
          <div className="absolute inset-0 blur-xl bg-blue-500/30 rounded-3xl"></div>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {/* 3D Chess Scene */}
        <ChessScene 
          profiles={searchResults} 
          onProfileSelect={() => {}}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default Index;
