import React, { useState } from 'react';
import SegmentPlayer from './SegmentPlayer';

const SegmentDisplay = ({ segments, onDeleteSegment }) => {
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(null);

  const handleSegmentSelect = (id) => {
    setSelectedSegmentIndex((prevId) => (prevId === id ? null : id));
  };

  const handleDelete = (id) => {
    if (selectedSegmentIndex === id) {
      setSelectedSegmentIndex(null);
    }
    onDeleteSegment(id);
  };

  return (
    <div className="down-section">
      {segments.map((segment) => (
        <SegmentPlayer
          key={segment.id} 
          segment={segment}
          isSelected={selectedSegmentIndex === segment.id}
          onDelete={() => handleDelete(segment.id)}
          onSelect={() => handleSegmentSelect(segment.id)}
        />
      ))}
    </div>
  );
};

export default SegmentDisplay;
