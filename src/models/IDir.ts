interface IDir {
    name: string;
    dirs: IDir[];
    files: string[];
}