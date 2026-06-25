
import {
  FaComments,
  FaMicrophone,
  FaBookOpen,
  FaCheckCircle,
  FaUserTie,
  FaBullhorn,
  FaGlobeEurope,
  FaGraduationCap,
} from "react-icons/fa";

export const coursesData = [

{
  _id: "685a1f4a7b9c4d001f2e1234",

  title: "English Speaking Mastery Course",

  slug: "english-speaking-mastery",

  shortDescription:
    "Master spoken English, communication skills, pronunciation, vocabulary, public speaking, and interview preparation through live interactive classes designed for students, professionals, and job seekers.",

  description: `
English Speaking Mastery is a comprehensive Spoken English and Communication Skills Program designed to help learners become confident, fluent, and effective English speakers.

The course focuses on practical communication rather than memorization. Students participate in live speaking activities, role plays, group discussions, pronunciation exercises, grammar workshops, vocabulary-building sessions, presentation practice, and interview preparation.

Whether you are a school student, college student, job seeker, working professional, entrepreneur, or someone who wants to improve communication skills, this course provides a structured learning path from beginner to advanced speaking confidence.

Throughout the program, learners receive personalized feedback, speaking assessments, confidence-building activities, and real-world communication practice.

By the end of the course, students will be able to communicate fluently in personal, academic, professional, and social situations while demonstrating stronger vocabulary, pronunciation, confidence, and public speaking abilities.
  `,

  thumbnail: {
    public_id: "courses/english-speaking-mastery",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },

  // price: 4999,

  durationInMonths: 3,

  level: "Beginner to Intermediate",

  language: "English",

  category: "English Speaking",

  status: "published",

  enrollmentOpen: true,

  tags: [
    "english speaking course",
    "spoken english classes",
    "communication skills",
    "english fluency",
    "spoken english training",
    "public speaking",
    "interview preparation",
    "english grammar",
    "vocabulary building",
    "personality development",
    "english communication",
    "confidence building",
  ],

  learningOutcomes: [
    "Speak English confidently in daily life",
    "Improve pronunciation and fluency",
    "Build a strong practical vocabulary",
    "Master spoken grammar naturally",
    "Participate confidently in group discussions",
    "Improve public speaking skills",
    "Prepare for job interviews effectively",
    "Enhance workplace communication",
    "Reduce hesitation while speaking",
    "Develop confidence in presentations and conversations",
  ],

  requirements: [
    "Basic understanding of English is helpful but not mandatory",
    "Internet connection for online sessions",
    "Notebook for assignments and practice",
    "Commitment to participate in speaking activities",
  ],

  targetAudience: [
    "School Students",
    "College Students",
    "Job Seekers",
    "Working Professionals",
    "Entrepreneurs",
    "Beginners who struggle to speak English",
    "Students preparing for study abroad opportunities",
  ],

  modules: [
    {
      title: "Introduction to Spoken English",
      description:
        "Build confidence through basic communication and everyday conversations.",
      lessons: [
        "Self Introduction",
        "Greetings and Introductions",
        "Basic Vocabulary",
        "Daily Conversations",
      ],
    },
    {
      title: "Grammar Foundations",
      description:
        "Learn practical grammar required for fluent communication.",
      lessons: [
        "Tenses",
        "Sentence Structure",
        "Articles",
        "Prepositions",
        "Common Grammar Mistakes",
      ],
    },
    {
      title: "Vocabulary Development",
      description:
        "Expand vocabulary for academic, professional, and daily communication.",
      lessons: [
        "Daily Use Vocabulary",
        "Professional Vocabulary",
        "Synonyms and Antonyms",
        "Word Usage Practice",
      ],
    },
    {
      title: "Pronunciation & Accent Improvement",
      description:
        "Improve pronunciation, clarity, and speaking confidence.",
      lessons: [
        "Pronunciation Rules",
        "Stress and Intonation",
        "Accent Neutralization",
        "Speaking Practice",
      ],
    },
    {
      title: "Public Speaking & Presentation Skills",
      description:
        "Learn to communicate confidently in front of an audience.",
      lessons: [
        "Speech Practice",
        "Presentation Techniques",
        "Storytelling",
        "Audience Engagement",
      ],
    },
    {
      title: "Interview Preparation",
      description:
        "Develop communication skills required for interviews and professional settings.",
      lessons: [
        "HR Interview Questions",
        "Mock Interviews",
        "Professional Communication",
        "Confidence Building",
      ],
    },
  ],

  certificateAvailable: true,

  classType: "Live Online",

  seoTitle:
    "English Speaking Course | Spoken English Classes & Communication Skills Training",

  seoDescription:
    "Join our English Speaking Mastery Course to improve spoken English, fluency, communication skills, public speaking, interview preparation, pronunciation, and confidence through expert-led live classes.",

  batches: [
    {
      _id: "eng-batch-1",
      name: "Morning Batch",
      startDate: "2026-07-01",
      students: 35,
    },
    {
      _id: "eng-batch-2",
      name: "Evening Batch",
      startDate: "2026-07-10",
      students: 28,
    },
  ],

  createdAt: "2026-06-20T10:00:00.000Z",

  updatedAt: "2026-06-23T10:00:00.000Z",

  results: [
    {
      name: "Aman Sharma",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43d",
      achievement: "Improved Spoken English Confidence",
      result: "Beginner → Fluent Speaker",
      quote:
        "I was afraid of speaking English in public. After completing this course, I confidently participate in presentations and discussions.",
    },
    {
      name: "Priya Verma",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      achievement: "Achieved IELTS Band 7.5",
      result: "Band 5.5 → Band 7.5",
      quote:
        "The speaking practice and vocabulary sessions significantly improved my fluency and helped me achieve my target IELTS score.",
    },
    {
      name: "Rahul Singh",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      achievement: "Improved Academic Performance",
      result: "Better Communication & Confidence",
      quote:
        "My grammar, vocabulary, and communication skills improved tremendously. I now participate confidently in school activities.",
    },
  ],

  learnings: [
    {
      icon: <FaComments />,
      title: "Speak Confidently",
      description:
        "Hold conversations naturally and express your thoughts clearly.",
    },
    {
      icon: <FaMicrophone />,
      title: "Improve Pronunciation",
      description:
        "Learn correct pronunciation, intonation, and speaking clarity.",
    },
    {
      icon: <FaBookOpen />,
      title: "Build Vocabulary",
      description:
        "Expand your vocabulary with practical and professional words.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Master Spoken Grammar",
      description:
        "Understand grammar naturally through speaking activities.",
    },
    {
      icon: <FaUserTie />,
      title: "Interview Preparation",
      description:
        "Prepare confidently for job interviews and professional communication.",
    },
    {
      icon: <FaBullhorn />,
      title: "Public Speaking",
      description:
        "Develop presentation skills and confidence while speaking to groups.",
    },
  ],

  whoIsThisFor: [
    "Students from Class 6 to 12 who want better English communication",
    "College students preparing for placements and higher education",
    "Beginners who hesitate while speaking English",
    "Job seekers preparing for interviews",
    "Working professionals looking to improve workplace communication",
    "Students preparing for IELTS, PTE, or study abroad opportunities",
    "Entrepreneurs and business owners improving communication skills",
    "Anyone wanting to become a confident and fluent English speaker",
  ],
},

{
  _id: "685a1f4a7b9c4d001f2e1235",

  title: "French Language Mastery Program",

  slug: "french-language-program",

  shortDescription:
    "Learn French from beginner to advanced level through live interactive classes covering speaking, listening, grammar, vocabulary, pronunciation, conversation practice, and DELF exam preparation.",

  description: `
French Language Mastery Program is a comprehensive French learning course designed for students, professionals, study-abroad aspirants, and language enthusiasts who want to communicate confidently in French.

The course focuses on all four language skills—speaking, listening, reading, and writing—while building a strong foundation in grammar, vocabulary, pronunciation, and real-world communication.

Students participate in live classes, conversation practice sessions, role plays, listening activities, pronunciation drills, cultural immersion exercises, and DELF exam preparation modules.

Whether your goal is studying abroad, improving career opportunities, preparing for French language certifications, traveling internationally, or learning a new language for personal growth, this program provides a structured roadmap from beginner to advanced proficiency.

By the end of the course, learners will be able to communicate confidently in French, understand native speakers more effectively, write correctly, and prepare successfully for internationally recognized French language examinations.
  `,

  thumbnail: {
    public_id: "courses/french-language-program",
    url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
  },

  price: 6999,

  durationInMonths: 6,

  level: "Beginner to Advanced",

  language: "French",

  category: "French Language",

  status: "published",

  enrollmentOpen: true,

  tags: [
    "french language course",
    "learn french",
    "french speaking classes",
    "french grammar",
    "delf preparation",
    "study abroad",
    "french communication",
    "french vocabulary",
    "foreign language course",
    "french pronunciation",
    "online french classes",
    "language certification",
  ],

  learningOutcomes: [
    "Speak French confidently in everyday situations",
    "Understand French grammar and sentence formation",
    "Improve listening and comprehension skills",
    "Develop strong French vocabulary",
    "Write emails, messages, and essays in French",
    "Communicate naturally with native speakers",
    "Prepare for DELF and other French certifications",
    "Improve pronunciation and accent",
    "Develop reading comprehension skills",
    "Build confidence using French professionally and academically",
  ],

  requirements: [
    "No prior French knowledge required",
    "Internet connection for online classes",
    "Notebook for assignments and vocabulary practice",
    "Commitment to regular speaking practice",
  ],

  targetAudience: [
    "School Students",
    "College Students",
    "Study Abroad Aspirants",
    "Working Professionals",
    "Travel Enthusiasts",
    "Language Learners",
    "Individuals preparing for DELF examinations",
  ],

  modules: [
    {
      title: "French Basics & Pronunciation",
      description:
        "Build a strong foundation with French alphabet, pronunciation, greetings, and introductions.",
      lessons: [
        "French Alphabet",
        "Pronunciation Rules",
        "Greetings & Introductions",
        "Basic Conversations",
      ],
    },

    {
      title: "French Grammar Foundations",
      description:
        "Understand the building blocks of French grammar and sentence formation.",
      lessons: [
        "Nouns & Articles",
        "Present Tense Verbs",
        "Sentence Structure",
        "Common Expressions",
      ],
    },

    {
      title: "Vocabulary Development",
      description:
        "Expand practical vocabulary for everyday and professional communication.",
      lessons: [
        "Daily Life Vocabulary",
        "Travel Vocabulary",
        "Education Vocabulary",
        "Professional Vocabulary",
      ],
    },

    {
      title: "Listening & Comprehension Skills",
      description:
        "Improve understanding through audio exercises and real-life conversations.",
      lessons: [
        "Listening Practice",
        "Conversation Analysis",
        "French Audio Exercises",
        "Understanding Native Speakers",
      ],
    },

    {
      title: "Speaking & Conversation Practice",
      description:
        "Develop fluency through speaking activities and interactive discussions.",
      lessons: [
        "Role Plays",
        "Situational Conversations",
        "Question & Answer Practice",
        "Fluency Exercises",
      ],
    },

    {
      title: "Reading & Writing Skills",
      description:
        "Learn to read and write confidently in French.",
      lessons: [
        "Reading Comprehension",
        "Email Writing",
        "Essay Writing",
        "Written Communication",
      ],
    },

    {
      title: "French Culture & Communication",
      description:
        "Understand cultural aspects and practical communication etiquette.",
      lessons: [
        "French Customs",
        "Cultural Communication",
        "Travel Communication",
        "Social Interactions",
      ],
    },

    {
      title: "DELF Exam Preparation",
      description:
        "Prepare for internationally recognized French language certification exams.",
      lessons: [
        "DELF Format",
        "Mock Tests",
        "Speaking Assessment",
        "Exam Strategies",
      ],
    },
  ],

  certificateAvailable: true,

  classType: "Live Online",

  seoTitle:
    "French Language Course | Learn French Online | DELF Preparation Classes",

  seoDescription:
    "Join our French Language Mastery Program to learn French speaking, grammar, vocabulary, pronunciation, communication skills, and DELF exam preparation through expert-led live classes.",

  batches: [
    {
      _id: "fr-batch-1",
      name: "Weekend Batch",
      startDate: "2026-07-15",
      students: 20,
    },
    {
      _id: "fr-batch-2",
      name: "Evening Batch",
      startDate: "2026-08-01",
      students: 18,
    },
  ],

  createdAt: "2026-06-20T10:00:00.000Z",

  updatedAt: "2026-06-23T10:00:00.000Z",

  results: [
    {
      name: "Neha Kapoor",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      achievement: "Passed DELF A2 Certification",
      result: "Beginner → Certified French Learner",
      quote:
        "The structured lessons and speaking practice helped me achieve my DELF certification and prepare for studying abroad.",
    },
    {
      name: "Rohan Mehta",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43d",
      achievement: "Study Abroad Success",
      result: "French Beginner → University Admission",
      quote:
        "The course gave me the language confidence required for my university application process in Europe.",
    },
    {
      name: "Ananya Gupta",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      achievement: "Improved Professional Communication",
      result: "Better Career Opportunities",
      quote:
        "Learning French helped me communicate with international clients and expand my professional opportunities.",
    },
  ],

  learnings: [
    {
      icon: <FaGlobeEurope />,
      title: "French Communication",
      description:
        "Speak naturally and confidently in real-life situations.",
    },
    {
      icon: <FaBookOpen />,
      title: "Grammar Mastery",
      description:
        "Understand French grammar through practical examples and exercises.",
    },
    {
      icon: <FaComments />,
      title: "Conversation Practice",
      description:
        "Develop fluency through guided speaking activities and discussions.",
    },
    {
      icon: <FaCheckCircle />,
      title: "DELF Preparation",
      description:
        "Prepare confidently for internationally recognized French certification exams.",
    },
    {
      icon: <FaMicrophone />,
      title: "Pronunciation Training",
      description:
        "Improve pronunciation, accent, and listening comprehension.",
    },
    {
      icon: <FaGlobeEurope />,
      title: "Cultural Understanding",
      description:
        "Learn French culture and communication etiquette for real-world interactions.",
    },
  ],

  whoIsThisFor: [
    "Students planning to study abroad in France, Canada, or Europe",
    "College students seeking international education opportunities",
    "Professionals working with international clients",
    "Individuals preparing for DELF or French certification exams",
    "Travel enthusiasts visiting French-speaking countries",
    "Language learners interested in mastering French",
    "Beginners with no prior knowledge of French",
    "Anyone looking to learn a globally recognized foreign language",
  ],
},


{
  _id: "685a1f4a7b9c4d001f2e1236",

  title: "Academic Excellence Program",

  slug: "academic-excellence-program",

  shortDescription:
    "Comprehensive academic tuition program for students from Class 1 to 12 designed to improve grades, strengthen concepts, boost confidence, and prepare students for school and board examinations through expert guidance and personalized support.",

  description: `
Academic Excellence Program is a complete tuition and academic support program designed for students from Class 1 to Class 12.

The program focuses on building strong subject fundamentals, improving academic performance, strengthening problem-solving abilities, and developing effective study habits. Students receive personalized attention, structured lesson plans, regular assessments, doubt-clearing sessions, assignments, and exam-focused preparation.

Our experienced educators help students understand concepts deeply rather than relying on rote memorization. The curriculum is designed to support CBSE, ICSE, PSEB, and other major educational boards.

Whether a student needs help improving grades, preparing for board examinations, strengthening weak subjects, or building confidence in academics, this program provides a structured roadmap to long-term success.

By the end of the program, students demonstrate stronger conceptual understanding, better academic performance, improved confidence, and greater readiness for competitive and board examinations.
  `,

  thumbnail: {
    public_id: "courses/academic-excellence",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  },

  price: 3999,

  durationInMonths: 12,

  level: "Class 1 - 12",

  language: "English & Hindi",

  category: "Academic Tuition",

  status: "published",

  enrollmentOpen: true,

  tags: [
    "tuition classes",
    "academic coaching",
    "school tuition",
    "cbse tuition",
    "icse tuition",
    "pseb tuition",
    "board exam preparation",
    "academic excellence",
    "school coaching",
    "class 1 to 12 tuition",
    "online tuition",
    "offline tuition",
    "academic support",
    "exam preparation",
  ],

  learningOutcomes: [
    "Improve academic performance and grades",
    "Strengthen conceptual understanding across subjects",
    "Develop effective study habits and discipline",
    "Perform confidently in school examinations",
    "Prepare effectively for board examinations",
    "Improve problem-solving and analytical skills",
    "Develop confidence in Mathematics and Science",
    "Enhance English communication and writing skills",
    "Improve time management and exam strategy",
    "Build long-term academic confidence and success",
  ],

  requirements: [
    "School Enrollment",
    "Notebook and study materials",
    "Regular attendance and participation",
    "Commitment to completing assignments",
    "Willingness to learn and improve",
  ],

  targetAudience: [
    "Students from Class 1 to Class 12",
    "CBSE Students",
    "ICSE Students",
    "PSEB Students",
    "Board Examination Students",
    "Students requiring academic support",
    "Students aiming for higher grades",
    "Parents seeking structured academic guidance",
  ],

  modules: [
    {
      title: "Foundation Building",
      description:
        "Strengthen basic concepts and develop a strong academic foundation.",
      lessons: [
        "Concept Understanding",
        "Learning Techniques",
        "Subject Fundamentals",
        "Academic Confidence",
      ],
    },

    {
      title: "Mathematics Mastery",
      description:
        "Build strong mathematical skills through concept clarity and practice.",
      lessons: [
        "Arithmetic",
        "Algebra",
        "Geometry",
        "Problem Solving",
      ],
    },

    {
      title: "Science Excellence",
      description:
        "Develop understanding of scientific principles and practical applications.",
      lessons: [
        "Physics Fundamentals",
        "Chemistry Concepts",
        "Biology Topics",
        "Scientific Reasoning",
      ],
    },

    {
      title: "English Language Development",
      description:
        "Improve grammar, vocabulary, comprehension, and writing skills.",
      lessons: [
        "Grammar",
        "Vocabulary",
        "Reading Comprehension",
        "Writing Skills",
      ],
    },

    {
      title: "Social Studies & General Knowledge",
      description:
        "Develop understanding of history, geography, civics, and current affairs.",
      lessons: [
        "History",
        "Geography",
        "Civics",
        "General Knowledge",
      ],
    },

    {
      title: "Assignment & Practice Sessions",
      description:
        "Reinforce learning through worksheets, assignments, and exercises.",
      lessons: [
        "Homework Support",
        "Practice Worksheets",
        "Problem Solving",
        "Revision Activities",
      ],
    },

    {
      title: "Exam Preparation",
      description:
        "Prepare effectively for school tests and board examinations.",
      lessons: [
        "Exam Strategies",
        "Revision Planning",
        "Question Solving",
        "Time Management",
      ],
    },

    {
      title: "Mock Tests & Performance Analysis",
      description:
        "Track academic progress through assessments and feedback.",
      lessons: [
        "Mock Tests",
        "Performance Reviews",
        "Progress Tracking",
        "Improvement Planning",
      ],
    },
  ],

  certificateAvailable: false,

  classType: "Online & Offline",

  seoTitle:
    "Academic Tuition Classes | Class 1 to 12 Coaching & Board Exam Preparation",

  seoDescription:
    "Join our Academic Excellence Program for Class 1 to 12 students. Improve grades, strengthen concepts, prepare for board exams, and achieve academic success through expert tuition and personalized guidance.",

  batches: [
    {
      _id: "acad-batch-1",
      name: "Regular Batch",
      startDate: "2026-07-01",
      students: 50,
    },
    {
      _id: "acad-batch-2",
      name: "Weekend Batch",
      startDate: "2026-07-10",
      students: 35,
    },
  ],

  createdAt: "2026-06-20T10:00:00.000Z",

  updatedAt: "2026-06-23T10:00:00.000Z",

  results: [
    {
      name: "Rahul Singh",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      achievement: "Improved Academic Performance",
      result: "70% → 92%",
      quote:
        "The regular tests, assignments, and guidance helped me improve my grades significantly and gain confidence in my studies.",
    },
    {
      name: "Ananya Sharma",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      achievement: "Board Examination Success",
      result: "82% → 95%",
      quote:
        "The structured preparation and mock tests helped me perform exceptionally well in my board examinations.",
    },
    {
      name: "Karan Verma",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43d",
      achievement: "Mathematics Improvement",
      result: "Weak Concepts → Subject Excellence",
      quote:
        "Mathematics was my weakest subject, but the personalized guidance helped me become one of the top performers in class.",
    },
  ],

  learnings: [
    {
      icon: <FaGraduationCap />,
      title: "Academic Growth",
      description:
        "Build strong subject knowledge and long-term learning skills.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Exam Readiness",
      description:
        "Prepare confidently for school tests and board examinations.",
    },
    {
      icon: <FaBookOpen />,
      title: "Subject Mastery",
      description:
        "Develop deep understanding of core academic subjects.",
    },
    {
      icon: <FaUserTie />,
      title: "Personalized Guidance",
      description:
        "Receive individual support based on learning needs.",
    },
    {
      icon: <FaComments />,
      title: "Doubt Resolution",
      description:
        "Clear academic doubts through dedicated support sessions.",
    },
    {
      icon: <FaBullhorn />,
      title: "Confidence Building",
      description:
        "Improve classroom participation and academic confidence.",
    },
  ],

  whoIsThisFor: [
    "Students from Class 1 to Class 12",
    "Students preparing for school examinations",
    "CBSE, ICSE, and PSEB students",
    "Board examination students",
    "Students struggling with specific subjects",
    "Students aiming to improve grades and rankings",
    "Parents seeking quality academic support",
    "Students looking for structured learning and guidance",
  ],
}
];

