
export interface PortfolioSection {
  title: string;
  items: string[];
}

export interface PortfolioData {
  sections: {[key: string]: PortfolioSection};
  resumeText: string;
  linkedinSummary: string;
}
