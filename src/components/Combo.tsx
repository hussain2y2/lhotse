import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {PlusIcon, SelectorIcon, XIcon} from '@heroicons/react/solid';
import {Combobox, Transition} from '@headlessui/react';

const Combo = ({ title, tags, tagType, suggestions, addItemHandler, removeItemHandler }: any) => {
  const [input, setInput] = useState(false);
  const [selected, setSelected] = useState('');
  const [query, setQuery] = useState('');

  const filteredSuggestions =
    query === ''
      ? suggestions
      : suggestions.filter((suggestion: string) =>
        suggestion
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  useEffect(() => {
    if (selected) {
      addItemHandler(selected, tagType);
      setInput(false);
      setSelected('');
    }
  }, [addItemHandler, selected, tagType]);

  return (
    <div className="block mt-2 mb-4">
      <h4 className="text-slate-500">{title}</h4>
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
        {input && <Combobox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-full bg-white text-left">
              <Combobox.Input
                className="w-full border rounded-full pt-[5px] pb-[5px] text-gray-800 focus:border-2"
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-50 shadow-lg py-1 text-base">
                {filteredSuggestions.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredSuggestions.map((suggestion: any, index: number) => (
                    <Combobox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-4 ${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        }`
                      }
                      value={suggestion}
                    >
                      {({ selected, active }) => (
                        <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {suggestion}
                        </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-blue-500'
                              }`}
                            >
                          </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>}
        <button className="inline-flex items-center" onClick={()=> setInput(true)}>
          <PlusIcon className="w-5 h-5 ml-3"/> New Tag
        </button>
      </div>
    </div>
  );
}

Combo.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string
  })).isRequired,
  tagType: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  addItemHandler: PropTypes.func.isRequired,
  removeItemHandler: PropTypes.func.isRequired
};

export default Combo;

