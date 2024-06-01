import React, { useState } from 'react'

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
  error?: string
  labelText?: string

  onSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FileInput = React.forwardRef<HTMLInputElement, IProps>(
  (
    {
      children,
      className,
      error,
      labelText,
      onChange,
      onSelect,

      ...props
    },
    ref
  ) => {
    const [fileName, setFileName] = useState('')

    function fileChangedHandler(e: any) {
      const file = e.target.files[0]

      setFileName(file.name)
      onChange && onChange(e)
      onSelect && onSelect(e)
    }

    return (
      <div className={className}>
        {labelText && (
          <label
            className={'mb-2 block text-xs text-gray-600 lg:text-sm xl:text-base'}
            htmlFor={'txt'}
          >
            {labelText}
          </label>
        )}
        <label className={'group relative flex w-full cursor-pointer rounded-md border'}>
          <div
            className={`hover:bg-gra inline-block h-full rounded-l-md bg-primary-500 px-2 py-3 text-white shadow shadow-violet-600/25 transition duration-500 hover:bg-primary-700 hover:shadow-primary-600/75`}
          >
            <input
              className={'hidden'}
              onChange={e => fileChangedHandler(e)}
              ref={ref}
              {...props}
              type={'file'}
            />
            Upload File
          </div>
          <span className={'mx-2'}>{fileName}</span>
        </label>
        {error && <p className={'animate-shake text-right text-red-600'}>{error}</p>}
      </div>
    )
  }
)

FileInput.displayName = 'FileInput'
export default FileInput
