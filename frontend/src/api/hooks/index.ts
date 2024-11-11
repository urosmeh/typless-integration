import { useMutation } from '@tanstack/react-query';
import { extractData, postData } from '@/api/typless';
import { toaster } from '@/components/ui/toaster';

export const useExtractData = () => {
  return useMutation({
    mutationKey: ['extractData'],
    mutationFn: extractData,
    onMutate: () => {
      toaster.create({
        title: 'Info',
        description: `File sent to extract data.`,
        type: 'info',
      });
    },
    onSuccess: () => {
      toaster.create({
        title: 'Success!',
        description: `Data extracted successfully`,
        type: 'success',
      });
    },
    onError: (err) => {
      toaster.create({
        title: 'Error!',
        description: err.message,
        type: 'error',
      });
    },
  });
};

export const usePostData = () => {
  return useMutation({
    mutationKey: ['postData'],
    mutationFn: postData,
    onSuccess: (_, data) => {
      console.log(_);
      toaster.create({
        title: 'Success!',
        description: `Metadata for ${data.file_name} saved successfully`,
        type: 'success',
      });
    },
    onError: (err) => {
      toaster.create({
        title: 'Error!',
        description: err.message,
        type: 'error',
      });
    },
  });
};
