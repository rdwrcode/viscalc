import xs from 'xstream'

import {createFolderComponent} from './Folder'

export function App (sources) {
  const Folder = createFolderComponent({id: 0, removable: false})
  return Folder(sources)
}
