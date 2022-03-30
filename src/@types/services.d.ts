/**
 * Service which dynamically will change Mario and Luigi UI
 */
interface ICharacterService {
    UpdateCharacter(): void
}

interface IScoreKeeperService {
    recordScore(userOption: rpsOption, computerOption: rpsOption): void
}

/**
 * Service Responsible for the State our Dom Elements
 */
interface IDomService {
    userScoreSpan:    HTMLElement
    compScoreSpan:    HTMLElement
    resultDiv:        HTMLElement
    characterDiv:     HTMLImageElement
    selectedElement:  HTMLElement
    updateSelectedElement(newSelection: HTMLElement): void
}

interface IApplicationSettings {
    isMario: boolean
}