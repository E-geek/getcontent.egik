import { Injectable } from '@nestjs/common';

export interface ILoadPageResponse {
  error?: string;
  data?: string;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async loadPage(url: string): Promise<ILoadPageResponse> {
    let response: Response;
    try {
      response = await fetch(url, {
        credentials: 'omit',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'cross-site',
          Priority: 'u=0, i',
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache',
        },
        referrer: 'https://www.google.com/',
        method: 'GET',
        mode: 'cors',
      });
    } catch (error) {
      return {
        error: `Failed to load page: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
    if (!response.ok) {
      return {
        error: `Failed to load page: ${response.status} ${response.statusText}`,
      };
    }
    const data = await response.text();
    return {
      data,
    };
  }
}
