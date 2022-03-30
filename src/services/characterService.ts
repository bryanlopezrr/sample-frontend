import ApplicationSettings from "./applicationSettings"
import DomService from './domService'

class CharacterService implements ICharacterService {
  constructor(private _ApplicationSettings: IApplicationSettings, private _domService: IDomService){}

    private _updateTabIcon() {
        const _iconLink = document.head.querySelector('link[rel="shortcut icon"]')
        if (_iconLink) (_iconLink as HTMLLinkElement).href = "./images/luigi.png"        
    }

    public UpdateCharacter(): void {

        let src = './images/'
        if (this._ApplicationSettings.isMario)
          src += '/mario.png'
        else {
          src += '/luigi.png'
          document.body.id = "luigi"

          this._updateTabIcon()

        }

        this._domService.characterDiv.src = src

    }

}

export default new CharacterService(ApplicationSettings, DomService)