class DomService implements IDomService
{
    private readonly _userScoreSpan:    HTMLElement
    private readonly _compScoreSpan:    HTMLElement
    private readonly _resultDiv:        HTMLElement
    private readonly _characterDiv:     HTMLImageElement
    private _selectedElement:           HTMLElement
    
    constructor() 
    {
        this._userScoreSpan = document.getElementById('user-score') as HTMLElement
        this._compScoreSpan = document.getElementById('comp-score') as HTMLElement
        this._resultDiv = document.querySelector('.result') as HTMLElement
        this._characterDiv = document.getElementById('character') as HTMLImageElement
        this._selectedElement = document.createElement('div')
    }

    public get userScoreSpan() {
        return this._userScoreSpan
    }

    public get compScoreSpan() {
        return this._compScoreSpan
    }

    public get resultDiv() {
        return this._resultDiv
    }

    public get characterDiv() {
        return this._characterDiv
    }

    public get selectedElement() {
        return this._selectedElement
    }

    public updateSelectedElement(newSelection: HTMLElement): void {
        this._selectedElement = newSelection
    }

}

export default new DomService()