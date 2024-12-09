import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';

export default function FilterTabs({ options, value, onChange, variant = 'default' }) {
  return (
    <Tabs value={value} className={variant === 'fullWidth' ? 'w-full' : 'flex-1'}>
      <TabsHeader
        className="rounded-md bg-gray-50 p-1"
        indicatorProps={{
          className: 'bg-white shadow-md rounded-md ',
        }}
      >
        {options.map((option) => (
          <Tab
            key={option.value}
            value={option.value}
            onClick={() => onChange(option.value)}
            className={`
              ${value === option.value ? 'text-brand-primary' : 'text-gray-500'}
              py-1 px-3 text-sm font-medium whitespace-nowrap
            `}
          >
            {option.label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}
