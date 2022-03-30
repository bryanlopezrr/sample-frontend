// import { convertOptionSymbolToString } from './globals'
import { rpsOption } from './../globals'
import DomService from './domService'

class ScoreKeeper implements IScoreKeeperService {
  // STATE/PROPERTIES
  private readonly _score: IScoreState
  private readonly _tinyText: ITinyText

  constructor(private readonly _domService: IDomService) {
    this._score = {
      user: 0,
      comp: 0
    }
    this._tinyText = {
      smallUser: this._createSmallTextElement("user"),
      smallComp: this._createSmallTextElement("comp")
    }
  }

  private _createSmallTextElement(textContent: string) {
    if (typeof textContent !== 'string' || textContent.trim().length === 0) throw "invalid input provided"
    const subElement = document.createElement('sub')
    subElement.classList.add('small-text')
    subElement.textContent = textContent
    return subElement.outerHTML
  }

  // Could be part of a diff module
  private _win(userChoice: rpsOption, computerChoice: rpsOption) {
    this._updateScoreBoard(true)
    const { smallUser, smallComp } = this._tinyText

    this._domService.resultDiv.innerHTML = userChoice + smallUser + " beats " + computerChoice + smallComp + " > You win!!"
    // winning animation
    this._domService.selectedElement.classList.add('green-glow')
  }

  // Could be part of a diff module
  private _lose(userChoice: rpsOption, computerChoice: rpsOption) {
    this._updateScoreBoard(false)
    const { smallUser, smallComp } = this._tinyText
    this._domService.resultDiv.innerHTML = computerChoice + smallComp + " beats " + userChoice + smallUser + " > You lose... "
    // losing animation
    this._domService.selectedElement.classList.add('red-glow')
  }
  // Could be part of a diff module
  private _draw(userChoice: rpsOption, computerChoice: rpsOption) {
    const { smallUser, smallComp } = this._tinyText
    this._domService.resultDiv.innerHTML = computerChoice + smallComp + " draws with " + userChoice + smallUser + " > Its a tie. "
    // draw animation
    this._domService.selectedElement.classList.add('dark-glow')
  }


  private _updateScoreBoard(winning: boolean) {
    if (winning) {
      this._score.user++
      this._domService.userScoreSpan.innerHTML = this._score.user.toString()
    } else {
      this._score.comp++
      this._domService.compScoreSpan.innerHTML = this._score.comp.toString()
    }
  }


  public recordScore(userOption: rpsOption, computerOption: rpsOption): void {
    if (userOption === computerOption) this._draw(userOption, computerOption)
    else if (this._getWinningOption(userOption) === computerOption) this._lose(userOption, computerOption)
    else this._win(userOption, computerOption)
  }

  private _getWinningOption(option: rpsOption) {
    // Paper loses to S
    if (option === rpsOption.Paper) return rpsOption.Scissors
    // Rock loses to P
    if (option === rpsOption.Rock) return rpsOption.Paper
    // Scissors loses to R
    if (option === rpsOption.Scissors) return rpsOption.Rock
  }

}

export default new ScoreKeeper(DomService)