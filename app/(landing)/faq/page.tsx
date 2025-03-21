"use client";
import { useState } from "react";

const faqData = [
  {
    category: "Students",
    faqs: [
      {
        question: "What can Digital Career Guide help me with?",
        answer: `High School Students:
          - Homework Help: Get explanations for tough subjects like math, science, history, and more.
          - Study Guides: Receive summaries and key points for your exams.
          - Essay Writing: Get outlines and ideas to structure your essays effectively.
          - Project Assistance: Guidance on how to start and complete school projects.
          
          University Students:
          - Research Support: Access summaries of academic articles, papers, and research topics.
          - Thesis Guidance: Learn how to structure your thesis, from introduction to conclusion.
          - Essay and Report Writing: Get tips on writing persuasive essays and detailed reports.
          - Study Notes: Summarized notes on complex subjects to help with your revision.`,
      },
      {
        question: "How do I ask Digital Career Guide for help?",
        answer: `- Be Specific: Clearly state what you need.
          - Ask Follow-up Questions: If you don’t understand something, ask for more details or examples.
          - Use Digital Career Guide for Quick References: If you need a definition or a quick explanation, just ask!`,
      },
      {
        question: "Can Digital Career Guide help me with my assignments?",
        answer: `Yes! Digital Career Guide can:
          - Explain Concepts: For example, if you’re stuck on a math problem, Digital Career Guide can break it down step by step.
          - Provide Outlines: Get a clear structure for your essays, reports, or presentations.
          - Review Your Work: Share what you've written, and Digital Career Guide can offer feedback or suggest improvements.`,
      },
      {
        question: "How can I use Digital Career Guide for exam preparation?",
        answer: `- Review Key Topics: Ask for summaries of chapters or important topics.
          - Practice Problems: Request example questions and solutions, especially in subjects like math and science.
          - Get Study Tips: Digital Career Guide can suggest effective study methods tailored to your subject and learning style.`,
      },
    ],
  },
  {
    category: "Teachers",
    faqs: [
      {
        question: "What can Digital Career Guide help me with?",
        answer: `High School Teachers:
          - Lesson Planning: Get outlines and key points for your lessons.
          - Assignment Help: Create assignment prompts for your students.
          - Study Guides: Request summaries or study notes.
          - Quiz and Test Preparation: Generate quiz questions or test papers.
          
          University Teachers:
          - Lecture Notes: Develop comprehensive lecture outlines.
          - Research Assistance: Get help with literature reviews and finding reliable sources.
          - Assignment Design: Create complex assignment questions.
          - Thesis Guidance: Offer students structured guidance on thesis writing.`,
      },
      {
        question: "How do I request a lesson plan or lecture outline?",
        answer: `Simply ask, “Can you help me create a lesson plan on [Topic]?” or “I need a lecture outline for [Subject].” Digital Career Guide will provide an organized outline with key points that you can expand on.`,
      },
      {
        question: "Can Digital Career Guide create quizzes and tests?",
        answer: `Yes! You can ask Digital Career Guide to create quizzes or test questions on any subject. Specify the topic and the type of questions you want (e.g., multiple-choice, short answer, essay). Digital Career Guide can also offer answers and explanations if needed.`,
      },
    ],
  },
  {
    category: "Researchers",
    faqs: [
      {
        question: "How can Digital Career Guide help me with my research?",
        answer: `Digital Career Guide can assist with various aspects of research, including:
          - Topic Selection
          - Literature Review
          - Data Collection and Analysis
          - Writing Assistance
          - Citation and Referencing`,
      },
      {
        question: "Can Digital Career Guide help with data analysis?",
        answer: `Yes! Digital Career Guide can:
          - Explain complex statistical concepts.
          - Recommend tools and software for analyzing data.
          - Guide you through the process of interpreting your results.`,
      },
      {
        question: "How does Digital Career Guide assist with literature reviews?",
        answer: `Digital Career Guide can:
          - Identify key sources and summarize them.
          - Highlight trends, gaps, and debates in the literature.
          - Suggest ways to organize your review to make it coherent.`,
      },
    ],
  },
  {
    category: "Book Library",
    faqs: [
      {
        question: "What is Digital Career Guide Library?",
        answer: `Digital Career Guide Library is a digital resource designed to help users access a wide range of books, summaries, insights, and other educational materials. It’s like having a personal assistant who can quickly find and explain books and academic resources for you.`,
      },
      {
        question: "How can Digital Career Guide help me find books?",
        answer: `For Students:
          - Finding Textbooks: If you need a specific textbook, simply ask Digital Career Guide.
          - Accessing Summaries: If you need a quick summary or overview of a book, Digital Career Guide can provide a concise breakdown.
          
          For Educators and Teachers:
          - Locating Teaching Resources: Digital Career Guide can help find supplementary materials or books to recommend to students.
          - Creating Reading Lists: Digital Career Guide can help create reading lists based on specific topics relevant to your curriculum.
          
          For Professionals:
          - Finding Reference Materials: Digital Career Guide can search for the latest resources in your field.
          - Accessing Industry-Specific Books: Digital Career Guide can help locate books on management, engineering, medicine, and more.`,
      },
      {
        question: "How can I use Digital Career Guide to understand a book?",
        answer: `For Students:
          - Detailed Explanations: Digital Career Guide can explain difficult sections in simpler terms.
          - Essay Writing Help: Digital Career Guide can help you outline and structure essays based on the themes or topics of a book.
          
          For Educators and Teachers:
          - Preparing Lessons: Digital Career Guide can provide summaries and key points to help you prepare lesson plans.
          - Class Discussions: Digital Career Guide can find discussion questions or key themes from books for classroom use.
          
          For Professionals:
          - Summarizing Books: If you’re short on time, Digital Career Guide can summarize professional books for you.
          - Research Support: Digital Career Guide can pull relevant insights from books for reports, presentations, or ongoing projects.`,
      },
      {
        question:
          "Can Digital Career Guide provide access to digital copies of books?",
        answer: `Digital Career Guide can guide you to where you can find digital copies of books, such as open-access libraries or purchase options. If you need a specific book, Digital Career Guide can help you locate it.`,
      },
      {
        question: "Can Digital Career Guide help with citations and references?",
        answer: `Yes! Digital Career Guide can assist with proper citation formats (APA, MLA, Chicago, etc.) for books and resources, ensuring your work is properly referenced.`,
      },
    ],
  },
];

const FAQPage = () => {
  const [openFaq, setOpenFaq] = useState<{ [key: string]: boolean }>({});

  const toggleFaq = (faqKey: string) => {
    setOpenFaq((prevState) => ({
      ...prevState,
      [faqKey]: !prevState[faqKey],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">FAQ</h1>
      {faqData.map((categoryData, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {categoryData.category}
          </h2>
          {categoryData.faqs.map((faq, faqIndex) => {
            const faqKey = `${index}-${faqIndex}`;
            return (
              <div key={faqIndex} className="mb-4">
                <button
                  onClick={() => toggleFaq(faqKey)}
                  className="w-full text-left p-4 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition"
                >
                  {faq.question}
                </button>
                {openFaq[faqKey] && (
                  <div className="p-4 bg-gray-100 rounded-md mt-2">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FAQPage;
