# -*- coding: UTF8 -*-

__doc__ = """
pip install qiniu
"""

import qiniu
import os

QINIU_AK = "nIFi7iFDn4Q-6FNtN5gHIG1vc2ny7HoW1ZaheGT7"
QINIU_SK = "dpw24sgleoBCeFrai4eXqMGoswp0p-lRHcq-z5fi"
QINIU_BUCKET = "static"
QINIU_HOST = "f.linyuchen.net"


class QiniuTool(object):

    def __init__(self):
        self.qn = qiniu.Auth(QINIU_AK, QINIU_SK)
        self.qn_manager = qiniu.BucketManager(self.qn)

    def get_url(self, file_name):
        return "http://%s/%s" % (QINIU_HOST, file_name)

    def get_token(self, to_file_name):
        token = self.qn.upload_token(QINIU_BUCKET, to_file_name.encode("u8"))
        return token

    def upload(self, local_file_path, to_file_name):
        token = self.get_token(to_file_name)
        ret, info = qiniu.put_file(token, to_file_name, local_file_path)
        if ret and ret.get('key') == to_file_name and ret.get('hash') == qiniu.etag(local_file_path):
            return True, self.get_url(to_file_name)
        else:
            return False, info.text_body


class UploadDir(object):

    def __init__(self, path, exclude_ext=[], qiniu_path=""):
        if qiniu_path.endswith("/"):
            qiniu_path= qiniu_path[:-1]
        self.prefix = qiniu_path
        # self.exclude_ext = [".html", ".gif", ".png", ".jpg", ".ttf"]
        self.path = path
        self.exclude_ext = exclude_ext
        self._upload_dir()

    def _upload_file(self, arg, dirname, files):
        # print(arg, dirname, files)
        for f in files:
            in_ext = False
            for ext in self.exclude_ext:
                if f.endswith(ext):
                    in_ext = True
                    break
            if in_ext:
                continue
            file_path = dirname + "/" + f
            if os.path.isdir(file_path):
                UploadDir(file_path, qiniu_path=self.prefix)
                continue
            qiniu_filename = self.prefix + file_path.replace(self.path, "")
            print(u"qiniu path:" + qiniu_filename)
            upload_success, err = QiniuTool().upload(file_path, qiniu_filename)
            if not upload_success:
                print(err)

    def _upload_dir(self):
        os.path.walk(self.path, self._upload_file, "a")


UploadDir(path="./build", exclude_ext=[".html", ".DS_Store"], qiniu_path="xyj_eb/js/")
#UploadDir(path="./build", exclude_ext=exclude_ext)
