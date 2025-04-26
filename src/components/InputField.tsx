import React from 'react';
import { NumericFormat } from 'react-number-format';
import { HelpCircle } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder: string;
  id: string;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
  showDecimals?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  id,
  prefix,
  suffix,
  tooltip,
  showDecimals = false,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={id} className="input-label">
          {label}
        </label>
        
        {tooltip && (
          <div className="relative">
            <button
              type="button"
              className="text-dark-400 hover:text-dark-200 focus:outline-none"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            
            {showTooltip && (
              <div className="absolute right-0 z-10 w-64 p-3 mt-2 text-sm text-dark-100 bg-dark-800 
                              rounded-lg shadow-lg border border-dark-700 transition-opacity duration-300">
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className={`relative rounded-lg transition-all duration-200 ${
        isFocused ? 'ring-2 ring-primary-500' : 'ring-1 ring-dark-700'
      }`}>
        <NumericFormat
          id={id}
          thousandSeparator=","
          decimalScale={showDecimals ? 2 : 0}
          fixedDecimalScale={showDecimals}
          value={value}
          onValueChange={(values) => {
            const { floatValue } = values;
            onChange(floatValue || 0);
          }}
          placeholder={placeholder}
          className="w-full py-3 px-4 bg-dark-800 rounded-lg text-dark-50 focus:outline-none"
          inputMode="numeric"
          pattern="[0-9]*"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          prefix={prefix ? `${prefix} ` : ''}
          suffix={suffix ? ` ${suffix}` : ''}
        />
      </div>
    </div>
  );
};

export default InputField;