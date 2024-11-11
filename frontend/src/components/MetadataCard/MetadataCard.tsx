import { Box, Button, Card, Text } from '@chakra-ui/react';
import { ExtractDataType } from '@/models/typless.ts';
import classes from './MetadataCard.module.scss';
import { memo, useCallback, useMemo, useState } from 'react';
import { beautifyFieldName } from '@/utils/stringUtils.ts';
import { Editable } from '@chakra-ui/react';
import FieldsInfo from '@/components/FieldsInfo/FieldsInfo.tsx';
import { usePostData } from '@/api/hooks';

type MetadataCardProps = {
  extractedData: ExtractDataType;
};

// todo: optimize, refactor & handle multiple values, ...
const MetadataCard = ({ extractedData }: MetadataCardProps) => {
  const [fields, setFields] = useState(extractedData.extracted_fields);
  const { mutate, isPending } = usePostData();

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
    [],
  );

  const renderFields = useMemo(() => {
    return fields.map((f, i) => (
      <Box key={f.name}>
        <Text className={classes.label}>{beautifyFieldName(f.name)}</Text>
        {f.multiple_values ? (
          <Box>Multiple</Box>
        ) : (
          <Editable.Root
            value={f.values[0].value || 'n/a'}
            onValueChange={(e) => handleChange(i, 0, e.value)}
          >
            <Editable.Preview />
            <Editable.Input id={f.name} />
          </Editable.Root>
        )}
      </Box>
    ));
  }, [fields, handleChange]);

  return (
    <Card.Root className={classes.container}>
      <Card.Title>Metadata for {extractedData.file_name}</Card.Title>
      <Card.Body>
        <form
          className={classes.form}
          onSubmit={(event) => {
            event.preventDefault();
            const data = {
              ...extractedData,
              extracted_fields: fields,
            };

            mutate(data);
          }}
        >
          <FieldsInfo />
          {renderFields}
          <Button disabled={isPending} colorPalette={'green'} type={'submit'}>
            Save
          </Button>
        </form>
      </Card.Body>
    </Card.Root>
  );
};

export default memo(MetadataCard);
