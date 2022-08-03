import Cubic from './cubic.d'
import { nanoid } from 'nanoid'

export const DEFAULT_CONFIG: Cubic.IConfig = {}

class Grid {
  constructor() {}
}

abstract class Topo {
  getRelation() {}
}

/** 对象实体 */
class Entity implements Cubic.IEntity {
  id: string = nanoid()
  pos: Cubic.IPos
  size: Cubic.ISize
  meta: any = {}
}

/** 负责渲染 */
export class Viewer {
  config: Cubic.IConfig = {}
  entities: Cubic.KeyMap<Cubic.IEntity> = {}
  viewList: Cubic.IViewModel[] = []

  constructor(config?: Cubic.IConfig) {
    this.config = config
  }

  init(root: HTMLDivElement) {}
}

/** 负责搭建 */
export class Builder extends Viewer {
  constructor(config?: Cubic.IConfig) {
    super(config)
  }

  add() {}

  remove() {}
}

class Relation {}

class EvtHandler {}
