
class ApplicationSettings implements IApplicationSettings {
    private readonly _isMario: boolean
    constructor() {
        this._isMario = process.env.isMario === "true"
    }

    get isMario() {
        return this._isMario
    }

}

export default new ApplicationSettings()