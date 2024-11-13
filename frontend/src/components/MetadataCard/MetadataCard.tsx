import { Button, Card } from '@chakra-ui/react';
import { ExtractDataType } from '@/models/typless.ts';
import classes from './MetadataCard.module.scss';
import { memo, useState } from 'react';
import FieldsInfo from '@/components/FieldsInfo/FieldsInfo.tsx';
import { usePostData } from '@/api/hooks';
import EditableFieldList from '@/components/EditableFieldList/EditableFieldList.tsx';

type MetadataCardProps = {
  extractedData: ExtractDataType;
};

// todo: optimize, refactor & handle multiple values, ...
const MetadataCard = ({ extractedData }: MetadataCardProps) => {
  const [fields, setFields] = useState(extractedData.extracted_fields);
  const { mutate, isPending } = usePostData();

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
          <EditableFieldList fields={fields} setFields={setFields} />
          <Button disabled={isPending} colorPalette={'green'} type={'submit'}>
            Save
          </Button>
        </form>
      </Card.Body>
    </Card.Root>
  );
};

export default memo(MetadataCard);
