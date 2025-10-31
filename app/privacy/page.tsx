export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-8 font-outfit">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-dark-200 font-work">
          <p className="text-dark-300">
            <strong>Last Updated:</strong> October 30, 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold text-primary-300 mb-4 font-outfit">Introduction</h2>
            <p>
              Welcome to Aman Devrani's Portfolio. This Privacy Policy explains how I collect, use, and protect 
              your information when you visit this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-300 mb-4 font-outfit">Information Collection</h2>
            <p className="mb-3">This website may collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Basic analytics data (page views, browser type, device information)</li>
              <li>Information you provide when contacting me via email</li>
              <li>Cookies for website functionality and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-300 mb-4 font-outfit">How I Use Your Information</h2>
            <p className="mb-3">The information collected is used to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Improve website performance and user experience</li>
              <li>Respond to your inquiries and communications</li>
              <li>Analyze website traffic and usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-300 mb-4 font-outfit">Data Protection</h2>
            <p>
              I take reasonable measures to protect your personal information from unauthorized access, 
              disclosure, or misuse. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-300 mb-4 font-outfit">Third-Party Services</h2>
            <p>
              This website may use third-party services (such as analytics tools) that collect information 
              used to identify you. These services have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-300 mb-4 font-outfit">Cookies</h2>
            <p>
              This website uses cookies to enhance user experience. You can choose to disable cookies 
              through your browser settings, though this may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-300 mb-4 font-outfit">Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Request access to your personal data</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt-out of data collection where applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-300 mb-4 font-outfit">Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact me at{' '}
              <a href="mailto:aman.devrani6921@gmail.com" className="text-primary-400 hover:text-primary-300 underline">
                aman.devrani6921@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-300 mb-4 font-outfit">Changes to This Policy</h2>
            <p>
              I may update this Privacy Policy from time to time. Any changes will be posted on this page 
              with an updated revision date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
