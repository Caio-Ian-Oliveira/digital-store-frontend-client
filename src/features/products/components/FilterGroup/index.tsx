import { Checkbox } from '@/shared/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'

interface FilterOption {
  label: string
  value: string
}

interface FilterGroupProps {
  title: string
  inputType: 'checkbox' | 'radio'
  options: FilterOption[]
  selectedValues?: string[]
  onChange?: (value: string, checked?: boolean) => void
}

export function FilterGroup({
  title,
  inputType,
  options,
  selectedValues = [],
  onChange
}: FilterGroupProps) {
  return (
    <div className="mb-6 md:mb-8">
      <h3 className="text-dark-gray-2 font-semibold text-sm md:text-base mb-3 md:mb-4">
        {title}
      </h3>

      <div className="space-y-1">
        {inputType === 'checkbox' ? (
          options.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center space-x-3 min-h-10 md:min-h-0 py-0.5"
            >
              <Checkbox
                id={`${title}-${opt.value}`}
                checked={selectedValues.includes(opt.value)}
                onCheckedChange={(checked) => onChange?.(opt.value, !!checked)}
                className="cursor-pointer"
              />
              <label
                htmlFor={`${title}-${opt.value}`}
                className="text-dark-gray-2 text-sm md:text-base cursor-default lg:cursor-pointer pointer-events-none lg:pointer-events-auto"
              >
                {opt.label}
              </label>
            </div>
          ))
        ) : (
          <RadioGroup
            onValueChange={(val) => onChange?.(val)}
            value={selectedValues[0] || options[0]?.value}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                className="flex items-center space-x-3 min-h-10 md:min-h-0 py-0.5"
              >
                <RadioGroupItem
                  value={opt.value}
                  id={`${title}-${opt.value}`}
                  className="cursor-pointer"
                />
                <label
                  htmlFor={`${title}-${opt.value}`}
                  className="text-dark-gray-2 text-sm md:text-base cursor-default lg:cursor-pointer pointer-events-none lg:pointer-events-auto"
                >
                  {opt.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>
    </div>
  )
}
