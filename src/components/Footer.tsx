
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="container max-w-7xl mx-auto py-10 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-3">CareerBoost</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Empowering job seekers with AI-driven skill analysis and portfolio creation tools.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={18} className="text-gray-500 hover:text-foreground transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} className="text-gray-500 hover:text-foreground transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={18} className="text-gray-500 hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link to="/skills" className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors">Skills Analysis</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors">Job Matching</Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors">Career Tips</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors">Learning Resources</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors">FAQ</a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-500" />
                <a href="mailto:contact@careerboost.ai" className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors">
                  contact@careerboost.ai
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <form className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="Subscribe to our newsletter" 
                  className="border border-border bg-background rounded p-2 text-sm"
                />
                <button 
                  type="submit" 
                  className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {currentYear} CareerBoost. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
        
        <div className="text-center mt-6 text-xs text-gray-400 flex items-center justify-center">
          <span>Made with</span>
          <Heart size={12} className="mx-1 text-red-400" />
          <span>by CareerBoost Team</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
