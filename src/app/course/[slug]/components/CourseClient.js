import React from 'react'
import CourseHero from './Hero'
import WhatYouWillLearn from './WhatYouLearn';
import CourseOverview from './CourseOverview';
import CourseModules from './CourseModule';
import WhoIsThisCourseFor from './WhoIsThisFor';
import StudentResult from './StudentsResult';
import CourseCTA from './CTA';
import { FaBookOpen, FaBullhorn, FaCheckCircle, FaComments, FaMicrophone, FaUserTie } from 'react-icons/fa';


// const course = {
//   _id: "685a1f4a7b9c4d001f2e1234",

//   title: "English Speaking Mastery",

//   slug: "english-speaking-mastery",

//   shortDescription:
//     "Improve your spoken English, communication skills, confidence, and fluency through live interactive classes, speaking practice sessions, and real-life conversations.",

//   description: `
// English Speaking Mastery is a complete communication program designed for students, job seekers, and professionals who want to speak English confidently.

// The course focuses on grammar, vocabulary, pronunciation, public speaking, interview preparation, and daily conversation practice. Students participate in live classes, speaking activities, role plays, and confidence-building exercises.

// By the end of the program, learners will be able to communicate effectively in academic, professional, and social situations.
//   `,

//   thumbnail: {
//     public_id: "courses/english-speaking-mastery",
//     url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
//   },

//   price: 4999,

//   durationInMonths: 3,

//   level: "beginner",

//   language: "English",

//   category: "English Speaking",

//   status: "published",

//   enrollmentOpen: true,

//   tags: [
//     "spoken english",
//     "communication",
//     "public speaking",
//     "interview preparation",
//     "fluency",
//   ],

//   learningOutcomes: [
//     "Speak confidently in English",
//     "Improve pronunciation and fluency",
//     "Master daily conversations",
//     "Enhance vocabulary naturally",
//     "Prepare for interviews and presentations",
//     "Develop public speaking confidence",
//   ],

//   requirements: [
//     "Basic understanding of English",
//     "Internet connection for live classes",
//     "Notebook for assignments",
//   ],

//   targetAudience: [
//     "School Students",
//     "College Students",
//     "Job Seekers",
//     "Working Professionals",
//     "Beginners",
//   ],

//   modules: [
//     {
//       title: "Introduction to English Communication",
//       description:
//         "Build confidence and understand communication fundamentals.",
//     },
//     {
//       title: "Grammar Simplified",
//       description:
//         "Learn practical grammar used in daily conversations.",
//     },
//     {
//       title: "Vocabulary Building",
//       description:
//         "Expand your vocabulary with real-life examples.",
//     },
//     {
//       title: "Pronunciation & Accent",
//       description:
//         "Improve pronunciation and speaking clarity.",
//     },
//     {
//       title: "Public Speaking",
//       description:
//         "Present ideas confidently in front of others.",
//     },
//     {
//       title: "Interview Preparation",
//       description:
//         "Prepare for job interviews and professional communication.",
//     },
//   ],

//   certificateAvailable: true,

//   classType: "Live Online",

//   seoTitle:
//     "English Speaking Mastery Course | Rohit Academy",

//   seoDescription:
//     "Join our English Speaking Mastery course and improve your communication, fluency, confidence, and public speaking skills.",

//   batches: [
//     {
//       _id: "batch1",
//       name: "Morning Batch",
//       startDate: "2026-07-01",
//       students: 35,
//     },
//     {
//       _id: "batch2",
//       name: "Evening Batch",
//       startDate: "2026-07-10",
//       students: 28,
//     },
//   ],

//   createdAt: "2026-06-20T10:00:00.000Z",
//   updatedAt: "2026-06-23T10:00:00.000Z",
//   modules: [
//   {
//     title: "Introduction to Spoken English",
//     description:
//       "Build confidence with basic conversations and daily communication.",
//     lessons: [
//       "Self Introduction",
//       "Basic Greetings",
//       "Daily Vocabulary",
//       "Simple Conversations",
//     ],
//   },
//   {
//     title: "Grammar Foundations",
//     description:
//       "Learn the grammar required for accurate speaking and writing.",
//     lessons: [
//       "Tenses",
//       "Sentence Structure",
//       "Articles & Prepositions",
//       "Common Grammar Mistakes",
//     ],
//   },
//   {
//     title: "Public Speaking & Confidence",
//     description:
//       "Improve fluency and presentation skills through practical exercises.",
//     lessons: [
//       "Speech Practice",
//       "Storytelling",
//       "Presentation Skills",
//       "Confidence Building",
//     ],
//   },
// ],
// results: [
//   {
//     name: "Aman Sharma",
//     image:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43d",
//     achievement: "Improved Spoken English Confidence",
//     result: "Beginner → Fluent Speaker",
//     quote:
//       "I was afraid of speaking English in class. After completing this course, I confidently participate in discussions and presentations.",
//   },
//   {
//     name: "Priya Verma",
//     image:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
//     achievement: "Scored IELTS 7.5",
//     result: "Band 5.5 → Band 7.5",
//     quote:
//       "The speaking and writing modules helped me achieve my target score for studying abroad.",
//   },
//   {
//     name: "Rahul Singh",
//     image:
//       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
//     achievement: "Improved Academic Performance",
//     result: "More Confidence in School",
//     quote:
//       "My grammar and vocabulary improved significantly. I now communicate much better in English.",
//   },
// ],
//  learnings : [
//   {
//     icon: <FaComments />,
//     title: "Speak Confidently",
//     description:
//       "Hold conversations naturally and express your ideas with confidence.",
//   },
//   {
//     icon: <FaMicrophone />,
//     title: "Improve Pronunciation",
//     description:
//       "Learn proper pronunciation, intonation, and speaking clarity.",
//   },
//   {
//     icon: <FaBookOpen />,
//     title: "Build Vocabulary",
//     description:
//       "Expand your vocabulary with practical words used in daily life.",
//   },
//   {
//     icon: <FaCheckCircle />,
//     title: "Master Grammar",
//     description:
//       "Understand grammar through real examples and speaking activities.",
//   },
//   {
//     icon: <FaUserTie />,
//     title: "Interview Preparation",
//     description:
//       "Answer interview questions confidently and professionally.",
//   },
//   {
//     icon: <FaBullhorn />,
//     title: "Public Speaking",
//     description:
//       "Present ideas clearly and improve communication in groups.",
//   },
// ],
//    whoIsThisFor: [
//   "Students from Class 6 to 12 who want better English communication",
//   "Beginners who struggle to speak English confidently",
//   "Students preparing for IELTS or study abroad opportunities",
//   "Working professionals looking to improve workplace communication",
//   "Anyone wanting to improve grammar, vocabulary, and fluency",
// ]
// };

export default function CourseClient({course}) {
  console.log(course)
  return (
   <>
   <CourseHero course={course}></CourseHero>
   <WhatYouWillLearn learnings={course.learnings}></WhatYouWillLearn>
   <CourseOverview course={course}></CourseOverview>
   <CourseModules modules={course.modules}></CourseModules>
   <WhoIsThisCourseFor whoIsThisFor={course.whoIsThisFor}></WhoIsThisCourseFor>
   <StudentResult results={course.results}></StudentResult>
   <CourseCTA course={course}></CourseCTA>

   </>
  )
}
