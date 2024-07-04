export class Respawn {
  constructor(
    public readonly id?: string,
    public name?: string,
    public character?: string,
    public is_pt?: boolean,
    public pt_members?: string[],
  ) {}
}
