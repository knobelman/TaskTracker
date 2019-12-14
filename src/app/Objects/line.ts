export class Line {
    private title: string = '';
    private subtitle: string = '';
    private children: Line[] = [];
    private parent: Line = undefined;
    private done: boolean = false;

    //#region 
    /**
     * Getter $title
     * @return {string }
     */
    public get $title(): string {
        return this.title;
    }

    /**
     * Getter $subtitle
     * @return {string }
     */
    public get $subtitle(): string {
        return this.subtitle;
    }

    /**
     * Getter $children
     * @return {Line[] }
     */
    public get $children(): Line[] {
        return this.children;
    }

    /**
     * Getter $parent
     * @return {Line }
     */
    public get $parent(): Line {
        return this.parent;
    }

    /**
     * Setter $title
     * @param {string } value
     */
    public set $title(value: string) {
        this.title = value;
    }

    /**
     * Setter $subtitle
     * @param {string } value
     */
    public set $subtitle(value: string) {
        this.subtitle = value;
    }

    /**
     * Setter $children
     * @param {Line[] } value
     */
    public set $children(value: Line[]) {
        this.children = value;
    }

    /**
     * Setter $parent
     * @param {Line } value
     */
    public set $parent(value: Line) {
        this.parent = value;
    }

    /**
     * Getter $done
     * @return {boolean}
     */
    public get $done(): boolean {
        return this.done;
    }

    /**
     * Setter $done
     * @param {boolean} value
     */
    public set $done(value: boolean) {
        this.done = value;
    }
    //#endregion

    deserialize(input: any, parent: Line): this {
        this.title = input.title;
        this.subtitle = input.subtitle;
        this.done = input.done;
        if (parent)
            this.parent = parent;
        input.children.forEach(element => {
            this.children.push(new Line().deserialize(element, this));
        });
        return this;
    }

    toJSON() {
        return { title: this.title, subtitle: this.subtitle, children: this.children, done: this.done };
    }

    copy(line: Line): this {
        return Object.assign(this, line);
    }

    removeSon(sonLine: Line) {
        this.children.splice(this.children.indexOf(sonLine), 1)
    }

    addSonFromRight(newSonLine: Line) {
        this.children.splice(this.children.indexOf(newSonLine.$parent) + 1, 0, newSonLine)
    }

    addSonFromLeft(newSonLine: Line) {
        this.children.push(newSonLine)
    }

    getIndexOfSon(sonLine: Line) {
        return this.children.indexOf(sonLine);
    }

    moveSonUp(sonLine: Line) {
        var indexOfSon = this.children.indexOf(sonLine);
        this.children.splice(indexOfSon, 1);
        this.children.splice(indexOfSon - 1, 0, sonLine);
    }

    moveSonDown(sonLine: Line) {
        var indexOfSon = this.children.indexOf(sonLine);
        this.children.splice(indexOfSon, 1);
        this.children.splice(indexOfSon + 1, 0, sonLine);
    }

    newSon(sonLine?: Line) {
        var line = new Line();
        line.$parent = this;
        if (sonLine) {
            var indexOfSon = this.children.indexOf(sonLine);
            this.children.splice(indexOfSon + 1, 0, line);
        }
        else {
            this.children.push(line);
        }
    }

    deleteSon(sonLine: Line) {
        var indexOfSon = this.children.indexOf(sonLine);
        this.children.splice(indexOfSon, 1);
    }

    changeDone() {
        this.done = !this.done
    }


}
