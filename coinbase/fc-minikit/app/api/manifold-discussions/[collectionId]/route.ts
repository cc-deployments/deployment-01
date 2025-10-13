import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> }
) {
  const { collectionId } = await params;
  
  try {
    // Return sample discussions for demo purposes
    const discussions = [
      {
        id: '1',
        title: 'Welcome to CarMania Gallery Discussion!',
        content: 'Share your thoughts about the latest car drops and collections.',
        author: 'CarCulture Team',
        timestamp: new Date().toISOString(),
        likes: 12,
        replies: 3
      },
      {
        id: '2',
        title: 'Light Bulb Moment - Amazing drop!',
        content: 'Just minted the Light Bulb Moment NFT. The artwork is incredible!',
        author: 'Car Enthusiast',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        likes: 8,
        replies: 1
      },
      {
        id: '3',
        title: 'Summertime Blues Collection',
        content: 'The vintage car aesthetic in this collection is perfect for summer vibes!',
        author: 'Vintage Car Lover',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        likes: 15,
        replies: 5
      }
    ];

    return NextResponse.json({ discussions });
    
  } catch (error) {
    console.error('Error fetching discussions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch discussions' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> }
) {
  const { collectionId } = await params;
  
  try {
    const body = await request.json();
    const { title, content } = body;
    
    // Simulate posting a new discussion
    const newDiscussion = {
      id: Date.now().toString(),
      title,
      content,
      author: 'Anonymous User',
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: 0
    };
    
    return NextResponse.json({ 
      success: true, 
      discussion: newDiscussion 
    });
    
  } catch (error) {
    console.error('Error posting discussion:', error);
    return NextResponse.json(
      { error: 'Failed to post discussion' },
      { status: 500 }
    );
  }
}
