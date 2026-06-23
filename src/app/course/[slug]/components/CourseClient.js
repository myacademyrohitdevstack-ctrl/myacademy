import React from 'react'
import CourseHero from './Hero'
import WhatYouWillLearn from './WhatYouLearn';
import CourseOverview from './CourseOverview';
import CourseModules from './CourseModule';
import WhoIsThisCourseFor from './WhoIsThisFor';
import StudentResult from './StudentsResult';
import CourseCTA from './CTA';


const course = {
  _id: "685a1f4a7b9c4d001f2e1234",

  title: "English Speaking Mastery",

  slug: "english-speaking-mastery",

  shortDescription:
    "Improve your spoken English, communication skills, confidence, and fluency through live interactive classes, speaking practice sessions, and real-life conversations.",

  description: `
English Speaking Mastery is a complete communication program designed for students, job seekers, and professionals who want to speak English confidently.

The course focuses on grammar, vocabulary, pronunciation, public speaking, interview preparation, and daily conversation practice. Students participate in live classes, speaking activities, role plays, and confidence-building exercises.

By the end of the program, learners will be able to communicate effectively in academic, professional, and social situations.
  `,

  thumbnail: {
    public_id: "courses/english-speaking-mastery",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },

  price: 4999,

  durationInMonths: 3,

  level: "beginner",

  language: "English",

  category: "English Speaking",

  status: "published",

  enrollmentOpen: true,

  tags: [
    "spoken english",
    "communication",
    "public speaking",
    "interview preparation",
    "fluency",
  ],

  learningOutcomes: [
    "Speak confidently in English",
    "Improve pronunciation and fluency",
    "Master daily conversations",
    "Enhance vocabulary naturally",
    "Prepare for interviews and presentations",
    "Develop public speaking confidence",
  ],

  requirements: [
    "Basic understanding of English",
    "Internet connection for live classes",
    "Notebook for assignments",
  ],

  targetAudience: [
    "School Students",
    "College Students",
    "Job Seekers",
    "Working Professionals",
    "Beginners",
  ],

  modules: [
    {
      title: "Introduction to English Communication",
      description:
        "Build confidence and understand communication fundamentals.",
    },
    {
      title: "Grammar Simplified",
      description:
        "Learn practical grammar used in daily conversations.",
    },
    {
      title: "Vocabulary Building",
      description:
        "Expand your vocabulary with real-life examples.",
    },
    {
      title: "Pronunciation & Accent",
      description:
        "Improve pronunciation and speaking clarity.",
    },
    {
      title: "Public Speaking",
      description:
        "Present ideas confidently in front of others.",
    },
    {
      title: "Interview Preparation",
      description:
        "Prepare for job interviews and professional communication.",
    },
  ],

  certificateAvailable: true,

  classType: "Live Online",

  seoTitle:
    "English Speaking Mastery Course | Rohit Academy",

  seoDescription:
    "Join our English Speaking Mastery course and improve your communication, fluency, confidence, and public speaking skills.",

  batches: [
    {
      _id: "batch1",
      name: "Morning Batch",
      startDate: "2026-07-01",
      students: 35,
    },
    {
      _id: "batch2",
      name: "Evening Batch",
      startDate: "2026-07-10",
      students: 28,
    },
  ],

  createdAt: "2026-06-20T10:00:00.000Z",
  updatedAt: "2026-06-23T10:00:00.000Z",
};

export default function CourseClient() {
  return (
   <>
   <CourseHero course={course}></CourseHero>
   <WhatYouWillLearn></WhatYouWillLearn>
   <CourseOverview course={course}></CourseOverview>
   <CourseModules></CourseModules>
   <WhoIsThisCourseFor></WhoIsThisCourseFor>
   <StudentResult></StudentResult>
   <CourseCTA></CourseCTA>

   </>
  )
}
