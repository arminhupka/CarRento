import React, {useState} from 'react';

const CarDetails = ({specification, equipment, description}) => {
  const [currentTab, setCurrentTab] = useState('description');
  const handleRadioInput = (e) => {
    setCurrentTab(e.target.value);
  };

  return (
    <>
      <div className="bg-white shadow-lg">
        <ul className="p-4 pl-8 flex flex-col border-l-4 border-red-500 md:flex-row md:space-x-8">
          <li>
            <input
              type="radio"
              id="description"
              name="tab_select"
              value="description"
              onChange={handleRadioInput}
              className="peer sr-only"
              defaultChecked
            />
            <label
              htmlFor="description"
              className="font-semibold text-gray-400 peer-checked:text-red-500 cursor-pointer"
            >
              Opis
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="equipment"
              name="tab_select"
              value="equipment"
              onChange={handleRadioInput}
              className="peer sr-only"
            />
            <label htmlFor="equipment" className="font-semibold text-gray-400 peer-checked:text-red-500 cursor-pointer">
              Wyposażenie
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="specification"
              name="tab_select"
              value="specification"
              onChange={handleRadioInput}
              className="peer sr-only"
            />
            <label
              htmlFor="specification"
              className="font-semibold text-gray-400 peer-checked:text-red-500 cursor-pointer"
            >
              Specyfikacja
            </label>
          </li>
        </ul>
      </div>
      {currentTab === 'description' && (
        <div className="p-4 bg-white shadow-lg">
          <p>{description}</p>
        </div>
      )}
      {currentTab === 'equipment' && (
        <div className="p-8 bg-white shadow-lg">
          <ul style={{columnCount: 1, listStylePosition: 'inside'}}>
            {equipment.map((item, index) => (
              <li
                key={index}
                className="py-1.5 text-sm font-semibold border-b border-gray-100 before:content-['+'] before:mr-2 before:text-red-500"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {currentTab === 'specification' && (
        <div className="p-8 bg-white shadow-lg">
          <ul style={{columnCount: 1, listStylePosition: 'inside'}}>
            <li className="py-1.5 text-sm font-semibold border-b border-gray-100 before:content-['+'] before:mr-2 before:text-red-500">
              <span>Paliwo</span>
              <span>{specification.fuel}</span>
            </li>
            <li className="py-1.5 text-sm font-semibold border-b border-gray-100 before:content-['+'] before:mr-2 before:text-red-500">
              <span>Moc</span>
              <span>{specification.hp}</span>
            </li>
            <li className="py-1.5 text-sm font-semibold border-b border-gray-100 before:content-['+'] before:mr-2 before:text-red-500">
              <span>Silnik</span>
              <span>{specification.engine}</span>
            </li>
            <li className="py-1.5 text-sm font-semibold border-b border-gray-100 before:content-['+'] before:mr-2 before:text-red-500">
              <span>Skrzynia biegów</span>
              <span>{specification.transmission}</span>
            </li>
            <li className="py-1.5 text-sm font-semibold border-b border-gray-100 before:content-['+'] before:mr-2 before:text-red-500">
              <span>Rok produkcji</span>
              <span>{specification.productionYear}</span>
            </li>
            <li className="py-1.5 text-sm font-semibold border-b border-gray-100 before:content-['+'] before:mr-2 before:text-red-500">
              <span>Miejsca</span>
              <span>{specification.seats}</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default CarDetails;
