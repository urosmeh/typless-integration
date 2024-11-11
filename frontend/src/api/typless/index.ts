import { ApiRoutes } from '@/constants/apiRoutes.ts';
import { ExtractDataType } from '@/models/typless.ts';

export const extractData = async (formData: FormData) => {
  const url = `${ApiRoutes.API_ROOT}${ApiRoutes.EXTRACT_DATA}`;

  const options = {
    method: 'POST',
    body: formData,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return (await res.json()) as ExtractDataType;
};

type PostDataResponse = {
  status: boolean;
};

export const postData = async (data: ExtractDataType) => {
  const res = await fetch(`${ApiRoutes.API_ROOT}/post_data`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return (await res.json()) as PostDataResponse;
};
