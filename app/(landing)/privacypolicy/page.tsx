"use client";
import React, { useState } from "react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Privacy Policy for Digital Career Guide
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Effective Date: August 10, 2024
        </p>
        <p className="text-gray-600 mb-8">
          {`Welcome to Digital Career Guide, a web platform operated by
          Prime Flow Technologies. This Privacy Policy outlines how we collect,
          use, and protect the personal information of our users. Digital Career Guide
          is an AI-powered knowledge repository and library designed for
          educational purposes, catering to a diverse user base ranging from
          children aged 10 to adults up to 90 years old. We are committed to
          ensuring the privacy and security of our users' data while providing
          a valuable and personalized learning experience.`}
        </p>

        {/* Sections */}
        <div className="space-y-6">
          {/* Introduction */}
          <div>
            <button
              onClick={() => toggleSection(1)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              1. Introduction
            </button>
            {activeSection === 1 && (
              <p className="mt-2 text-gray-600">
                {`Welcome to Digital Career Guide, a web platform operated
                by Prime Flow Technologies. This Privacy Policy outlines how we
                collect, use, and protect the personal information of our users.
                Digital Career Guide is an AI-powered knowledge repository and library
                designed for educational purposes, catering to a diverse user
                base ranging from children aged 10 to adults up to 90 years old.
                We are committed to ensuring the privacy and security of our
                users' data while providing a valuable and personalized learning
                experience.`}
              </p>
            )}
          </div>

          {/* Data We Collect */}
          <div>
            <button
              onClick={() => toggleSection(2)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              2. Data We Collect
            </button>
            {activeSection === 2 && (
              <div className="mt-2 text-gray-600 space-y-4">
                <div>
                  <h3 className="font-semibold">2.1 Personal Information</h3>
                  <ul className="list-disc list-inside">
                    <li>
                      - Account Information: Name, email address, age, and
                      password.
                    </li>
                    <li>
                      - Usage Data: Interaction details, including search
                      queries and time spent.
                    </li>
                    <li>
                      - Communication Data: Information shared through customer
                      support or feedback forms.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">
                    2.2 Non-Personal Information
                  </h3>
                  <ul className="list-disc list-inside">
                    <li>
                      - Device Information: Type of device, operating system,
                      and browser type.
                    </li>
                    <li>
                      - Cookies and Tracking Technologies: Data collected via
                      cookies for enhancement and analytics.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">2.3 Data from Third Parties</h3>
                  <p>
                    We may receive information from third-party services
                    integrated into Digital Career Guide, such as login credentials
                    from social media platforms or data from educational tools.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* How We Use Your Data */}
          <div>
            <button
              onClick={() => toggleSection(3)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              3. How We Use Your Data
            </button>
            {activeSection === 3 && (
              <div className="mt-2 text-gray-600 space-y-4">
                <div>
                  <h3 className="font-semibold">
                    3.1 To Provide and Enhance Services
                  </h3>
                  <ul className="list-disc list-inside">
                    <li>
                      - Personalized Learning: Tailoring content
                      recommendations.
                    </li>
                    <li>
                      - User Engagement: Improving platform features based on
                      interaction data.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">3.2 Communication</h3>
                  <ul className="list-disc list-inside">
                    <li>
                      - Support: Using contact information for customer support.
                    </li>
                    <li>
                      - Updates: Sending notifications about platform updates
                      and changes.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">
                    3.3 Research and Development
                  </h3>
                  <p>
                    Aggregate data may be used for internal research to improve
                    the platform’s functionality and educational content. This
                    data is anonymized and does not include personally
                    identifiable information.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">3.4 Legal Compliance</h3>
                  <p>
                    We may use or disclose your information to comply with
                    applicable laws, regulations, or legal processes.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* How We Share Your Data */}
          <div>
            <button
              onClick={() => toggleSection(4)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              4. How We Share Your Data
            </button>
            {activeSection === 4 && (
              <div className="mt-2 text-gray-600 space-y-4">
                <div>
                  <h3 className="font-semibold">4.1 With Service Providers</h3>
                  <p>
                    We may share your information with third-party service
                    providers who assist in operating the platform. These
                    providers are obligated to protect your data and only use it
                    for specified purposes.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">4.2 For Legal Reasons</h3>
                  <ul className="list-disc list-inside">
                    <li>- To comply with legal obligations.</li>
                    <li>
                      - To protect and defend the rights or property of Prime
                      Flow Technologies.
                    </li>
                    <li>- To prevent or investigate potential wrongdoing.</li>
                    <li>
                      - To protect the personal safety of users or the public.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">4.3 Business Transfers</h3>
                  <p>
                    In the event of a merger, acquisition, or sale of assets,
                    user information may be transferred to the acquiring entity.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Data Security */}
          <div>
            <button
              onClick={() => toggleSection(5)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              5. Data Security
            </button>
            {activeSection === 5 && (
              <div className="mt-2 text-gray-600 space-y-4">
                <div>
                  <h3 className="font-semibold">5.1 Security Measures</h3>
                  <p>
                    We implement industry-standard security measures, including
                    encryption, firewalls, and secure data storage. However, no
                    method of transmission over the Internet or electronic
                    storage is 100% secure.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">5.2 User Responsibility</h3>
                  <p>
                    Users are responsible for maintaining the confidentiality of
                    their account credentials and for any activity under their
                    account.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Children’s Privacy */}
          <div>
            <button
              onClick={() => toggleSection(6)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              6. Children’s Privacy
            </button>
            {activeSection === 6 && (
              <div className="mt-2 text-gray-600 space-y-4">
                <div>
                  <h3 className="font-semibold">6.1 Users Under 13</h3>
                  <p>
                    For children under 13, we require verifiable parental
                    consent before collecting personal information. Parents can
                    request the deletion of their child’s information at any
                    time.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">6.2 Users Aged 13-18</h3>
                  <p>
                    We collect only necessary information for users aged 13-18
                    and encourage parents to monitor their children’s online
                    activities.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* User Rights */}
          <div>
            <button
              onClick={() => toggleSection(7)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              7. User Rights
            </button>
            {activeSection === 7 && (
              <div className="mt-2 text-gray-600 space-y-4">
                <div>
                  <h3 className="font-semibold">7.1 Access and Correction</h3>
                  <p>
                    Users can access and correct their personal information at
                    any time through their account settings.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">7.2 Data Portability</h3>
                  <p>
                    Users may request a copy of their data in a commonly used
                    format.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">7.3 Right to Deletion</h3>
                  <p>
                    Users may request the deletion of their personal
                    information, subject to certain legal or operational
                    obligations.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">7.4 Opt-Out</h3>
                  <p>
                    Users can opt-out of receiving non-essential communications
                    through their account settings.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Changes to This Privacy Policy */}
          <div>
            <button
              onClick={() => toggleSection(8)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              8. Changes to This Privacy Policy
            </button>
            {activeSection === 8 && (
              <p className="mt-2 text-gray-600">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. We will notify
                users of significant changes.
              </p>
            )}
          </div>

          {/* Contact Us */}
          <div>
            <button
              onClick={() => toggleSection(9)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              9. Contact Us
            </button>
            {activeSection === 9 && (
              <p className="mt-2 text-gray-600">
                If you have any questions or concerns about this Privacy Policy,
                please contact us at: support.primeflow@gmail.com.
              </p>
            )}
          </div>

          {/* Governing Law */}
          <div>
            <button
              onClick={() => toggleSection(10)}
              className="text-lg font-semibold text-gray-800 w-full text-left"
            >
              Governing Law
            </button>
            {activeSection === 10 && (
              <p className="mt-2 text-gray-600">
                This Privacy Policy is governed by the laws of the Republic of
                Liberia.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
