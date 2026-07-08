import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get('placeId');
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  if (!placeId) {
    return NextResponse.json({ error: 'Place ID is required' }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json({
      result: null,
      error: 'API Key not configured in environment',
    });
  }

  // Define the fields you want to return to save on costs/latency
  const fields = 'name,rating,formatted_phone_number,reviews,photo,user_ratings_total';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const data = await response.json();
    
    if (data.status !== 'OK') {
      return NextResponse.json({ 
        result: null,
        error: data.status, 
        message: data.error_message || 'Fetch failed' 
      });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Internal API Error:", error);
    return NextResponse.json({
      result: null,
      error: 'Internal server error',
    });
  }
}
