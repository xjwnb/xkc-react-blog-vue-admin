/*
 * @Author: your name
 * @Date: 2021-02-08 15:00:47
 * @LastEditTime: 2021-02-08 18:16:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\utils\oss.js
 */
import OSS from "ali-oss";
// oss data
import { ossData } from "@/const/oss/ossData";

export const client = new OSS({
  accessKeyId: ossData.accessKeyId,
  accessKeySecret: ossData.accessKeySecret,
  bucket: ossData.bucket,
  region: ossData.region,
});
