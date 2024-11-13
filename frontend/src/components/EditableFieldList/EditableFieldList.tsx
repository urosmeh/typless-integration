import EditableField from '@/components/EditableField/EditableField.tsx';
import { ExtractedField } from '@/models/typless.ts';
import { Dispatch, SetStateAction, useCallback } from 'react';

type EditableFieldListProps = {
  fields: ExtractedField[];
  setFields: Dispatch<SetStateAction<ExtractedField[]>>;
};

const EditableFieldList = ({ fields, setFields }: EditableFieldListProps) => {
  const handleChange = useCallback(
    (fieldIndex: number, valueIndex: number, newValue: string) => {
      setFields((prevFields) =>
        prevFields.map((field, i) =>
          i === fieldIndex
            ? {
                ...field,
                values: field.values.map((val, j) =>
                  j === valueIndex ? { ...val, value: newValue } : val,
                ),
              }
            : field,
        ),
      );
    },
    [setFields],
  );

  return fields.map((f, i) => (
    <EditableField
      key={i}
      field={{ ...f, index: i }}
      handleChange={handleChange}
    />
  ));
};

export default EditableFieldList;
