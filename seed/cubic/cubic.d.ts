declare namespace Cubic {
  interface IPos {
    x: number
    y: number
  }

  interface ISize {
    width: number
    height: number
  }

  interface IEntity {
    pos: IPos
    size: ISize
  }

  interface IViewModel {
    id: string
  }

  interface IConfig {
    [key: string]: any
  }

  type KeyMap<T> = {
    [key: string]: T
  }
}

export default Cubic
