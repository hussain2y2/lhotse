import React, {KeyboardEvent, useState} from 'react';
import PropTypes from 'prop-types';
import {PlusIcon, XIcon} from '@heroicons/react/solid';

const General = ({ tags, tagType, addItemHandler, removeItemHandler }: any) => {
  const [inputValue, setInputValue] = useState('');
  const [input, setInput] = useState(false);

  const keyDownHandler = (e: KeyboardEvent, tag: string) => {
    // Handle Press Enter
    if (e.key === 'Enter') {
      addItemHandler(inputValue, tag);
      setInput(false);
    }
    // Handle Press Tab
    if (e.key === 'Tab') {
      addItemHandler(inputValue, tag);
    }
    setInputValue('');
  };

  return (
    <div className="block mt-2 mb-4">
      <h4 className="text-slate-500">General</h4>
      <div className="flex justify-items-start mt-2">
        {tags.map((tag: any, index: number) => (
          <div className="bg-gray-100 text-gray-800 font-medium inline-flex items-center px-3 py-1.5 rounded-full mr-2 tag" key={tag.id}>
            {tag.name}
            {index > 0 && <XIcon
              className="w-4 h-4 text-gray-400 font-medium ml-1 cursor-pointer tag-child hidden"
              onClick={() => removeItemHandler(tag.id, tagType)}
            />}
          </div>
        ))}
        {input && <input
          type="text"
          className="rounded-full pt-[4px] pb-[4px]"
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => keyDownHandler(event, tagType)}
        />}
        <button className="inline-flex items-center" onClick={()=> setInput(true)}>
          <PlusIcon className="w-5 h-5 ml-3"/> New Tag
        </button>
      </div>
    </div>
  );
};

General.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string
  })).isRequired,
  tagType: PropTypes.string.isRequired,
  addItemHandler: PropTypes.func.isRequired,
  removeItemHandler: PropTypes.func.isRequired,
}

export default General;
