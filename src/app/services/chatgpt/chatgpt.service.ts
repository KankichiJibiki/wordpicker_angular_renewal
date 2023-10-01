import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import Configuration from "openai";
import OpenAIApi from "openai";


@Injectable({
  providedIn: 'root'
})
export class ChatgptService {
  private openai!: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: environment.openAiApiKey
    });
    this.openai = new OpenAIApi(configuration);
  }

  public async chat(message: string): Promise<string> {
    try {
      // Use chatgpt.query method with optional parameters
      const response = await this.chatgpt.query(message, {
        temperature: 0.8,
        max_tokens: 32,
      });

      // Return the response text
      return response.text;
    } catch (error) {
      // Handle any errors
      console.error(error);
      return 'Something went wrong.';
    }
  }
}
