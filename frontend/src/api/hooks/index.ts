import { useMutation } from '@tanstack/react-query';
import { extractData } from '@/api/typless';

export const useExtractData = () => {
  return useMutation({
    mutationKey: ['extractData'],
    mutationFn: extractData,
  });
};
