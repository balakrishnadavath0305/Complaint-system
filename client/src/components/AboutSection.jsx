import React from 'react';

const AboutSection = () => {
  return (
    <div className="container-fluid py-10 px-4 md:px-12">
      <div className="w-full max-w-7xl mx-auto">
        {/* Notification Message */}
        <div className="w-full mb-6">
          <h3 className="text-red-600 text-center font-medium text-sm md:text-base">
            Complaints sent via email will not be processed. Please use this platform to lodge your complaint.
          </h3>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">ABOUT DCS</h2>
            <div className="text-justify text-sm md:text-base space-y-4 text-gray-700">
              <p>
                <strong>Decentralized Complaint System (DCS)</strong> is an all-in-one platform available 24x7 for
                citizens to lodge complaints related to incomplete or delayed government work. Whether it's local
                municipal issues, land-related concerns, or welfare scheme irregularities, DCS ensures each grievance is
                routed to the correct authority through intelligent role- and location-based access.
              </p>
              <p>
                The platform is integrated with Ministries and Departments across central and state governments, making
                it a unified portal for public service redressal. Each government employee and administrator accesses
                the system based on their assigned sector and area, which ensures faster resolution and better
                accountability.
              </p>
              <p>
                DCS is designed for transparency and user empowerment. Citizens can track the real-time status of their
                complaints, upload photographic or document-based evidence, and receive updates when actions are taken.
                If unsatisfied with the resolution, users can rate the outcome and raise an appeal if needed.
              </p>
              <p>
                Administrators have system-wide visibility — they can view all complaints, monitor performance of
                departments, reassign unresolved issues, and ensure that complaints are closed properly with citizen
                feedback.
              </p>

              <div>
                <span className="font-semibold text-blue-600 flex items-center mb-2">
                  <i className="fa fa-info-circle mr-2"></i> Complaints that will not be processed:
                </span>
                <ul className="list-disc list-inside space-y-1">
                  <li>RTI requests (use the designated RTI portals)</li>
                  <li>Matters already in court or under judicial review</li>
                  <li>Religious disputes or ideological debates</li>
                  <li>Suggestions and general policy feedback</li>
                  <li>
                    Government employee grievances related to service or disciplinary matters (unless existing
                    departmental remedies have been exhausted)
                  </li>
                </ul>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mt-6 text-sm text-gray-700 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="mb-2">
                <strong>Note:</strong> If your complaint relates to a State Government or Union Territory, it will be
                handled directly by the concerned state or UT authority. Please follow up with them for any delays.
              </p>
              
            </div>
          </div>

          {/* What's New */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">WHAT'S NEW</h2>
            <div className="bg-gray-100 p-4 rounded shadow-sm text-sm space-y-3">
              <ul className="space-y-3">
                <li>
                  <a
                    href="/docs/DCS_Redressal_Strategy_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    <span className="font-bold text-black">02</span>{' '}
                    <em className="text-gray-600">May 2025</em> - New Redressal Strategy for DCS Operations (PDF - 1.2 MB)
                  </a>
                </li>
                <li>
                  <a
                    href="/docs/DCS_SOP_GrievanceHandling.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    <span className="font-bold text-black">10</span>{' '}
                    <em className="text-gray-600">April 2025</em> - Updated SOP for Handling Public Grievances (PDF - 0.8 MB)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
