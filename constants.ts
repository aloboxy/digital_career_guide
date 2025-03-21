import moment from "moment";

export const MAX_FREE_COUNTS = 15;
export const SET_FREE_RESET_TIME = () => {
  return moment().add(3, "hours").toISOString(); // 3 hours
};

export const PACKAGE_PLAN = [
  {
    planid: 0,
    name: "Basic",
    price: 0.75,
    message_result_type: "Comprehensive",
    time_limitation: "for 1 hour",
    token: 50,
    color: "border-sky-800",
    contentColor: "bg-blue-800/20",
    selection: true,
    isSub: true,
    features: [
      {
        id: 0,
        name: "Single Task [One Feature Selection]",
      },
      {
        id: 1,
        name: "Web Search",
      },
      {
        id: 2,
        name: "Topic Finder",
      },
      {
        id: 3,
        name: "File Upload Limit - 5 MB",
      },
    ],
  },
  {
    planid: 1,
    name: "digitalcareerguide Pack",
    price: 2.5,
    message_result_type: "Enhanced",
    time_limitation: "for 2 days",
    token: 2000,
    color: "border-emerald-800",
    contentColor: "bg-emerald-800/20",
    selection: false,
    isSub: true,
    features: [
      {
        id: 0,
        name: "Academic Assistance",
      },
      {
        id: 1,
        name: "Teacher Assistance",
      },
      {
        id: 2,
        name: "Research Assistance",
      },
      {
        id: 3,
        name: "Exclusive Resources",
      },
      {
        id: 4,
        name: "Internet Search",
      },
      {
        id: 5,
        name: "Books Library",
      },
      {
        id: 6,
        name: "Topic Finder",
      },
      {
        id: 7,
        name: "24 Hour Access",
      },
      {
        id: 8,
        name: "Large File Upload",
      },
    ],
  },
  {
    planid: 2,
    name: "digitalcareerguide Plus",
    price: 15.0,
    message_result_type: "Enhanced Plus",
    time_limitation: "for 30 days",
    token: 30000,
    color: "border-purple-800",
    contentColor: "bg-purple-800/20",
    selection: false,
    isSub: true,
    features: [
      {
        id: 0,
        name: "Academic Assistance",
      },
      {
        id: 1,
        name: "Teacher Assistance",
      },
      {
        id: 2,
        name: "Research Assistance",
      },
      {
        id: 3,
        name: "Exclusive Resources",
      },
      {
        id: 4,
        name: "Internet Search",
      },
      {
        id: 5,
        name: "Books Library",
      },
      {
        id: 6,
        name: "Topic Finder",
      },
      {
        id: 7,
        name: "24 Hour Access",
      },
      {
        id: 8,
        name: "Large File Upload",
      },
    ],
  },
  {
    planid: 3,
    name: "Free",
    price: 0.0,
    message_result_type: "Comprehensive",
    time_limitation: "per 24 hours",
    token: 15,
    color: "border-gray-200",
    contentColor: "bg-gray-800/20",
    selection: true,
    isSub: false,
    features: [
      {
        id: 0,
        name: "Single Task [One Feature Selection]",
      },
      {
        id: 2,
        name: "Topic Finder",
      },
    ],
  },
];

export const Research_Prompts = [
  {
    id: 0,
    name: "Key Points and Structures",
    content:
      "I'm working on a [specific type] project about [topic]. Can you help me outline the key points or structure for a [paper, essay, or presentation] on this subject?",
  },
  {
    id: 1,
    name: "Summary of Research",
    content:
      "Can you summarize the main arguments and recent research findings on [specific topic or question]? I'm trying to compare different perspectives for my [research paper, thesis, dissertation].",
  },
  {
    id: 2,
    name: "Explanation of Research",
    content:
      "I'm struggling to understand [specific concept, theory, or method] in my [subject or course]. Could you explain it step-by-step and possibly provide examples?",
  },
];

export const SchoolTasks_Prompts = [
  {
    id: 0,
    name: "Simplified Explanation",
    content:
      "Hi, I'm reviewing my notes on [specific subject or topic] and I'm struggling to understand [particular concept or detaill. Could you explain this in simpler terms or provide a summary that might help me grasp it better?",
  },
  {
    id: 1,
    name: "Topic Analysis",
    content:
      "Hello, I'm working on an assignment for [course name] and need help analyzing [specific topic or reading]. Could you break down the main points and suggest how I might approach my analysis?",
  },
  {
    id: 2,
    name: "Homework and Exam Preparation",
    content:
      "Hey, I have an upcoming exam on [subject or chapter]. Could you help me review key concepts and provide some practice questions that align with what I've been learning?",
  },
];

export const Teacher_Prompts = [
  {
    id: 0,
    name: "Clarifying Course Content",
    content:
      "Hi, I'm teaching [Subject Name] to my [high school/ university] class and need help breaking down a complex topic. Could you assist me in creating a simplified explanation of [specific concept] that's easy for my students to understand? Also, what examples or analogies could I use to make this concept relatable?",
  },
  {
    id: 1,
    name: "Designing Assessments",
    content:
      "Hello, I'm preparing an assessment for my [high school/university] class on [specific topic]. Can you help me design questions that effectively test my students' understanding of [specific learning objective]? I'm looking for a mix of multiple-choice and short-answer questions, along with any tips on how to ensure these questions align with the learning goals",
  },
  {
    id: 2,
    name: "Planning a Lesson",
    content:
      "Hi, I'm planning a lesson on [specific topic] for my [high school/university] class. Can you help me outline the key points I should cover and suggest some interactive activities or discussion prompts that would engage my students? I'd also appreciate any advice on how to address common challenges students might face with this topic.",
  },
];
