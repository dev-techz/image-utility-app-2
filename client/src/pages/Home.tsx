import { Link } from 'react-router-dom';
import { Minimize2, Image, Crop, RefreshCcw, FileImage, Wand2, ArrowRight } from 'lucide-react';

const tools = [
  {
    name: 'Compress Image',
    description: 'Reduce file size while maintaining quality.',
    icon: Minimize2,
    path: '/compress',
    color: 'bg-blue-500'
  },
  {
    name: 'Resize Image',
    description: 'Resize images by width, height, or percentage.',
    icon: Image,
    path: '/resize',
    color: 'bg-green-500'
  },
  {
    name: 'Crop Image',
    description: 'Crop images to specific aspect ratios or custom dimensions.',
    icon: Crop,
    path: '/crop',
    color: 'bg-orange-500'
  },
  {
    name: 'Convert Format',
    description: 'Convert between JPG, PNG, WebP, and AVIF formats.',
    icon: RefreshCcw,
    path: '/convert',
    color: 'bg-purple-500'
  },
  {
    name: 'Rotate & Flip',
    description: 'Rotate images or flip them horizontally/vertically.',
    icon: FileImage,
    path: '/rotate',
    color: 'bg-pink-500'
  },
  {
    name: 'Remove Background',
    description: 'Automatically remove image backgrounds with AI.',
    icon: Wand2,
    path: '/remove-bg',
    color: 'bg-indigo-500'
  }
];

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-white rounded-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
          Powerful Image Tools <br className="hidden sm:block" />
          <span className="text-indigo-600">Right in Your Browser</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10">
          Process, edit, and optimize your images securely. No sign-up required. Free forever.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/compress" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Get Started
            <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
          </Link>
          <a href="#tools" className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            View All Tools
          </a>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">All the tools you need</h2>
          <p className="mt-4 text-gray-500">Select a tool to start processing your images.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link 
              key={tool.name} 
              to={tool.path}
              className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition-all duration-200 hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center p-3 rounded-lg ${tool.color} text-white mb-4 shadow-sm`}>
                <tool.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {tool.name}
              </h3>
              <p className="mt-2 text-gray-500">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Features/Steps Section */}
      <section className="py-12 bg-gray-50 rounded-3xl px-8">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How it works</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div>
                    <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-indigo-600 mx-auto mb-4 shadow-sm">1</div>
                    <h3 className="font-semibold text-lg mb-2">Upload</h3>
                    <p className="text-gray-500">Select your image from your device or drag and drop it.</p>
                </div>
                <div>
                    <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-indigo-600 mx-auto mb-4 shadow-sm">2</div>
                    <h3 className="font-semibold text-lg mb-2">Process</h3>
                    <p className="text-gray-500">Choose your settings and let our powerful engine do the work.</p>
                </div>
                <div>
                    <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-indigo-600 mx-auto mb-4 shadow-sm">3</div>
                    <h3 className="font-semibold text-lg mb-2">Download</h3>
                    <p className="text-gray-500">Save your processed image instantly. No watermarks.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
