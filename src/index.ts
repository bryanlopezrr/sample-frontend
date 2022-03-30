import { rpsOption } from './globals'

// CSS Imports
import './css/styles.css'
import './css/animation.css'
import './css/mobile.css'

// Service Imports
import CharacterService from './services/characterService'
import DomService from './services/domService'
import ScoreKeeperService from './services/scoreKeeperService'

// incapsulated game
class Game {

  private readonly _rpsOptions = Object.keys(rpsOption) as Array<rpsOption>

  constructor(
    // Dep Injection | Scopes are all Singleton
    private readonly _characterService: ICharacterService,
    private readonly _domService: IDomService,
    private readonly _scoreKeeperService: IScoreKeeperService
  ) {
    this._initiaze()
  }



  private _initiaze() {
    this._characterService.UpdateCharacter()
    this._bindOnClickEvents()
    this._bindTransitionEndEvent()
  }

  private _bindOnClickEvents() {
    const rockHTMLElement = document.getElementById('r')
    if(rockHTMLElement) rockHTMLElement.onclick = () => this._userSelection(rockHTMLElement, rpsOption.Rock)

    const paperHTMLElement = document.getElementById('p')
    if(paperHTMLElement) paperHTMLElement.onclick = () => this._userSelection(paperHTMLElement, rpsOption.Paper)

    const scissorsHTMLElement = document.getElementById('s')
    if(scissorsHTMLElement) scissorsHTMLElement.onclick = () => this._userSelection(scissorsHTMLElement, rpsOption.Scissors)
  }

  private _bindTransitionEndEvent() {
    document.querySelectorAll('.choice').forEach(animatedElement => {
      // adding event listener
      animatedElement.addEventListener('transitionend', () => {
        // remove classes after one second
        setTimeout(() => {
          animatedElement.classList.remove('green-glow')
          animatedElement.classList.remove('dark-glow')
          animatedElement.classList.remove('red-glow')
        }, 500)
      })
    })
  }



  private _userSelection(selectedElement: HTMLElement, userOption: rpsOption) {
    // Getting the reference to what was clicked
    this._domService.updateSelectedElement(selectedElement)

    const computerOption = this._getComputerChoice()

    this._scoreKeeperService.recordScore(userOption, computerOption)
  }


  private _getComputerChoice():rpsOption {
    // gives us a random number between 0 and 2
    const randomNumber = Math.floor(Math.random() * 3)
    const _computerOption = this._rpsOptions[randomNumber]
    return _computerOption
  }


}

// here is the global instance
new Game(
  CharacterService, 
  DomService, 
  ScoreKeeperService
)