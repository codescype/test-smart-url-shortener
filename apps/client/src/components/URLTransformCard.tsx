'use client';

import { useState } from 'react';

import { useShortenedURLStore } from '@/store/shortenedURL.store';

import URLForm from '@/components/URLForm';
import GradientButton from '@/components/GradientButton';
import { toast } from '@/components/ui/use-toast';

const URLTransformCard = () => {
  const { encodeUrl, decodeUrl } = useShortenedURLStore();

  const [result, setResult] = useState<{
    original: string;
    shortened: string;
  } | null>(null);

  const handleFormSubmit = async ({
    url,
    action,
  }: {
    url: string;
    action: 'encode' | 'decode';
  }) => {
    try {
      if (action === 'encode') {
        // Try to encode the URL
        const shortenedURL = await encodeUrl(url);

        setResult({
          original: url,
          shortened: shortenedURL,
        });

        // Show the result to the user
        toast({
          title: 'URL Shortened',
          description: 'Your shortened URL has been created!',
        });
      } else {
        // Try to decode the URL
        const originalURL = await decodeUrl(url);

        setResult({
          original: originalURL,
          shortened: url,
        });

        // Show the result to the user
        toast({
          title: 'URL Decoded',
          description: 'Original URL retrieved successfully!',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while processing your request.',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.shortened);
      toast({
        title: 'Copied to clipboard',
        description: result.shortened,
      });
    }
  };

  return (
    <>
      <URLForm onFormSubmit={handleFormSubmit} className="mb-10" />

      {result && (
        <div className="mt-6 max-w-2xl mx-auto glass-effect p-6 rounded-lg mb-10">
          <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
            Result
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Original URL:
              </p>
              <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 break-all text-gray-700 dark:text-gray-300">
                {result.original}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Shortened URL:
              </p>
              <div className="flex items-center">
                <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-l border-y border-l border-gray-200 dark:border-gray-700 flex-grow break-all text-gray-700 dark:text-gray-300">
                  {result.shortened}
                </p>
                <GradientButton
                  onClick={copyToClipboard}
                  className="rounded-l-none py-3"
                >
                  Copy
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default URLTransformCard;
