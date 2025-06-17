type ContractType = 'ALL' | 'BASE_ERC721' | 'BASE_ERC1155' | 'CARCULTURE_ERC721' | 'CARCULTURE_ERC1155';

import React from 'react';
interface ContractTypeFilterProps {
  selectedType: ContractType;
  onChange: (type: ContractType) => void;
}

const contractTypes: { value: ContractType; label: string }[] = [
  { value: 'ALL', label: 'All NFTs' },
  { value: 'BASE_ERC721', label: 'Base ERC-721' },
  { value: 'BASE_ERC1155', label: 'Base ERC-1155' },
  { value: 'CARCULTURE_ERC721', label: 'CarCulture ERC-721' },
  { value: 'CARCULTURE_ERC1155', label: 'CarCulture ERC-1155' },
];

export function ContractTypeFilter({ selectedType, onChange }: ContractTypeFilterProps) {
  return (
    <div className="flex gap-2">
      {contractTypes.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            selectedType === value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
} 