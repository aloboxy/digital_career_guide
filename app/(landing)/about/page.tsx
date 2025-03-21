import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          About Us
        </h1>
        <p className="text-gray-700 text-lg mb-8 text-center">
          Welcome to Digital Career Guide! We are an online platform designed to help
          you with your studies. Whether you are in school, college, or just
          love learning, we provide the support you need to succeed in your
          academic journey.
        </p>

        {/* Mission Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            Our mission is to make learning easier and more accessible for
            everyone. We know that studying can sometimes be challenging, so we
            are here to simplify the process. We offer clear, personalized help
            to guide you through any academic task, big or small.
          </p>
        </section>

        {/* What We Do Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">What We Do</h2>
          <ul className="space-y-6">
            <li>
              <h3 className="font-semibold text-gray-800">Personalized Help</h3>
              <p className="text-gray-600">
                - We provide advice tailored to your specific tasks, whether
                it’s an essay, project, or research paper.
                <br />- We assist in planning, organizing, and guiding you to
                meet your academic goals.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-gray-800">Research Support</h3>
              <p className="text-gray-600">
                - We help you find the right information by suggesting relevant
                books, articles, and resources.
                <br />- We summarize key points from these resources to save you
                time and help you understand them easily.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-gray-800">
                Clear Explanations
              </h3>
              <p className="text-gray-600">
                - We break down complex topics into simple explanations.
                <br />- We cover a wide range of subjects, ensuring clear
                understanding in your studies.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-gray-800">
                Resource Suggestions
              </h3>
              <p className="text-gray-600">
                - We recommend the best materials for your studies, including
                textbooks, articles, and research papers.
                <br />- We also suggest videos and other resources that explain
                concepts in a way that makes sense to you.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-gray-800">Content Creation</h3>
              <p className="text-gray-600">
                - We assist in writing and structuring essays, reports, and
                academic work.
                <br />- Our aim is to help you present ideas clearly and
                effectively, ensuring well-organized and readable work.
              </p>
            </li>
          </ul>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 mb-6">
            Digital Career Guide is dedicated to supporting you every step of the way
            in your educational journey. We make studying less stressful and
            more enjoyable by providing the tools and guidance you need to
            succeed. Whether you’re just starting or looking to deepen your
            knowledge, Digital Career Guide is the partner you can rely on for all your
            academic needs.
          </p>
        </section>

        {/* Contact Information */}
        <div className="text-center mt-8">
          <p className="text-gray-500">
            Learn more:{" "}
            <a
              href="mailto:support.primeflow@gmail.com"
              className="text-blue-600"
            >
            
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
