import { useMutation } from '@tanstack/react-query';
import { extractData, postData } from '@/api/typless';

export const useExtractData = () => {
  return useMutation({
    mutationKey: ['extractData'],
    mutationFn: extractData,
  });
};

export const usePostData = () => {
  return useMutation({
    mutationKey: ['postData'],
    mutationFn: postData,
  });
};
