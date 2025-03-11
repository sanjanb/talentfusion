
import React from "react";

const RecruiterDashboard = () => {
  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Recruiter Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Candidate Profiles</h2>
          <div>Candidate Profiles Placeholder</div>
        </div>
        
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Job Postings</h2>
          <div>Job Postings Placeholder</div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
