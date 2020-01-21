import { Controller } from '@idg/idg';
export default class extends Controller {
  // static depends = [ 'api.AtomApi' ]
  // async getDependence (id) {
  //   const fileContent = await this.atomApi.getPackageJson(id)
  //   const dependencies = JSON.parse(Buffer.from(fileContent.content, 'base64').toString()).dependencies
  //   return dependencies || {}
  // }
}
