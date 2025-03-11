
import React from "react";

const ApplicantDashboard = () => {
  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Applicant Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Skill Overview</h2>
          <div>Skill Overview Placeholder</div>
        </div>
        
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Recommended Jobs</h2>
          <div>Recommended Jobs Placeholder</div>
        </div>
        
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Portfolio Preview</h2>
          <div>Portfolio Preview Placeholder</div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
