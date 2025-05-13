'use client';

import { useState } from 'react';
import { ArrowRight, Calendar, Copy, Link, Search } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { useShortenedURLStore } from '@/store/shortenedURL.store';

export default function URLTable() {
  const { fetchUrls, shortenedURLs } = useShortenedURLStore();

  fetchUrls();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredUrls = shortenedURLs.filter(
    (url) =>
      url.encodedURL.includes(searchTerm) ||
      url.originalURL.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (encodedURL: string) => {
    navigator.clipboard.writeText(encodedURL);

    toast({
      title: 'Copied to clipboard',
      description: encodedURL,
    });
  };

  return (
    <div className="w-full">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search URLs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 py-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div className="rounded-lg glass-effect overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Short URL
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Original URL
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  Visits
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Created
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUrls.length > 0 ? (
                filteredUrls.map((url) => (
                  <tr
                    key={url.encodedURL}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Link className="h-4 w-4 mr-2 text-primary" />
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {url.encodedURL}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="max-w-xs truncate text-gray-700 dark:text-gray-300"
                        title={url.originalURL}
                      >
                        {url.originalURL}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary dark:bg-primary/30">
                        {url.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{url.createdAt.toString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center">
                        <button
                          onClick={() => copyToClipboard(url.encodedURL)}
                          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <a
                          href={url.originalURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-600 dark:text-gray-400"
                  >
                    No URLs found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
