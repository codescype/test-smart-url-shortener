import MessagePage from '@/components/MessagePage';
import {
  apiURL,
  ShortenedURL,
  shortenedUrlAPISearchPath,
} from '@tsus/shared-lib';

export default async function RedirectToOriginalURL({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const urlToSearchFrom = `${apiURL}${shortenedUrlAPISearchPath}/${slug}`;

  console.log(`🚨 API should be available at the following URL ${apiURL}`);
  console.log(`🚨 Received the following slug ${slug}`);
  console.log(`🚨 Sending a request to the following URL ${urlToSearchFrom}`);

  try {
    const response = await fetch(urlToSearchFrom, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Throw an error if the response isn't okay.
    if (!response.ok) throw new Error(response.statusText);

    const shortenedURL: ShortenedURL = await response.json();
    console.info(shortenedURL);

    if (shortenedURL.originalURL) {
      return (
        <MessagePage
          code="Decoded"
          message={`Your original URL has been decoded, and your are now being redirected to the ${shortenedURL.originalURL}`}
          actionMessage="Go to Original URL"
          actionURL={shortenedURL.originalURL}
        />
      );
    } else {
      throw new Error('Original URL not found in the response');
    }
  } catch (error) {
    console.error(error);

    return <MessagePage />;
  }
}
