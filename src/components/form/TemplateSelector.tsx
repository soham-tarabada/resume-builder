import React, { useState, useRef, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TemplateSelector: React.FC = () => {
  const { templates, resumeData, updateTemplate } = useResume();
  const [showCarousel, setShowCarousel] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 240; // Width of template + margin
      const currentScroll = containerRef.current.scrollLeft;
      
      containerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Show carousel only if there are more than 3 templates or on smaller screens
    const checkSize = () => {
      setShowCarousel(templates.length > 3 || window.innerWidth < 768);
    };
    
    checkSize();
    window.addEventListener('resize', checkSize);
    
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, [templates.length]);

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">Select a Template</h3>
        
        {showCarousel && (
          <div className="flex space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
              aria-label="Previous templates"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
              aria-label="Next templates"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      
      <div 
        ref={containerRef}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {templates.map(template => (
          <div 
            key={template.id}
            onClick={() => updateTemplate(template.id)}
            className={`flex-shrink-0 w-48 border-2 rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
              resumeData.selectedTemplate === template.id 
                ? 'border-blue-600 ring-2 ring-blue-200' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="relative pb-[133%] overflow-hidden rounded-md">
              <img 
                src={template.thumbnail} 
                alt={`${template.name} template`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-medium text-sm">{template.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;