// carculture-landing/src/lib/kit.ts

interface KitSubscriber {
  email: string;
  first_name?: string;
  fields?: {
    wallet_address?: string;
    interests?: string;
    source?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
  tags?: string[];
}

interface KitResponse {
  subscription: {
    id: number;
    state: string;
    created_at: string;
    source: string;
    referrer: string | null;
    subscribable_id: number;
    subscribable_type: string;
    subscribable: {
      id: number;
      name: string;
      created_at: string;
    };
    subscriber: {
      id: number;
      first_name: string | null;
      email_address: string;
      state: string;
      created_at: string;
      fields: Record<string, any>;
    };
  };
}

export class KitService {
  private apiKey: string;
  private formId: string;
  private baseUrl = 'https://api.convertkit.com/v3'; // Kit uses same API as ConvertKit

  constructor() {
    this.apiKey = process.env.KIT_API_KEY || '';
    this.formId = process.env.KIT_FORM_ID || '';
  }

  async subscribeToForm(subscriber: KitSubscriber): Promise<KitResponse> {
    const response = await fetch(`${this.baseUrl}/forms/${this.formId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: this.apiKey,
        email: subscriber.email,
        first_name: subscriber.first_name,
        fields: subscriber.fields,
        tags: subscriber.tags
      }),
    });

    if (!response.ok) {
      throw new Error(`Kit API error: ${response.statusText}`);
    }

    return response.json();
  }

  async addTag(subscriberId: number, tagName: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: this.apiKey,
        name: tagName
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create tag: ${response.statusText}`);
    }

    // Add tag to subscriber
    const tagResponse = await fetch(`${this.baseUrl}/subscribers/${subscriberId}/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: this.apiKey,
        tag: tagName
      }),
    });

    if (!tagResponse.ok) {
      throw new Error(`Failed to add tag to subscriber: ${tagResponse.statusText}`);
    }
  }

  async getSubscriber(email: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/subscribers?api_key=${this.apiKey}&email_address=${email}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get subscriber: ${response.statusText}`);
    }

    const data = await response.json();
    return data.subscribers[0] || null;
  }

  // Generate interest-based tags
  generateTags(interests: string[]): string[] {
    const baseTags = ['carculture-signup'];
    const interestTags = interests.map(interest => 
      interest.toLowerCase().replace(/\s+/g, '-')
    );
    return [...baseTags, ...interestTags];
  }

  // Generate form embed code for landing page
  generateEmbedCode(): string {
    return `
      <form action="https://api.convertkit.com/v3/forms/${this.formId}/subscribe" method="post" data-sv-form="${this.formId}" data-uid="YOUR_UID" data-format="inline" data-version="5" data-options='{"settings":{"after_subscribe":{"type":"redirect","redirect_url":"https://carculture.com/thank-you"},"analytics":["google"],"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://kit.com?utm_source=dynamic&utm_medium=referral&utm_campaign=poweredby&utm_content=form"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}' min-width="400 500 600 700 800" style="background-color: transparent; font-family: inherit;">
        <div data-style="clean">
          <ul data-element="errors" data-group="alert"></ul>
          <div data-element="icon" data-group="icon"></div>
          <div data-element="content" data-group="content">
            <h2 data-element="headline" data-group="content">Join CarCulture</h2>
            <div data-element="subheadline" data-group="content">Get updates on automotive NFTs and exclusive drops</div>
            <ul data-element="success" data-group="content"></ul>
            <div data-element="fields" data-group="content">
              <input name="email_address" aria-label="Email Address" placeholder="Email Address" required="" type="email" style="background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 12px; border-radius: 8px; width: 100%; margin-bottom: 12px;">
              <input name="first_name" aria-label="First Name" placeholder="First Name" type="text" style="background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 12px; border-radius: 8px; width: 100%; margin-bottom: 12px;">
              <button type="submit" data-element="submit" data-group="content" style="background-color: #dc2626; color: white; padding: 12px 24px; border: none; border-radius: 8px; width: 100%; font-weight: 600; cursor: pointer;">
                Join the Community
              </button>
            </div>
          </div>
        </div>
      </form>
    `;
  }
}

export const kit = new KitService();

