import { Box, Editable, Text } from '@chakra-ui/react';
import classes from './EditableField.module.scss';
import { beautifyFieldName } from '@/utils/stringUtils.ts';
import { ExtractedField } from '@/models/typless.ts';

type EditableFieldProps = {
  field: ExtractedField & { index: number };
  handleChange: (
    fieldIndex: number,
    valueIndex: number,
    newValue: string,
  ) => void;
};

const EditableField = ({ field, handleChange }: EditableFieldProps) => {
  return (
    <Box key={field.name}>
      <Text className={classes.label}>{beautifyFieldName(field.name)}</Text>
      {field.multiple_values ? (
        <Box>Multiple</Box>
      ) : (
        <Editable.Root
          value={field.values[0].value || 'n/a'}
          onValueChange={(e) => handleChange(field.index, 0, e.value)}
        >
          <Editable.Preview />
          <Editable.Input id={field.name} />
        </Editable.Root>
      )}
    </Box>
  );
};

export default EditableField;
