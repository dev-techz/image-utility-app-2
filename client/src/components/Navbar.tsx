import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Image, Crop, Scissors, Minimize2, RefreshCcw, Wand2, FileImage } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const tools = [
    { name: 'Compress Image', path: '/compress', icon: Minimize2 },
    { name: 'Resize Image', path: '/resize', icon: Image },
    { name: 'Crop Image', path: '/crop', icon: Crop },
    { name: 'Convert Format', path: '/convert', icon: RefreshCcw },
    { name: 'Rotate & Flip', path: '/rotate', icon: FileImage },
    { name: 'Remove Background', path: '/remove-bg', icon: Wand2 },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">ImageUtils</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
            
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-indigo-600 font-medium focus:outline-none">
                <span>Tools</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block transition-all duration-200 opacity-0 group-hover:opacity-100 transform origin-top-left scale-95 group-hover:scale-100 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {tools.map((tool) => (
                    <Link
                      key={tool.name}
                      to={tool.path}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                      role="menuitem"
                    >
                      <tool.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-indigo-500" />
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium">About</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
            <div className="pt-2 pb-2">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tools</p>
              {tools.map((tool) => (
                <Link
                  key={tool.name}
                  to={tool.path}
                  className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <tool.icon className="mr-3 h-5 w-5 text-gray-400" />
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
