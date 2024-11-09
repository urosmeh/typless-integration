export interface ExtractDataResponse {
  object_id: string;
  file_name: string;
  customer: null;
  extracted_fields: ExtractedField[];
  line_items: [];
  vat_rates: [];
  adjusted_s3_url: 'https://typless.s3.amazonaws.com/adjusted/13bce95af969bb15c4a49dfcb8f7cb958c89f3cf/amazing_company_1.pdf?AWSAccessKeyId=ASIAT746545Z26AJGIFV&Signature=lzWc0fK%2FoeX5op6nitGmnUSGQaQ%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQCBb6MwKlNyv296v8hB4r51yRqQj6quMwxg1SkVcwYYhAIhAM84zz3vTTEq9eOofkzhuqZR5n1v1IHkymaZueNhqrdDKpEDCHMQBBoMMjc0Njc0MzQ1ODQzIgwfOwTeaKD4yGkQT74q7gLIgO5z2D6pC7DRbxU2DbqR9zh5tM44u1RwHlN%2B1yoTZVUcK0Evjw8diCJ0zhi2VQeFSqZNfJOpf%2F5S5zrEw1vQEzyBrsXzQHkDKZjfnUKalv6zUoO0Yqh8YxQSPmyD4MkQWd9oOTVtRnMZcVSzaEjrLwwp4oSndUzdhhfceTbhC%2BIfC%2FyDBL94HXm4cfEcIA8iJZbrXexFIN8ptvMoXSfMaaNSuFX9Vo%2BgjbwLB4WoFQnr4riZZMddd%2BlVhL%2FN%2BRxSgcc0YJaTsEx15Fszs5Y8d%2F5G5dnvHRTTzNT%2Bo1ma6ILEuj3gGaeuOX%2BbjVA501PRl7rYOUFPirmajB1nWwSKWQIawjYktzHGW4rVzdV9c1QP3Yb7I5GSHX%2BzI0aJ8nuJGiSzJzTh6r4FkRxW3C1FjxV6u2w5I0KzV9XJgEuVN9psX%2BrrWZiOAx%2BqeYbDFjgGMGsNbidHMopUS5kqJsY5stq7X2VimPUlbYrhOuswl%2B68uQY6nAFSrP1B%2B%2BEWIZBTWk7%2FiucptlsT51xAGt4G%2FDNx%2BOkekcbQ7eex1UCp%2Bm%2BrRVsascD56Uj%2Bb0w%2BMSiDEV6hulgDL%2F4%2BCi0gOo2VXl2zaQBEHfXIVJsLpL83E8ESJimAtUlB1pLA9V6hgQfyIZz4ecGMDnrM%2BUzycQQxXetyiX5NHIUpmW%2BzO%2BekAXi9ZlZTD%2Fg2Tkho6DrYwPkWn5k%3D&Expires=1731147814';
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

interface ExtractedField {
  values: ExtractedFieldValue[];
  name: string;
  data_type: DataType;
  multiple_values: boolean;
}
