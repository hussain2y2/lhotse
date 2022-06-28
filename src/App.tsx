import React, {useState} from 'react';
import { StarIcon } from '@heroicons/react/solid';
import General from './components/General';
import Combo from "./components/Combo";

function App() {
  const [supplier, setSupplier] = useState({
    name: 'Volkswagenzentrum Berlin GmbH',
    'tags-general': [
      {
        id: 1,
        name: 'volkswagen',
        type: 'supplierBranch-general'
      }, {
        id: 2,
        name: 'cars',
        type: 'supplierBranch-general'
    }],
    'tags-certificates': [
      {
        id: 1,
        name: 'ISO 9001',
        type: 'supplierBranch-certificates'
    }],
    'tags-portfolio': [],
  });

  const addItemHandler = (value: string, tag: string) => {
    // @ts-ignore
    const isExist = supplier[tag].filter(item => item.name === value).length;
    if (!isExist) {
      const newTag: any = {name: value};
      switch (tag) {
        case 'tags-certificates':
          newTag['id'] = supplier['tags-certificates'].length + 1;
          newTag['type'] = 'supplierBranch-certificates';
          setSupplier({...supplier, "tags-certificates": [...supplier["tags-certificates"], newTag]});
          break;
        case 'tags-portfolio':
          newTag['id'] = supplier['tags-portfolio'].length + 1
          newTag['type'] = 'supplierBranch-portfolio'
          // @ts-ignore
          setSupplier({...supplier, "tags-portfolio": [...supplier["tags-portfolio"], newTag]})
          break;
        default:
          newTag['id'] = supplier['tags-general'].length + 1
          newTag['type'] = 'supplierBranch-general'
          setSupplier({...supplier, "tags-general": [...supplier["tags-general"], newTag]})
          break;
      }
    }
  };

  const removeItemHandler = (id: number, tag: string) => {
    switch (tag) {
      case 'tags-certificates':
        // @ts-ignore
        setSupplier({...supplier, "tags-certificates": supplier["tags-certificates"].filter(item => item.id !== id)});
        break;
      case 'tags-portfolio':
        // @ts-ignore
        setSupplier({...supplier, "tags-portfolio": supplier["tags-portfolio"].filter(item => item.id !== id)})
        break;
      default:
        // @ts-ignore
        setSupplier({...supplier, "tags-general": supplier["tags-general"].filter(item => item.id !== id)})
        break;
    }
  };

  const suggestedTagsPortfolio = ['European', 'Eco-friendly', 'German'];
  const suggestedTagsCertifications = ['ISO 9001', 'Vegan', 'Organic'];

  return (
    <div className="bg-gray-200 h-screen p-3">
      <div className="container mx-auto block p-6 bg-white rounded-lg">
        <h1 className="inline-flex items-center text-2xl border-b-2 border-b-gray-200 pb-1">
          <StarIcon className="h-5 w-5 text-blue-500 mr-1.5"/> {supplier.name}
        </h1>
        <General
          tags={supplier['tags-general']}
          tagType={'tags-general'}
          addItemHandler={addItemHandler}
          removeItemHandler={removeItemHandler}
        />
        <Combo
          title="Portfolio"
          tags={supplier['tags-portfolio']}
          tagType={'tags-portfolio'}
          suggestions={suggestedTagsPortfolio}
          addItemHandler={addItemHandler}
          removeItemHandler={removeItemHandler}
        />
        <Combo
          title="Certificates"
          tags={supplier['tags-certificates']}
          tagType={'tags-certificates'}
          suggestions={suggestedTagsCertifications}
          addItemHandler={addItemHandler}
          removeItemHandler={removeItemHandler}
        />
      </div>
    </div>
  );
}

export default App;
