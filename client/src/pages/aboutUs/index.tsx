import React, { useState, useEffect } from 'react';
import { AboutUsAPI } from '@/common';

type AboutContent = {
  yawu: string;
  flipside: string;
  spark: string;
};

export default function AboutUs() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(`${AboutUsAPI}?populate=*`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch about-us content');
        }

        const json = await response.json();
        console.log('AboutUs response JSON:', json);
        let attrs;
        // Handle single-type vs collection response
        if (Array.isArray(json.data)) {
          if (json.data.length === 0) {
            throw new Error('No About Us entry found in API response');
          }
          attrs = json.data[0].attributes;
        } else if (json.data.attributes) {
          attrs = json.data.attributes;
        } else {
          throw new Error('Invalid data structure from API: ' + JSON.stringify(json));
        }
        setContent({
          yawu: attrs.Yawu || '',
          flipside: attrs.FlipSide || '',
          spark: attrs.Spark || '',
        });
      } catch (err) {
        console.error('Error fetching about-us content:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 pt-20 pb-6">
      <h1 className="text-5xl font-bold text-center mb-6">
        <span className="text-red-600">ABOUT</span> <span className="text-black">US</span>
      </h1>

      <div className="flex flex-col items-center my-8">
        <div className="flex justify-center items-center">
          <img src="/BVLogo.svg" alt="Boston Voter logo" className="w-24 h-auto" />
          <span className="mx-4 text-2xl font-bold">×</span>
          <a href="https://flipsidenews.net/" target="_blank" rel="noopener noreferrer">
            <img src="/flipside.png" alt="The FlipSide logo" className="w-40 h-auto" />
          </a>
        </div>

        <p className="text-center text-lg mt-6 max-w-2xl font-bold">
          BU Spark! and The FlipSide partnered to create Boston Voter,<br/>
          delivering live election info and voting resources to Boston residents.
        </p>
      </div>

      <div className="flex flex-col items-center mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0 mb-6 md:mb-0">
            <img
              src="/Yawu.png"
              alt="Yawu Miller"
              className="rounded-full border-4 border-black w-48 h-48 object-cover"
            />
          </div>
          <div className="md:ml-8 text-center">
            <h2 className="text-3xl font-bold">Yawu Miller</h2>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <a 
                href="https://bsky.app/profile/did:plc:qwrxbyotsv7zhgdmnp47q7ym" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Bluesky"
              >
                <img src="/bluesky_black.svg" alt="Bluesky" className="w-6 h-6" />
              </a>
              <a 
                href="https://www.facebook.com/flipsidenewsboston" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <img src="/facebook_black.svg" alt="Facebook" className="w-6 h-6" />
              </a>
              <a 
                href="https://x.com/flipsideboston" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <img src="/x_black.svg" alt="X" className="w-7 h-7" />
              </a>
              <a 
                href="mailto:yawu@flipsidenews.net" 
                aria-label="Email"
              >
                <img src="/mail.svg" alt="Email" className="w-6 h-6" />
              </a>
            </div>
            <div className="mt-2 text-center">
              <a 
                href="mailto:yawu@flipsidenews.net" 
                className="text-sm text-gray-800"
              >
                yawu@flipsidenews.net
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#D9D9D9] p-6 rounded-lg space-y-6 w-full lg:w-3/4 mx-auto">
        {loading ? (
          <p className="text-center">Loading content...</p>
        ) : error ? (
          <p className="text-red-600 text-center">Error loading content: {error}</p>
        ) : (
          <>
            <section>
              <h3 className="font-semibold text-xl mb-2">Yawu Miller</h3>
              <p>{content?.yawu}</p>
            </section>
            <section>
              <h3 className="font-semibold text-xl mb-2">The FlipSide</h3>
              <p>{content?.flipside}</p>
            </section>
            <section>
              <h3 className="font-semibold text-xl mb-2">BU Spark!</h3>
              <p>{content?.spark}</p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}