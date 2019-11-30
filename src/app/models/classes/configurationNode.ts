export class ConfigurationNodeClass {
    public id: String;
    public tittle: String;
    public configurable: Boolean;
    public folder: Boolean;
    public status: Boolean;
    public childs: ConfigurationNodeClass[];
    public relation: String[];

    constructor(id, tittle, configurable, folder, status) {
        this.id = id;
        this.tittle = tittle;
        this.configurable = configurable;
        this.folder = folder;
        this.status = status;
        this.childs = [];
        this.relation = [];
    }
}