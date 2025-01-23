declare module "@googlemaps/js-api-loader" {
  export interface LoaderOptions {
    apiKey: string
    version: string
    libraries?: string[]
    language?: string
    region?: string
  }

  export class Loader {
    constructor(options: LoaderOptions)
    load(): Promise<typeof google>
  }
}

declare namespace google {
  namespace maps {
    namespace places {
      class Autocomplete {
        constructor(inputElement: HTMLInputElement, options?: AutocompleteOptions)
        addListener(eventName: string, handler: Function): void
        getPlace(): PlaceResult
      }

      interface AutocompleteOptions {
        fields?: string[]
        types?: string[]
      }

      interface PlaceResult {
        geometry?: {
          location?: {
            lat(): number
            lng(): number
          }
        }
        formatted_address?: string
      }
    }
  }
}

