
import React from "react";
import Welcome from "@/components/Welcome";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        <Welcome />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
