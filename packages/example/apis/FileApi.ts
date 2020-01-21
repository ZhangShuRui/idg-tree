import { Api, CONST_TYPE_MULTIPART_FORM_DATA } from '@idg/idg';
// 上传文件的示例
export default class extends Api {
  public contentType: string = CONST_TYPE_MULTIPART_FORM_DATA;
  public imageUpload(data: any) {
    return this.request({
      url: 'image/upload',
      method: 'post',
      data,
    });
  }
}
