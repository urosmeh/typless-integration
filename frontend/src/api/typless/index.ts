import { ApiRoutes } from '@/constants/apiRoutes.ts';
import { ExtractDataResponse } from '@/models/typless.ts';

export const extractData = async (formData: FormData) => {
  const url = `${ApiRoutes.API_ROOT}${ApiRoutes.EXTRACT_DATA}`;

  const options = {
    method: 'POST',
    body: formData,
  };

  const res = await fetch(url, options);
  const data = (await res.json()) as ExtractDataResponse;
  console.log(data);
  return data;
};
