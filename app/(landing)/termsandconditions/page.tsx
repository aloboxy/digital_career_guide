"use client";
import React, { useState } from "react";

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Terms and Conditions for Digital Career Guide
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Effective Date: August 10, 2024
        </p>
        <p className="text-gray-600 mb-8">
          Welcome to Digital Career Guide, an AI-powered educational platform
          designed to assist users with research, academic writing, and learning.
          By accessing or using our services, you agree to be bound by these
          Terms and Conditions. Please read them carefully.
        </p>

        {/* Sections */}
        <div className="space-y-6">
          {/* Overview */}
          <div>
            <button
              onClick={() => toggleSection(1)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              <h1 className="underline underline-offset-4">1. Overview</h1>
            </button>
            {activeSection === 1 && (
              <p className="mt-2 text-gray-600">
                {`Digital Career Guide ("we," "us," "our") is an
                AI-driven platform developed by Prime Flow Technologies. Our
                primary purpose is to provide users with structured, relevant,
                and tailored information to assist in educational endeavors,
                including research, essay writing, note analysis, and thesis
                projects.`}
              </p>
            )}
          </div>

          {/* Acceptance of Terms */}
          <div>
            <button
              onClick={() => toggleSection(2)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              <h1 className="underline underline-offset-4">
                2. Acceptance of Terms
              </h1>
            </button>
            {activeSection === 2 && (
              <p className="mt-2 text-gray-600">
                By using Digital Career Guide, you agree to these Terms and
                Conditions. If you do not agree, you should not use our services.
                Continued use of the platform signifies acceptance of these terms.
              </p>
            )}
          </div>

          {/* Purpose and Scope of Services */}
          <div>
            <button
              onClick={() => toggleSection(3)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              <h1 className="underline underline-offset-4">
                3. Purpose and Scope of Services
              </h1>
            </button>
            {activeSection === 3 && (
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>
                  - Research Assistance: Offering insights, summaries, and
                  resources on various academic topics.
                </li>
                <li>
                  - Essay and Thesis Support: Structuring and outlining essays,
                  theses, and other academic papers.
                </li>
                <li>
                  - High School and College Support: Providing explanations,
                  notes, and structured outlines for various subjects.
                </li>
                <li>
                  - Digital Library Access: Access to a curated selection of
                  academic resources, including book summaries and direct links
                  to online materials.
                </li>
              </ul>
            )}
          </div>

          {/* Main Functions and Capabilities */}
          <div>
            <button
              onClick={() => toggleSection(4)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              <h1 className="underline underline-offset-4">
                4. Main Functions and Capabilities
              </h1>
            </button>
            {activeSection === 4 && (
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>
                  - Prompt Refinement: Digital Career Guide scans and refines
                  user prompts to ensure clarity and specificity.
                </li>
                <li>
                  - Customized Responses: The platform generates responses
                  specific to the user’s academic level, subject, and request.
                </li>
                <li>
                  - Web Browsing for Resources: Digital Career Guide can access
                  and provide direct links to resources like PDFs and online books.
                </li>
                <li>
                  - Multi-Format Support: Assistance with various formats,
                  including essays, notes, outlines, and research projects.
                </li>
              </ul>
            )}
          </div>

          {/* Priority Tasks */}
          <div>
            <button
              onClick={() => toggleSection(5)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              <h1 className="underline underline-offset-4">
                5. Priority Tasks
              </h1>
            </button>
            {activeSection === 5 && (
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>
                  1. Educational Research: Delivering precise and well-organized
                  information.
                </li>
                <li>
                  2. Assignment Assistance: Helping users develop structured
                  outlines and drafts.
                </li>
                <li>
                  3. Study Aid: Offering detailed explanations and summaries of
                  key topics.
                </li>
                <li>
                  4. Resource Provision: Facilitating access to online
                  educational resources.
                </li>
                <li>
                  5. Prompt Customization: Ensuring relevant responses to user
                  queries.
                </li>
              </ul>
            )}
          </div>

          {/* User Obligations */}
          <div>
            <button
              onClick={() => toggleSection(6)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              <h1 className="underline underline-offset-4">
                6. User Obligations
              </h1>
            </button>
            {activeSection === 6 && (
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>- Provide Accurate Information.</li>
                <li>- Use Responsibly for educational purposes only.</li>
                <li>
                  - Respect Intellectual Property and comply with academic
                  integrity.
                </li>
              </ul>
            )}
          </div>

          {/* Limitations of Liability */}
          <div>
            <button
              onClick={() => toggleSection(7)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              <h1 className="underline underline-offset-4">
                7. Limitations of Liability
              </h1>
            </button>
            {activeSection === 7 && (
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>
                  - Accuracy of Information: We do not guarantee completeness or
                  correctness of all content.
                </li>
                <li>
                  - Educational Use Only: The platform is for learning only.
                </li>
                <li>
                  - AI Limitations: AI-provided information requires human
                  interpretation.
                </li>
              </ul>
            )}
          </div>

          {/* Intellectual Property */}
          <div>
            <button
              onClick={() => toggleSection(8)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              <h1 className="underline underline-offset-4">
                8. Intellectual Property
              </h1>
            </button>
            {activeSection === 8 && (
              <p className="mt-2 text-gray-600">
                All content provided by Digital Career Guide is the intellectual
                property of Prime Flow Technologies. Users are granted a limited
                license for personal, educational use only.
              </p>
            )}
          </div>

          {/* Governing Law and Contact Information */}
          <div>
            <button
              onClick={() => toggleSection(9)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              <h1 className="underline underline-offset-4">
                9. Governing Law and Contact Information
              </h1>
            </button>
            {activeSection === 9 && (
              <p className="mt-2 text-gray-600">
                These Terms and Conditions are governed by the laws of the
                Republic of Liberia. For any questions, contact us at:
                support.primeflow@gmail.com or +231779016579.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
