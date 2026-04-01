import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SiteNavbar from '../../components/feature/SiteNavbar';
import Footer from '../home/components/Footer';
import CourseHeader from './components/CourseHeader';
import FacilitiesBar from './components/FacilitiesBar';
import CourseFacts from './components/CourseFacts';
import CourseTimeslots from './components/CourseTimeslots';
import CourseInfoSections from './components/CourseInfoSections';
import { mockCourses, defaultCourse } from '../../mocks/courseDetail';

export default function CoursePage() {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const location = useLocation();
  const course = (courseSlug && mockCourses[courseSlug]) ? mockCourses[courseSlug] : defaultCourse;

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const timer = setTimeout(() => {
        const el = document.getElementById(state.scrollTo!);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <main className="font-sans bg-tee-white min-h-screen">
      <SiteNavbar />
      <CourseHeader course={course} />
      <FacilitiesBar course={course} />
      <CourseFacts course={course} />
      <CourseTimeslots course={course} />
      <CourseInfoSections course={course} />
      <Footer />
    </main>
  );
}
