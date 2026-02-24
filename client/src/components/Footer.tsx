import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">ImageUtils</h3>
            <p className="mt-4 text-base text-gray-500">
              The easiest way to process images directly in your browser or with our powerful servers.
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Tools</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/compress" className="text-base text-gray-500 hover:text-gray-900">Compress</Link></li>
              <li><Link to="/resize" className="text-base text-gray-500 hover:text-gray-900">Resize</Link></li>
              <li><Link to="/crop" className="text-base text-gray-500 hover:text-gray-900">Crop</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-base text-gray-500 hover:text-gray-900">About</Link></li>
              <li><Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">Privacy</Link></li>
              <li><Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex items-center justify-between">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} ImageUtils. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              {/* GitHub Icon */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
