/*
 * @Author: your name
 * @Date: 2021-02-08 15:33:23
 * @LastEditTime: 2021-02-08 18:26:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\utils\fileName.js
 */
/**
 * 输入文件夹名称和文件名称返回唯一存储路径
 * @param {string} folderName 文件夹名称
 * @param {string} fileName 文件名称
 */
export const getFileName = function(folderName, fileName) {
  return `${folderName}/${Date.now()}_${fileName}`;
}