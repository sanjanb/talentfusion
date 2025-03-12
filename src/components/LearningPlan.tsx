
import React, { useState, useEffect } from 'react';
import { Book, GraduationCap, Lightbulb, ExternalLink, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import AnimatedButton from './ui/AnimatedButton';
import { ScaleLoader } from 'react-spinners';

interface Course {
  id: string;
  title: string;
  provider: string;
  url: string;
  duration: string;
  level: string;
  skill: string;
  description: string;
  price: string;
  progress?: number;
}

const LearningPlan = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        // Simulating a fetch request to get courses
        setTimeout(() => {
          setCourses([
            {
              id: '1',
              title: 'Advanced React Patterns',
              provider: 'Frontend Masters',
              url: 'https://frontendmasters.com/courses/advanced-react-patterns/',
              duration: '6 hours',
              level: 'Advanced',
              skill: 'React',
              description: 'Learn advanced React patterns from basic composition to HOCs. Understand the trade-offs of different techniques to create reusable React components.',
              price: '$39/month subscription',
              progress: 25
            },
            {
              id: '2',
              title: 'TypeScript Deep Dive',
              provider: 'Udemy',
              url: 'https://www.udemy.com/course/typescript-the-complete-developers-guide/',
              duration: '12 hours',
              level: 'Intermediate',
              skill: 'TypeScript',
              description: 'This course is designed for developers who want to build scalable, error-free, maintainable applications with TypeScript.',
              price: '$19.99',
              progress: 50
            },
            {
              id: '3',
              title: 'Complete Node.js Developer',
              provider: 'Coursera',
              url: 'https://www.coursera.org/learn/nodejs',
              duration: '3 months',
              level: 'Intermediate',
              skill: 'Node.js',
              description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Jest, and more!',
              price: 'Free with trial',
              progress: 0
            },
            {
              id: '4',
              title: 'AWS Certified Developer',
              provider: 'A Cloud Guru',
              url: 'https://acloudguru.com/course/aws-certified-developer-associate',
              duration: '20 hours',
              level: 'Intermediate',
              skill: 'AWS',
              description: 'This course will help you master deploying, managing, and operating applications on the AWS platform.',
              price: '$35/month subscription',
              progress: 0
            },
            {
              id: '5',
              title: 'CSS for JavaScript Developers',
              provider: 'Josh W Comeau',
              url: 'https://css-for-js.dev/',
              duration: 'Self-paced',
              level: 'Intermediate',
              skill: 'CSS',
              description: 'An interactive, comprehensive course designed to help JavaScript developers become confident with CSS.',
              price: '$149',
              progress: 0
            }
          ]);
          setEnrolledCourses(['1', '2']);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setIsLoading(false);
        toast({
          title: 'Error',
          description: 'Failed to load learning resources. Please try again later.',
          variant: 'destructive',
        });
      }
    };

    fetchCourses();
  }, [toast]);

  const handleEnroll = (courseId: string) => {
    if (enrolledCourses.includes(courseId)) {
      // Already enrolled, do nothing or handle differently
      return;
    }

    // Add to enrolled courses
    setEnrolledCourses([...enrolledCourses, courseId]);
    
    toast({
      title: 'Enrolled Successfully',
      description: `You've been enrolled in the course. Start learning now!`,
    });
  };

  const getCourseStatusBadge = (courseId: string, progress?: number) => {
    if (!enrolledCourses.includes(courseId)) {
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          Not Enrolled
        </Badge>
      );
    }

    if (progress && progress >= 100) {
      return (
        <Badge variant="default" className="bg-green-500">
          Completed
        </Badge>
      );
    }

    if (progress && progress > 0) {
      return (
        <Badge variant="default" className="bg-blue-500">
          In Progress
        </Badge>
      );
    }

    return (
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
        Enrolled
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <ScaleLoader color="#3b82f6" height={35} width={4} radius={2} margin={2} />
          <p className="mt-4 text-gray-500">Loading your learning plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Learning Plan</h2>
        <Button variant="outline" size="sm">
          <GraduationCap className="mr-2" size={16} />
          View All Courses
        </Button>
      </div>
      
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <span>{course.provider}</span> • 
                    <span>{course.duration}</span> • 
                    <span>{course.level}</span>
                  </CardDescription>
                </div>
                {getCourseStatusBadge(course.id, course.progress)}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{course.description}</p>
              
              {enrolledCourses.includes(course.id) && course.progress !== undefined && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}
              
              <div className="flex items-center text-sm text-gray-500">
                <Lightbulb size={14} className="mr-1" />
                <span className="mr-2">Skill:</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-none">
                  {course.skill}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="text-sm text-gray-500">{course.price}</div>
              <div className="flex gap-2">
                {enrolledCourses.includes(course.id) ? (
                  <AnimatedButton
                    variant="default"
                    size="sm"
                    animation="scale"
                    asChild
                  >
                    <a 
                      href={course.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <Book size={14} className="mr-1.5" />
                      Continue Learning
                      <ExternalLink size={12} className="ml-1.5" />
                    </a>
                  </AnimatedButton>
                ) : (
                  <AnimatedButton
                    variant="outline"
                    size="sm"
                    animation="scale"
                    onClick={() => handleEnroll(course.id)}
                  >
                    <GraduationCap size={14} className="mr-1.5" />
                    Enroll Now
                  </AnimatedButton>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningPlan;
