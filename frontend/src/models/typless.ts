// more could be added...

export interface ExtractDataType {
  object_id: string;
  file_name: string;
  customer: null;
  extracted_fields: ExtractedField[];
  line_items: [];
  vat_rates: [];
  adjusted_s3_url: string;
}

interface ExtractedFieldValue {
  confidence_score: number;
  height: number;
  width: number;
  page_number: number;
  x: number;
  y: number;
  value: string;
}

enum DataType {
  STRING = 'STRING',
  DATE = 'DATE',
  NUMBER = 'NUMBER',
  VAT_ID = 'VAT_ID',
}

export interface ExtractedField {
  values: ExtractedFieldValue[];
  name: string;
  data_type: DataType;
  multiple_values: boolean;
}
