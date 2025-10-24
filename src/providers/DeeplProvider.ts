import ProviderBase from './ProviderBase'
import {
  type SourceLanguageCode,
  type TargetLanguageCode,
  type TextResult,
  Translator
} from 'deepl-node'

export default class DeeplProvider extends ProviderBase {
  private translator: Translator

  constructor(apiKey: string) {
    super()
    this.translator = new Translator(apiKey)
  }

  async translate(text: string, lang: string): Promise<string[]> {
    const parts: string[] = lang.split('-')
    const source = parts.shift()!                 // first element: 'es'
    const target = parts.join('-')                // rest joined: 'pt-br'
    const result: TextResult = await this.translator.translateText<string>(
      text, source as SourceLanguageCode, target as TargetLanguageCode
    )
    return Promise.resolve([result.text])
  }
  
}
